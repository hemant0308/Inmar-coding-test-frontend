import api from './api';

import serviceUrl from '../serviceUrl';


export default {
  loginUser(username, password) {
    return api.post(serviceUrl.LOGIN_USER,{
      username:username,
      password:password
    });
  },
  registerUser(user){
    return api.post(serviceUrl.REGISTER_USER,user);
  }
}
