import * as Actions from './product.action';

const initialState = {
  products: [],
  product: {},
  features: [],
  feature: {},
  images: [],
  image: {},
  imageButtonStatus: 'add',
  featureCheckbox: [true, false, false],
  featureRadio: false,
  featureButtonStatus: 'add',
  currentProductId: 0,
  currentFeatureId: 0,
  currentImageId: 0,
  deleteType: '',
  deleteStatus: false

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
    case Actions.SET_FEATURES: {
      return {
        ...state,
        features: payload
      };
    }
    case Actions.SET_FEATURE: {
      return {
        ...state,
        feature: payload
      };
    }
    case Actions.SET_FEATURE_RIGHT: {
      return {
        ...state,
        featureRadio: payload
      };
    }
    case Actions.SET_FEATURE_CHECKED: {
      return {
        ...state,
        featureCheckbox: payload
      };
    }
    case Actions.SET_FEATURE_BUTTON: {
      return {
        ...state,
        featureButtonStatus: payload
      };
    }
    case Actions.SET_IMAGES: {
      return {
        ...state,
       images: payload
      };
    }
    case Actions.SET_IMAGE: {
      return {
        ...state,
       image: payload
      };
    }
    case Actions.SET_PRODUCT_ID: {
      return {
        ...state,
        currentProductId: payload
      };
    }
    case Actions.SET_FEATURE_ID: {
      return {
        ...state,
        currentFeatureId: payload
      };
    }
    case Actions.SET_IMAGE_ID: {
      return {
        ...state,
        currentImageId: payload
      };
    }
    case Actions.SET_IMAGE_BUTTON: {
      return {
        ...state,
        imageButtonStatus: payload
      };
    }
    case Actions.SET_DELETE_TYPE: {
      return {
        ...state,
        deleteType: payload
      }
    }
    case Actions.SET_DELETE_STATUS: {
      return {
        ...state,
        deleteStatus: payload
      }
    }
    default:
      return state;
  }
};





export default product;
