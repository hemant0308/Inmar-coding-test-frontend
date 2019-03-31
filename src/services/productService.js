import api from './api';

import serviceUrl from '../serviceUrl';


export default {
  getAllProducts(filter) {
    return api.get(serviceUrl.GET_ALL_PRODUCTS,{filter:JSON.stringify(filter)});
  },
  saveProduct(payload) {
    return api.post(serviceUrl.SAVE_PRODUCT,payload);
  },
  deleteProduct(productId){
    return api.post(serviceUrl.DELETE_PRODUCT.replace("{productId}",productId));
  },

  getMetaData(){
    return api.get(serviceUrl.GET_META_DATA);
  }
}
