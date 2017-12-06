import ProcessPreview from './utilities';
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

  async getSubredditSuggestions(query) {
    const url = `${ REDDIT_ENDPOINT }/api/subreddits_by_topic.json?query=${ query }` ;
    const response = await fetch(url, {
      method: 'GET',
      header: {
        Accept: 'application/json'
      }
    });
    if (!response.ok) throw new Error(`getSubredditSuggestions Failed, HTTP status ${ response.status }`);

    const data = await response.json();

    if (!data.length) throw new Error(`getSubredditSuggestions Failed, data not returned`)

    return data.map(subreddit => {
      return {
        title: subreddit.name,
        url: subreddit.path
      }
    });
  }

  async getPostsFromSubreddit(subredditUrl) {
    const url = `${ REDDIT_ENDPOINT }${ subredditUrl }hot.json?limit=30`;
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
        subredditUrl: subredditUrl,
        body: body,
        preview: post.data.preview ? ProcessPreview(post.data.preview) : "",
        url: !body ? post.data.url : undefined,
        upvotes: post.data.ups,
        created: post.data.created
      }
    });
  }

  async getCommentsFromPost(subreddit, postId) {
    const url = `${ REDDIT_ENDPOINT }${ subreddit }comments/${ postId }.json`;
    const response = await fetch(url, {
      method: 'GET',
      header: {
        Accept: 'application/json'
      }
    });
    if (!response.ok) throw new Error(`getCommentsFromPost Failed, HTTP status ${ response.status }`);

    const data = await response.json();
    const children = data[1].data.children;

    if (!data) throw new Error(`getCommentsFromPost Failed, children not returned`)
    return children.map(comment => {
      return {
        replies: comment.data.replies,
        author: comment.data.author,
        stickied: comment.data.stickied,
        gilded: comment.data.sticked,
        score: comment.data.score,
        body: comment.data.body
      }
    });
  }
}

export default new RedditService();