import api from './api';

import serviceUrl from '../serviceUrl';


export default {
  getAllCategories() {
    return api.get(serviceUrl.GET_ALL_CATEGORIES);
  },
  getCategories(locationId, departmentId) {
    return api.get(serviceUrl.GET_CATEGORIES
      .replace("{locationId}", locationId)
      .replace("{departmentId}", departmentId));
  },
  saveCategory(payload) {
    return api.post(serviceUrl.SAVE_CATEGORY
      .replace("{locationId}", payload.locationId)
      .replace("{departmentId}", payload.departmentId), payload);
  },
  deleteCategory(locationId, departmentId,categoryId) {
    return api.post(serviceUrl.DELETE_CATEGORY
      .replace("{locationId}", locationId)
      .replace("{departmentId}",departmentId)
      .replace("{categoryId}",categoryId));
  }
}
