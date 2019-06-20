export default{
  install: function (Vue, options) {
    Vue.prototype.copyToClipboard = function (data) {
      let target = document.createElement('textarea')
      target.style.position = 'absolute'
      target.style.opacity = '0'
      target.style.left = '0'
      target.style.top = '0'
      target.style.zIndex = '-9999'
      target.id = 'tmp_copy_id'
      document.querySelector('body').append(target)
      target.textContent = data

      target.focus()
      target.setSelectionRange(0, target.value.length)
      document.execCommand('copy')
      target.remove()
    }
    Vue.prototype.errorMsg = function (msg) {
      let msgEl = document.querySelector('#msg')
      msgEl.querySelector('.msg-content').innerHTML = msg || '失败'
      msgEl.classList.add('error-msg')
      msgEl.classList.remove('is-hidden')
      setTimeout(function () {
        msgEl.classList.remove('error-msg')
        msgEl.classList.add('is-hidden')
      }, 700)
    }
    Vue.prototype.successMsg = function (msg) {
      let msgEl = document.querySelector('#msg')
      msgEl.querySelector('.msg-content').innerHTML = msg || '成功'
      msgEl.classList.add('success-msg')
      msgEl.classList.remove('is-hidden')
      setTimeout(function () {
        msgEl.classList.remove('success-msg')
        msgEl.classList.add('is-hidden')
      }, 700)
    }
    Vue.prototype.fetchStorageItem = function (key, name) {
      if (!key || !localStorage.getItem(key)) return ''

      let data = JSON.parse(localStorage.getItem(key))
      let names = data['name']
      names.sort(function (a, b) { return b - a })

      name = name || names[0]
      let value = data['value'][name]
      return {'name': name, 'value': value}
    }
    Vue.prototype.listStorageItem = function (key) {
      if (!key || !localStorage.getItem(key)) return ''

      let data = JSON.parse(localStorage.getItem(key))
      let values = data['value']
      return values
    }
    Vue.prototype.pushStorageItem = function (key, name, value) {
      const data = localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : {}
      const names = data['name'] || []
      const values = data['value'] || {}

      names.indexOf(name) === -1 && names.push(name)
      values[name] && delete values[name]
      values[name] = value

      // 只保存最新100条
      if (names.length > 100) {
        let _name = names.shift()
        delete values[_name]
      }

      localStorage.setItem(key, JSON.stringify({'name': names, 'value': values}))
    }
    Vue.prototype.fetchGoogleParams = function (a) {
      let TKK = ((function () {
        let a = 561666268
        let b = 1526272306
        return 406398 + '.' + (a + b)
      })())
      function b (a, b) {
        for (let d = 0; d < b.length - 2; d += 3) {
          let c = b.charAt(d + 2)
          c = c >= 'a' ? c.charCodeAt(0) - 87 : Number(c)
          c = b.charAt(d + 1) === '+' ? a >>> c : a << c
          a = b.charAt(d) === '+' ? a + c & 4294967295 : a ^ c
        }
        return a
      }
      let e = TKK.split('.')
      let h = Number(e[0]) || 0
      let g = []
      let d = 0
      for (let f = 0; f < a.length; f++) {
        let c = a.charCodeAt(f)
        if (c < 128) {
          g[d++] = c
        } else if (c < 2048) {
          g[d++] = c >> 6 | 192
          g[d++] = c & 63 | 128
        } else {
          if ((c & 64512) === 55296 && f + 1 < a.length && (a.charCodeAt(f + 1) & 64512) === 56320) {
            c = 65536 + ((c & 1023) << 10) + (a.charCodeAt(++f) & 1023)
            g[d++] = c >> 18 | 240
            g[d++] = c >> 12 & 63 | 128
          } else {
            g[d++] = c >> 12 | 224
            g[d++] = c >> 6 & 63 | 128
          }
          g[d++] = c & 63 | 128
        }
      }
      a = h
      for (d = 0; d < g.length; d++) {
        a += g[d]
        a = b(a, '+-a^+6')
      }
      a = b(a, '+-3^+b+-f')
      a ^= Number(e[1]) || 0
      a < 0 && (a = (a & 2147483647) + 2147483648)
      a %= 1E6
      return a.toString() + '.' + (a ^ h)
    }
    Vue.prototype.doGoogleTranslate = function (query) {
      if (!query) {
        return ''
      }
      let sl = 'en'
      let tl = 'zh-CN'
      if (!/.*[a-z].*/ig.test(query)) {
        tl = 'en'
        sl = 'zh-CN'
      }

      let basePath = '/translate/single'
      let params = []
      params.push('client=t')
      params.push(`sl=${sl}`)
      params.push(`tl=${tl}`)
      params.push('hl=zh-CN')
      // params.push('dt=at') // 近义词
      params.push('dt=bd') // 翻译结果列表
      params.push('dt=ex') // 例子
      // params.push('dt=ld')
      params.push('dt=md') // 定义
      // params.push('dt=qca')
      // params.push('dt=rw') // 词组
      params.push('dt=rm') // 音标
      params.push('dt=ss') // 其他词性
      params.push('dt=t') // 源text的翻译
      params.push('ie=UTF-8')
      params.push('oe=UTF-8')
      params.push('otf=1')
      params.push('swap=1')
      params.push('ssel=5')
      params.push('tsel=5')
      params.push('kc=5')
      params.push(`tk=${this.fetchGoogleParams(query)}`)
      params.push(`q=${encodeURI(query)}`)

      return basePath + '?' + params.join('&')
    }
  }
}
