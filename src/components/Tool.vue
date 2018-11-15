<template>
    <div class="tool has-shadow">
      <div class="tool-content">
        <slot name="content"></slot>
      </div>
      <div class="tool-title">
        <slot name="title"></slot>
      </div>
    </div>
</template>
<script>
export default {
  name: 'Tool'
}
</script>

<style scoped>
  .tool {
    width: 12rem;
    height: 9rem;
    margin: 2rem;
    border-radius: 5px;
    cursor: pointer;
    position: relative;
  }
  .tool-content {
    width: 100%;
    height: 100%;
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
  }
  .has-shadow {
    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.08);
  }

</style>
