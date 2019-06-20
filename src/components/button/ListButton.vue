<template>
  <div class="list-btn-wrap">
    <button class='list-btn' title="列表" @click="$emit('toggleList')"
            :style="{fill: listData ? '#fff' : '#333', background: listData ? '#1a73e8' : '#eee'}">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
        <path d="M0 0h24v24H0z" fill="none"/>
      </svg>
    </button>
    <div class="list" v-show="listData">
      <div class="data-list" v-for="key in Object.keys(listData).reverse()" :key="key" @click="$emit('loadData', key)">
        <div class="data-list-title">{{new Date(parseInt(key)).toLocaleDateString()}} {{new Date(parseInt(key)).toLocaleTimeString()}}</div>
          <div class="data-list-abstract" :title="listData[key]">{{listData[key].substr(0, 64)}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListButton',
  props: ['listData']
}
</script>

<style scoped>
  .list-btn-wrap{
    position: absolute;
    bottom: 74px;
    right: 24px;
  }
  .list-btn {
    background: #eee;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    cursor: pointer;
    outline: none;
    opacity: 0.85;
    padding: 0;
    fill: #333;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.16), 0 0 0 1px rgba(0, 0, 0, 0.08);
  }
  .list-btn:hover {
    background: #e9e9e9;
  }
  .list-btn svg {
    width: 75%;
    height: 75%;
    padding-top: 10%;
    pointer-events: none;
  }
  .list {
    position: absolute;
    right: 40px;
    bottom: 40px;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.16), 0 0 0 1px rgba(0, 0, 0, 0.08);
    background: #fff;
    width: 360px;
    text-align: left;
    max-height: 500px;
    overflow: auto;
  }

</style>
