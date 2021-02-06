function getData(callback) {
    fetch('/videos.json')
      .then(function (res) {
        return res.json()
      })
      .then(data => {
        callback(data);
      })
      .catch(console.log)
  }
  
  
  const urlParams = new URLSearchParams(window.location.search);
  const myId = urlParams.get('id');
  var myVideo = document.getElementById("videoToPlay");
  
  
  function videoBack(){
    var timeCurrent = myVideo.currentTime - 3;
    myVideo.currentTime = timeCurrent;
  }
  function videoPlayPause() {
    if (myVideo.paused) {
      myVideo.play();
      document.getElementById("play_pause").src="img/pause.svg";
      document.getElementById("playBtn").classList.add("playtBtn-hidden");
    }
    else {
      myVideo.pause();
      document.getElementById("play_pause").src="img/play.svg";
      document.getElementById("playBtn").classList.remove("playtBtn-hidden");
    }
  }
  function videoMute(){
    if(myVideo.muted ==false){
      myVideo.muted =true;
      document.getElementById("mute_unmute").src="img/unmute.svg";
    }
    else{
      myVideo.muted =false;
      document.getElementById("mute_unmute").src="img/mute.svg";
    }
  }
  function videoFullscreen(){
      if (myVideo.requestFullscreen) {
          myVideo.requestFullscreen();
        } else if (myVideo.webkitRequestFullscreen) { /* Safari */
          myVideo.webkitRequestFullscreen();
        } else if (myVideo.msRequestFullscreen) { /* IE11 */
          myVideo.msRequestFullscreen();
        }
  }
  function videoNext(){
      var timeCurrent = myVideo.currentTime + 3;
      myVideo.currentTime = timeCurrent;
  }
  
  window.onload = function () {
      getData(function (gögn) {
  
          const videoInfo = gögn.videos[myId - 1];
          const videoTitle= document.getElementById('title');
          const categoryTitle = document.createElement('h1');
          categoryTitle.innerText= videoInfo.title;
          videoTitle.appendChild(categoryTitle);
  
          const videoToPlay= document.getElementById('videoToPlay');
          const videoSrc = document.createElement('source');
          videoSrc.setAttribute('src', videoInfo.video);
          videoSrc.setAttribute('type', "video/mp4");
          videoToPlay.appendChild(videoSrc);
  
          const videoDescriptionPlace = document.getElementById('video_info');
          const videoDescription = document.createElement('p');
          videoDescription.innerHTML = videoInfo.description;
          videoDescriptionPlace.appendChild(videoDescription);
  
          //Loopar í gegnum tengd myndbönd
          const relatedVideoGrid = document.getElementById('tengd_myndbond')
  
          for(let i = 0; i < videoInfo.related.length; i++){
  
            const relatedVideoNumber = videoInfo.related[i];
            const relatedVideo = gögn.videos[relatedVideoNumber];
            // býr til div og klasa fyrir skölun
            let videoRelatedElement = document.createElement('div');
            videoRelatedElement.setAttribute('class', 'col col-4 col-md-10');
            //býr til link á videið
            let videoRelatedClass = document.createElement('a');
            videoRelatedClass.setAttribute('class','video_image');
            videoRelatedClass.setAttribute('href','/video.html?id='+ relatedVideo.id)
            // Slóð á tengdum myndböndum
            let videoRelatedImage = document.createElement('img');
            videoRelatedImage.setAttribute('src', relatedVideo.poster);
            // býr til div fyir bottom cardið
            let videoRelatedBottom = document.createElement('div');
            videoRelatedBottom.setAttribute('class','bottom_card');
            const videoRelatedDuration = document.createElement('p');
            // Duration
            videoRelatedDuration.setAttribute('class', 'video_duration col-4');
            const minutes = parseInt(relatedVideo.duration / 60, 10);
            const seconds = relatedVideo.duration % 60;
  
            if (seconds <= 9 ) {
              videoRelatedDuration.innerHTML = `${parseInt(minutes)}:0${parseInt(seconds)}`;
            } else {
              videoRelatedDuration.innerHTML = `${parseInt(minutes)}:${parseInt(seconds)}`;
            }
            videoRelatedBottom.appendChild(videoRelatedDuration);
            //  Titill á tengdum myndböndum
            let videoRelatedTitle = document.createElement('h3');
            videoRelatedTitle.innerHTML = relatedVideo.title;
            videoRelatedBottom.appendChild(videoRelatedTitle)
            //Tími á tengdum myndböndum
            let detailElement = document.createElement('p');
            let videoDate = new Date(relatedVideo.created);
            let hoursSince = ((new Date()).getTime() - videoDate.getTime()) / 1000 / 60 / 60;
            let daysSince = hoursSince / 24;
            let weekSince = daysSince / 7;
            let monthsSince = daysSince / 30;
            if (monthsSince >= 1) {
              detailElement.innerHTML = `Fyrir ${parseInt(monthsSince)} mánuðum síðan`;
            } else if (daysSince >= 1) {
              detailElement.innerHTML = `Fyrir ${parseInt(daysSince)} dögum síðan`;
            } else {
              detailElement.innerHTML = `Fyrir ${parseInt(hoursSince)} klukkustundum síðan`;
            }
            videoRelatedBottom.appendChild(detailElement);
            videoRelatedClass.appendChild(videoRelatedImage)
            videoRelatedElement.appendChild(videoRelatedClass)
            videoRelatedElement.appendChild(videoRelatedBottom)
            relatedVideoGrid.appendChild(videoRelatedElement)
          }
      }
      )}