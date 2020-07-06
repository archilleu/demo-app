import Mock from 'mockjs'
const baseUrl = 'http://localhost:8081/'

Mock.mock(`${baseUrl}login`,{
    'token': 'aaaaaaaaaaaaaaaaaaaaaa'
});
Mock.mock(`${baseUrl}user`, {
    'name': '@name',
    'email': '@email',
    'age|1-10': 5,
})

Mock.mock(`${baseUrl}menu`, {
    'id': '@increment',
    'name': 'menu',
    'order|1-20': 5,
})
