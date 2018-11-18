<template>
  <div id="editor">
    <textarea :value="input" @input="update"></textarea>
    <div class="md-result"><div v-html="compiledMarkdown"></div><copy-button></copy-button></div>
  </div>
</template>

<script>
import marked from 'marked'
import _ from 'lodash'
import CopyButton from '../CopyButton'
export default {
  name: 'MarkDown',
  components: {CopyButton},
  data () {
    return {
      input: '# hello'
    }
  },
  computed: {
    compiledMarkdown: function () {
      return marked(this.input, { sanitize: true })
    }
  },
  methods: {
    update: _.debounce(function (e) {
      this.input = e.target.value
    }, 300)
  }
}
</script>

<style scoped>
  html, body, #editor {
    margin: 0;
    height: 100%;
    font-family: 'Helvetica Neue', Arial, sans-serif;
    color: #333;
  }

  textarea, #editor .md-result {
    display: inline-block;
    width: 49%;
    height: 100%;
    vertical-align: top;
    box-sizing: border-box;
    padding: 0 20px;
  }
  #editor .md-result {
    background: #fff;
    text-align: left;
    position: relative;
  }
  textarea {
    border: none;
    border-right: 1px solid #ccc;
    resize: none;
    outline: none;
    background-color: #f6f6f6;
    font-size: 14px;
    font-family: 'Monaco', courier, monospace;
    padding: 20px;
  }
  code {
    color: #f66;
  }
</style>
