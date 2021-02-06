import {getData} from '../lib/getdata.js';

// Kallar á gögn þegar html (document) hefur loadast
window.onload = function () {

  getData(function (data) {
    const gridElement = document.getElementById('theGrid');

    // Loopar og finnur title í categories
    for (let i = 0; i < data.categories.length; i++) {
      const category = data.categories[i];
      const videoIDs = category.videos;
      const categoryVideos = data.videos.filter(video => videoIDs.includes(video.id));

      const categoryElement = document.createElement('section');
      categoryElement.setAttribute('class', category.title.toLowerCase().replace(' ', '_'));

      const categoryTitle = document.createElement('h2');

      categoryTitle.setAttribute('class', 'offset-col-md-1');
      categoryTitle.innerHTML = category.title;


      categoryElement.appendChild(categoryTitle);

      const videosElement = document.createElement('div');
      videosElement.setAttribute('class', 'row');

      // Loopar í gegnum categories til að finna video
      for (let j = 0; j < categoryVideos.length; j++) {
        const video = categoryVideos[j];

        const videoElement = document.createElement('div');
        videoElement.setAttribute('class', 'col col-4 col-md-10 offset-col-md-1');

        //setur poster þar sem þau eiga að vera
        const videoImage = document.createElement('a');

        videoImage.setAttribute('class', 'video_image')
        videoImage.setAttribute('href', '/video.html?id=' + video.id)
        const videoImageImg = document.createElement('img');
        videoImageImg.setAttribute('src', video.poster);
        videoImage.appendChild(videoImageImg);

        videoElement.appendChild(videoImage);

        const bottomCard = document.createElement('div');
        bottomCard.setAttribute('class', 'bottom_card');

        // Duration
        const videoDuration = document.createElement('p');
        videoDuration.setAttribute('class', 'video_duration col-4');

        const minutes = parseInt(video.duration / 60, 10);

        const seconds = video.duration % 60;

        if (seconds <= 9 ) {
          videoDuration.innerHTML = `${parseInt(minutes)}:0${parseInt(seconds)}`;
        } else {
          videoDuration.innerHTML = `${parseInt(minutes)}:${parseInt(seconds)}`;
        }

        videoImage.appendChild(videoDuration);

        // Setur videotitle þar sem þeir eiga að vera
        const videoTitle = document.createElement('p');
        videoTitle.setAttribute('class', 'video_title');
        videoTitle.innerHTML = video.title;
        bottomCard.appendChild(videoTitle);

        const detailElement = document.createElement('p');

        // Dagsetningar
        const videoDate = new Date(video.created);
        const hoursSince = ((new Date()).getTime() - videoDate.getTime()) / 1000 / 60 / 60;
        const daysSince = hoursSince / 24;
        const weekSince = daysSince / 7;
        const monthsSince = daysSince / 30;
        const yearSince = daysSince / 365;

        if (yearSince >= 1) {
          if (yearSince < 2) {
            detailElement.innerHTML = `Fyrir ${parseInt(yearSince)} ári síðan`;
          } else {
            detailElement.innerHTML = `Fyrir ${parseInt(yearSince)} árum síðan`;
          }
        } else if (monthsSince >= 1) {
          if (monthsSince < 2) {
            detailElement.innerHTML = `Fyrir ${parseInt(monthsSince)} mánuði síðan`;
          } else {
            detailElement.innerHTML = `Fyrir ${parseInt(monthsSince)} mánuðum síðan`;
          }
        } else if (weekSince >= 1) {
          if (weekSince < 2) {
            detailElement.innerHTML = `Fyrir ${parseInt(weekSince)} viku síðan`;
          } else {
            detailElement.innerHTML = `Fyrir ${parseInt(weekSince)} vikum síðan`;
          }
        } else if (daysSince >= 1) {
          if (daysSince < 2) {
            detailElement.innerHTML = `Fyrir ${parseInt(daysSince)} degi síðan`;
          } else {
            detailElement.innerHTML = `Fyrir ${parseInt(daysSince)} dögum síðan`;
          }
        } else if (hoursSince >= 1){
          if (hoursSince < 2) {
          detailElement.innerHTML = `Fyrir ${parseInt(hoursSince)} klukkustund síðan`;
          } else {
          detailElement.innerHTML = `Fyrir ${parseInt(hoursSince)} klukkustundum síðan`;
          }
        }

        bottomCard.appendChild(detailElement);

        videoElement.appendChild(bottomCard);

        videosElement.appendChild(videoElement);

      }
      // Setur hr á milli categories
      categoryElement.appendChild(videosElement);

      const hr = document.createElement('hr');
      hr.setAttribute('class', 'col-10');
      categoryElement.appendChild(hr);

      gridElement.appendChild(categoryElement);
    }
  });
}