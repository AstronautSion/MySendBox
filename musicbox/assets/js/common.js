let MUSIC_DATA = [{
    'type': 'youtube',
    'url' : 'https://youtu.be/a9BbXvrB86E',
    'title': 'SWD',
    'subTitle': 'Taylor'
},{
    'type': 'youtube',
    'url': 'https://youtu.be/cHwoSiXO-MI',
    'title': 'Starlight',
    'subTitle': '정효빈'
},{
    'type': 'youtube',
    'url': 'https://youtu.be/e8DfkZ0HDXE',
    'title': 'DIFFERENT',
    'subTitle': 'WOODZ'
},{
    'type': 'youtube',
    'url': 'https://youtu.be/I_gqdOUiMQE',
    'title': '진심',
    'subTitle': 'jeebanoff'
},{
    'type': 'youtube',
    'url': 'https://youtu.be/BiQ7DtzRya0',
    'title': '여기서서',
    'subTitle': 'jeebanoff'
},{
    'type': 'youtube',
    'url': 'https://youtu.be/oBmu8ScGRQk',
    'title': 'Flashback',
    'subTitle': 'YELLA'
}];


let MUSIC_STATUS = 0;
let MUSIC_DATA_COUNT = 0;
let MUSIC_CHANGE = 0;
let MUSIC = null;
let MUSIC_CLASS = null;

let MUSIC_ID = getLastPath(MUSIC_DATA[MUSIC_DATA_COUNT].url);
let MUSIC_TYPE = MUSIC_DATA[MUSIC_DATA_COUNT].type; 
let CONTROL_DIRECTION = null;

function getLastPath(url){
    return url.split('/')[url.split('/').length - 1];
}



function timeFormat(time) {
    var timestamp = time;
    var hours = Math.floor(timestamp / 60 / 60);
    var minutes = Math.floor(timestamp / 60) - (hours * 60);
    var seconds = Math.ceil(timestamp % 60);
    var formatted = '';

    if(minutes < 10){ minutes = '0' + String(minutes);}
    if(seconds < 10){ seconds = '0' + String(seconds);}

    (hours) 
        ?  formatted = hours+':'+minutes+':'+seconds 
        : formatted =  minutes+':'+seconds

    return formatted;
}
   


