import React, {Component} from 'react';
import DrinkDetail from './DrinkDetail/DrinkDetail';
import {Switch, Route, Link} from 'react-router-dom';
import NewDrinkForm from './NewDrinkForm/NewDrinkForm';

export default class DrinkContainer extends Component{
    constructor(){
        super();
        this.state = {
            drinks: []
        }
    }
    componentDidMount(){
        this.getDrinks();
    }
    getDrinks = async () => {
        const drinks = await fetch("http://localhost:9000/drinks", {
            credentials: 'include'
        })
        const parsedDrinks = await drinks.json();
        console.log(parsedDrinks)
        if(parsedDrinks.status === 200){
            this.setState({
                drinks: parsedDrinks.data
            })
        }
    }
    createDrink = async (formData) => {
        console.log(formData);
        const newDrink = await fetch("http://localhost:9000/drinks", {
            credentials: 'include',
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": 'application/json'
            }
        })
        const parsedResponse = await newDrink.json();
        console.log(parsedResponse);
        if(parsedResponse.status === 200){
            this.setState({
                drinks: [...this.state.drinks, parsedResponse.data]
            }, ()=>{
                this.props.history.push("/drinks")
            })
        }
    }
    render(){
        const drinksList = this.state.drinks.map((drink)=>{
            return <DrinkDetail drink={drink}></DrinkDetail>
        })
        return <div>
            <h1>Welcome to the drinks app</h1>
            <Link to="/drinks/new">Add a drink</Link>
            <Link to="/drinks">Drinks index</Link>
            <Switch>
                <Route exact path="/drinks" render={()=>{
                    return <div>{drinksList}</div>
                }}/>
                <Route exact path="/drinks/new" render={()=>{
                    return <NewDrinkForm createDrink={this.createDrink}></NewDrinkForm>
                }}/>
            </Switch>
        </div>
    }
}