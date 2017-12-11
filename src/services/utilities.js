export function processPreview(res) {
  if (res.length >= 1) {
    let url = res[res.length - 1].url;
    let temp = document.createElement("textarea");
    temp.innerHTML = url;
    return temp.value;
  } else {
    return "";
  }
};

export async function getData(url, type) {
  const response = await fetch(url, {
    method: "GET",
    header: {
      Accept: "application/json"
    }
  });
  if (!response.ok) throw new Error(`${ type } Failed, HTTP status ${ response.status }`);
  const data = await response.json();
  
  if (type === "getDefaultSubreddits" || type === "getPostsFromSubreddit") {
    const children = data.data.children;
    if (!children) throw new Error(`getDefaultSubreddits Failed, children not returned`);
    return children;
  } else {
    return data;
  }
};