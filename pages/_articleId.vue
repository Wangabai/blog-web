<!--
 * @Author: 王鑫
 * @Description:
 * @Date: 2022-06-06 11:45:36
-->
<template>
  <div>
    <DetailHeader
      :id="data.id"
      :title="data.articleName"
      :like="isLike"
      @liked="liked"
    />
    <div class="article-detail">
      <section>
        <h1 class="title">{{ data.articleName }}</h1>
        <div class="stuff">
          <span>阅读 {{ data.access }}</span>
          <span>喜欢 {{ data.like }}</span>
          <span>创建时间 {{ data.createTime }}</span>
        </div>
        <div
          v-dompurify-html="$md.render(data.content)"
          v-highlight
          class="article-content markdown-body"
        ></div>
      </section>
      <div>
        <div class="footer-operation">
          <span>{{ data.articleName }}</span>
          <span :class="{ like: isLike }" @click="onLike">
            <svg-icon icon-class="like" />{{ data.like }}
          </span>
          <span><i class="el-icon-view"></i>{{ data.access }}</span>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
export default {
  // components: { Markdown },
  async asyncData(context) {
    const id = context.params.articleId
    try {
      const { data } = await context.$axios.get(`/api/web/detail?id=${id}`)
      return { data: data.data }
    } catch (e) {
      context.error({ statusCode: 404, message: '页面未找到～' })
    }
  },
  data() {
    return {
      isLike: false,
    }
  },
  head() {
    return {
      title: `${this.data.articleName}`,
    }
  },
  methods: {
    liked() {
      this.isLike = true
      this.data.like++
    },
    onLike() {
      if (this.isLike) {
        this.$message({
          showClose: true,
          message: '只能点赞一次哦～',
          type: 'warning',
        })
      } else {
        this.$axios.get(`/api/web/like?id=${this.data.id}`).then(() => {
          this.isLike = true
          this.data.like++
        })
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.article-detail {
  background-color: #fff;
  width: 900px;
  margin: 0 auto;
  padding: 0 50px;
  .title {
    font-size: 30px;
    padding: 50px 0 22px;
  }
  .stuff {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 1px solid #ccc;
    margin-bottom: 20px;
    span {
      margin-right: 10px;
    }
  }
  .article-content {
    font-size: 14px;
    padding-bottom: 60px;
  }
  .footer-operation {
    padding-bottom: 50px;
  }
}
.like {
  color: red;
}
</style>
