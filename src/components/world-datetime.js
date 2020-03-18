import React, { Component } from 'react';
import axios from 'axios';

class DateTime extends Component {
  constructor(props){
      super(props)

      this.state = {
        WordlLastUpdated: null,
      }
  }

  componentDidMount(){
    axios.get("https://covid19.mathdro.id/api")
      .then(res => {
        const UTCTime = new Date(res.data.lastUpdate);
        const localDateTime = UTCTime.toLocaleString('id-id', { hour12: false });

        this.setState({WordlLastUpdated: localDateTime})
      })
  }

  render() {
    return (
      <div className="WorldTracker">
      <small>Update Terakhir {this.state.WordlLastUpdated} WIB</small>
      </div>
    );
  }
}

export default DateTime;
