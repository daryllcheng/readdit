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

  async getPostsFromSubreddit(subredditUrl) {
    const url = `${ REDDIT_ENDPOINT }${ subredditUrl }hot.json`;
    const response = await fetch(url, {
      method: 'GET',
      header: {
        Accept: 'application/json'
      }
    });
    if (!response.ok) throw new Error(`getPostsFromSubreddit Failed, HTTP status ${ response.status }`);

    const data = await response.json();
    const { children } = data;
    if (!children) throw new Error(`getPostsFromSubreddit Failed, children not returned`)

    return children.map(post => {
      const body = post.selftext;
      return {
        id: post.id,
        title: post.title,
        topicUrl: subredditUrl,
        body: body,
        thumbnail: post.thumnail,
        url: !body ? post.url : undefined
      }
    });
  }
}

export default new RedditService();