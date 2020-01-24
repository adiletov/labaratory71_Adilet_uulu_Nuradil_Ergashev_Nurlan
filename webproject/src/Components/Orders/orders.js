import React, {Component} from 'react';
import {connect} from "react-redux";
import {getOrders, removeOrderDish} from "../Actions/dishesActions";
import './orders.css';
import {Spinner} from "reactstrap";

class Orders extends Component {
seeCards= () => {
    const arrDishes = [];
        if (this.props.orders){
            Object.keys(this.props.orders).forEach(keyOrd => arrDishes.push(<div className="orderBlock" key={keyOrd}>
                {this.props.dishes && this.props.orders ? Object.keys(this.props.orders[keyOrd]).map(k=> <div key={k}>
                    <p>{this.props.dishes[k].nameDish} : {this.props.orders[keyOrd][k]} шт = {this.props.dishes[k].price * this.props.orders[keyOrd][k]} сом</p>
                </div>): null}
                <p><b>Доставка</b> : {this.props.delivery} сом</p>
                <button onClick={()=>this.props.removeOrderDish(keyOrd)}>Remove</button>
            </div>));
        }else{
            arrDishes.push(<div key={'not'}>Нет заказов</div>)
        }


    return arrDishes
};
componentDidMount() {
        this.props.getOrders();
}


    render() {
        return (
            <div>
                {this.props.loading ? this.seeCards() : <div className="spinnerBlock">
                    <div className="spinner"><Spinner style={{ width: '6rem', height: '6rem', color: '#ccc' }} /></div>
                </div>}
            </div>
        );
    }
}
const mapStateToProps = state => ({
    orders: state.orders,
    dishes: state.dishes,
    delivery: state.delivery,
    loading: state.loading,

});
const mapDispatchToProps = dispatch => ({
    getOrders: ()=> dispatch(getOrders()),
    removeOrderDish: (key) => dispatch(removeOrderDish(key))
});
export default connect(mapStateToProps, mapDispatchToProps)(Orders);