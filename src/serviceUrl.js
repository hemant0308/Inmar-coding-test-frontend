export default {
  LOGIN_USER: '/login',
  REGISTER_USER:'/register',


  GET_LOCATIONS: "/location",
  SAVE_LOCATION: "/location",
  DELETE_LOCATION: "/location/{locationId}/delete",

  GET_DEPARTMENTS: "/location/{locationId}/department",
  SAVE_DEPARTMENT: "/location/{locationId}/department",
  GET_ALL_DEPARTMENTS: "/department",
  DELETE_DEPARTMENT: "/location/{locationId}/department/{departmentId}/delete",

  GET_CATEGORIES: "/location/{locationId}/department/{departmentId}/category",
  SAVE_CATEGORY: "/location/{locationId}/department/{departmentId}/category",
  GET_ALL_CATEGORIES: "/category",
  DELETE_CATEGORY: "/location/{locationId}/department/{departmentId}/category/{categoryId}/delete",


  GET_SUB_CATEGORIES: "/location/{locationId}/department/{departmentId}/category/{categoryId}/sub-category",
  SAVE_SUB_CATEGORY: "/location/{locationId}/department/{departmentId}/category/{categoryId}/sub-category",
  GET_ALL_SUB_CATEGORIES: "/sub-category",
  DELETE_SUB_CATEGORY: "/location/{locationId}/department/{departmentId}/category/{categoryId}/sub-category/{subCategoryId}/delete",

  GET_ALL_PRODUCTS: "/products",
  SAVE_PRODUCT: "/products",
  DELETE_PRODUCT:"/products/{productId}/delete",
  GET_META_DATA :"/meta-data"
}
