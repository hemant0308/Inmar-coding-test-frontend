<template>
  <div class="container">
    <div class="user-form">
      <nav>
        <div class="nav nav-tabs" id="nav-tab" role="tablist">
          <a class="nav-item nav-link active" id="nav_login" data-toggle="tab" href="#login" role="tab" aria-controls="nav-home" aria-selected="true">Login</a>
          <a class="nav-item nav-link" id="nav_register" data-toggle="tab" href="#register" role="tab" aria-controls="nav-profile" aria-selected="false">Register</a>
        </div>
      </nav>
      <div class="tab-content mt-2" id="nav-tabContent">
        <div class="tab-pane fade show active" id="login" role="tabpanel" aria-labelledby="nav-home-tab">
          <div v-if="loginErrorMsg" class="alert alert-danger">
            {{loginErrorMsg}}
          </div>
          <form action="" @submit.prevent="loginUser" data-vv-scope="loginForm">
            <div class="form-group">
              <label for="username">Username</label>
              <input type="text" class="form-control" v-validate="'required'" v-model="username">
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" v-validate="'required'" class="form-control" v-model="password">
            </div>
            <button class="btn btn-primary" @click="loginUser" @keyup.enter="loginUser">Login</button>
          </form>
        </div>
        <div class="tab-pane fade" id="register" role="tabpanel" aria-labelledby="nav-profile-tab">
          <div v-if="singupErrorMsg" class="alert alert-danger">
            {{singupErrorMsg}}
          </div>
          <form action="" @submit.prevent="registerUser" data-vv-scope="signupForm">
            <div class="form-group">
              <label for="username">Username</label>
              <input type="text" class="form-control" v-validate="'required'" v-model="user.username">
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input type="text" class="form-control" v-validate="'required'" v-model="user.email">
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" class="form-control" v-validate="'required'" v-model="user.password" @keyup.enter="registerUser">
            </div>
            <button class="btn btn-primary" @click="registerUser">Register</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<style type="text/css">
.user-form {
  max-width: 400px;
  margin: auto;
}

</style>
<script type="text/javascript">
import userService from '../services/userService';

import mappings from '../mappings';

export default {
  data() {
    return {
      username: null,
      password: null,
      user: {
        username: null,
        password: null,
        email: null
      },

      loginErrorMsg: null,
      singupErrorMsg: null,

      isLoading: false
    }
  },
  mounted() {

  },
  methods: {
    loginUser() {
      if (!this.isLoading) {
        let that = this;
        that.isLoading = true;
        this.loginErrorMsg = null;
        this.$validator.validateAll("loginForm").then((result) => {
          if (result) {
            userService.loginUser(that.username, that.password).then(function(data) {
              if (data.user) {
                localStorage.setItem("user", JSON.stringify(data.user));
                that.$router.push(mappings.ROOT_URL);
              } else {
                that.loginErrorMsg = data.message;
              }
              that.isLoading = false;
            });
          }
        })
      }
    },
    registerUser() {
      if (!this.isLoading) {
        let that = this;
        that.isLoading = true;
        this.singupErrorMsg = null;
        that.$validator.validateAll("signupForm").then((result) => {
          if (result) {
            userService.registerUser(this.user).then(function(data) {
              if (data.user) {
                localStorage.setItem("user", JSON.stringify(data.user));
                that.$router.push(mappings.ROOT_URL);
              } else {
                that.singupErrorMsg = data.message;
              }
              that.isLoading = false;
            });
          }
        })
      }

    }
  }
}

</script>
