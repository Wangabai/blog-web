/*
 * @Author: 王鑫
 * @Description: 代码高亮
 * @Date: 2022-06-06 14:34:31
 */
// 代码高亮风格，选择更多风格需导入 node_modules/hightlight.js/styles/ 目录下其它css文件
import 'highlight.js/styles/github.css'
import Vue from 'vue'

// 按需引入
const hljs = require('highlight.js/lib/core')
hljs.registerLanguage('css', require('highlight.js/lib/languages/css'))
hljs.registerLanguage(
  'markdown',
  require('highlight.js/lib/languages/markdown')
)
hljs.registerLanguage('go', require('highlight.js/lib/languages/go'))
hljs.registerLanguage(
  'htmlbars',
  require('highlight.js/lib/languages/htmlbars')
)
hljs.registerLanguage('http', require('highlight.js/lib/languages/http'))
hljs.registerLanguage('java', require('highlight.js/lib/languages/java'))
hljs.registerLanguage(
  'javascript',
  require('highlight.js/lib/languages/javascript')
)
hljs.registerLanguage('json', require('highlight.js/lib/languages/json'))
hljs.registerLanguage('nginx', require('highlight.js/lib/languages/nginx'))
hljs.registerLanguage('php', require('highlight.js/lib/languages/php'))
hljs.registerLanguage('python', require('highlight.js/lib/languages/python'))
hljs.registerLanguage(
  'python-repl',
  require('highlight.js/lib/languages/python-repl')
)
hljs.registerLanguage('scss', require('highlight.js/lib/languages/scss'))
hljs.registerLanguage('shell', require('highlight.js/lib/languages/shell'))
hljs.registerLanguage('sql', require('highlight.js/lib/languages/sql'))
hljs.registerLanguage('less', require('highlight.js/lib/languages/less'))
hljs.registerLanguage(
  'typescript',
  require('highlight.js/lib/languages/typescript')
)

// 自定义指令 v-highlight
Vue.directive('highlight', {
  // 被绑定元素插入父节点时调用
  inserted(el) {
    const blocks = el.querySelectorAll('pre code')
    blocks.forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
})

