const ProcessPreview = (input) => {
  let res = input.images[0].resolutions;
  let url = res.length <= 2 ? res[res.length - 1].url : res[2].url;
  let temp = document.createElement("textarea");
  temp.innerHTML = url;
  return temp.value;
}

export default ProcessPreview;