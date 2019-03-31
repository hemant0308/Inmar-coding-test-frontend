<template>
  <div class="container">
    <div class="text-right">
      <strong><i class="fa fa-user"></i> {{user.username}}</strong>
      <button class="btn btn-primary btn-sm" @click="logout">
         Logout
      </button>
    </div>
    <nav>
      <div class="nav nav-tabs" id="nav-tab" role="tablist">
        <a class="nav-item nav-link active" id="nav_products" data-toggle="tab" href="#products" role="tab" aria-controls="nav-home" aria-selected="true">Products</a>
        <a class="nav-item nav-link" id="nav_meta_data" data-toggle="tab" href="#meta_data" role="tab" aria-controls="nav-profile" aria-selected="false">Meta Data</a>
        <a class="nav-item nav-link" id="nav_tree_view" data-toggle="tab" href="#tree_view" role="tab" aria-controls="nav-profile" aria-selected="false">Infographic</a>
      </div>
    </nav>
    <div class="tab-content mt-2" id="nav-tabContent">
      <div class="tab-pane fade show active" id="products" role="tabpanel" aria-labelledby="nav-home-tab">
        <products></products>
      </div>
      <div class="tab-pane fade" id="meta_data" role="tabpanel" aria-labelledby="nav-profile-tab">
        <meta-data @meta-data-updated="updateInfographic"></meta-data>
      </div>
      <div class="tab-pane fade" id="tree_view" role="tabpanel" aria-labelledby="nav-profile-tab">
        <infographic ref="infographic"></infographic>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import MetaData from './MetaData';
import Products from './Products';
import Infographic from './Infographic';

import mappings from '../mappings';


export default {
  components: {
    MetaData,
    Products,
    Infographic
  },
  data() {
    return {
      user: {
        username:null
      }
    }
  },
  mounted() {
    const data = {
      name: 'store',
      value: 0,
      children: [
        { name: 'location one', value: 'location1', children: [{ name: 'department1', value: 'department1' }, { name: 'department2', value: 'department2' }, { name: 'department3', value: 'department3' }] },
        { name: 'location two', value: 'location2', children: [{ name: 'department4', value: 'department4' }, { name: 'department5', value: 'department5' }, { name: 'department6', value: 'department6' }] },
        { name: 'location three', value: 'location3', children: [{ name: 'department7', value: 'department7' }, { name: 'department8', value: 'department8' }, { name: 'department9', value: 'department9' }] }
      ]
    };
    if (localStorage.getItem("user")) {
      this.user = JSON.parse(localStorage.getItem("user"));
    }
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      this.$router.push(mappings.LOGIN_URL);
    },
    updateInfographic() {
      this.$refs.infographic.getMetaData();
    }
  }
}

</script>
