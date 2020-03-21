import React, { Component } from 'react';

import WorldTracker from './components/world-tracker';
import IdTracker from './components/id-tracker';
import Idenfitier from './components/identifier';
import TrendDaily from './components/trend-daily';

import Countries from './components/countries';

import 'tailwindcss/dist/tailwind.min.css'


class App extends Component {
  render() {
    return (
      <div className="App container mx-auto my-20 text-center">
        <h1 className="text-3xl mb-5">Covid19 Coronavirus Monitoring</h1>
        <div className="flex flex-wrap mb-4">
          <div className="w-full md:w-1/2 xl:w-1/2 p-3">
            <WorldTracker />
          </div>
          <div className="w-full md:w-1/2 xl:w-1/2 p-3">
            <IdTracker />
          </div>
        </div>
        <Idenfitier />
        <TrendDaily />
        <Countries />
      </div>
    );
  }
}

export default App;
