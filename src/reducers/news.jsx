import * as types from '../constants/ActionTypes';

let initialState = {
    news: [],
}

const news = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_ALL_DISCOUNT_NEWS_BY_CATEGORY_ID:
            state.news = action.news;
            return { ...state };
        case types.GET_ALL_PRODUCT_NEWS_BY_CATEGORY_ID:
            state.news = action.news;
            return { ...state };
        case types.GET_ALL_EVENT_NEWS_BY_CATEGORY_ID:
            state.news = action.news;
            return { ...state };
        default: return { ...state };
    }
}
export default news;