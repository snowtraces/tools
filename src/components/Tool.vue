<template>
    <div class="tool has-shadow">
      <div class="tool-content" @click="openBox">
        <slot name="content"></slot>
      </div>
      <div class="tool-title" @click="openBox">
        <slot name="title"></slot>
      </div>
      <tool-box v-show="isShow" :tool="name" @closeBox="closeBox"></tool-box>
    </div>
</template>
<script>
import ToolBox from './ToolBox'
export default {
  name: 'Tool',
  components: {ToolBox},
  props: ['name'],
  data () {
    return {
      isShow: false
    }
  },
  methods: {
    openBox: function () {
      this.isShow = true
    },
    closeBox: function () {
      this.isShow = false
    }
  }
}
</script>

<style scoped>
  .tool {
    width: 12rem;
    height: 9rem;
    margin: 1.5rem;
    border-radius: 5px;
    position: relative;
    display: inline-block;
  }
  .tool:hover .tool-content {
    transform: scale(1.1);
    transition: .3s;
  }
  .tool-content {
    width: 100%;
    height: 100%;
    border-radius: 5px;
    cursor: pointer;
  }
  .tool-content svg{
    height: 4.5rem;
    margin: 0.75rem auto;
    fill: #2196F3;
  }
  .tool-title {
    width: 100%;
    height: 3rem;
    position: absolute;
    left: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.2);
    line-height: 3rem;
    font-size: 1.125em;
    font-weight: 600;
    letter-spacing: .1em;
    border-radius: 0 0 5px 5px;
    cursor: pointer;
  }

</style>
