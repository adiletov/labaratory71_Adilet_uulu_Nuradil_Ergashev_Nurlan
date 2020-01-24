import React, {Component} from 'react';
import { StyleSheet, Text, View,Image, TouchableOpacity,ScrollView,Modal,Button,ActivityIndicator} from 'react-native';
import {connect} from "react-redux";
import {addOrderDish, addOrders, getDishes} from "./actionOrders";


class Project extends Component {
    state={
        disabled: false,
    };

    clickChackout = (boolean) => {
        this.setState({disabled: boolean})
    };
    componentDidMount() {
        this.props.getDishes();
    }
    render() {
        return (
                <View style={styles.container}>
                    {this.props.loading ?
                        <ScrollView>
                            {Object.keys(this.props.dishes).map(key =>
                                <View key={key}>
                                    <TouchableOpacity
                                        onPress={()=> this.props.addOrderDish(key)}
                                        style={styles.list}
                                    >
                                        <Image
                                            style={{width: 50, height: 50}}
                                            source={{url: this.props.dishes[key].img}}
                                        />
                                        <Text>{this.props.dishes[key].nameDish}</Text>
                                        <Text>{this.props.dishes[key].price} сом</Text>
                                    </TouchableOpacity>

                                </View>
                            )}
                            {this.props.orders ? Object.keys(this.props.orders).map(key =>
                                <View key={key}>
                                    <Modal
                                        key={key}
                                        animationType="slide"
                                        transparent={false}
                                        visible={this.state.disabled}
                                        onRequestClose={() => {
                                            Alert.alert('Modal has been closed.');
                                        }}>
                                        <View style={{marginTop: 22}}>
                                            {this.props.orders ? Object.keys(this.props.orders).map(k=> <Text key={k}>{this.props.dishes[k].nameDish} : {this.props.orders[k]}</Text> ): null}
                                        </View>
                                        <Button
                                            title="Отправить заказ"
                                            onPress={() => this.props.addOrders(this.props.orders)}
                                        />
                                        <Button
                                            title="Назад"
                                            onPress={() => this.clickChackout(false)}
                                        />
                                    </Modal>
                                    <Text>{key} : {this.props.orders[key]}</Text>
                                </View>
                            ) : null}
                            <View>
                                <Button
                                    title="Checkout"
                                    onPress={() => this.clickChackout(true)}
                                />
                                <Text>К оплате : {this.props.totalPrice}</Text>
                            </View>
                        </ScrollView>
                    :<View style={[styles.container, styles.horizontal]}>
                            <ActivityIndicator size="large" color="#0000ff" />
                        </View>}

                </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ccc',
        padding: 30,
    },
    list:{
        margin: 3,
        padding: 10,
        width:'100%',
        backgroundColor: '#ffffff'
    }
});


const mapStateToProps =(state) => ({
    dishes : state.dishes,
    orders: state.orders,
    price: state.price,
    totalPrice: state.totalPrice,
    loading: state.loading,
});

const mapDispatchToProps = dispatch => ({
    getDishes: () => dispatch(getDishes()),
    addOrderDish : (dish, dishes) => dispatch(addOrderDish(dish, dishes)),
    addOrders: (orderDishes) => dispatch(addOrders(orderDishes))
});
export default connect(mapStateToProps, mapDispatchToProps) (Project);