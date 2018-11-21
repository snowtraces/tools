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
    Vue.prototype.fetchStorageItem = function (key) {
      if (!key || !localStorage.getItem(key)) return ''

      let data = JSON.parse(localStorage.getItem(key))
      let names = data['name']
      names.sort(function (a, b) { return a - b })

      let name = names[0]
      let value = data['value'][name]
      return {'name': name, 'value': value}
    }
    Vue.prototype.pushStorageItem = function (key, name, value) {
      const data = localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : {}
      const names = data['name'] || []
      const values = data['value'] || {}

      names.indexOf(name) === -1 && names.push(name)
      values[name] && delete values[name]
      values[name] = value

      localStorage.setItem(key, JSON.stringify({'name': names, 'value': values}))
    }
  }
}
