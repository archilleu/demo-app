import axios1 from '../axios'
import axios from 'axios';
import { Loading } from 'element-ui'
import { baseURL } from '@/utils/global'

/* 
 * 系统登录模块
 */

// 登录
export async function login(data) {
    const url = baseURL + 'index/authenticated.do';
    const params = new URLSearchParams();
    params.append('j_username', data.account);
    params.append('j_password', data.password);
    return await axios.post(url, params);
}
export async function login1(data) {
    return await axios1({
        url: 'login',
        method: 'post',
        data
    })
}

// 登出
export async function logout() {
    return await axios1({
        url: 'logout',
        method: 'get'
    })
}
