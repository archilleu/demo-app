const LocalUser = {
  init (token) {
    if (token == null) {
      console.error('token is null')
    }

    window.sessionStorage.setItem('user', token)
  },
  clear () {
    window.sessionStorage.removeItem('user')
  },
  id () {
    return this.user().jti
  },
  name () {
    return this.user().sub
  },
  orgId () {
    return this.user().orgId
  },
  user () {
    const userStr = window.sessionStorage.getItem('user')
    if (userStr == null) {
      return null
    }
    try {
      return JSON.parse(decodeURIComponent(escape(window.atob(userStr.split('.')[1]))))
    } catch(e) {
      this.clear();
    }
  },
  token () {
    return window.sessionStorage.getItem('user')
  }
}

export default LocalUser
