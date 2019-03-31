<template>
  <div>
    <nav class="navbar navbar-dark bg-dark">
      <a class="navbar-brand" href="#">
        <img src="/docs/4.0/assets/brand/bootstrap-solid.svg" width="30" height="30" class="d-inline-block align-top" alt="">
        <img :src="require('./assets/logo.png')" class="logo" alt="">
      </a>
      <h1 class="mx-auto" style="color: #dcddcb">Retail store</h1>
    </nav>
    <div class="container main-content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>

import mappings from './mappings';

export default {
  name: 'app',
  components: {

  },
  mounted(){
    if (!localStorage.getItem("user")) {
      this.$router.push(mappings.LOGIN_URL);
    }else{
      this.$router.push(mappings.ROOT_URL);
    }
  }
}

</script>
<style>
.logo {
  height: 50px;

}

</style>
