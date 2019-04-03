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
    product: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      locations: [],
    }
  },
  computed: {
    departments() {
      if (this.product) {
        var location = _.find(this.locations, { id: this.product.locationId });
        return (location) ? location.departments : [];
      }
    },
    categories() {
      if (this.product) {
        var department = _.find(this.departments, { id: this.product.departmentId })
        return (department) ? (department.categories) : [];
      }
    },
    subCategories() {
      if (this.product) {
        var category = _.find(this.categories, { id: this.product.categoryId });
        return (category) ? (category.subCategories) : []
      }
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
  },
  mounted() {
    this.getMetaData();
    let that = this;
    $(this.$refs.modal).on("hidden.bs.modal", function() {
      that.$emit("form-hidden");
    });
  },
  methods: {
    getMetaData() {
      let that = this;
      productService.getMetaData().then(function(data) {
        that.locations = data.locations;
      })
    },
    saveProduct() {
      let that = this;
      this.$validator.validateAll().then((result) => {
        if (result) {
          productService.saveProduct(this.product).then(function(data) {
            if (!data.message) {
              if (that.product.id) {
                that.product.id = data.product.id;
                that.product.locationName = data.product.location.name;
                that.product.departmentName = data.product.department.name;
                that.product.categoryName = data.product.category.name;
                that.product.subCategoryName = data.product.subCategory.name;
              } else {
                that.$emit("add-product", data.product);
              }
              $(that.$refs.modal).modal("hide");

            } else {
              window.alert(data.message);
            }
          });
        }
      })
    }
  }
}

</script>
