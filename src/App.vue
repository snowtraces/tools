<template>
  <div id="app">
    <router-view/>
    <msg></msg>
  </div>
</template>

<script>
import Msg from './components/Msg'
export default {
  name: 'App',
  components: {Msg}
}
</script>

<style>
#app {
  font-family: "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
* {
  box-sizing: border-box;
}
input, button {
  border: none;
}
.has-shadow {
  box-shadow: 0 2px 2px 0 rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.08);
}
.is-hidden {
  display: none;
}
.error-msg{
  color: #f00;
}
.success-msg{
  color: #2196F3;
}
pre hl-ob, pre hl-om {
  color: #333;
}
pre hl-an{
  color: #039;
  z-index: 999;
}
pre hl-av{
  color: #802;
}
pre .line-number {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  pointer-events: none;
  z-index: 1;
}
pre .line-number > span {
  pointer-events: none;
  display: block;
  counter-increment: linenumber;
}
pre .line-number > span:before {
  content: counter(linenumber);
  color: #999;
  display: block;
  padding-right: 0.8em;
  text-align: right;
  width: 2rem;
  border-right: 1px solid #999;
  z-index: 1;
}
.md-result table td, .md-result table th {
  padding: 8px 12px;
  border: 1px solid #ccc;
}
.md-result table {
  border-collapse: collapse;
  font-size: 14px;
}

.data-list{
  padding: 8px 16px;
  border-bottom: 1px solid #ddd;
}
.data-list:hover{
  cursor: pointer;
  background: #f2f2f2;
}
.data-list-title {
  font-size: 0.875rem;
  color: #999;
}
.data-list-abstract {
  font-size: 0.875rem;
}
.data-list-*{
  pointer-events: none;
}

.translate-detail .read {
  margin-bottom: 8px;
}
.translate-detail .src-type, .translate-detail .tar-type{
  margin-top: 16px;
  color: #999;
  font-style: italic;
}
.translate-detail .src-explain-example {
  color: #999;
}
.translate-detail .src-explain,
.translate-detail .src-explain-example,
.translate-detail .tar-item{
  margin-left: 2em;
}
.translate-detail .tar-item .item-alt {
  padding-left: 1em;
  color: #999;
}
</style>
