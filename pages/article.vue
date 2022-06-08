<!--
 * @Author: 王鑫
 * @Description: 博客列表
 * @Date: 2022-05-09 14:22:51
-->
<template>
  <div class="article-list">
    <Header />
    <div class="top-bg">
      <img src="~/static/image/topBg.png" alt="暂无图片" />
    </div>
    <div class="container">
      <div class="type">
        <div class="title">
          <span class="big-title">全部文章 - 共 {{ count }} 篇</span>
          <span class="small-title">分类</span>
        </div>
        <el-radio-group
          v-model="radio"
          class="category-radio"
          @change="categoryChange"
        >
          <el-radio class="radio-item" :label="0" value="0">全部</el-radio>
          <el-radio
            v-for="(item, index) in categoryList"
            :key="index"
            class="radio-item"
            :label="item.id"
            :value="item.id"
            >{{ item.name }}</el-radio
          >
        </el-radio-group>
      </div>
      <section class="list">
        <ul>
          <li v-for="(item, index) in arcticList" :key="index">
            <div class="article-img">
              <span class="category">{{ item.category }}</span>
              <img :src="item.coverUrl" @click="viewArticle(item.id)" />
            </div>
            <div class="context">
              <div class="title" @click="viewArticle(item.id)">
                {{ item.articleName }}
              </div>
              <div class="info">
                {{
                  item.createTime
                    ? `${item.createTime.slice(5, 7)}月 ${item.createTime.slice(
                        8,
                        10
                      )},${item.createTime.slice(0, 4)}`
                    : ``
                }}
              </div>
              <!-- <div
                v-dompurify-html="item.htmlContent"
                class="article-content"
              ></div> -->
              <div class="article-content">
                <p>{{ item.intro }}</p>
              </div>
              <div class="footer">
                <div>
                  标签：
                  <span v-show="item.tags.length !== 0">
                    <el-tag
                      v-for="(tag, i) in item.tags"
                      :key="i"
                      size="mini"
                      style="margin-right: 5px"
                      >{{ tag }}</el-tag
                    >
                  </span>
                  <span v-show="item.tags.length === 0">暂无标签</span>
                </div>
                <div>
                  <span>点击量:{{ item.access }}</span>
                  <span>点赞:{{ item.like }}</span>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <el-button
          v-show="count > arcticList.length"
          type="primary"
          @click="getMore"
          >加载更多</el-button
        >
      </section>
      <div class="new-article">
        <div class="title">
          <span>最新文章</span>
        </div>
        <div class="new-list">
          <ul>
            <li
              v-for="(item, index) in newArticleList"
              :key="index"
              @click="viewArticle(item.id)"
            >
              <div class="show-img">
                <img :src="item.coverUrl" />
              </div>
              <div class="detail">
                <span>{{ item.articleName }}</span>
                <span>{{ item.createTime.substring(0, 9) }}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    const article = await $axios.$get('/api/web/article')
    const arcticList = article.data.list
    const count = article.data.count
    const category = await $axios.$get('/api/web/category')
    const categoryList = category.data
    const newArticle = await $axios.$get('/api/web/new')
    const newArticleList = newArticle.data
    return {
      count,
      arcticList,
      categoryList,
      newArticleList,
    }
  },
  data() {
    return {
      radio: '',
      params: {
        categoryId: '',
        page: 1,
      },
      count: 0,
    }
  },
  methods: {
    viewArticle(id) {
      this.$router.push(`/${id}`)
    },
    async getMore() {
      this.params.page++
      const data = await this.$axios.post('/api/web/list', this.params)
      const list = data.data.data.list
      this.count = data.data.data.count
      for (const i in list) {
        this.arcticList.push(list[i])
      }
    },
    async categoryChange(val) {
      this.radio = val
      this.params.categoryId = val
      this.params.page = 1
      const data = await this.$axios.post('/api/web/list', this.params)
      const list = data.data.data.list
      // for (const i in list) {
      //   const [current, newest] = [this.list.data[key], result[key]]
      //   if(current){
      //     for(let k in newest) {}
      //   }
      // }
      this.arcticList = list
      this.count = data.data.data.count
    },
  },
}
</script>
<style lang="scss" scoped>
.article-list {
  width: 100%;
  .top-bg {
    width: 100%;
    img {
      width: 100%;
    }
  }
  .container {
    display: flex;
    margin-top: 20px;
    width: 1400px;
    .type {
      background-color: #fff;
      padding: 20px;
      width: 320px;
      height: 100%;
      .title {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        padding-bottom: 10px;
        margin-bottom: 10px;
        border-bottom: 1px solid #ededed;
        .big-title {
          font-size: 16px;
        }
        .small-title {
          font-size: 12px;
          color: #999999;
        }
      }
      .category-radio {
        display: flex;
        flex-direction: column;
        .radio-item {
          margin-top: 5px;
        }
      }
    }
    .list {
      margin: 0 20px;
      width: 670px;
      li {
        margin-bottom: 20px;
        background-color: #fff;
        padding: 20px;
        display: inline-block;
        height: 560px;
        width: 100%;
        position: relative;
        .article-img {
          width: 540px;
          height: 320px;
          margin: 0 auto;
          margin-bottom: 40px;
          position: relative;
          cursor: pointer;
          .category {
            position: absolute;
            top: 0;
            left: 0;
            display: inline-block;
            color: #fff;
            font-size: 14px;
            font-family: Arial-Regular, Arial;
            font-weight: 400;
            color: #ffffff;
            line-height: 24px;
            padding: 0 4px;
            height: 24px;
            background: #e44646;
          }
          img {
            width: 100%;
            height: 100%;
          }
        }
        .context {
          .title {
            text-align: center;
            font-size: 18px;
            color: #333333;
            line-height: 14px;
            height: 18px;
            font-weight: bold;
            cursor: pointer;
          }
          .info {
            margin-top: 20px;
            text-align: center;
          }
          .article-content {
            margin-top: 20px;
            width: 100%;
            height: 40px;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 2; // 超出多少行
            -webkit-box-orient: vertical;
            p {
              text-overflow: ellipsis;
            }
          }
          .footer {
            position: absolute;
            bottom: 20px;
            width: 90%;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
        }
      }
    }
    .new-article {
      background-color: #fff;
      width: 280px;
      height: 100%;
      padding: 10px;
      .title {
        text-align: center;
        font-size: 18px;
        color: #333333;
        line-height: 14px;
        height: 30px;
        font-weight: bold;
        border-bottom: 1px solid #000;
      }
      .new-list {
        width: 100%;
        li {
          width: 100%;
          height: 100px;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          overflow: hidden;
          margin-top: 10px;
          .show-img {
            width: 70px;
            display: flex;
            margin-right: 10px;
            cursor: pointer;
            img {
              width: 100%;
            }
          }
          .detail {
            cursor: pointer;
            display: flex;
            flex-direction: column;
          }
        }
      }
    }
  }
}
</style>
