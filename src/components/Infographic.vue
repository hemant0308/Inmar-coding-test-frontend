<template>
  <div class="container infographic-container">
    <div ref="infographic" class="mt-4 pl-4">
    </div>
  </div>
</template>
<style type="text/css" scoped="">
.node-text {
  font-size: 1rem;
}

.infographic-container {
  overflow-x: auto;
  padding-bottom: 50px;
}

</style>
<script type="text/javascript">
import productService from '../services/productService';

import { treeView } from '../assets/js/treeView';

export default {
  mounted() {
    this.getMetaData();
  },
  methods: {
    createInfographic(metaData) {
      const svgNode = treeView(metaData);
      $(this.$refs.infographic).html(svgNode);
    },
    getMetaData() {
      let that = this;
      productService.getMetaData().then(function(data) {
        data.locations.forEach(function(location) {
          location.value = location.id;
          location.children = location.departments;
          location.children.forEach(function(department) {
            department.value = department.id;
            department.children = department.categories;
            department.children.forEach(function(category) {
              category.value = category.id;
              category.children = category.subCategories;
              category.children.forEach(function(subCategory) {
                subCategory.value = subCategory.id;
              });
            });
          });
        });
        var metaData = {
          name: "Store",
          value: "-1",
          children: data.locations
        }
        that.createInfographic(metaData);
      });
    }
  }
}

</script>
