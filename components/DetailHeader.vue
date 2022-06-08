<!--
 * @Author: 王鑫
 * @Description:
 * @Date: 2022-06-06 16:54:09
-->
<template>
  <div class="detail-header">
    <div class="operation">
      <nuxt-link to="/article">
        <img src="~/assets/logo.png" alt="">
      </nuxt-link>
      <span :class="{ like: isLike || like }" @click="onLike">
        <svg-icon icon-class="like" />
      </span>
    </div>
    <div class="title">{{ title }}</div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    id: {
      type: Number || String,
      default: null,
    },
    like: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isLike: false,
    }
  },
  methods: {
    onLike() {
      if (this.isLike || this.like) {
        this.$message({
          showClose: true,
          message: '只能点赞一次哦～',
          type: 'warning',
        })
      } else {
        this.$axios.get(`/api/web/like?id=${this.id}`).then(() => {
          this.isLike = true
          this.$emit('liked', true)
        })
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.detail-header {
  width: 100%;
  height: 60px;
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
}
.title {
  text-align: center;
}
.like {
  color: red;
}
</style>
