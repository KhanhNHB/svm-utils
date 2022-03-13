import api from '../../../../api/API' 
import { 
  PRODUCT_UPDATE_ENDPOINT,
  PRODUCTS_ENDPOINT, 
  PRODUCT_BY_ID_ENDPOINT, 
  PRODUCT_FEATURES_BY_ID_ENDPOINT,
  PRODUCT_FEATURE_BY_ID_ENDPOINT,
  PRODUCT_IMAGES_BY_ID_ENDPOINT,
  PRODUCT_FEATURE_UPDATE_ENDPOINT,
  PRODUCT_IMAGE_UPDATE_ENDPOINT,
  PRODUCT_IMAGE_BY_ID_ENDPOINT } from '../../../../api/endpoint';

export const SELECT_IMAGE_ID = 'SELECT_IMAGE_ID';
export const SELECT_PRODUCT = 'SELECT_PRODUCT';
export const SET_PRODUCT = 'SET_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';
export const SET_PRODUCT_ID = 'SET_PRODUCT_ID';

export const SET_FEATURES = 'SET_FEATURES';
export const SET_FEATURE = 'SET_FEATURE';
export const SET_FEATURE_ID = 'SET_FEATURE_ID';
export const SET_FEATURE_RIGHT = 'SET_FEATURE_RIGHT';
export const SET_FEATURE_CHECKED = 'SET_FEATURE_CHECKED';
export const SET_FEATURE_BUTTON = 'SET_FEATURE_BUTTON';


export const SET_IMAGES = 'SET_IMAGES';
export const SET_IMAGE = 'SET_IMAGE';
export const SET_IMAGE_ID = 'SET_IMAGE_ID';
export const SET_IMAGE_BUTTON = 'SET_IMAGE_BUTTON';





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
export function setFeatures(features) {
  return {
    type: SET_FEATURES,
    payload: features,
  };
}
export function setFeature(feature) {
  return {
    type: SET_FEATURE,
    payload: feature,
  };
}
export function setFeatureId(id) {
  return {
    type: SET_FEATURE_ID,
    payload: id,
  };
}
export function setFeatureRight(right) {
  return {
    type: SET_FEATURE_RIGHT,
    payload: right
  }
}
export function setFeatureChecked(checked) {
  return {
    type: SET_FEATURE_CHECKED,
    payload: checked
  }
}
export function setFeatureButtonStatus(status) {
  return {
    type: SET_FEATURE_BUTTON,
    payload: status
  }
}

export function setImages(images) {
  return {
    type: SET_IMAGES,
    payload: images,
  };
}
export function setImageId(id) {
  return {
    type: SET_IMAGE_ID,
    payload: id,
  };
}

export function setImage(image) {
  return {
    type: SET_IMAGE,
    payload: image,
  };
}
export function setImageButtonStatus(status) {
  return {
    type: SET_IMAGE_BUTTON,
    payload: status
  }
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
      request.then(res => {
        if (res.ok) {
          const fetchData = res.json();
          fetchData.then(data => {
            console.log(data);         
            dispatch(setFeatures(data));
          })
        }
      });
    });
    
  };
}
export function loadProductImages(id) {
  return dispatch => {
    const request = api.get(`${PRODUCT_IMAGES_BY_ID_ENDPOINT}/${id}`);
    request.then(response => {
      request.then(res => {
        if (res.ok) {
          const fetchData = res.json();
          fetchData.then(data => {
            console.log(data);         
            dispatch(setImages(data));
          })
        }
      });
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

export function loadFeature(featureId) {
  return dispatch => {
    const request = api.get(`${PRODUCT_FEATURE_BY_ID_ENDPOINT}/${featureId}`);
    request.then(response => {
      if (response.ok) {
        const fetchData = response.json();
        fetchData.then(data => {      
          dispatch(setFeature(data));        
        })
      }
    })
  }
}

export function updateFeature(feature) {
  return dispatch => {
    const request = api.post(PRODUCT_FEATURE_UPDATE_ENDPOINT, feature);
    request.then(response => {
      if (response.ok) {
        const fetchData = response.json();
        fetchData.then(data => {      
          alert('update success!')     
          console.log('update success!', data);
          const productId = feature.productId;
          dispatch(loadProductFeatures(productId));   
        })
      }
    })
  }
}

export function updateImage(image) {
  return dispatch => {
    const request = api.post(PRODUCT_IMAGE_UPDATE_ENDPOINT, image);
    request.then(response => {
      if (response.ok) {
        const fetchData = response.json();
        fetchData.then(data => {      
          alert('update success!')     
          console.log('update success!', data);
          const productId = image.productId;
          dispatch(loadProductImages(productId));   
        })
      }
    })
  }
}
export function loadImage(imageId) {
  return dispatch => {
    const request = api.get(`${PRODUCT_IMAGE_BY_ID_ENDPOINT}/${imageId}`);
    request.then(response => {
      if (response.ok) {
        const fetchData = response.json();
        fetchData.then(data => {      
          dispatch(setImage(data));        
        })
      }
    })
  }
}
