import React, { Component } from 'react';
import { collections } from '../lib/rapid.js';
import { inventory } from '../lib/rapid.js';
import NodeDeets from './NodeDeets.jsx';
import subscribeCollections from '../lib/subscribe-collections.js'
import subscribeInventory from '../lib/subscribe-inventory.js'
import { Redirect } from 'react-router';


class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collections: collections,
      inventory: inventory,
      redirect: false,
      to: '/NodeDeets',
      nodeID: ''

    }
  
    this.goToNodeDeets = this.goToNodeDeets.bind(this);
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

  goToNodeDeets(nodeID) {
    this.setState({ redirect: true, to: '/NodeDeets', nodeID: nodeID });

  }

  render() {
    return (
      <div className="list">
        <div className="nodes">
          <table>
            <tr>
              <th>Node</th>
              <th>Location</th>
              <th>Status</th>
            </tr>

          </table>
          {
        
          this.state.inventory[0] !== undefined ? this.state.inventory.map((node) => {
            return <tr key={ node.body.nodeID } onClick={ () => { this.goToNodeDeets(node.body.nodeID) }  } nodeId={ node.body.nodeID }><td>{ node.body.nodeID }</td> <td>San Francisco</td> <td>Active</td></tr>
          })  : console.log('not yet working')
        }
        
        </div>

        <div className="redirect">
          {this.state.redirect ? <Redirect to={this.state.to}/> : <div></div>}
        </div>
      </div>
    );
  }
}

export default List;
