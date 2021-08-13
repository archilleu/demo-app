/*
 * 系统登录模块
 */

// 登录接口
export function login () {
  const loginData = {
    code: 2000,
    message: '200 OK',
    data: {
      token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwZXJtaXNzaW9ucyI6WyJzeXM6bWVudTpkZWxldGUiLCJzeXM6ZGljdDplZGl0Iiwic3lzOmRpY3Q6ZGVsZXRlIiwic3lzOmNvbmZpZzphZGQiLCJzeXM6bWVudTphZGQiLCJzeXM6dXNlcjphZGQiLCJzeXM6ZGVwdDpkZWxldGUiLCJzeXM6cm9sZTplZGl0Iiwic3lzOmxvZzp2aWV3Iiwic3lzOnJvbGU6dmlldyIsInN5czpsb2c6ZGVsZXRlIiwic3lzOmRpY3Q6dmlldyIsInN5czp1c2VyOmRlbGV0ZSIsInN5czpkZXB0OnZpZXciLCJzeXM6bWVudTp2aWV3Iiwic3lzOmRpY3Q6YWRkIiwic3lzOm9ubGluZTp2aWV3Iiwic3lzOnJvbGU6YWRkIiwic3lzOnVzZXI6dmlldyIsInN5czpkZXB0OmVkaXQiLCJzeXM6bG9naW5sb2c6ZGVsZXRlIiwic3lzOmNvbmZpZzplZGl0Iiwic3lzOmxvZ2lubG9nOnZpZXciLCJzeXM6dXNlcjplZGl0Iiwic3lzOmNvbmZpZzp2aWV3Iiwic3lzOmNvbmZpZzpkZWxldGUiLCJzeXM6ZGVwdDphZGQiLCJzeXM6cm9sZTpkZWxldGUiLCJzeXM6bWVudTplZGl0Il0sInJvbGVzIjpbImFkbWluIl0sImV4cCI6MTY2NDczMzg3MywidXNlcklkIjoxLCJ1c2VybmFtZSI6ImFkbWluIn0.DcqkzgvS5k6XD5p_OtP1QmktsRQpJpNYQEFVqFRZQqI'
    }
  }
  return {
    isOpen: true,
    url: 'user/login',
    type: 'post',
    data: loginData
  }
}
// 登出接口
export function logout () {
  const logoutData = {
    code: 200,
    msg: null,
    data: {
    }
  }
  return {
    isOpen: true,
    url: 'logout',
    type: 'get',
    data: logoutData
  }
}
