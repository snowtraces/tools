<template>
  <div id="format">
    <textarea :value="input" @input="update"></textarea>
    <div class="json-result"><pre v-html="JSONFormat"></pre><copy-button></copy-button></div>
  </div>
</template>

<script>
import _ from 'lodash'
import CopyButton from '../CopyButton'
export default {
  name: 'JSONFormat',
  components: {CopyButton},
  data () {
    return {
      input: ''
    }
  },
  methods: {
    update: _.debounce(function (e) {
      this.input = e.target.value
    }, 300)
  },
  computed: {
    JSONFormat: function () {
      let result = ''
      try {
        let json = JSON.parse(this.input)
        result = JSON.stringify(json, undefined, 2)
        let len = result.split('\n').length
        console.log('len', len)
        result = result.replace(new RegExp('([{}])', 'g'), '<hl-ob>$1</hl-ob>')
        result = result.replace(new RegExp('([[\\]])', 'g'), '<hl-om>$1</hl-om>')
        result = result.replace(new RegExp('"([^"]+)":', 'g'), '<hl-an>"$1"</hl-an>:')
        result = result.replace(new RegExp('([^,:\\n[{]+)(,|\\n)', 'g'), '<hl-av>$1</hl-av>$2')
        result = result.replace(new RegExp(': ([^,:\\n[{]+)(,|\\n)', 'g'), ': <hl-av>$1</hl-av>$2')

        const lineNumber = `<div class="line-number">${'<span></span>'.repeat(len)}</div>`
        result += lineNumber
      } catch (err) {
        if (this.input !== '') result = '错误的json格式'
        console.log(err)
      }
      return result
    }
  }
}
</script>

<style scoped>
  html, body, #format, pre {
    margin: 0;
    height: 100%;
    font-family: Consolas,Monaco,monospace;
  }
  textarea, #format > div {
    display: inline-block;
    width: 49%;
    height: 100%;
    vertical-align: top;
    box-sizing: border-box;
    padding: 20px;
  }
  #format > div {
    background: #f8f8f8;
    text-align: left;
    overflow: auto;
    font-size: 13px;
    position: relative;
    color: #888;
    padding: 20px 0;
  }
  pre{
    overflow: auto;
    line-height: 1.35;
    padding-left: 3.5rem;
    position: relative;
  }
  textarea {
    border: none;
    border-right: 1px solid #ccc;
    resize: none;
    outline: none;
    background-color: #f6f6f6;
    font-size: 14px;
  }
</style>
