<template>
    <div class="tool-box" tabindex="-1" @keyup.esc="hidden">
      <magnet v-if="tool == 'magnet'" :isShow="isShow"></magnet>
      <mark-down v-if="tool == 'markdown'" :isShow="isShow"></mark-down>
      <JSONFormat v-if="tool == 'format'" :isShow="isShow"></JSONFormat>
      <Translate v-if="tool == 'translate'" :isShow="isShow"></Translate>
      <div class="button-close" @click="hidden"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"/></svg></div>
    </div>
</template>

<script>
import Magnet from './tool/Magnet'
import MarkDown from './tool/MarkDown'
import JSONFormat from './tool/JSONFormat'
import Translate from './tool/Translate'
export default {
  name: 'ToolBox',
  components: {Translate, JSONFormat, MarkDown, Magnet},
  props: ['tool', 'isShow'],
  methods: {
    hidden: function () {
      this.$emit('closeBox')
    }
  }
}
</script>

<style scoped>
  .tool-box {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    box-sizing: border-box;
    padding: 3rem;
    z-index: 2;
    background: rgba(0, 0, 0, .7);
  }
  .button-close {
    position: absolute;
    right: 0.5rem;
    top: 0.5rem;
    cursor: pointer;
  }
  .button-close svg {
    height: 3rem;
    fill: #ddd;
  }
</style>
