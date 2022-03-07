import * as types from '../constants/ActionTypes';

let initialState = {
    invoices: [],
    keyword: '',
    invoiceList: [],
}

const product = (state = initialState, action) => {
    switch (action.type) {
        case types.LOAD_PRODUCTS:
            state.products = action.products;
            return { ...state };
        case types.CHANGE_KEYWORD:
            state.keyword = action.keyword;
            return { ...state };
        case types.LOAD_PRODUCT_LIST:
            state.productList = action.productList;
            return { ...state };
        case types.LOAD_PRODUCTS_AVAILABLE:
            state.productList = action.productList;
            return { ...state };
        default: return { ...state };
    }
}
export default product;