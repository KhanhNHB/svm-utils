import api from '../../../../api/API' 
import { 
  PRODUCT_UPDATE_ENDPOINT,
  PRODUCTS_ENDPOINT, 
  PRODUCT_BY_ID_ENDPOINT, 
  PRODUCT_FEATURES_BY_ID_ENDPOINT, 
  PRODUCT_IMAGES_BY_ID_ENDPOINT } from '../../../../api/endpoint';

export const SELECT_IMAGE_ID = 'SELECT_IMAGE_ID';
export const SELECT_PRODUCT = 'SELECT_PRODUCT';
export const SET_PRODUCT = 'SET_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';
export const SET_PRODUCT_IMAGES = 'SET_PRODUCT_IMAGES';
export const SET_PRODUCT_FEATURES = 'SET_PRODUCT_FEATURES';
export const SET_PRODUCT_ID = 'SET_PRODUCT_ID';

export function setProductId(id) {
  return {
    type: SET_PRODUCT_ID,
    payload: id,
  };
}

export function selectProductById(product) {
    return {
      type: SELECT_PRODUCT,
      payload: product,
    };
  }
  
export function productImageIndex(id) {
  return {
    type: SELECT_IMAGE_ID,
    payload: id,
  };
}

export function setProducts(products) {
  return {
    type: SET_PRODUCTS,
    payload: products,
  };
}
export function setProduct(product) {
  return {
    type: SET_PRODUCT,
    payload: product,
  };
}
export function setProductFeatures(features) {
  return {
    type: SET_PRODUCT_FEATURES,
    payload: features,
  };
}
export function setProductImages(images) {
  return {
    type: SET_PRODUCT_IMAGES,
    payload: images,
  };
}

export function loadProducts() {
  return dispatch => {
    const response = api.get(`${PRODUCTS_ENDPOINT}`);
     response.then(res => {
      if (res.ok) {
        const fetchData = res.json();
        fetchData.then(data => {
          dispatch(setProducts(data.content));
        })
      }
    })
      
    }
};
  


export function loadProduct(id) {
  return dispatch => {
    const request = api.get(`${PRODUCT_BY_ID_ENDPOINT}/${id}`);
    console.log(request);
    request.then(res => {
      if (res.ok) {
        const fetchData = res.json();
        fetchData.then(data => {
          console.log(data);         
          dispatch(setProduct(data));
          
        })
      }
    });
}
}
export function loadProductFeatures(id) {
  return dispatch => {
    const request = api.get(`${PRODUCT_FEATURES_BY_ID_ENDPOINT}/${id}`);
    request.then(response => {
      if (response) {
        dispatch(setProductFeatures(response));
      }
    });
  };
}
export function loadProductImages(id) {
  return dispatch => {
    const request = api.get(`${PRODUCT_IMAGES_BY_ID_ENDPOINT}/${id}`);
    request.then(response => {
      if (response) {
        dispatch(setProductImages(response));
      }
    });
  };
}

export function updateProduct(product) {
  return dispatch => {
    const request = api.post(PRODUCT_UPDATE_ENDPOINT, product);
    request.then(response => {
      if (response.ok) {
        const fetchData = response.json();
        fetchData.then(data => {
      
          dispatch(loadProducts());

          
        })
      }
    })
  }
}
