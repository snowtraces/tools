<template>
    <div class="tool-box">
      <magnet v-if="tool == 'magnet'"></magnet>
      <mark-down v-if="tool == 'markdown'"></mark-down>
      <div class="button-close" @click="hidden"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"/></svg></div>
    </div>
</template>

<script>
import Magnet from './tools/Magnet'
import MarkDown from './tools/MarkDown'
export default {
  name: 'ToolBox',
  components: {MarkDown, Magnet},
  props: ['tool', 'isShow'],
  data () {
    return {
      thisShow: this.isShow
    }
  },
  methods: {
    hidden: function () {
      this.thisShow = false
    }
  },
  watch: {
    isShow (val) {
      this.thisShow = val
    },
    thisShow (val) {
      this.$emit('closeBox', val)
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
    right: 0;
    top: 0;
    padding: 1rem;
    cursor: pointer;
  }
  .button-close svg {
    height: 3rem;
    fill: #ddd;
  }
</style>
