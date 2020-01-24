import React, {Component} from 'react';
import {editDish} from "../Actions/dishesActions";
import {connect} from "react-redux";

class Edit extends Component {
    state ={
        nameDish: '',
        price: '',
        img: ''
    };

    changeInput= e => {
      this.setState({[e.target.name] : e.target.value})
    };

    componentDidMount() {
        const id  = this.props.match.params.id;
        const dishes = this.props.dishes[id];
        if (this.props.dishes){
            this.setState({nameDish: dishes.nameDish, price: dishes.price, img: dishes.img})
        }else {
            this.props.history.replace('/dishes')
        }
   }

    putDish = async () => {
        const id  = this.props.match.params.id;
        const editDish = {
            nameDish: this.state.nameDish,
            price: this.state.price,
            img: this.state.img,
        };
        this.props.editDish(id, editDish);
        this.props.history.replace('/dishes')
    };


    render() {
        return (
            <div>
                    <input type="text" name="nameDish" value={this.state.nameDish} onChange={this.changeInput} />
                    <input type="text" name="img" value={this.state.img} onChange={this.changeInput}/>
                    <input type="text" name="price" value={this.state.price} onChange={this.changeInput}/>
                    <button onClick={()=>this.putDish()}>EDIT</button>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    dishes: state.dishes
});
const mapDispatchToProps = dispatch => ({
    editDish: (id, newDish) => dispatch(editDish(id, newDish)),
});


export default connect(mapStateToProps , mapDispatchToProps) (Edit);