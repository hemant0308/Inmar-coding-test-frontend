<template>
  <div>
    <div class="card">
      <div class="card-body">
        <h2>Products</h2>
        <div class="text-right mb-2 ">
          <button class="btn btn-primary" @click="newProduct()">
            Add Product
          </button>
        </div>
        <table class="table table-bordered">
          <thead>
            <th>SKU</th>
            <th>Name</th>
            <th>Location</th>
            <th>Department</th>
            <th>Category</th>
            <th>Sub Category</th>
            <th>Actons</th>
          </thead>
          <tbody>
            <tr class="filter-row">
              <td>
              </td>
              <td></td>
              <td>
                <select class="form-control" v-model="filter.locationId">
                  <option :value="null">Location</option>
                  <option v-for="location in locations" :value="location.id">
                    {{location.name}}
                  </option>
                </select>
              </td>
              <td>
                <select class="form-control" v-model="filter.departmentId">
                  <option :value="null">Department</option>
                  <option v-for="department in departments" :value="department.id">
                    {{department.name}}
                  </option>
                </select>
              </td>
              <td>
                <select class="form-control" v-model="filter.categoryId">
                  <option :value="null">Category</option>
                  <option v-for="category in categories" :value="category.id">
                    {{category.name}}
                  </option>
                </select>
              </td>
              <td>
                <select class="form-control" v-model="filter.subCategoryId">
                  <option :value="null">Sub Category</option>
                  <option v-for="subCategory in subCategories" :value="subCategory.id">
                    {{subCategory.name}}
                  </option>
                </select>
              </td>
              <td></td>
            </tr>
            <tr v-for="(product,index) in products">
              <td>
                {{product.sku}}
              </td>
              <td>
                {{product.name}}
              </td>
              <td>
                {{product.locationName}}
              </td>
              <td>
                {{product.departmentName}}
              </td>
              <td>
                {{product.categoryName}}
              </td>
              <td>
                {{product.subCategoryName}}
              </td>
              <td style="min-width: 60px;padding: 5px 0px">
                <button class="btn btn-sm btn-danger" @click="deleteProduct(product,index)">
                  <i class="fa fa-trash-o"></i>
                </button>
                <button class="btn btn-info btn-sm" @click="editProduct(product)">
                  <i class="fa fa-pencil"></i>
                </button>
              </td>
            </tr>
            <tr>
              <td v-if="products.length == 0 && !isLoading" colspan="7" class="text-center">
                No products Found
              </td>
              <td colspan="7" class="text-center" v-if="isLoading">
                <img :src="require('../assets/loader.gif')" alt="">
              </td>
            </tr>
          </tbody>
        </table>
        <product-form :product="activeProduct" :show-modal="showModal" @form-hidden="showModal = false" @add-product="addProduct" ref="productForm"></product-form>
      </div>
    </div>
  </div>
</template>
<style type="text/css">
table>tbody>tr.filter-row>td {
  background-color: #b3d0ff;
}

</style>
<script type="text/javascript">
import productService from '../services/productService';
import locationService from '../services/locationService';
import departmentService from '../services/departmentService.js';
import categoryService from '../services/categoryService';
import subCategoryService from '../services/subCategoryService';

import ProductForm from './ProductForm';

export default {
  components: {
    ProductForm
  },
  data() {
    return {
      activeProduct: null,
      products: [],

      locations: [],
      departments: [],
      categories: [],
      subCategories: [],

      filter: {
        locationId: null,
        departmentId: null,
        categoryId: null,
        subCategoryId: null
      },

      showModal: false,
      isLoading: false
    }
  },
  watch: {
    filter: {
      handler() {
        this.getAllProducts();
      },
      deep: true
    }
  },
  mounted() {
    this.getAllProducts();
    this.getAllSubCategories();
    this.getAllLocations();
    this.getAllDepartments();
    this.getAllCategories();
  },
  methods: {
    getAllProducts() {
      let that = this;
      this.isLoading = true;
      productService.getAllProducts(this.filter).then(function(data) {
        var products = [];
        data.products.forEach(function(product) {
          products.push(that.parseProduct(product));
        });
        that.products = products;
        that.isLoading = false;
      });
    },
    parseProduct(product) {
      return {
        id: product.id,
        name: product.name,
        sku: product.sku,
        locationName: product.location.name,
        locationId: product.location.id,
        departmentName: product.department.name,
        departmentId: product.department.id,
        categoryName: product.category.name,
        categoryId: product.category.id,
        subCategoryName: product.subCategory.name,
        subCategoryId: product.subCategory.id
      }
    },
    getAllLocations() {
      let that = this;
      locationService.getAllLocations().then(function(data) {
        that.locations = data.locations;
      });
    },
    getAllDepartments() {
      let that = this;
      departmentService.getAllDepartments().then(function(data) {
        that.departments = data.departments;
      });
    },
    getAllCategories() {
      let that = this;
      categoryService.getAllCategories().then(function(data) {
        that.categories = data.categories
      });
    },
    getAllSubCategories() {
      let that = this;
      subCategoryService.getAllSubCategories().then(function(data) {
        that.subCategories = data.subCategories;
      });
    },
    newProduct() {
      this.activeProduct = {
        name: null,
        sku: null,
        locationId: null,
        locationName: null,
        departmentId: null,
        departmentName: null,
        categoryId: null,
        categoryName: null,
        subCategoryId: null,
        subCategoryName: null
      };
      this.showModal = true;
    },
    addProduct(product) {
      this.products.push(this.parseProduct(product))
    },
    deleteProduct(product, index) {
      let that = this;
      productService.deleteProduct(product.id).then(function() {
        that.products.splice(index, 1);
      })
    },
    editProduct(product) {
      this.activeProduct = product;
      this.showModal = true;
    },
    updateMetaData() {
      this.getAllProducts();
      this.getAllSubCategories();
      this.getAllLocations();
      this.getAllDepartments();
      this.getAllCategories();
      this.$refs.productForm.getMetaData();
    }
  }
}

</script>
