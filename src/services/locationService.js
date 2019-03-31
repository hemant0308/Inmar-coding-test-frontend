import api from './api';

import serviceUrl from '../serviceUrl';


export default {
  getAllLocations() {
    return api.get(serviceUrl.GET_LOCATIONS);
  },
  getLocations() {
    return api.get(serviceUrl.GET_LOCATIONS);
  },
  saveLocation(payload) {
    return api.post(serviceUrl.SAVE_LOCATION, payload);
  },
  deleteLocation(locationId){
    return api.post(serviceUrl.DELETE_LOCATION.replace("{locationId}",locationId));
  }
}
