<template>
  <div class="container">
    <div>首页</div>
    <div>
      <nuxt-link to="/article">博客列表 </nuxt-link>
    </div>
    <div>我知道很丑，我就是想发一版看看。</div>
    <Footer />
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
}
</script>
<style lang="scss" scoped>
.container {
  text-align: center;
}
</style>
