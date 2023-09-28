let myPlayer = document.querySelector(".video-js");


console.log(myPlayer);

videojs(myPlayer, {
    width: 750,
    controls: true,
    autoplay: false,
    preload: "auto",
    poster: "../img/poster.jpg",
    inactivityTimeout: 0,
    livetracker: {
        trackingThreshold: 0.5,
    },
    playbackRates: [0.5, 1, 1.5, 2],
    liveui: true,
});


let player = videojs('vid1', {
    responsive: true
});
