import React, { Component} from 'react';
import subscribeCollections from '../lib/subscribe-collections.js'
import subscribeInventory from '../lib/subscribe-inventory.js'
import { collections } from '../lib/rapid.js';
import { inventory } from '../lib/rapid.js';

import ReactDOM from 'react-dom';
import { VictoryChart, VictoryScatter, VictoryTheme, VictoryAxis, VictoryTooltip, VictoryLegend, VictoryLine } from 'victory';
import rapid from 'rapid-io';

class NodeDeetsLive extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      collections: collections,
      inventory: inventory,
      dataTc1: [],
      dataTc2: [],
      batteryVoltage: [],
      millisSinceHeatPulse: [],
      redirect: false,
      to: '/NodeDeetsLive'
    }
  }

  componentDidMount() {
    const { collections } = this.state;
    const { inventory } = this.state;

    const rapidClient = rapid.createClient('NDA1OWE0MWo1b3AzYTJwLnJhcGlkLmlv');
    const datasets = rapidClient.collection('data-loggers-4');

  // filter all incomplete toDos older than a month
    const ONE_HOUR = (60 * 60)
    const QUARTER_HOUR = (15 * 60)
    const TEN_MINUTES = (10 * 60)
    const FIVE_MINUTES = (5 * 60)
    // const TIMESTAMP = (Date.now() / 1000) - ONE_HOUR
    // const TIMESTAMP = (Date.now() / 1000) - QUARTER_HOUR
    // const TIMESTAMP = (Date.now() / 1000) - TEN_MINUTES
    const TIMESTAMP = (Date.now() / 1000) - FIVE_MINUTES
    const dataFromPastHour = datasets.filter({
     and: [
      { nodeID: '1' },
      { $created: { gt: TIMESTAMP } }
     ]
    })
    
    dataFromPastHour
      .subscribe(dataset => {
        console.log(dataset)
        let mappedDataset = dataset.map(dataEntry => dataEntry.body)
        this.setState({dataTc2: mappedDataset.map((datapoint)=>{
          return {y: +datapoint.tc2, x: new Date (+datapoint.unix_timestamp * 1000)}
        })})
        this.setState({dataTc1: mappedDataset.map((datapoint)=>{
          return {y: +datapoint.tc1, x: new Date (+datapoint.unix_timestamp * 1000)}
        })})
        this.setState({batteryVoltage: mappedDataset.map((datapoint)=>{
          return {y: +datapoint.batteryVoltage, x: new Date (+datapoint.unix_timestamp * 1000)}
        })})
        this.setState({millisSinceHeatPulse: mappedDataset.map((datapoint)=>{
          return {y: +datapoint.millisSinceHeatPulse, x: new Date (+datapoint.unix_timestamp * 1000)}
        })})
      })

    this.collections = subscribeCollections(
      collections => this.setState({ collections }),
      err => console.error('collections subscribe error', err)
    )

    this.inventory = subscribeInventory(
      inventory => this.setState({ inventory }),
      err => console.error('collections subscribe error', err)
    )
  }

  componentWillMount() {
    this.collections && this.collections.unsubscribe();
  }

  goToLive() {
    this.setState({ redirect: true });
  }

  render() {
    return (
      <div>
        <h1>Node Readings LIVE</h1>
        <h2>Temperature Sensors</h2>
        <button onclick = { () => { } }>LIVE</button>
        <VictoryChart
          scale={ { x: "time" } }
          theme={VictoryTheme.material}
          height = { 500 }
          width = { 900 }
        >
          <VictoryScatter
            style={{ data: { fill: "#f48041" } }}
            size={3}
            data={this.state.dataTc1}
            labels={(d) => d.y}
            labelComponent={<VictoryTooltip/>}
          />
          <VictoryScatter
            style={{ data: { fill: "#4286f4" } }}
            size={3}
            data={this.state.dataTc2}
            labels={(d) => d.y}
            labelComponent={<VictoryTooltip/>}
          />
          <VictoryLegend
            data={[
              {name: 'tc1', symbol: { type: 'circle'}},
              {name: 'tc2', symbol: { type: 'circle'}}
            ]}
            colorScale={ ['#f48041', '#4286f4'] }
          />
        </VictoryChart>
        <h2>Battery Voltage</h2>
        <VictoryChart
          scale={ { x: "time" } }
          theme={VictoryTheme.material}
          height = { 500 }
          width = { 900 }
        >
          <VictoryLine
            style={{ data: { stroke: "#f48041" } }}
            domain={{ y:[3.7, 4.3] }}
            size={3}
            data={this.state.batteryVoltage}
            labels={(d) => d.y}
            labelComponent={<VictoryTooltip/>}
          />
        </VictoryChart>
        <h2>Heat Pulse Firing</h2>
        <VictoryChart
          scale={ { x: "time" } }
          theme={VictoryTheme.material}
          height = { 500 }
          width = { 900 }
        >
          <VictoryLine
            style={{ data: { stroke: "#f48041" } }}
            size={3}
            data={this.state.millisSinceHeatPulse}
            labels={(d) => d.y}
            labelComponent={<VictoryTooltip/>}
          />
          <VictoryAxis dependentAxis
            theme={VictoryTheme.material}
            tickFormat={(t) => `${t/1000000}M`}
          />
          <VictoryAxis
            theme={VictoryTheme.material}
          />
        </VictoryChart>


      </div>
    );
  }
}

export default NodeDeetsLive;
