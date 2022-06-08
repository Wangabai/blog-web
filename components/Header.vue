<!--
 * @Author: 王鑫
 * @Description: 头部导航
 * @Date: 2022-05-25 15:04:54
-->
<template>
  <div class="header">
    <div class="logo">
      <img class="arrow" src="~/static/image/logo.png" />
    </div>
    <div class="menu">
      <ul>
        <li v-for="(item, index) in roots" :key="index">
          <a @click="toPage(item.link)">{{ item.title }}</a>
          <span class="row"></span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      roots: [
        { title: '首页', link: '/' },
        { title: '博客列表', link: '/blog' },
        { title: '联系方式', link: '/contact' },
      ],
    }
  },
  methods: {},
}
</script>
<style lang="scss" scoped>
.header {
  background-color: #fff;
  height: 64px;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .logo {
    height: 40px;
    .arrow {
      height: 40px;
    }
  }

  .menu {
    ul {
      display: block;
      li {
        display: inline-block;
        margin-left: 10px;
        font-size: 18px;
        font-family: SimHei-Regular, SimHei;
        font-weight: 400;
        color: #333333;
        line-height: 0px;
        .row {
          display: block;
          width: 100%;
          height: 4px;
          background-color: #fff;
          border-radius: 2px 2px 2px 2px;
          margin: 0;
          margin-top: 10px;
        }
        &:hover {
          color: #46ace4;
        }
        &:hover .row {
          background-color: #46ace4;
        }
      }
    }
  }
}
</style>
