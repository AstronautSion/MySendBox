class Typing{
    constructor(option, callback){
        this.target = null;
        this.text = null;
        this.callback = null;
        this.textKey = null;
        this.setTime = null;
        this.splitTime = null;
        this.initEvent(option, callback);
        this.typingEvent();
    }

    initEvent(option, callback){
        this.target = document.querySelector(option.target);
        this.text = this.escape(option.text);
        this.callback = callback;

        this.aniTime = 0;
        this.textKey = 0;
        this.textSplitPoint = 1;
        this.setTime = this.text.length * 2;
        this.splitTime = Math.floor( this.setTime / this.text.length );
    }
    typingEvent(){
        Array.prototype.slice.call(document.querySelectorAll('.is-typing')).map(function(i){
            i.classList.remove('is-typing');
        });
        this.target.classList.add('is-typing');
        let typingAni = () =>{
            this.aniTime++;
            if(this.textSplitPoint == this.aniTime){ //event 
                this.textSplitPoint += this.splitTime;
                this.target.insertAdjacentHTML('beforeend',this.text[this.textKey]);
                this.textKey++;
            }

            if(this.aniTime < this.setTime){ // loop
                requestAnimationFrame(typingAni);

            }else if(this.aniTime  == this.setTime){  //end
                cancelAnimationFrame(typingAni);
                this.afterTypingEvent();
            }
        };
        requestAnimationFrame(typingAni);
    }
    afterTypingEvent(){
        if(this.callback){
            this.callback(this.target, this.text);
        }
    }
    escape(unsafe){
        return unsafe
             .replace(/&/g, "&amp;")
             .replace(/</g, "&lt;")
             .replace(/>/g, "&gt;")
             .replace(/"/g, "&quot;")
             .replace(/'/g, "&039;");
    }
    
}

 