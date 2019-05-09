import React, {Component} from 'react';

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
    render(){
        return <div>
            <h1>Welcome to the drinks app</h1>
            {JSON.stringify(this.state.drinks)}
        </div>
    }
}