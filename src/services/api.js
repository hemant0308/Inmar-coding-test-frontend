import axios from 'axios';

import constants from '../constants';
import mappings from '../mappings';

import main from '../main';

import Vue from 'vue';

export default (function() {
  var send = function(url, data, method = "get") {
    url = constants.SERVICE_URL + url;

    var user = localStorage.getItem("user");
    if (!user && main && main.$route.fullPath !== mappings.LOGIN_URL) {
      main.$router.push(mappings.LOGIN_URL);
    }
    user = JSON.parse(user);

    return new Promise(function(resolve, reject) {
      var params = {};
      if (method == "get") {
        params = data || {};
      }
      if (user && user.token) {
        params['access-token'] = user.token;
      }
      axios({
        url: url,
        method: method,
        data: data,
        params: params,
      }).then((response) => {
        if (response.status == 200) {
          resolve(response.data);
        } else if (response.status === 401) {} else {
          reject(response);
        }
      }).catch((error) => {
        if (error.response.status === 401) {
          main.$router.push(constants.LOGIN_URL);
        }
      });
    });
  };
  var post = function(url, data) {
    return send(url, data, "post");
  }
  var get = function(url, data) {
    return send(url, data, "get");
  }
  return {
    get: get,
    post: post
  }
})();
