import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSubreddits, toggleSuggestions, subscribeToSubreddit } from '../store/actions/subscriptions_action';
import { fetchPosts } from '../store/actions/posts_action';
import * as selectors from '../store/reducers/selectors';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';

class Subscriptions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checkedItems: [],
      query: ''
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

  renderLoading() {
    return (
      <p>Loading...</p>
    )
  }

  render() {
    const actions = [
      <FlatButton
        label="Maybe later"
        primary={ true }
        onClick={ this.handleClose }
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
          title="Show me"
          actions={ actions }
          modal={ false }
          open={ this.props.renderSuggestions }
          onRequestClose={ this.handleClose }
          autoScrollBodyContent={ true }
          autoDetectWindowHeight={ true }

        >
        <div className="dialog">
          <TextField
            className="dialogTextField"
            hintText="..."
            value={ this.state.query }
            onChange={ this.handleChange.bind(this) }
            onKeyPress={ this.handleKeyPress.bind(this) } 
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