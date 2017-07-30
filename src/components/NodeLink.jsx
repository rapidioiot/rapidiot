import React, { Component} from 'react';

class NodeLink extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="NodeLink">
        {this.props.data.tc1}
      </div>
    );
  }
}

export default NodeLink;
