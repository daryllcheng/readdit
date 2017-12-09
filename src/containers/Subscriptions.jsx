import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSubreddits, toggleSuggestions, subscribeToSubreddit } from '../store/actions/subscriptions_action';
import { fetchPosts } from '../store/actions/posts_action';
import * as selectors from '../store/reducers/selectors';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import { PulseLoader } from 'halogenium';

class Subscriptions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checkedItems: [],
      query: '',
      errorText: ""
    }
  }

  componentDidMount() {
    this.props.dispatch(fetchSubreddits());
  }

  handleClose = () => {
    this.props.dispatch(toggleSuggestions());
    this.props.dispatch(fetchPosts());
  };

  handleCheck(url) {
    this.props.dispatch(subscribeToSubreddit(url));
  }

  handleChange(event) {
		this.setState({ query: event.target.value });
	}

  handleKeyPress(event) {
		if (event.key === 'Enter' && this.state.query !== '') {
      this.props.dispatch(fetchSubreddits(this.state.query));
      this.setState({ query: '' })
		}
	}

  handlePathSearch(event) {
    let url = event.target.value;
    if (event.key === "Enter") {
      if (this.handleError(url)) {
        this.props.dispatch(subscribeToSubreddit(url));
        this.setState({ errorText: "" })
      }
    }
  }

  handleError(input) {
    if (input.length < 4) {
      this.setState({ errorText: "Please enter a valid path" })
      return false;
    } else if (input[input.length - 1] !== "/" ) {
      this.setState({ errorText: "Remember to end with a forward slash" })
      return false;
    } else if (input.slice(0, 3) !== "/r/") {
      this.setState({ errorText: "Remember to start with /r/" })
      return false;
    } else {
      this.setState({ errorText: "" })
      return true;
    }
  }

  renderLoading() {
    return (
      <PulseLoader color="#E55934" size="30px" margin="4px"/>
    );
  }

  render() {
    const actions = [
      <FlatButton
        label="Popular Subreddits"
        primary={ true }
        onClick={ () => this.props.dispatch(fetchSubreddits()) }
      />,
      <FlatButton
        label="Let's Go!"
        primary={ true }
        keyboardFocused={ true }
        onClick={ this.handleClose }
      />,
    ];

    if (!this.props.subreddits) return this.renderLoading();
    return (
      <div className="Subscriptions">
        <Dialog
          title="Subreddits"
          actions={ actions }
          modal={ false }
          titleStyle={{ "fontWeight": "bold", "fontSize": "30px", color: "rgba(0, 0, 0, 0.6)", "textAlign": "center" }}
          open={ this.props.renderSuggestions }
          onRequestClose={ this.handleClose }
          autoScrollBodyContent={ true }
          autoDetectWindowHeight={ true }

        >
        <div className="dialog">
          <TextField
            className="topicTextField"
            floatingLabelText="Search by topic (e.g. basketball)"
            floatingLabelFixed={ true }
            hintText="basketball"
            value={ this.state.query }
            onChange={ this.handleChange.bind(this) }
            onKeyPress={ this.handleKeyPress.bind(this) } 
          /><br />
          <TextField
            className="subredditTextField"
            hintText="Search by subreddit url"
            floatingLabelText="or enter exact path (e.g. /r/nba/)"
            floatingLabelFixed={ true }
            errorText={ this.state.errorText }
            defaultValue="/r/"
            onKeyPress={ this.handlePathSearch.bind(this) } 
          /><br />
          <div className="subscribedSubreddits">
          <h2>Subscribed</h2>
            {
              this.props.subscribedSubreddits ? this.props.subscribedSubreddits.map(subreddit => (  
                <Checkbox
                  key={ subreddit }
                  value={ subreddit }
                  label={ subreddit }
                  style={{ 'marginTop': 16 }}
                  defaultChecked={ true }
                  onCheck={ () => this.handleCheck(subreddit) }
                />
              )) :
              <p>Empty</p>
            }
          </div>
          <div className="subredditSuggestions">
          <h2>Subreddits</h2>
            {
              this.props.subreddits.map(subreddit => (  
                <Checkbox
                  key={ subreddit.url }
                  value={ subreddit.url }
                  label={ subreddit.title }
                  style={{ 'marginTop': 16 }}
                  onCheck={ () => this.handleCheck(subreddit.url) }
                />
              ))
            }
          </div>
          </div>
        </Dialog>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const subreddits = selectors.getSubreddits(state);
  return {
    subreddits,
    subscribedSubreddits: selectors.getSubscribedSubreddits(state),
    renderSuggestions: selectors.renderSuggestions(state)
  }
};

export default connect(mapStateToProps)(Subscriptions);