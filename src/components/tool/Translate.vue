<template>
  <div id="translate">
    <div class="translate-source">
      <textarea :value="input" @input="update" placeholder="# 待翻译内容..."></textarea>
    </div>
    <div class="translate-result">
      <div v-html="translatedData"></div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  name: 'Translate',
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
    translatedData: function () {
      return this.doGoogleTranslate(this.input)
    }
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
    max-width: 450px;
    height: 200px !important;
    vertical-align: top;
    box-sizing: border-box;
    position: relative;
    top: 20%;
  }

  .translate-result {
    background: #fff;
    text-align: left;
    padding: 16px;
    word-break: break-all;
  }

  .translate-source textarea {
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
    padding: 16px;
  }

</style>
