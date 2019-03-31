<template>
  <div ref="modal" class="modal fade">
    <div class="modal-dialog modal-md">
      <div class="modal-content">
        <div class="modal-header">
          New Product
          <i class="fa fa-times" data-dismiss="modal"></i>
        </div>
        <div class="modal-body" v-if="product">
          <form action="" @submit.prevent="saveProduct">
            <div class="form-group">
              <label for="location">Name</label>
              <input type="text" class="form-control" v-model="product.name" v-validate="'required'">
            </div>
            <div class="form-group">
              <label for="location">SKU</label>
              <input type="text" class="form-control" v-model="product.sku" v-validate="'required'">
            </div>
            <div class="form-group">
              <label for="location">Location</label>
              <select name="" id="" class="form-control" v-model="product.locationId" v-validate="'required'">
                <option :value="null">Select Location</option>
                <option v-for="location in locations" :value="location.id">
                  {{location.name}}
                </option>
              </select>
            </div>
            <div class="form-group">
              <label for="location">Department</label>
              <select name="" id="" class="form-control" v-model="product.departmentId" v-validate="'required'">
                <option :value="null">Select Department</option>
                <option v-for="department in departments" :value="department.id">
                  {{department.name}}
                </option>
              </select>
            </div>
            <div class="form-group">
              <label for="location">Category</label>
              <select name="" id="" class="form-control" v-model="product.categoryId" v-validate="'required'">
                <option :value="null">Select Category</option>
                <option v-for="category in categories" :value="category.id">
                  {{category.name}}
                </option>
              </select>
            </div>
            <div class="form-group">
              <label for="location">Sub Category</label>
              <select name="" id="" class="form-control" v-model="product.subCategoryId" v-validate="'required'">
                <option :value="null">Select Sub Category</option>
                <option v-for="subCategory in subCategories" :value="subCategory.id">
                  {{subCategory.name}}
                </option>
              </select>
            </div>
          </form>
          <div class="modal-footer">
            <button class="btn btn-primary" @click="saveProduct">
              Save Product
            </button>
            <button class="btn btn-danger" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import productService from '../services/productService';
import locationService from '../services/locationService';
import departmentService from '../services/departmentService.js';
import categoryService from '../services/categoryService';
import subCategoryService from '../services/subCategoryService';

export default {
  props: {
    showModal: {
      type: Boolean,
      default: false
    },
    activeProduct: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      product: null,
      locations: [],
      departments: [],
      categories: [],
      subCategories: []
    }
  },
  watch: {
    showModal() {
      if (this.showModal) {
        $(this.$refs.modal).modal("show");
      } else {
        $(this.$refs.modal).modal("hide");
      }
    },
    "product.locationId": function() {
      this.product.departmentId = this.product.categoryId = this.product.subCategoryId = null;
      this.getDepartments();
    },
    "product.departmentId": function() {
      this.product.categoryId = this.product.subCategoryId = null;
      this.getCategories();
    },
    "product.categoryId": function() {
      this.product.subCategoryId = null;
      this.getSubCategories();
    },
    "activeProduct": function() {
      this.resetForm();
      _.extend(this.product, this.activeProduct);
    }
  },
  mounted() {
    this.getLocations();
    let that = this;
    $(this.$refs.modal).on("hidden.bs.modal", function() {
      that.$emit("form-hidden");
    });
    this.resetForm();
  },
  methods: {
    resetForm: function() {
      this.product = {
        name: null,
        sku: null,
        locationId: null,
        departmentId: null,
        categoryId: null,
        subCategoryId: null
      }
    },
    getLocations() {
      let that = this;
      locationService.getLocations().then(function(data) {
        that.locations = data.locations;
      });
    },
    getDepartments() {
      if (this.product.locationId) {
        let that = this;
        departmentService.getDepartments(this.product.locationId).then(function(data) {
          that.departments = data.departments;
        });
      }
    },
    getCategories() {
      if (this.product.locationId && this.product.departmentId) {
        let that = this;
        categoryService.getCategories(this.product.locationId, this.product.departmentId).then(function(data) {
          that.categories = data.categories;
        });
      }
    },
    getSubCategories() {
      if (this.product.locationId && this.product.departmentId && this.product.categoryId) {
        let that = this;
        subCategoryService.getSubCategories(this.product.locationId, this.product.departmentId, this.product.categoryId).then(function(data) {
          that.subCategories = data.subCategories;
        });
      }
    },
    saveProduct() {
      let that = this;
      this.$validator.validateAll().then((result) => {
        if (result) {
          productService.saveProduct(this.product).then(function(data) {
            that.$emit("product-added", data.product);
            that.activeProduct = null;
            $(that.$refs.modal).modal("hide");
          });
        }
      })
    }
  }
}

</script>
