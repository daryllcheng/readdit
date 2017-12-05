import React, { Component } from 'react';
import { DropdownList } from 'react-widgets'

class SubredditFilter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: this.props.subscribedSubreddits[0]
    }
  }

  handleChange(value) {
    this.props.onFilterSwitch(value);
    this.setState({
      selected: value
    })
  }

  render() {
    return (
      <DropdownList
        value={ this.state.selected }
        data={ [...this.props.subscribedSubreddits, "all"] }
        onChange={ value => this.handleChange(value) }
      />
    )
  }
}

export default SubredditFilter;