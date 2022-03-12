import * as Actions from './product.action';

const initialState = {
  products: [],
  product: {},
  productFeatures: [],
  productImages: [],
  currentProductId: 0

};
const product = (state = initialState, {type, payload}) => {
  switch (type) {
  
    case Actions.SET_PRODUCT: {
      return {
        ...state,
        product: payload
      };
    }
    case Actions.SET_PRODUCTS: {
      return {
        ...state,
        products: payload,
     
      };
    }
    case Actions.SET_PRODUCT_FEATURES: {
      return {
        ...state,
       productFeatures: payload
      };
    }
    case Actions.SET_PRODUCT_IMAGES: {
      return {
        ...state,
       productImages: payload
      };
    }
    case Actions.SET_PRODUCT_ID: {
      return {
        ...state,
        currentProductId: payload
      };
    }
    default:
      return state;
  }
};


const getNameById = (list, id) => {
  const result = list.filter(item => item.id === id)
  return result ? result[0].name : 'NextG 01';
}

const getProductById = (list, id) => {
  const result = list.filter(item => item.id === id)  
  return result ? result[0] : {};
}

const getCurrentId = (list) => {
  const result = list.filter(item => item.active === true)  
  return result ? result[0].id : 0;
}


export default product;
