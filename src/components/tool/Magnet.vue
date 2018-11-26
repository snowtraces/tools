<template>
  <div class="magnet">
    <input class="has-shadow" type="text" name="source" @keyup.enter="generateLink" v-focus/>
    <button type="button" @click="generateLink">点击生成</button>
  </div>
</template>

<script>
export default {
  name: 'Magnet',
  props: ['isShow'],
  methods: {
    generateLink: function (event) {
      let e = event.target
      let input = e.parentElement.querySelector('input')
      let value = input.value && input.value.trim()
      let result = ''

      if (!value) {
        // 1. 为空
        this.errorMsg('不能为空')
        return
      } else if (value.startsWith('magnet:')) {
        // 2. 完整的链接
        result = value
      } else if (/^\w{32}$/gi.test(value)) {
        // 3. md5
        result = `${this.base}md5:${value}`
      } else if (/^\w{40}$/gi.test(value)) {
        // 4. btih
        result = `${this.base}btih:${value}`
      }
      if (result) {
        // add tracker
        result += ('&tr=' + this.trList.join('&tr='))
        this.copyToClipboard(result)
        this.successMsg('已生成')
      } else {
        this.errorMsg('无法识别')
      }
    },
    focus: function (event) {
      let e = event.target
      e.focus()
    }
  },
  watch: {
    isShow: function (val) {
      if (val) {
        document.querySelector('.magnet input').focus()
      }
    }
  },
  data () {
    return {
      base: 'magnet:?xt=urn:',
      trList: [
        'udp://tracker.coppersurfer.tk:6969/announce',
        'udp://tracker.internetwarriors.net:1337/announce',
        'udp://tracker.opentrackr.org:1337/announce',
        'udp://9.rarbg.to:2710/announce',
        'udp://exodus.desync.com:6969/announce',
        'udp://explodie.org:6969/announce',
        'udp://tracker.vanitycore.co:6969/announce',
        'udp://public.popcorn-tracker.org:6969/announce',
        'udp://ipv4.tracker.harry.lu:80/announce',
        'udp://tracker2.itzmx.com:6961/announce',
        'udp://tracker1.itzmx.com:8080/announce',
        'udp://tracker.torrent.eu.org:451/announce',
        'udp://tracker.port443.xyz:6969/announce',
        'udp://open.stealth.si:80/announce',
        'udp://open.demonii.si:1337/announce',
        'udp://denis.stalker.upeer.me:6969/announce',
        'udp://bt.xxx-tracker.com:2710/announce',
        'udp://tracker.tiny-vps.com:6969/announce',
        'udp://zephir.monocul.us:6969/announce',
        'udp://tracker.iamhansen.xyz:2000/announce']
    }
  }
}
</script>

<style scoped>
  .magnet {
    position: absolute;
    top: -30%;
    bottom: 0;
    left: 0;
    right: 0;
    width: 80%;
    height: 30px;
    margin: auto;
  }
  input {
    font-size: 1.125rem;
    line-height: 1.125rem;
    padding: 0.5rem 0.7rem;
    width: 60%;
    max-width: 440px;
    border-radius: 4px 0 0 4px;
  }
  button {
    padding:0.6rem 0.7rem;
    margin-top: -1px;
    background: #2196F3;
    color: #fff;
    cursor: pointer;
    border-radius: 0 4px 4px 0;
  }
</style>
