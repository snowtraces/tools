<template>
    <button class='copy-btn' @click='copyContent' title="复制" ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"/><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm-1 4l6 6v10c0 1.1-.9 2-2 2H7.99C6.89 23 6 22.1 6 21l.01-14c0-1.1.89-2 1.99-2h7zm-1 7h5.5L14 6.5V12z"/></svg></button>
</template>

<script>
export default {
  name: 'CopyButton',
  methods: {
    copyContent: function (e) {
      let el = e.target
      let content = el.parentElement.outerText
      content = content.replace(/\n\n/g, '\n').replace(/\n+$/, '')

      let target = document.createElement('textarea')
      target.style.position = 'absolute'
      target.style.opacity = '0'
      target.style.left = '0'
      target.style.top = '0'
      target.style.zIndex = '-9999'
      target.id = 'tmp_copy_id'
      el.append(target)
      target.textContent = content

      target.focus()
      target.setSelectionRange(0, target.value.length)
      document.execCommand('copy')
      target.remove()
      el.style.fill = '#2196F3'
      setTimeout(function () {
        el.style.fill = '#333'
      }, 500)
    }
  }
}
</script>

<style scoped>
  .copy-btn{
    position: absolute;
    top: 24px;
    right: 24px;
    background: #eee;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    cursor: pointer;
    outline: none;
    opacity: 0.85;
    padding: 0;
    fill: #333;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.08);
  }
  .copy-btn:hover{
    background: #e9e9e9;
  }
  .copy-btn svg{
    width: 60%;
    height: 60%;
    padding-top: 10%;
    pointer-events: none;
  }
</style>
