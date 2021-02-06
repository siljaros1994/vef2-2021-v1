export function getData(callback) {
    fetch('/videos.json')
      .then(function (res) {
        return res.json()
      })
      .then(data => {
        callback(data);
      })
      .catch(console.log)
  }