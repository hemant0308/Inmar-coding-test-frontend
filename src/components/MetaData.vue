<template>
  <div class="container">
    <div class="card">
      <div class="card-body">
        <ul class="">
          <li class="">
            <button class="btn btn-sm btn-default" @click="getLocations()">
              <span v-if="!showChildren" class="fa fa-chevron-right"></span>
              <span v-if="showChildren" class="fa fa-chevron-down"></span>
            </button>
            Locations
            <template v-if="showChildren">
              <button class="btn btn-primary btn-sm" @click="addLocation()"><i class="fa fa-plus-square"></i></button>
            </template>
            <ul v-if="showChildren">
              <li class="" v-for="location in locations">
                <button class="btn btn-sm btn-default" @click="getDepartments(location)">
                  <span v-if="!location.showChildren" class="fa fa-chevron-right"></span>
                  <span v-if="location.showChildren" class="fa fa-chevron-down"></span>
                </button>
                <span v-if="location.isEditing">
                  <input type="text" v-model="location.name" @keyup.enter="saveLocation(location)" @keyup.escape="cancelEditing(locations,location)">
                  <button class="btn btn-sm btn-primary" @click="saveLocation(location)">Save</button>
                  <button class="btn btn-sm btn-primary" @click="cancelEditing(locations,location)">Cancel</button>
                </span>
                <span v-else>
                  <i class="fa fa-location-arrow"></i> {{location.name}}
                  <button class="btn btn-info btn-sm" @click="location.isEditing=true">
                    <i class="fa fa-pencil"></i>
                  </button>
                  <button class="btn btn-danger btn-sm" @click="deleteLocation(location,locations)">
                    <i class="fa fa-trash-o"></i>
                  </button>
                  <button v-if="location.showChildren" class="btn btn-primary btn-sm" @click="addDepartment(location)"><i class="fa fa-plus-square"></i></button>
                </span>
                <ul v-if="location.showChildren" class="">
                  <li class="" v-for="department in location.departments">
                    <button class="btn btn-sm btn-default" @click="getCategories(department)">
                      <span v-if="!department.showChildren" class="fa fa-chevron-right"></span>
                      <span v-if="department.showChildren" class="fa fa-chevron-down"></span>
                    </button>
                    <span v-if="department.isEditing">
                      <input type="text" v-model="department.name" @keyup.enter="saveDepartment(department)" @keyup.escape="cancelEditing(location.departments,department)">
                      <button class="btn btn-sm btn-primary" @click="saveDepartment(department)">Save</button>
                      <button class="btn btn-sm btn-primary" @click="cancelEditing(location.departments,department)">Cancel</button>
                    </span>
                    <span v-else>
                      {{department.name}}
                      <button class="btn btn-info btn-sm" @click="department.isEditing=true">Edit</button>
                      <button class="btn btn-danger btn-sm" @click="deleteDepartment(department,location.departments)"> <i class="fa fa-trash-o"></i>
                      </button>
                      <button v-if="department.showChildren" class="btn btn-primary btn-sm" @click="addCategory(department)"><i class="fa fa-plus-square"></i></button>
                    </span>
                    <ul class="" v-if="department.showChildren">
                      <li class="" v-for="category in department.categories">
                        <button class="btn btn-sm btn-default" @click="getSubCategories(category)">
                          <span v-if="!category.showChildren" class="fa fa-chevron-right"></span>
                          <span v-if="category.showChildren" class="fa fa-chevron-down"></span>
                        </button>
                        <span v-if="category.isEditing">
                          <input type="text" v-model="category.name" @keyup.enter="saveCategory(category)" @keyup.escape="cancelEditing(department.categories,category)">
                          <button class="btn btn-sm btn-primary" @click="saveCategory(category)">Save</button>
                          <button class="btn btn-sm btn-primary" @click="cancelEditing(department.categories,category)">Cancel</button>
                        </span>
                        <span v-else>
                          {{category.name}}
                          <button class="btn btn-info btn-sm" @click="category.isEditing=true">Edit</button>
                          <button class="btn btn-danger btn-sm" @click="deleteCategory(category,department.categories)"> <i class="fa fa-trash-o"></i>
                          </button>
                          <button v-if="category.showChildren" class="btn btn-primary btn-sm" @click="addSubCategory(category)"><i class="fa fa-plus-square"></i></button>
                        </span>
                        <ul class="" v-if="category.showChildren">
                          <li class="" v-for="subCategory in category.subCategories">
                            <span v-if="subCategory.isEditing">
                              <input type="text" v-model="subCategory.name" @keyup.enter="saveSubCategory(subCategory)" @keyup.escape="cancelEditing(category.subCategories,subCategory)">
                              <button class="btn btn-sm btn-primary" @click="saveSubCategory(subCategory)">Save</button>
                              <button class="btn btn-sm btn-primary" @click="cancelEditing(category.subCategories,subCategory)">Cancel</button>
                            </span>
                            <span v-else>
                              {{subCategory.name}}
                              <button class="btn btn-info btn-sm" @click="subCategory.isEditing=true">Edit</button>
                              <button class="btn btn-danger btn-sm" @click="deleteSubCategory(subCategory,category.subCategories)"> <i class="fa fa-trash-o"></i>
                              </button>
                            </span>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<style type="text/css">
li {
  margin: 10px 5px
}

li>ul {
  padding-left: 10px;
}

ul,
li {
  list-style: none;
}

input {
  margin-right: 10px;
}

.btn-sm {
  padding: 3px 5px;
  margin: 0px 5px;
  font-size: 12px;
}

</style>
<script type="text/javascript">
import productService from '../services/productService';
import locationService from '../services/locationService';
import departmentService from '../services/departmentService.js';
import categoryService from '../services/categoryService';
import subCategoryService from '../services/subCategoryService';

export default {
  data() {
    return {
      showChildren: false,

      locations: null,
    }
  },
  mounted() {
    this.getLocations();
  },
  methods: {
    cancelEditing(array, el) {
      if (el.id) {
        el.isEditing = false;
      } else {
        this.remove(array, el);
      }
    },
    remove(array, el) {
      var index = array.indexOf(el);
      if (index !== -1) {
        array.splice(index, 1);
      }
    },
    getLocations() {
      let that = this;
      this.showChildren = !this.showChildren;
      if (this.locations == null) {
        locationService.getLocations().then(function(data) {
          data.locations.forEach((location) => {
            location.showChildren = false;
            location.isEditing = false;
          });
          that.locations = data.locations;
        });
      }
    },
    addLocation() {
      this.showChildren = true;
      this.locations.push({
        name: null,
        showChildren: false,
        isEditing: true
      })
    },
    saveLocation(location) {
      let that = this;
      locationService.saveLocation(location).then(function(data) {
        location.id = data.location.id;
        location.isEditing = false;
        that.$emit("meta-data-updated");
      });
    },
    deleteLocation(location, locations) {
      if (location.departments && location.departments.length > 0) {
        window.alert("Please delete child elements");
        return;
      }
      let that = this;
      locationService.deleteLocation(location.id).then(function() {
        that.remove(locations, location);
      });
    },
    getDepartments(location) {
      location.showChildren = !location.showChildren;
      if (!location.departments) {
        let that = this;
        departmentService.getDepartments(location.id).then(function(data) {
          data.departments.forEach((department) => {
            department.showChildren = false;
            department.isEditing = false;
            department.locationId = location.id;
          })
          that.$set(location, "departments", data.departments);
        });
      }
    },
    addDepartment(location) {
      location.showChildren = true;
      location.departments = location.departments || [];
      location.departments.push({
        locationId: location.id,
        name: null,
        departmentId: null,
        showChildren: false,
        isEditing: true
      });
      console.log(location);
    },
    saveDepartment(department) {
      let that = this;

      departmentService.saveDepartment(department).then(function(data) {
        department.id = data.department.id;
        department.isEditing = false;
        that.$emit("meta-data-updated");
      });
    },
    deleteDepartment(department, departments) {
      if (department.categories && department.categories.length > 0) {
        window.alert("Plase delete child elements");
        return;
      }
      let that = this;
      departmentService.deleteDepartment(department.locationId, department.id).then(function(data) {
        that.remove(departments, department);
      });
    },
    getCategories(department) {
      department.showChildren = !department.showChildren;
      if (!department.categories) {
        let that = this;
        categoryService.getCategories(department.locationId, department.id).then(function(data) {
          data.categories.forEach((category) => {
            category.showChildren = false;
            category.isEditing = false;
            category.locationId = department.locationId;
            category.departmentId = department.id;
          })
          that.$set(department, "categories", data.categories);
        });
      }
    },
    addCategory(department) {
      department.categories = department.categories || [];
      department.categories.push({
        name: null,
        departmentId: department.id,
        locationId: department.locationId,
        name: null,
        showChildren: false,
        isEditing: true
      });
      console.log(department);
    },
    saveCategory(category) {
      let that = this;

      categoryService.saveCategory(category).then(function(data) {
        category.id = data.category.id;
        category.isEditing = false;
        that.$emit("meta-data-updated");
      })
    },
    deleteCategory(category, categories) {
      let that = this;
      categoryService.deleteCategory(category.locationId, category.departmentId, category.id).then(function() {
        that.remove(categories, category);
      })
    },
    getSubCategories(category) {
      category.showChildren = !category.showChildren;
      if (!category.subCategories) {
        let that = this;
        subCategoryService.getSubCategories(category.locationId, category.departmentId, category.id).then(function(data) {
          data.subCategories.forEach((subCategory) => {
            subCategory.showChildren = false;
            subCategory.isEditing = false;
            subCategory.categoryId = category.id;
            subCategory.departmentId = category.departmentId;
            subCategory.locationId = category.locationId;
          })
          that.$set(category, "subCategories", data.subCategories);
        });
      }
    },
    addSubCategory(category) {
      category.showChildren = true;
      category.subCategories = category.subCategories || [];
      category.subCategories.push({
        name: null,
        categoryId: category.id,
        departmentId: category.departmentId,
        locationId: category.locationId,
        subCategory: null,
        showChildren: false,
        isEditing: true
      })
    },
    saveSubCategory(subCategory) {
      let that = this;
      subCategoryService.saveSubCategory(subCategory).then(function(data) {
        subCategory.id = data.subCategory.id;
        subCategory.isEditing = false;
        that.$emit("meta-data-updated");
      })
    },
    deleteSubCategory(subCategory, subCategories) {
      let that = this;
      subCategoryService.deleteSubCategory(subCategory.locationId, subCategory.departmentId, subCategory.categoryId, subCategory.id).then(function() {
        that.remove(subCategories, subCategory);
      });
    }
  }
}

</script>
