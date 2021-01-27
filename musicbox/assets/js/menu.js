$(document).ready(function(){
  menuEvent();
  addMusicList();
  removeMusicList();
});
// menu event
function menuEvent(){
    let $btnList = $('.music-list__button');
    let $list = $('.music-list');
    let $listUl = $('.music-list__ul');

    const createMenuList = function(){
        let html = '';
        MUSIC_DATA.map(function(list,index){

            html += `<li class="music-list__item ${(index == MUSIC_DATA_COUNT) ? 'is-active' : ''}" data-idx="${index}" title="${list.title}">
                        <i class="icon-${list.type}"></i>
                        <div class="music-list__text">
                            <span class="music-list__title">${list.title}</span>
                            <span class="music-list__sub-title">${list.subTitle}</span>
                        </div>
                    </li>`;
        });

        $listUl.html(html)
    }
    createMenuList();
    let $listItem = $('.music-list__item');

    $btnList.on('click', function(){
        $btnList.toggleClass('is-active');
        if($btnList.hasClass('is-active')){
            $list.stop().animate({right:0},300, 'easeInOutExpo');
        }else{
            $list.stop().animate({right:'-18rem'},190, 'easeInOutExpo');
        }
    });

    // $(window).on('click', function(e){
    //     if( 
    //         !($(e.target).parents().is('.music-list') || $(e.target).hasClass('music-list') ) &&
    //         !($(e.target).parents().is('.music-list__button') || $(e.target).hasClass('music-list__button'))
    //     ){
    //         $btnList.removeClass('is-active');
    //         $list.stop().animate({right:'-18rem'},190, 'easeInOutExpo');
    //     }
    // });

    
    $listItem.on('click', function(){
        $listItem.removeClass('is-active');
        $(this).addClass('is-active');
        MUSIC_DATA_COUNT = $(this).data('idx');
        MUSIC_ID = getLastPath(MUSIC_DATA[MUSIC_DATA_COUNT].url);
        MUSIC_TYPE = MUSIC_DATA[MUSIC_DATA_COUNT].type;
        MUSIC_CHANGE = 1;
        MUSIC.loadVideoById(MUSIC_ID);
        MUSIC.mute()
    });
}

function addMusicList(){
    let $btnAddMusic = $('.music-list__button--add');
    $btnAddMusic.on('click', function(){
      alert('준비중입니다.')
    });
}

function removeMusicList(){
  let $btnModifyMusic = $('.music-list__button--modify');
  $btnModifyMusic.on('click', function(){
    alert('준비중입니다.')
  });
}