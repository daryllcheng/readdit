import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { renderCheckbox } from './FormFields';


const SubscriptionForm = ({ subreddits }) => (
  <form>
    <div>
      {
        subreddits.map(subreddit => (  
          <Field
            key={ subreddit.url }
            name={ subreddit.url }
            component={ renderCheckbox }
            label={ `${ subreddit.title }: ${ subreddit.description }`}
          />
        ))
      }
    </div>
  </form >
)

export default reduxForm({
  form: 'SubscriptionForm',
})(SubscriptionForm)