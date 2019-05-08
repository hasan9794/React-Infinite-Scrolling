import React from "react"
import {getCrimeCategory, getForce, getCrime} from '../api/api'
import InputPage from "./input"
import NavbarPage from "./navbar"
import {MDBContainer, MDBRow, MDBCol} from "mdbreact"
import {MDBInput} from "mdbreact"; 

export default class Crime extends React.Component {
    constructor() {
        super()
        this.state = {
            loading: false,
            crimeCategory: [
                "Pakistan", "India"
            ],
            force: [],
            crime: [],
            crimeCategorySelect: '',
            forceSelect: '',
            limit: 7
        }
    }

    componentDidMount() {
        this.fetchData()
    }



    async fetchData() {
        this.setState({loading: true, crimeCategory: await getCrimeCategory(), force: await getForce()})
    }

    onScroll(e){
        if(e.target.scrollHeight === Math.ceil(e.target.clientHeight + e.target.scrollTop)) {
            this.loadMore();
        }
    }

    loadMore(){
        this.setState({
            limit: this.state.limit + 7 
        })
    }

    getSelectBoxValues(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    
    requestCrimeData(){
        this.fetchCrimeData();   
    }
    
    async fetchCrimeData() {
        const {crimeCategorySelect, forceSelect} = this.state
        if (crimeCategorySelect !== "" && forceSelect !== "") {
            this.setState({crime: await getCrime(crimeCategorySelect, forceSelect)})
        } else{
            alert("please select both options")
        }
    }

    render() {
        const {crimeCategory, force, crime, limit} = this.state;
        const temp = [...crime]
        temp.length = limit;

        return (
            <div>
                <NavbarPage/>
                <MDBContainer style={{
                    marginTop: 20
                }}>
                    <div>
                        {<select name = "crimeCategorySelect" onChange = {this.getSelectBoxValues.bind(this)}
                        className = "browser-default custom-select mb-3" > <option>Choose your option</option>
                        {
                            crimeCategory.map((item, index) => {
                                return <option value={item.url}>{item.name}</option>
                            })
                        } </select>}
                        {<select name = "forceSelect" onChange = {this.getSelectBoxValues.bind(this)}className = "browser-default custom-select mb-5" > 
                        <option>Choose your option</option>
                        {
                            force.map((item, index) => {
                                return <option value={item.id}>{item.name}</option>
                            })
                        } </select>}
                        <button onClick={this.requestCrimeData.bind(this)} type="button" class="btn btn-primary">Search</button>
                    </div>
                    <div onScroll={this.onScroll.bind(this)} className="mt-4" style={{height: 300, overflow: 'scroll'}}>
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>CATEGORY</th>
                                    <th>OUTCOME</th>
                                    <th>MONTH</th>
                                </tr>   
                            </thead>
                            <tbody>
                                    {crime &&
                                        temp.map((item) => {
                                           return  (
                                          <tr>     
                                            <td>{item.category}</td>
                                            <td>{item.outcome_status.category}</td>
                                            <td>{item.month}</td>
                                          </tr>
                                           )
                                        })
                                    }
                            </tbody>
                        </table>
                    </div>
                </MDBContainer>
            </div>
        )
    }
}