import {DISHES, ORDER_DISH_ERROR, ORDER_DISH_REQUEST, ORDERS_DISH_SUCCESS} from "../Actions/actiontype";

const initialState = {
    dishes: null,
    orders: null,
    loading: false,
    delivery: 150,
};

const reducer  = (state = initialState, action) => {
    switch (action.type) {
        case DISHES:
            return {...state, dishes: action.dishes};
        case ORDER_DISH_REQUEST:
            return {...state, loading: action.boolean};
        case ORDER_DISH_ERROR:
            return state;
        case ORDERS_DISH_SUCCESS:
            return {...state,  orders: action.ordersDishes}
        default:
            return state
    }
};

export default reducer;