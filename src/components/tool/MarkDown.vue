<template>
  <div id="editor">
    <div class="md-source">
      <textarea :value="input" @input="update" placeholder="# Hello"></textarea>
      <new-button @click.native="newPage"></new-button>
      <list-button @toggleList="toggleList" @loadData="loadData" :listData="listData"></list-button>
    </div>
    <div class="md-result">
      <div v-html="compiledMarkdown"></div>
      <copy-button></copy-button>
    </div>
  </div>
</template>

<script>
import marked from 'marked'
import _ from 'lodash'
import CopyButton from '../button/CopyButton'
import NewButton from '../button/NewButton'
import ListButton from '../button/ListButton'

export default {
  name: 'MarkDown',
  props: ['isShow'],
  components: {ListButton, NewButton, CopyButton},
  data () {
    return {
      listData: '',
      key: 'tools:markdown',
      name: '',
      input: ''
    }
  },
  computed: {
    compiledMarkdown: function () {
      return marked(this.input, {sanitize: true})
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
  watch: {
    isShow: function (val) {
      if (val) {
        document.querySelector('#editor textarea').focus()
      }
    }
  },
  created () {
    this.name = new Date().getTime()
  }
}
</script>

<style scoped>
  html, body, #editor, #editor > div {
    margin: 0;
    height: 100%;
    font-family: 'Helvetica Neue', Arial, sans-serif;
    color: #333;
  }

  .md-source, #editor .md-result {
    display: inline-block;
    width: 49%;
    height: 100%;
    vertical-align: top;
    box-sizing: border-box;

  }

  #editor .md-result {
    background: #fff;
    text-align: left;
    position: relative;
    padding: 0 20px;
  }

  .md-source {
    position: relative;
  }

  .md-source textarea {
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
  code {
    color: #f66;
  }
</style>
