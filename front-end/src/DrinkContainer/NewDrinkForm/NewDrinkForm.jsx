import React, {Component } from 'react';

class NewDrinkForm extends Component{
    constructor(){
        super();
        this.state = {
            name: ""
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.createDrink(this.state);
    }
    render(){
        return <form onSubmit={this.handleSubmit}>
            Name: <input onChange = {this.handleChange} type="text" name="name" />
            <input type="submit"/>
        </form>
    }
}
export default NewDrinkForm