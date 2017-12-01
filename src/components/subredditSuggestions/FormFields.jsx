import React from 'react';
import Checkbox from 'material-ui/Checkbox'

export const renderCheckbox = props => (
  <Checkbox label={ props.label }
    checked={ props.value ? true : false } 
    onCheck={ props.onChange }
  />
)