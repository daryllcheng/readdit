import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSubreddits, renderSuggestions } from '../store/actions/subscriptions_action';
import * as selectors from '../store/reducers/selectors';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';

class Subscriptions extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    this.props.dispatch(fetchSubreddits());
  }

  handleOpen = () => {
    this.props.dispatch(renderSuggestions());
  };

  handleClose = () => {
    this.props.dispatch(renderSuggestions());
  };

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
    console.log(this.props.renderSuggestions);
    return (
      <div className="Subscriptions">
        <Dialog
          title="I want ..."
          actions={ actions }
          modal={ false }
          open={ this.props.renderSuggestions }
          onRequestClose={ this.handleClose }
          autoScrollBodyContent={ true }
        >
          <RadioButtonGroup name="shipSpeed" defaultSelected="not_light">
            {
              this.props.subreddits.map(subreddit => (  
                <RadioButton
                  key={ subreddit.url }
                  value={ subreddit.url }
                  label={ subreddit.url }
                  style={{ 'marginTop': 16 }}
                />
              ))
            }
          </RadioButtonGroup>
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