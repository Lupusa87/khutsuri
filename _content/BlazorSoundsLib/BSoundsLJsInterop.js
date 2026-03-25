var myaudio;
var oldtime = 0;

var audioCtx;

window.BSoundsLJsInterop = {
    InitializeSound: function (path, dotnetHelper) {
        oldtime = 0;
        myaudio = new Audio(path);

        myaudio.oncanplay = (event) => {
            dotnetHelper.invokeMethodAsync('InvokeOnCanPlay', Math.floor(myaudio.duration));
        };
        myaudio.onended = (event) => {
            dotnetHelper.invokeMethodAsync('InvokeOnEnd');
        };
        myaudio.ontimeupdate = (event) => {
            var t = Math.floor(myaudio.currentTime);

            if (t > oldtime) {
                dotnetHelper.invokeMethodAsync('InvokeOnTimeChange', t);
                oldtime = t;
            }
        };


        return true;
    },
    ManageSound: function (command, vol) {
        if (command === "play") {
            myaudio.currentTime = 0;
            myaudio.volume = vol*0.01;
            myaudio.play();
        }
        else {
            myaudio.pause();
        }
        return true;
    },
    SeekSound: function (time) {
            myaudio.currentTime = time;
            myaudio.play();
       
        return true;
    },
    Beep: function (vol, freq, duration) {
        if (audioCtx === undefined) {
            audioCtx = new AudioContext();
        }
        v = audioCtx.createOscillator();
        u = audioCtx.createGain();
        v.connect(u);
        v.frequency.value = freq;
        v.type = "square";
        u.connect(audioCtx.destination);
        u.gain.value = vol * 0.01;
        v.start(audioCtx.currentTime);
        v.stop(audioCtx.currentTime + duration * 0.001);

        return true;
    }
};