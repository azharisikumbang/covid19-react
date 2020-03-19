import React, { Component } from 'react';
import axios from 'axios';

import IdDateTime from './id-datetime';

class ID extends Component {
  constructor(props){
      super(props)

      this.changeCountry = this.changeCountry.bind(this)
      this.getDataByCountry = this.getDataByCountry.bind(this)
      this.checkCountry = this.checkCountry.bind(this)

      this.state = {
        defaultCountry: "ID",
        countries: [],
        confirmed: 0,
        recovered: 0,
        deaths: 0
      }
  }

  async componentDidMount(){
    await this.getCountryCode();
    this.getDataByCountry(this.state.defaultCountry);
  }

  numberWithCommas(num){
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  getDataByCountry(country){
    axios.get(`https://covid19.mathdro.id/api/countries/${country}/confirmed`)
      .then(res => {
        if (res.data.length == 0) {
          this.setState({confirmed: 0})
          this.setState({recovered: 0})
          this.setState({deaths: 0})
        }
        else {
          let confirmed = 0;
          let recovered = 0;
          let deaths = 0;
          res.data.map(data => {
            confirmed += data.confirmed;
            recovered += data.recovered;
            deaths += data.deaths;
            this.setState({confirmed: confirmed})
            this.setState({recovered: recovered})
            this.setState({deaths: deaths})
          })
        }
      })
  }

  getCountryCode(){
    axios.get("https://covid19.mathdro.id/api/countries")
      .then(res => {
        this.setState({countries: res.data.countries})
      })

  }

  changeCountry(event){
    this.getDataByCountry(event.target.value)
  }

  checkCountry(country){
    return ((country == this.state.defaultCountry) ? "selected" : "")
  }

  render() {
    return (
      <div className="bg-gray-200 p-5 rounded overflow-hidden shadow-lg text-left">
        <h3>Status
        <select name="countrySelectInput" onChange={this.changeCountry}>
        {
          Object.entries(this.state.countries).map((val) => {
            return (<option value={val[1]} selected={this.checkCountry(val[1])}>{val[0]}</option>)
          })
        }
        </select>
        </h3>
        <div className="text-3xl text-yellow-600">
         {this.numberWithCommas(this.state.confirmed)}
        </div>
        <div className="text-3xl text-green-600">
         {this.numberWithCommas(this.state.recovered)}
        </div>
        <div className="text-3xl text-red-600">
         {this.numberWithCommas(this.state.deaths)}
        </div>
        <IdDateTime />
      </div>
    );
  }
}

export default ID;
