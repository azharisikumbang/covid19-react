import React, { Component } from 'react';
import axios from 'axios';

class idProvinces extends Component {
  constructor(props){
    super(props)

    this.state = {
      provinces: []
    }
  }

  componentDidMount(){
    axios.get("https://api.kawalcorona.com/indonesia/provinsi/")
    .then(res => {
      this.setState({provinces: res.data})
    })
  }

  render() {
    return (
      <div className="w-full shadow-lg mx-auto my-20 bg-white p-5 box-shadow overflow-auto">
        <h3 className="text-xl mb-4">Perkembangan Covid19 Berdasarkan Wilayah</h3>
        <table className="table-fixed border">
          <thead>
            <tr>
              <th className="border w-1/12 px-4 py-2">No</th>
              <th className="border w-6/12 px-4 py-2">Provinsi</th>
              <th className="border w-2/12 px-4 py-2">Positif</th>
              <th className="border w-2/12 px-4 py-2">Sembuh</th>
              <th className="border w-2/12 px-4 py-2">Meninggal</th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {
              this.state.provinces.map((province, index) => {
                return (
                  <tr>
                    <td className="border py-1">{(index + 1)}</td>
                    <td className="border py-1 text-left px-4">{province.attributes.Provinsi}</td>
                    <td className="border py-1">{province.attributes.Kasus_Posi}</td>
                    <td className="border py-1">{province.attributes.Kasus_Semb}</td>
                    <td className="border py-1">{province.attributes.Kasus_Meni}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
}

export default idProvinces;
