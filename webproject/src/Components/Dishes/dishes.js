import React, {Component} from 'react';
import {connect} from "react-redux";
import {allDishes, postDish, removeDish} from "../Actions/dishesActions";
import './dishes.css';
import {NavLink, Route, Switch} from "react-router-dom";
import Edit from "../Edit/Edit";
import {Spinner} from "reactstrap";

class Dishes extends Component {
    state={
        nameDish: '',
        price: '',
        img: ''
    };
    getValue = (e) => {
        this.setState({[e.target.name] : e.target.value});
    };

    postDishes= (e)=>{
        e.preventDefault();
        const newDish = {
            nameDish: this.state.nameDish,
            price: this.state.price,
            img: this.state.img
        };
        this.props.postDish(newDish)
    };


    componentDidMount() {
        this.props.allDishes()
    }

    render() {
        return (
            <div>
                <div className="addDishBlock">
                    <input type="text"  name="nameDish" placeholder="Название блюда" onChange={this.getValue}/>
                    <input type="text" name="price" placeholder="Цена" onChange={this.getValue}/>
                    <input type="text" name="img" placeholder="Добавить изображение" onChange={this.getValue}/>
                    <button onClick={(event)=>this.postDishes(event)}>Отправить</button>
                </div>
                <div className="dishesBlock">{
                    this.props.loading ?
                        Object.keys(this.props.dishes).map(key => <div key={key} className="dishBlock">
                                <img className="imgDish" src={this.props.dishes[key].img} alt={this.props.dishes[key].nameDish}/>
                                <div className="infoDish">
                                    <h4>{this.props.dishes[key].nameDish}</h4>
                                    <p><b>Цена</b> : {this.props.dishes[key].price} сом</p>
                                    <button onClick={()=>this.props.removeDish(key)}>Delete</button>
                                    <NavLink to={`/dishes/${key}`}>Edit</NavLink>
                                </div>
                            </div>):<div className="spinnerBlock"><div className="spinner"><Spinner style={{ width: '6rem', height: '6rem', color: '#ccc' }} /></div> </div>
                }
                </div>
                <Switch>
                    <Route path="/dishes/:id" component={Edit}/>
                </Switch>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    dishes: state.dishes,
    loading: state.loading
});

const mapDispatchToProps = dispatch => ({
    allDishes: ()=> dispatch(allDishes()),
    removeDish: (id)=> dispatch(removeDish(id)),
    postDish: (dish) => dispatch(postDish(dish))
});

export default connect(mapStateToProps, mapDispatchToProps)(Dishes);