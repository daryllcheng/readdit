import { processPreview, getData } from "./utilities";
const REDDIT_ENDPOINT = "https://www.reddit.com";

class RedditService {
  async getDefaultSubreddits() {
    const url = `${ REDDIT_ENDPOINT }/subreddits/default.json`;
    const children = await getData(url, "getDefaultSubreddits")
    return children.sort((a, b) => a.subscribers < b.subscribers).map(subreddit => {
      return {
        title: subreddit.data.display_name,
        description: subreddit.data.public_description,
        url: subreddit.data.url
      };
    });
  };

  async getSubredditSuggestions(query) {
    const url = `${ REDDIT_ENDPOINT }/api/subreddits_by_topic.json?query=${ query }` ;
    const data = await getData(url, "getSubredditSuggestions")

    if (!data.length) throw new Error(`getSubredditSuggestions Failed, data not returned`)
    return data.map(subreddit => {
      return {
        title: subreddit.name,
        url: subreddit.path
      };
    });
  };

  async getPostsFromSubreddit(subredditUrl) {
    const url = `${ REDDIT_ENDPOINT }${ subredditUrl }hot.json?limit=30`;
    const children  = await getData(url, "getPostsFromSubreddit");
    
    return children.map(post => {
      const body = post.data.selftext;
      const res = post.data.preview ? processPreview(post.data.preview.images[0].resolutions) : "";
      return {
        id: post.data.id,
        title: post.data.title,
        author: post.data.author,
        subredditUrl: subredditUrl,
        body: body,
        preview: res,
        url: post.data.url,
        upvotes: post.data.ups,
        created: post.data.created_utc,
        gilded: post.data.gilded
      };
    });
  };

  async getCommentsFromPost(subreddit, postId) {
    const url = `${ REDDIT_ENDPOINT }${ subreddit }comments/${ postId }.json?`;
    const data = await getData(url, "getCommentsFromPost");
    const children = data[1].data.children;
    if (!data) throw new Error(`getCommentsFromPost Failed, children not returned`)
    return children.map(comment => {
      return {
        id: comment.data.id,
        replies: comment.data.replies,
        author: comment.data.author,
        stickied: comment.data.stickied,
        gilded: comment.data.sticked,
        score: comment.data.score,
        body: comment.data.body,
        created: comment.data.created_utc
      };
    });
  };
};

export default new RedditService();