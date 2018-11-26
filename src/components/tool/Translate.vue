<template>
  <div id="translate">
    <div class="translate-source">
      <textarea v-model="input" @input="update" v-focus></textarea>
      <div class="source-detail translate-detail" v-html="sourceDetail"></div>
    </div>
    <div class="translate-result">
      <div><div class="target-value" v-html="targetValue"></div><copy-button></copy-button></div>
      <div class="target-detail translate-detail" v-html="targetDetail"></div>
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
      let input = e.target.value
      if (!input) {
        this.targetValue = ''
        this.sourceDetail = ''
        this.targetDetail = ''
        return
      }

      let url = this.doGoogleTranslate(input)
      url && axios.get(url)
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
              <div class="src-explain-example">${item[1][0][2]}</div>
            `)
          })
          this.sourceDetail = ''
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
                <div class="tar-item"><span class="item-title">${t[0]}</span><span class="item-alt">${t[1].join(', ')}</span></div>
              `)
            })
          })
          this.targetDetail = ''
          tarRead && (this.targetDetail += `<div class="read">${tarRead}</div>`)
          this.targetDetail += `${tListHTML.join('\n')}`
        })
        .catch(e => {
          this.errors.push(e)
        })
    }, 300)
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
    font-size: 18px;
    font-family: 'Monaco', courier, monospace;
    box-sizing: border-box;
    padding: 16px;
    border-bottom: 1px solid #eee;
    font-weight: 600;
  }
  .target-value{
    height: 160px;
    padding: 18px;
    background-color: #f6f6f6;
    border-bottom: 1px solid #eee;
    font-weight: 600;
  }
  .translate-detail{
    height: calc(100% - 160px);
    background: #fff;
    padding: 16px;
    text-align: left;
    overflow-y: auto;
    font-size: 14px;
  }
</style>
