import React, { Component } from 'react';
import axios from 'axios';

import IdDateTime from './id-datetime';

class ID extends Component {
  constructor(props){
      super(props)

      this.state = {
        confirmed: 0,
        recovered: 0,
        deaths: 0
      }
  }

  componentDidMount(){
    axios.get("https://covid19.mathdro.id/api/countries/id/confirmed")
      .then(res => {
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
      })
  }

  numberWithCommas(num){
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  render() {
    return (
      <div className="bg-gray-200 p-5 rounded overflow-hidden shadow-lg text-left">
        <h3 className="">Status Indonesia</h3>
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
