<template>
    <div class="tool">
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
    border: 1px solid #dadce0;
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
    height: 3.75rem;
    margin: .5rem auto;
    fill: #1a73e8;
  }
  .tool-title {
    width: 100%;
    height: 2.5rem;
    position: absolute;
    left: 0px;
    bottom: 0px;
    line-height: 2.5rem;
    font-size: 17px;
    font-weight: 600;
    letter-spacing: 0.1em;
    cursor: pointer;
    color: #1a73e8;
    background-color: rgba(66, 133, 244, 0.12);
    border-radius: 0px 0px 5px 5px;
  }

</style>
