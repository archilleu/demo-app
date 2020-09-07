export function saveToken (auth) {
  window.sessionStorage.setItem('auth', JSON.stringify(auth))
}

export function getToken () {
  const auth = window.sessionStorage.getItem('auth')
  if (auth == null) {
    return null
  }

  return JSON.parse(auth).token
}

export function clearToken () {
  window.sessionStorage.setItem('auth', null)
}
