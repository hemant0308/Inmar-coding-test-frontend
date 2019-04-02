<template>
  <div class="container">
    <div class="text-right">
      <strong><i class="fa fa-user"></i> {{user.username}}</strong>
      <button class="btn btn-primary btn-sm" @click="logout">
        Logout
      </button>
    </div>
    <template v-if="user.username">
      <nav>
        <div class="nav nav-tabs" id="nav-tab" role="tablist">
          <a class="nav-item nav-link active" id="nav_products" data-toggle="tab" href="#products" role="tab" aria-controls="nav-home" aria-selected="true">Products</a>
          <a class="nav-item nav-link" id="nav_meta_data" data-toggle="tab" href="#meta_data" role="tab" aria-controls="nav-profile" aria-selected="false">Meta Data</a>
          <a class="nav-item nav-link" id="nav_tree_view" data-toggle="tab" href="#tree_view" role="tab" aria-controls="nav-profile" aria-selected="false">Infographic</a>
        </div>
      </nav>
      <div class="tab-content mt-2" id="nav-tabContent">
        <div class="tab-pane fade show active" id="products" role="tabpanel" aria-labelledby="nav-home-tab">
          <products ref="products"></products>
        </div>
        <div class="tab-pane fade" id="meta_data" role="tabpanel" aria-labelledby="nav-profile-tab">
          <meta-data @meta-data-updated="updateMetadata()"></meta-data>
        </div>
        <div class="tab-pane fade" id="tree_view" role="tabpanel" aria-labelledby="nav-profile-tab">
          <infographic ref="infographic"></infographic>
        </div>
      </div>
    </template>
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
        username: null
      }
    }
  },
  mounted() {
    if (localStorage.getItem("user")) {
      this.user = JSON.parse(localStorage.getItem("user"));
    } else {
      this.$router.push(mappings.LOGIN_URL);
    }
  },
  methods: {
    logout() {
      localStorage.removeItem("user");
      this.$router.push(mappings.LOGIN_URL);
    },
    updateMetadata() {
      this.$refs.infographic.getMetaData();
    }
  }
}

</script>
