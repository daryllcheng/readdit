import React, { Component } from 'react';
import { DropdownList } from 'react-widgets'
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';

class SubredditFilter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: "all"
    }
  }

  handleChange = (event, index, value) => {
    this.props.onFilterSwitch(value);
    this.setState({
      selected: value
    })
  }

  render() {
    return (
      <DropDownMenu 
        value={ this.state.selected }
        onChange={ this.handleChange }
        autoWidth={ true }
        animated={ true}
        className="subredditFilter"
        labelStyle={{ color: "#5BC0EB" }}   
      >
        {
          [ ...this.props.subscribedSubreddits, "all"].map(subreddit => (
            <MenuItem 
              value={ subreddit } 
              key={ subreddit } 
              primaryText={ subreddit } 
            />
          ))
        }
      </DropDownMenu>
    )
  }
}

export default SubredditFilter;