const REDDIT_ENDPOINT = 'https://www.reddit.com';

class RedditService {
  async getDefaultSubreddits() {
    const url = `${ REDDIT_ENDPOINT }/subreddits/default.json`;
    const response = await fetch(url, {
      method: 'GET',
      header: {
        Accept: 'application/json'
      }
    });
    if (!response.ok) throw new Error(`getDefaultSubreddits Failed, HTTP status ${ response.status }`);

    const data = await response.json();
    const children  = data.data.children;

    if (!children) throw new Error(`getDefaultSubreddits Failed, children not returned`)

    return children.sort((a, b) => a.subscribers < b.subscribers).map(subreddit => {
      return {
        title: subreddit.data.display_name,
        description: subreddit.data.public_description,
        url: subreddit.data.url
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
    const children  = data.data.children;
    
    if (!children) throw new Error(`getPostsFromSubreddit Failed, children not returned`)
    return children.map(post => {
      const body = post.data.selftext;
      return {
        id: post.data.id,
        title: post.data.title,
        topicUrl: subredditUrl,
        body: body,
        thumbnail: post.data.thumnail,
        url: !body ? post.data.url : undefined
      }
    });
  }
}

export default new RedditService();