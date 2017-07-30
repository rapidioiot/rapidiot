import React, { Component} from 'react';
import subscribeCollections from '../lib/subscribe-collections.js'
import subscribeInventory from '../lib/subscribe-inventory.js'
import { collections } from '../lib/rapid.js';
import { inventory } from '../lib/rapid.js';

class NodeDeets extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      collections: collections,
      inventory: inventory
    }
  }

  componentDidMount() {
    const { collections } = this.state;
    const { inventory } = this.state;

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

  render() {
    return (
      <div className="NodeDeets">
       {this.state.collections[0] !== undefined ? this.state.collections.map((node, index) => {
            return 
              <div key={ index } nodeId={ node.body.nodeID }>
                tc1 = { node.body.tc1 } tc2 = { node.body.tc2 }
              </div>
          })  : console.log('not yet working')}
      </div>
    );
  }
}

export default NodeDeets;
