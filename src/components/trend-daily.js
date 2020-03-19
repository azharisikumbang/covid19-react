import React, { Component } from 'react';
import axios from 'axios';
import {Line} from 'react-chartjs-2';

class TrendDaily extends Component {
  constructor(props){
      super(props)

      this.state = {
        dataChart: {
          labels: [],
          datasets: [
            {
              label: ["Seluruh Dunia"],
              fill: false,
              pointRadius: 1,
              borderWidth: 3,
              borderColor: '#2980b9',
              data: []
            },
            {
              label: ["China"],
              fill: false,
              borderWidth: 3,
              pointRadius: 1,
              borderColor: '#e74c3c',
              data: []
            },
            {
              label: ["Lokasi Lainnya"],
              fill: false,
              borderWidth: 3,
              pointRadius: 1,
              borderColor: '#f1c40f',
              data: []
            }
          ]
        }
      }
  }

  componentDidMount(){
    // Loading data
    axios.get("https://covid19.mathdro.id/api/daily")
      .then(res => {
        const worldData  = [];
        const chinaData  = [];
        const otherData  = [];
        const newLabel = [];
        const defaultLabels = this.state.dataChart.labels;

        res.data.map(data => {
          newLabel.push(data.reportDateString);
          worldData.push(data.totalConfirmed);
          chinaData.push(data.mainlandChina);
          otherData.push(data.otherLocations);
        });

        console.log(newLabel);

        // Set Stat
        this.setState({
          dataChart: {
            ...this.state.dataChart,
            labels: [...defaultLabels, ...newLabel],
            datasets: [
              {
                ...this.state.dataChart.datasets[0],
                data: worldData
              },
              {
                ...this.state.dataChart.datasets[1],
                data: chinaData
              },
              {
                ...this.state.dataChart.datasets[2],
                data: otherData
              }
            ]
          }
        })
      })
  }

  render() {
    return (
      <div className="h-100 w-10/12 shadow-lg mx-auto my-20 bg-white p-5 box-shadow">
        <Line
          data={this.state.dataChart}
          options={{
            title: {
              display: true,
              text: "Tren harian perkembangan covid19",
              fontSize: 20
            },
            legend: {
              display: true,
              position: 'right'
            }
          }}
        />
      </div>
    );
  }
}

export default TrendDaily;
