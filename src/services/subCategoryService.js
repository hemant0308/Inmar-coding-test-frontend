import api from './api';

import serviceUrl from '../serviceUrl';

export default {
  getAllSubCategories() {
    return api.get(serviceUrl.GET_ALL_SUB_CATEGORIES);
  },
  getSubCategories(locationId, departmentId, categoryId) {
    return api.get(serviceUrl.GET_SUB_CATEGORIES.replace("{locationId}", locationId)
      .replace("{departmentId}", departmentId)
      .replace("{categoryId}", categoryId))
  },
  saveSubCategory(payload) {
    return api.post(serviceUrl.SAVE_SUB_CATEGORY.replace("{locationId}", payload.locationId)
      .replace("{departmentId}", payload.departmentId)
      .replace("{categoryId}", payload.categoryId), payload)
  },
  deleteSubCategory(locationId,departmentId,categoryId,subCategoryId){
    return api.post(serviceUrl.DELETE_SUB_CATEGORY.replace("{locationId}",locationId)
      .replace("{departmentId}",departmentId)
      .replace("{categoryId}",categoryId)
      .replace("{subCategoryId}",subCategoryId));
  }
}
