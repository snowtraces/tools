<template>
    <div class="tool has-shadow">
      <div class="tool-content" @click="openBox">
        <slot name="content"></slot>
      </div>
      <div class="tool-title" @click="openBox">
        <slot name="title"></slot>
      </div>
      <tool-box v-show="isShow" :tool="name" :isShow="isShow" @closeBox="closeBox"></tool-box>
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
    width: 10rem;
    height: 7.5rem;
    margin: 1.25rem;
    border-radius: 5px;
    position: relative;
    display: inline-block;
  }
  .tool:hover .tool-content {
    transition: .3s;
    opacity: 0.85;
  }
  .tool-content {
    width: 100%;
    height: 100%;
    border-radius: 5px;
    cursor: pointer;
    background: #2196F3;
  }
  .tool-content svg{
    height: 3.75rem;
    margin: 0.5rem auto;
    fill: #fff;
  }
  .tool-title {
    width: 100%;
    height: 2.5rem;
    position: absolute;
    left: 0;
    bottom: 0;
    line-height: 2.5rem;
    font-size: 17px;
    font-weight: 600;
    letter-spacing: .1em;
    border-radius: 0 0 5px 5px;
    cursor: pointer;
    color: #08f;
    background: #fff;
  }

</style>
