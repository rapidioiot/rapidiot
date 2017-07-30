import React, { Component } from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import List from './List.jsx';


const styles = {
  customWidth: {
    width: 200,
  },
};

class HomePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 1,
      filterType: ''
    };
  
    this.handleChange = this.handleChange.bind(this);
  }


  handleChange (event, index, value) {
    this.setState({value});
    if (value === 1) {
      this.setState({filterType: 'nodes'});
    } else if (value === 2) {
      this.setState({filterType: 'location'});
    }
  }

  render() {
    return (
      <div className="homepage">
        <DropDownMenu value = {this.state.value} onChange = {this.handleChange}>
          <MenuItem value={1} primaryText="Nodes"/>
          <MenuItem value={2} primaryText="Location"/>
        </DropDownMenu>
        <List filterType={this.state.filterType}/>
      </div>
    );
  }
}

export default HomePage;
