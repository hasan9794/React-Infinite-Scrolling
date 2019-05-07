import React from 'react';
import logo from './logo.svg';
import './App.css';
import Forces from "./components/forces"
import Header from "./components/header"
import CrimeCategory from "./components/crimeCategory"
import Crime from "./components/Crime"

class App extends React.Component {
 
  constructor() {
    super()
    this.state = {
      isForcesTab : true 
    }
  }
  
  setTab(value){
    this.setState({
      isForcesTab: value // true or false value
    })
  }

  render() {
    const {isForcesTab} = this.state;
    return (
    <Crime />
      //   <div>
    //      <Header
    //         toggle={this.setTab.bind(this)}
    //      /> 
    //   <main className="main container" >
    //       { isForcesTab ? <Forces /> : <CrimeCategory />  }
          
    //   </main>
    // </div>
  );
}
}
export default App;
