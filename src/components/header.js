import React from 'react';

export default class Header extends React.Component {
    constructor(){
        super()
        this.sendForces = this.sendForces.bind(this)
        this.sendCrimeCategory = this.sendCrimeCategory.bind(this)
    }
    
    sendForces(){
        const forces = true;
        this.props.toggle(forces)
    }
    
    sendCrimeCategory(){
        const forces = false;
        this.props.toggle(forces)
    }
    render(){
        return(
            <nav class="navbar navbar-dark bg-dark">
                <a className="navbar-brand text-light" href>3 Tab Assignment</a>
                <a className="navbar-brand text-light cursor" href>Dashboard</a> 
                <a onClick={this.sendForces} className="navbar-brand text-light cursor" href>Forces</a> 
                <a onClick={this.sendCrimeCategory} className="navbar-brand text-light cursor" href>Crime Catogary</a> 
            </nav>
        )
    }
}