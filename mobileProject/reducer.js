import {ADD_DISH, DISHES, DISHES_ORDER_INIT, DISHES_ORDER_REQUEST} from "./actiontype";

const initialPrice = 0;
const initialState = {
    dishes: '',
    orders: {},
    totalPrice: initialPrice,
    delivery: 150,
    loading: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case DISHES:
            return {...state, dishes: action.dishes};
        case ADD_DISH:
            if (state.orders[action.dish] !== undefined ) {
                return {
                    ...state,
                    orders: {
                        ...state.orders,
                        [action.dish]: state.orders[action.dish] + 1
                    },
                     totalPrice: state.totalPrice + parseInt(state.dishes[action.dish].price),
                }
            } else {
                return {...state, orders: {...state.orders, [action.dish] : 1}}
            }
        case DISHES_ORDER_REQUEST:
                return {...state, loading: action.boolean};
        case DISHES_ORDER_INIT:
            return {...state, orders: '', totalPrice: initialPrice};
        default:
            return state
    }
};

export default reducer;