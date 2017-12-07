const ProcessPreview = (res) => {
  if (res.length >= 1) {
    let url = res[res.length - 1].url;
    let temp = document.createElement("textarea");
    temp.innerHTML = url;
    return temp.value;
  } else {
    return "";
  }
}

export default ProcessPreview;