<template>
  <button class='new-btn' @click='newContent' title="新增">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
      <path d="M0 0h24v24H0z" fill="none"/>
    </svg>
  </button>
</template>

<script>
export default {
  name: 'NewButton',
  methods: {
    newContent: function (e) {
      let el = e.target
      el.style.fill = '#2196F3'
      setTimeout(function () {
        el.style.fill = '#333'
      }, 500)
    }
  }
}
</script>

<style scoped>
  .new-btn {
    position: absolute;
    bottom: 24px;
    right: 24px;
    background: #eee;
    font-size: 14px;
    width: 34px;
    height: 34px;
    border-radius: 50%;
    cursor: pointer;
    outline: none;
    opacity: 0.85;
    padding: 0;
    fill: #333;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.16), 0 0 0 1px rgba(0, 0, 0, 0.08);
  }
  .new-btn:hover {
    background: #e9e9e9;
  }
  .new-btn svg {
    width: 75%;
    height: 75%;
    padding-top: 10%;
    pointer-events: none;
  }

</style>
