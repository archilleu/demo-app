/*
 * 系统登录模块
 */

// 登录接口
export function login () {
  const loginData = {
    message: 'success',
    data: {
      token: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTYwMDI3OTk0MiwidXNlcklkIjoxLCJjcmVhdGVkIjoxNjAwMjM2NzQyNTU3LCJhdXRob3JpdGllcyI6W3siYXV0aG9yaXR5Ijoic3lzOm1lbnU6ZGVsZXRlIn0seyJhdXRob3JpdHkiOiJzeXM6Z2VuZXJhdG9yOnZpZXcifSx7ImF1dGhvcml0eSI6InN5czpkaWN0OmVkaXQifSx7ImF1dGhvcml0eSI6InN5czpkaWN0OmRlbGV0ZSJ9LHsiYXV0aG9yaXR5Ijoic3lzOmNvbmZpZzphZGQifSx7ImF1dGhvcml0eSI6InN5czpzd2FnZ2VyOnZpZXcifSx7ImF1dGhvcml0eSI6InN5czptZW51OmFkZCJ9LHsiYXV0aG9yaXR5Ijoic3lzOnVzZXI6YWRkIn0seyJhdXRob3JpdHkiOiJzeXM6ZGVwdDpkZWxldGUifSx7ImF1dGhvcml0eSI6InN5czpyb2xlOmVkaXQifSx7ImF1dGhvcml0eSI6InN5czpsb2c6dmlldyJ9LHsiYXV0aG9yaXR5Ijoic3lzOnJvbGU6dmlldyJ9LHsiYXV0aG9yaXR5Ijoic3lzOmxvZzpkZWxldGUifSx7ImF1dGhvcml0eSI6InN5czpkaWN0OnZpZXcifSx7ImF1dGhvcml0eSI6InN5czp1c2VyOmRlbGV0ZSJ9LHsiYXV0aG9yaXR5Ijoic3lzOmRlcHQ6dmlldyJ9LHsiYXV0aG9yaXR5Ijoic3lzOm1vbml0b3I6dmlldyJ9LHsiYXV0aG9yaXR5Ijoic3lzOmRydWlkOnZpZXcifSx7ImF1dGhvcml0eSI6InN5czptZW51OnZpZXcifSx7ImF1dGhvcml0eSI6InN5czpkaWN0OmFkZCJ9LHsiYXV0aG9yaXR5Ijoic3lzOm9ubGluZTp2aWV3In0seyJhdXRob3JpdHkiOiJzeXM6cm9sZTphZGQifSx7ImF1dGhvcml0eSI6InN5czp1c2VyOnZpZXcifSx7ImF1dGhvcml0eSI6InN5czpkZXB0OmVkaXQifSx7ImF1dGhvcml0eSI6InN5czpsb2dpbmxvZzpkZWxldGUifSx7ImF1dGhvcml0eSI6InN5czpjb25maWc6ZWRpdCJ9LHsiYXV0aG9yaXR5Ijoic3lzOmNvbnN1bDp2aWV3In0seyJhdXRob3JpdHkiOiJzeXM6bG9naW5sb2c6dmlldyJ9LHsiYXV0aG9yaXR5Ijoic3lzOnVzZXI6ZWRpdCJ9LHsiYXV0aG9yaXR5Ijoic3lzOmNvbmZpZzp2aWV3In0seyJhdXRob3JpdHkiOiJzeXM6Y29uZmlnOmRlbGV0ZSJ9LHsiYXV0aG9yaXR5Ijoic3lzOmRlcHQ6YWRkIn0seyJhdXRob3JpdHkiOiJzeXM6cm9sZTpkZWxldGUifSx7ImF1dGhvcml0eSI6InN5czptZW51OmVkaXQifV19.l7p0nZR_HUkiUTdT0a6pG4ayutP2JnKak1A6_HnJrncyoxvhg8C9bYRrx936iY703FPscv9hq9m0fKYg0MmKog'
    }
  }
  return {
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
    url: 'logout',
    type: 'get',
    data: logoutData
  }
}
