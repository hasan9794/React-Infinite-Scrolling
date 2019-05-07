import React from "react"

export default class CrimeCategory extends React.Component {
    constructor(){
        super()
        this.state={
            list: [],
            searchResult: [],     
        }
        this.handleSearch = this.handleSearch.bind(this)
    }
    handleSearch(e){
        const text = e.target.value;
        const { list } = this.state        
        const result = list.filter((listItem) => {
            return listItem.name.toLowerCase().substring(0,text.length) === text
        })
        console.log(result)
        this.setState({
            searchResult: result 
        })
    }
    
    componentDidMount(){
        fetch("https://data.police.uk/api/crime-categories")
            .then(response => response.json())
            .then(response => {
                this.setState({ list: response })
            })
    }

    render(){
      const { list, searchResult} = this.state;
      const arr = searchResult.length ? searchResult : list 
      console.log(list)
      return(
            <div>
                <h5>Search Here</h5>
                <input style={{width: "30%", margin: 20}} className="form-control" type="text" onChange={this.handleSearch}></input>
                <ol className="list-group">  
                    {
                        arr.map((item, index) => {
                            return <li className="list-group-item">{index + 1}   {item.name}</li>
                        })
                    }
                </ol>
            </div>
        )
    }
}