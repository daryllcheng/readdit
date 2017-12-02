import React, { Component } from 'react';

const SubredditFilter = ({ subscribedSubreddits, currentFilter, onFilterSwitch }) => {
  const renderFilter = (url, label)  => {
    const className = currentFilter === url ? "selected" : undefined;
    return (
      <a 
        href="#"
        key={ url }
        className={ className }
        onClick={ () => onFilterSwitch(url) }
      >
      { label }
      </a>
    )
  }

  return (
    <div>
      { renderFilter("all", "ALL") }
      {
        subscribedSubreddits.map(subreddit => renderFilter(subreddit, subreddit))
      }
    </div>
  )
}

export default SubredditFilter;