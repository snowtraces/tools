<template>
  <div id="format">
    <div class="json-source">
      <textarea :value="input" @input="update" placeholder="# 请在出处输入内容..."></textarea>
      <new-button @click.native="newPage"></new-button>
      <list-button @toggleList="toggleList" @loadData="loadData" :listData="listData"></list-button>
    </div>
    <div class="json-result">
      <pre v-html="JSONFormat"></pre>
      <copy-button></copy-button>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import CopyButton from '../button/CopyButton'
import NewButton from '../button/NewButton'
import ListButton from '../button/ListButton'

export default {
  name: 'JSONFormat',
  props: ['isShow'],
  components: {NewButton, CopyButton, ListButton},
  data () {
    return {
      listData: '',
      key: 'tools:format',
      name: '',
      input: ''
    }
  },
  methods: {
    update: _.debounce(function (e) {
      this.input = e.target.value
      this.pushStorageItem(this.key, this.name, this.input)
    }, 300),
    newPage: function () {
      this.name = new Date().getTime()
      this.input = ''
    },
    toggleList: function () {
      if (this.listData) {
        this.listData = ''
      } else {
        this.listData = this.listStorageItem(this.key)
      }
    },
    loadData: function (name) {
      let data = this.fetchStorageItem(this.key, name)
      if (data) {
        this.input = data.value
        this.name = data.name
      }

      // hidden list
      this.listData = ''
    }
  },
  computed: {
    JSONFormat: function () {
      let result = ''
      let len = 1
      try {
        let json = JSON.parse(this.input)
        result = JSON.stringify(json, undefined, 2)
        len = result.split('\n').length
        console.log('len', len)
        result = result.replace(new RegExp('([{}])', 'g'), '<hl-ob>$1</hl-ob>')
        result = result.replace(new RegExp('([[\\]])', 'g'), '<hl-om>$1</hl-om>')
        result = result.replace(new RegExp('"([^"]+)":', 'g'), '<hl-an>"$1"</hl-an>:')
        result = result.replace(new RegExp('([^,:\\n[{]+)(,|\\n)', 'g'), '<hl-av>$1</hl-av>$2')
        result = result.replace(new RegExp(': ([^,:\\n[{]+)(,|\\n)', 'g'), ': <hl-av>$1</hl-av>$2')
      } catch (err) {
        result = this.input
      }
      const lineNumber = `<div class="line-number">${'<span></span>'.repeat(len)}</div>`
      result += lineNumber
      return result
    }
  },
  watch: {
    isShow: function (val) {
      if (val) {
        document.querySelector('#format textarea').focus()
      }
    }
  },
  created () {
    this.name = new Date().getTime()
  }
}
</script>

<style scoped>
  html, body, #format, pre {
    margin: 0;
    height: 100%;
    font-family: Consolas, Monaco, monospace;
  }

  .json-source, #format > div {
    display: inline-block;
    width: 49%;
    height: 100%;
    vertical-align: top;
    box-sizing: border-box;
  }

  .json-result {
    background: #f8f8f8;
    text-align: left;
    overflow: auto;
    font-size: 13px;
    position: relative;
    color: #888;
    padding: 20px 0;
  }

  pre {
    overflow: auto;
    line-height: 1.35;
    padding-left: 3.5rem;
    position: relative;
  }
  .json-source {
    position: relative;
  }
  .json-source textarea {
    border: none;
    border-right: 1px solid #ccc;
    width: 100%;
    height: 100%;
    resize: none;
    outline: none;
    background-color: #f6f6f6;
    font-size: 14px;
    font-family: 'Monaco', courier, monospace;
    box-sizing: border-box;
    padding: 20px;
  }
</style>
