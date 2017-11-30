const REDDIT_ENDPOINT = 'https://www.reddit.com';

class RedditService {
  async getPopularSubreddits() {
    const url = `${ REDDIT_ENDPOINT }/subreddits/popular.json`;
    const response = await fetch(url, {
      method: 'GET',
      header: {
        Accept: 'application/json'
      }
    });
    if (!response.ok) throw new Error(`getPopularSubreddits Failed, HTTP status ${ response.status }`);

    const data = await response.json();
    const { children } = data;
    if (!children) throw new Error(`getPopularSubreddits Failed, children not returned`)

    return children.sort((a, b) => a.subscribers < b.subscribers).map(subreddit => {
      return {
        title: subreddit.display_name,
        description: subreddit.public_description,
        url: subreddit.url
      }
    });
  }
}