

function onYouTubeIframeAPIReady() {
    if(MUSIC_TYPE == 'youtube'){
        MUSIC = new YT.Player('player', {
            videoId: MUSIC_ID,
            events: {
                'onReady': onYoutubePlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    }else{

    }
}

