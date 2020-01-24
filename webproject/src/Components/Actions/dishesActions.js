import {DISHES, ORDER_DISH_ERROR, ORDER_DISH_REQUEST, ORDERS_DISH_SUCCESS} from "./actiontype";
import axiosApi from "../../axiosApi";



export const dishesSuccess = (dishes) => ({type: DISHES, dishes});
export const dishesRequest =(boolean) => ({type: ORDER_DISH_REQUEST, boolean});
export const dishesError = (error) => ({type: ORDER_DISH_ERROR, error});
export const orderDishes = (ordersDishes) => ({type: ORDERS_DISH_SUCCESS, ordersDishes});




export const allDishes = () => {
    return async (dispatch) => {
        try {
            dispatch(dishesRequest(false));
            const res  = await axiosApi.get('/dishes.json');
            dispatch(dishesSuccess(res.data));
            dispatch(dishesRequest(true))
        }catch (e) {
            dispatch(dishesError(e))
        }
    }
};

export const removeDish = (id) => {
    return async (dispatch) => {
        try{
            dispatch(dishesRequest(false));
            await axiosApi.delete('/dishes/' + id + '.json');
            dispatch(dishesRequest(true));
            dispatch(allDishes());
        }catch (e) {
            dispatch(dishesError(e))
        }

    }
};

export const postDish = (dish) => {
    return async (dispatch) => {
        try{
            dispatch(dishesRequest(false));
            await axiosApi.post('/dishes.json', dish);
            dispatch(dishesRequest(true));
            dispatch(allDishes());
        }catch (e) {
            dispatch(dishesError(e))
        }
    }
};



export const editDish = (id, newDish) => {
    return async (dispatch) => {
        try{
            dispatch(dishesRequest(false));
            await axiosApi.put('/dishes/' + id + '.json', newDish);
            dispatch(dishesRequest(true));
            dispatch(allDishes());
        }catch (e) {
            dispatch(dishesError(e))
        }
    }
};

export const getOrders = () => {
    return async (dispatch) => {
        try{
            dispatch(dishesRequest(false));
            const res = await axiosApi.get('/orders.json');
            dispatch(orderDishes(res.data));
            dispatch(dishesRequest(true));
            dispatch(allDishes())
        }catch (e) {
            dispatch(dishesError(e))
        }
    }
};

export const removeOrderDish = (key) => {
    return async (dispatch) => {
        try{
            dispatch(dishesRequest(false));
            await axiosApi.delete('/orders/' + key + '.json');
            dispatch(dishesRequest(true));
            dispatch(getOrders())
        }catch (e) {
            dispatch(dishesError(e))

        }
    }
};