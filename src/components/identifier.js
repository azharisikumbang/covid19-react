import React, { Component } from 'react';

class Idenfitier extends Component {
  render() {
    return (
      <div className="text-center">
        <span className="w-3 bg-yellow-600 h-3 inline-block ml-4"></span> Terkonfirmasi (jiwa)
        <span className="w-3 bg-green-600 h-3 inline-block ml-4"></span> Sembuh (jiwa)
        <span className="w-3 bg-red-600 h-3 inline-block ml-4"></span> Meninggal (jiwa)
        <div clasName="text-xs">
          <small>Data source : <a href="https://github.com/mathdroid/covid-19-api" target="_blank">https://github.com/mathdroid/covid-19-api</a></small>
        </div>
      </div>
    );
  }
}

export default Idenfitier;
