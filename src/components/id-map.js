import React, { Component } from 'react';
import { select, geoPath, geoEquirectangular } from 'd3';
import { mesh, feature } from 'topojson';

import mapData from '../data/id2.json';


class idMap extends Component {
  constructor(props){
    super(props)

    this.state = {
      data: [],
    }
  }

  componentDidMount(){
    console.log("app running");

    var width = 960,
    height = 500,
    centered;

    var projection = geoEquirectangular()
            .scale(1050)
            .rotate([-120, 0])
            .translate([width / 2, height / 2]);

    var path = geoPath()
        .projection(projection);

    var svg = select("#map")
        .attr("width", width)
        .attr("height", height);

    svg.append("rect")
        .attr("class", "background")
        .attr("width", width)
        .attr("height", height)

    var g = svg.append("g");

      g.append("g")
        .attr("id", "subunits")
      .selectAll("path")
        .data(feature(mapData, mapData.objects.states_provinces).features)
      .enter().append("path")
        .attr("d", path)

    g.append("path")
        .datum(mesh(mapData, mapData.objects.states_provinces, function(a, b) { return a !== b; }))
        .attr("id", "state-borders")
        .attr("d", path);

  }

  render() {
    return (
      <div className="w-full shadow-lg mx-auto my-20 bg-white p-5 box-shadow">
        <svg id="map" width="600px" height="400px" xmlns="http://www.w3.org/2000/svg"></svg>
      </div>
    );
  }
}

export default idMap;
