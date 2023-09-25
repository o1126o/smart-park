const my_token = 'HR_TOKEN'
// 获取token的方法
export function getToken() {
  return localStorage.getItem(my_token)
}
// 设置方法
export function setToken(token) {
  localStorage.setItem(my_token, token)
}
// 删除方法
export function removeToken() {
  localStorage.removeItem(my_token)
}
