import React, { Component } from 'react';
import axios from 'axios';
import csv from 'csvtojson';
import {Line} from 'react-chartjs-2';

class Countries extends Component {
  constructor(props){
      super(props)

      this.state = {
        indonesiaIndex: 59,
        lastUpdatedDate: "",
        dataChart: {
          labels: [],
          datasets: [
            {
              label: ["Positif"],
              fill: false,
              borderWidth: 2,
              pointRadius: 1,
              borderColor: '#d69e2e',
              data: []
            },
            {
              label: ["Sembuh"],
              fill: false,
              borderWidth: 2,
              pointRadius: 1,
              borderColor: '#38a169',
              data: []
            },
            {
              label: ["Meninggal"],
              fill: false,
              borderWidth: 2,
              pointRadius: 1,
              borderColor: '#e53e3e',
              data: []
            }
          ]
        }
      }
  }

  async componentDidMount(){

    const confirmedUrlDataset = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Confirmed.csv";
    const recoveredUrlDataset = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Recovered.csv";
    const deathUrlDataset = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Deaths.csv";

    const confirmedDataset = await this.getData(confirmedUrlDataset);
    const recoveredDataset = await this.getData(recoveredUrlDataset);
    const deathDataset = await this.getData(deathUrlDataset);

    const confirmedIndonesianData = [];
    const recoveredIndonesianData = [];
    const deathIndonesianData = [];

    await this.convertToArray(confirmedDataset, confirmedIndonesianData, this.state.indonesiaIndex, true);
    await this.convertToArray(recoveredDataset, recoveredIndonesianData, this.state.indonesiaIndex);
    await this.convertToArray(deathDataset, deathIndonesianData, this.state.indonesiaIndex);

    setTimeout(() => {
      this.setState({
        dataChart: {
          ...this.state.dataChart,
          labels: confirmedIndonesianData[0].chartLabels,
          datasets: [
            {
              ...this.state.dataChart.datasets[0],
              data: confirmedIndonesianData[0].chartEntries
            },
            {
              ...this.state.dataChart.datasets[1],
              data: recoveredIndonesianData[0].chartEntries
            },
            {
              ...this.state.dataChart.datasets[2],
              data: deathIndonesianData[0].chartEntries
            }
          ]
        }
      })

      this.setState({lastUpdatedDate: this.state.dataChart.labels[(this.state.dataChart.labels.length - 1)]})

    }, 1000)

  }

  convertToArray(data, container, index, label = false){
    csv({
      noheader: true,
      output: 'csv'
    })
    .fromString(data)
    .then(res => {
      container.push(this.findIndonesia(res, index, label));
    });
  }

  findIndonesia(data, index, withLabel = false){
    let chartLabels = [];
    let chartEntries = [];

    let i = 43;

    if (withLabel) {
      for (i; i < data[index].length; i++) {
        chartEntries.push(data[index][i]);
        chartLabels.push(data[0][i]);
      }
    }
    else {
      for (i; i < data[index].length; i++) {
        chartEntries.push(data[index][i]);
      }
    }

    return {
      chartLabels: chartLabels,
      chartEntries: chartEntries
    }

  }

  async getData(url){
    return await axios.get(url)
      .then(res => res.data)
  }

  render() {
    return (
      <div className="w-10/12 shadow-lg mx-auto my-20 bg-white p-5 box-shadow overflow-auto">
        <Line
          data={this.state.dataChart}
          options={{
            title: {
              display: true,
              text: `Tren Harian Perkembangan Covid19 Di Indonesia Per ${this.state.lastUpdatedDate}`,
              fontSize: 20
            },
            legend: {
              display: true,
              position: 'top'
            },
            responsive: true
          }}
        />

      </div>
    );
  }
}

export default Countries;
