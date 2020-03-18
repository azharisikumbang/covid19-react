import React, { Component } from 'react';
import axios from 'axios';

class IdDateTime extends Component {
  constructor(props){
      super(props)

      this.state = {
        IdLastUpdated: null,
      }
  }

  componentDidMount(){
    axios.get("https://covid19.mathdro.id/api/countries/id")
      .then(res => {
        const UTCTime = new Date(res.data.lastUpdate);
        const localDateTime = UTCTime.toLocaleString('id-id', { hour12: false });
        this.setState({IdLastUpdated: localDateTime})
      })
  }

  render() {
    return (
      <div className="">
      <small>Update Terakhir {this.state.IdLastUpdated} WIB</small>
      </div>
    );
  }
}

export default IdDateTime;
