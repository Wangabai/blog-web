module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
  },
  extends: ['@nuxtjs', 'plugin:nuxt/recommended', 'prettier'],
  plugins: [],
  // add your custom rules here

  rules: {
    // 关闭组件命名规则
    'vue/multi-word-component-names': 'off',
  },
  overrides: [
    // 这里是添加的代码
    {
      files: ['pages/index.vue', 'layouts.**.vue'], // 匹配index.vue
      rules: {
        'vue/multi-word-component-names': 'off',
      }, // 给上面匹配的文件指定规则
    }
  ],
}
