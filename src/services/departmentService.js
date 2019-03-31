import api from './api';

import serviceUrl from '../serviceUrl';

export default {
  getAllDepartments() {
    return api.get(serviceUrl.GET_ALL_DEPARTMENTS);
  },
  getDepartments(locationId) {
    return api.get(serviceUrl.GET_DEPARTMENTS.replace("{locationId}", locationId))
  },
  saveDepartment(payload) {
    return api.post(serviceUrl.SAVE_DEPARTMENT
      .replace("{locationId}", payload.locationId), payload);
  },
  deleteDepartment(locationId, departmentId) {
    return api.post(serviceUrl.DELETE_DEPARTMENT
      .replace("{departmentId}", departmentId)
      .replace("{locationId}", locationId))
  }
}
