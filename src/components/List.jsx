import React, { Component } from 'react';
import { collections } from '../lib/rapid.js';
import NodeLink from './NodeLink.jsx';
import subscribeCollections from '../lib/subscribe-collections.js'


class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collections: collections,
      list : []
    }
  }

  componentDidMount() {
    const { collections } = this.state;
    this.collections = subscribeCollections(
      collections => this.setState({ collections }),
      err => console.error('collections subscribe error', err)
    )
  }

  componentWillMount () {
    this.collections && this.collections.unsubscribe();
  }


  render() {
    return (
      <div className="list">
       {this.state.collections[0] !== undefined ? this.state.collections.map(collection => {
          return <NodeLink data={collection.body}/>
       }) 

        :console.log('not working')}
      </div>
    );
  }
}

export default List;
