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
            forceSelect: ''
        }
    }

    componentDidMount() {
        this.fetchData()
    }

    async fetchData() {
        this.setState({loading: true, crimeCategory: await getCrimeCategory(), force: await getForce()})
    }

    getSelectBoxValues(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
        this.fetchCrimeData()
    }
    
    async fetchCrimeData() {
        const {crimeCategorySelect, forceSelect} = this.state
        console.log("crime select ====>>",crimeCategorySelect)
        console.log("force select ====>>",forceSelect)
        // console.log(crimeCategorySelect, forceSelect)
        if (crimeCategorySelect !== "" && forceSelect !== "") {
            this.setState({crime: await getCrime(crimeCategorySelect, forceSelect)})
        }
    }

    render() {
        const {crimeCategory, force, crime} = this.state;
        console.log("Crime =>>>>>" ,crime)

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
                        <button type="button" class="btn btn-primary">Search</button>
                    </div>
                </MDBContainer>
            </div>
        )
    }
}