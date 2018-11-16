<template>
    <div id="msg" class="has-shadow is-hidden">
      <div class="msg-content"></div>
    </div>
</template>

<script>
export default {
  name: 'Msg'
}
</script>

<style scoped>
  #msg {
    position: fixed;
    left: 0;
    right: 0;
    top: 30px;
    z-index: 999999;
    width: auto;
    max-width: 200px;
    padding: 8px;
    margin: auto;
    background: rgba(255, 255, 255, 1);
    border-radius: 5px;
  }

</style>
