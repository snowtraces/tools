<template>
  <div id="translate">
    <div class="translate-source">
      <textarea :value="input" @input="update" placeholder="# 待翻译内容..."></textarea>
      <div class="source-detail translate-detail" v-html="sourceDetail"></div>
    </div>
    <div class="translate-result">
      <div class="target-value" v-html="targetValue"></div>
      <div class="target-detail translate-detail" v-html="targetDetail"></div>
      <copy-button></copy-button>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import axios from 'axios'
import CopyButton from '../button/CopyButton'
export default {
  name: 'Translate',
  components: {CopyButton},
  data () {
    return {
      input: '',
      translatedData: {},
      targetValue: '',
      sourceDetail: '',
      targetDetail: ''
    }
  },
  methods: {
    update: _.debounce(function (e) {
      this.input = e.target.value
      let url = this.doGoogleTranslate(this.input)
      axios.get(url)
        .then(response => {
          this.translatedData = response.data
          if (!this.translatedData) {
            return ''
          }
          // 1. 源
          let sRead = this.translatedData[0][1][3] || ''
          let sDefine = this.translatedData[12]
          let sDefineHTML = []
          sDefine && sDefine.forEach(function (item) {
            sDefineHTML.push(`
              <div class="src-type">${item[0]}</div>
              <div class="src-explain">${item[1][0][0]}</div>
              <div class="src-explain">${item[1][0][2]}</div>
            `)
          })
          sRead && (this.sourceDetail += `<div class="read">${sRead}</div>`)
          this.sourceDetail += `${sDefineHTML.join('\n')}`

          // 2. 翻译结果
          this.targetValue = this.translatedData[0][0][0]
          let tarRead = this.translatedData[0][1][2] || ''

          let tList = this.translatedData[1]
          let tListHTML = []
          tList && tList.forEach(function (item) {
            tListHTML.push(`
              <div class="tar-type">${item[0]}</div>
            `)
            item[2] && item[2].forEach(function (t) {
              tListHTML.push(`
                <div>${t[0]} ${t[1].join()}</div>
              `)
            })
          })
          tarRead && (this.targetDetail += `<div class="read">${tarRead}</div>`)
          this.targetDetail += `${tListHTML.join('\n')}`
        })
        .catch(e => {
          this.errors.push(e)
        })
    }, 1000)
  }
}
</script>

<style scoped>
  html, body, #translate, #translate > div {
    margin: 0;
    height: 100%;
    font-family: 'Helvetica Neue', Arial, sans-serif;
    color: #333;
  }
  .translate-source, .translate-result {
    display: inline-block;
    width: 49%;
    max-width: 600px;
    vertical-align: top;
    box-sizing: border-box;
    position: relative;
  }

  .translate-result {
    background: #fff;
    text-align: left;
    word-break: break-all;
  }

  .translate-source textarea {
    display: block;
    border: none;
    width: 100%;
    height: 160px;
    resize: none;
    outline: none;
    background-color: #f6f6f6;
    font-size: 14px;
    font-family: 'Monaco', courier, monospace;
    box-sizing: border-box;
    padding: 16px;
  }
  .target-value{
    height: 160px;
    padding: 16px;
    background-color: #f6f6f6;
  }
  .translate-detail{
    height: calc(100% - 160px);
    background: #fff;
    padding: 16px;
    text-align: left;
    overflow-y: auto;
  }

  .read {
    margin-bottom: 1em;
  }
</style>
