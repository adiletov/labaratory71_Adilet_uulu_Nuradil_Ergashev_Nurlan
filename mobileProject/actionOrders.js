import axiosApi from "./axiosApi";
import {ADD_DISH, DISHES, DISHES_ORDER_ERROR, DISHES_ORDER_INIT, DISHES_ORDER_REQUEST} from "./actiontype";

export const addDishes = dishes =>  ({type: DISHES, dishes});
export const addOrderDish = (dish) =>  ({type:ADD_DISH , dish});
export const dishesRequest = (boolean) => ({type: DISHES_ORDER_REQUEST, boolean});
export const dishesError = (error) => ({type: DISHES_ORDER_ERROR, error});

export const initDishes = () => ({type: DISHES_ORDER_INIT});

export const getDishes = () => {
    return async(dispatch) => {
        try {
            dispatch(dishesRequest(false));
            const res = await axiosApi.get('/dishes.json');
            dispatch(addDishes(res.data));
            dispatch(dishesRequest(true));
        }catch (e) {
            dispatch(dishesError(e))
        }
    }
};

export const addOrders = (orderDishes) => {
    return async (dispatch) => {
        try{
            dispatch(dishesRequest(false));
            await axiosApi.post(`/orders.json`, orderDishes);
            dispatch(initDishes());
            dispatch(dishesRequest(true));
        }catch (e) {
            dispatch(dishesError(e))
        }
    }
};