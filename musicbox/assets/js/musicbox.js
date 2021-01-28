// youtube ready
function onYoutubePlayerReady(){
    $(document).ready(function(){
        MUSIC_CLASS = new MusicBox();
    });
}
 
let timeouts = null;
// youtube change
function onPlayerStateChange(){
    
    if(MUSIC != null){
        if(MUSIC_CHANGE){
            if(MUSIC.getVideoData().title != ''){         
                
                clearTimeout(timeouts);
                timeouts = setTimeout(function(){
                    $('.music-list__item').removeClass('is-active');
                    $('.music-list__item[data-idx='+MUSIC_DATA_COUNT+']').addClass('is-active');

                    MUSIC_CLASS.removeMusicBox();
                    MUSIC_CLASS = null;
                    MUSIC_CLASS = new MusicBox();

                    MUSIC.seekTo(0,true);
                    if(!MUSIC_STATUS){ 
                        MUSIC.pauseVideo(); 
                    }else{
                        MUSIC_CLASS.playProgressAnimation();
                    }
                    MUSIC.unMute();
                    MUSIC_CHANGE = 0;

                },300);   
            }   
        }
    }
}


class MusicBox {
    
    constructor(){
        this.overlay = null;
        this.container = null;
        this.musicBoxArea = null;
        this.btnPlayArea = null;
        this.musicBoxImg = null;
        
        this.durationArea = null;
        this.volume =null;
        this.volumeBarArea = null;

        this.progressArea = null;
        this.progressBarArea = null;
        this.currentTimeArea = null;

        this.btnPrev = null;
        this.btnNext = null;

        this.aniFrameCount = 0;
        //this.AdSkipButton = null;

        this.initEvent();
    }
    
    initEvent(){
        this.overlay = $('.overlay');
        this.container = $('.container');
        this.renderLayout();

        this.musicBoxArea = this.container.find('.music-box');
        this.btnPlayArea = this.container.find('.music-box__button--play');
        this.musicBoxImg = this.container.find('.music-box__img');
        
        this.progressArea = this.container.find('.music-box__progress-box');
        this.progressBarArea = this.container.find('.music-box__progress-bar');
        this.currentTimeArea = this.container.find('.music-box__current-time');

        this.durationArea = $('.music-box__duration');
        this.volume = $('.music-box__volume-box');
        this.volumeBarArea = $('.music-box__volume-bar');

        this.btnPrev = $('.music-box__button--prev');
        this.btnNext = $('.music-box__button--next');

        this.musicBoxShowAnimation();
        this.settingData();
    }

    renderLayout(){
        let html = `<article class="music-box">
                    <div class="music-box__container">
                        <div class="music-box__img"></div>
                        <div class="music-box__control">
                            <div class="music-box__button--play ${(MUSIC_STATUS) ? 'is-pause' : ''}"><span></span></div>
                        </div>
                    </div>
                    <div class="music-box__info">
                        <h2 class="music-box__title">${MUSIC_DATA[MUSIC_DATA_COUNT].title}</h2>
                        <span class="music-box__author">${MUSIC_DATA[MUSIC_DATA_COUNT].subTitle}</span>
                    </div>
                    
                    <div class="music-box__progress">
                        <div class="music-box__progress-box">
                            <div class="music-box__time">
                                <span class="music-box__current-time">00:00</span> /
                                <span class="music-box__duration">00:00</span>
                            </div>
                            <div class="music-box__progress-line">
                                <div class="music-box__progress-bar"></div>
                            </div>
                        </div>
                    </div>
                    <div class="music-box__volume">
                        <div class="music-box__volume-box">
                            <div class="music-box__volume-line">
                                <div class="music-box__volume-bar"></div>
                            </div>
                        </div>
                    </div>
                </article>
                <div class="music-box__button--prev"></div>
                <div class="music-box__button--next"></div>`;
        this.container.html(html);
    }
    musicBoxShowAnimation(){
        this.musicBoxArea.stop().animate({
            opacity:1,
            bottom:0,
        },1000, 'easeOutBack')
    }
    settingData(){
        let img = this._getYoutubeImg(MUSIC_ID);
        this.overlay.css('backgroundImage', 'url('+img.lg+')');
        this.musicBoxImg.css('backgroundImage', 'url('+img.xl+')');
        this.volumeBarArea.css({width: MUSIC.getVolume()+'%'});
        this.durationArea.text(timeFormat(MUSIC.getDuration()))
        this.musicEvents();
    }

    musicEvents(){
        this.eventPlay();
        this.eventNextPrev();
        this.eventProgress();
        this.eventVolume();
        this.eventKeyboard();
    }

    eventKeyboard(){
        let that = this;
        $(window).on('keydown', function(e){
            if(e.keyCode == 32){ //스페이스바
                that.btnPlayArea.click();
            }else if(e.keyCode == 37){ //왼쪽
                that.btnPrev.click();
            }else if(e.keyCode == 39){ //오른쪽
                that.btnNext.click();
            }else if(e.keyCode == 13){ //엔터
                $('.music-list__button').click();
            }
        });
    }
    eventPlay(){
        let that = this;
        this.btnPlayArea.on('click', function(e){
            if(!MUSIC_STATUS){
                $(this).addClass('is-pause');
                MUSIC.playVideo();
                MUSIC_STATUS = 1;
                that.playProgressAnimation();

            }else{
                $(this).removeClass('is-pause');
                MUSIC.pauseVideo();
                MUSIC_STATUS = 0;
                cancelAnimationFrame(that._playerCurrentTimes); 
                this.aniFrameCount = 0;
            }
        });
    }
    eventNextPrev(){
        this.btnNext.on('click', function(){
            if(!MUSIC_CHANGE){
                CONTROL_DIRECTION = 'RIGHT';

                if(MUSIC_DATA_COUNT < MUSIC_DATA.length){
                    MUSIC_DATA_COUNT++;    
                }else{
                    MUSIC_DATA_COUNT = 0;
                }
                
                MUSIC_ID = getLastPath(MUSIC_DATA[MUSIC_DATA_COUNT].url);
                MUSIC_TYPE = MUSIC_DATA[MUSIC_DATA_COUNT].type;
                MUSIC_CHANGE = 1;
                MUSIC.loadVideoById(MUSIC_ID);
                MUSIC.mute()
            }
        });
        this.btnPrev.on('click', function(){
            if(!MUSIC_CHANGE){
                CONTROL_DIRECTION = 'LEFT';

                if(MUSIC_DATA_COUNT > 0){
                    MUSIC_DATA_COUNT--;
                }else{
                    MUSIC_DATA_COUNT = MUSIC_DATA.length - 1;
                }

                MUSIC_ID = getLastPath(MUSIC_DATA[MUSIC_DATA_COUNT].url);
                MUSIC_TYPE = MUSIC_DATA[MUSIC_DATA_COUNT].type;
                MUSIC_CHANGE = 1;
                MUSIC.loadVideoById(MUSIC_ID);
                MUSIC.mute()
            }
        });
    }
    eventProgress(){
        let that = this;
        //progress
        this.progressArea.on('mousedown', function(e){
            that.progressArea.addClass('is-active');
        
            that.progressArea.on('mousemove', function(e){
                that.currentTimeArea.text(timeFormat(MUSIC.getCurrentTime()));
                setPlayPosition(e, function(){
                    that.currentTimeArea.text(timeFormat(MUSIC.getCurrentTime()))
                });            
            });

            that.musicBoxArea.on('mouseup', function(e){
                if(that.progressArea.hasClass('is-active')){
                    setPlayPosition(e, function(){
                        that.progressArea.removeClass('is-active');
                        that.playProgressAnimation();
    
                        if(MUSIC_STATUS) {
                            MUSIC.playVideo() 
                        }else{
                            MUSIC.pauseVideo()
                        } 
                        
                    });
                }
            });
        });

        function setPlayPosition(e, callback){
            if(that.progressArea.hasClass('is-active')){
                let c = Math.floor((e.offsetX / that.progressArea[0].clientWidth) * 100);
                if(c <= 100){
                    that.progressBarArea.css({width: c + '%'});
                    MUSIC.seekTo((e.offsetX / that.progressArea[0].clientWidth) * MUSIC.getDuration(),true); 
                    callback();
                }
            }
        }
    }
    eventVolume(){
        let that = this;
        $(this.volume).off('mousedown');
        $(this.volume).on('mousedown', function(e){
            setVolume(e)
            that.volume.addClass('is-active');
            that.volume.on('mousemove', mousemoveEvents);
        });
        $(this.musicBoxArea).off('mouseup');
        $(this.musicBoxArea).on('mouseup', mouseleaveEvent);

        function mouseleaveEvent(){
            if(that.volume.addClass('is-active')){
                that.volume.off('mousemove', mousemoveEvents);
                that.volume.removeClass('is-active');
            }
        }
        function mousemoveEvents(e){
            if(that.volume.hasClass('is-active')){
                setVolume(e)
            }
        }
        function setVolume(e){
            let c = Math.floor((e.offsetX / that.volume[0].clientWidth) * 100);
            if(c <= 100){
                that.volumeBarArea.css({width : c + '%'})
                MUSIC.setVolume(c);    
            }   
        }
    }
     
    _playerCurrentTimes(that){
        if(that.aniFrameCount % 60 == 0){
            if(MUSIC.getDuration() != MUSIC.getCurrentTime() && MUSIC_STATUS ){
                that.progressBarArea.css({width: ( MUSIC.getCurrentTime() / MUSIC.getDuration() ) * 100 + '%' });
                that.currentTimeArea.text( timeFormat(MUSIC.getCurrentTime()));        
                that.playProgressAnimation();
            }else if(MUSIC.getDuration() == MUSIC.getCurrentTime()){
                cancelAnimationFrame(that._playerCurrentTimes); 
                that.currentTimeArea.text($(that.durationArea).text());
                that.btnNext.click();
            }
        }
    }
    _getYoutubeImg(id){
        return {
            xs: 'https://img.youtube.com/vi/'+id+'/sddefault.jpg',
            sm: 'https://img.youtube.com/vi/'+id+'/default.jpg',
            md: 'https://img.youtube.com/vi/'+id+'/mqdefault.jpg',
            lg: 'https://img.youtube.com/vi/'+id+'/hqdefault.jpg',
            xl: 'https://img.youtube.com/vi/'+id+'/maxresdefault.jpg',
        }
    }

    removeMusicBox(){
        this.container.empty();
    }
    playProgressAnimation(){
        let that = this;
        window.requestAnimationFrame(function(){
            that._playerCurrentTimes(that);
        });
    }

    // ads(){
    //     let that = this;
    //     setInterval(function() {
    //         if (!that.AdSkipButton) {
    //             that.AdSkipButton = document.querySelector('.ytp-ad-skip-button.ytp-button');
    //         }
    //         if (that.AdSkipButton) {
    //             that.AdSkipButton.click();
    //         }
    //     }, 250);
    // }
    
}

