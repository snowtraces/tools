<template>
  <div id="editor">
    <div class="md-source"><textarea :value="input" @input="update"></textarea>
      <new-button @click.native="newPage"></new-button>
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

export default {
  name: 'MarkDown',
  components: {NewButton, CopyButton},
  data () {
    return {
      key: 'tools:markdown',
      name: '',
      input: '# hello'
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
    }
  },
  created () {
    let data = this.fetchStorageItem(this.key)
    if (data) {
      this.input = data.value
      this.name = data.name
    } else {
      this.name = new Date().getTime()
    }
  }
}
</script>

<style scoped>
  html, body, div {
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
    padding: 20px;
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
