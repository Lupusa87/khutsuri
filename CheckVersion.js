function checkversion() {

    let currVersion = "1.0.8";

    let storedVersion = localStorage.getItem("appversionjs");

    //console.log(currVersion);
    //console.log(storedVersion);

    if (storedVersion !== null ) {

        if (currVersion !== storedVersion) {
            localStorage.setItem("appversionjs", currVersion);
            EmptyCacheAndHardReload(currVersion);

            
        }
    }
    else {
        localStorage.setItem("appversionjs", currVersion);
        if (localStorage.getItem("appversion") !== null) {
            EmptyCacheAndHardReload(currVersion);
        }
    }
}


function EmptyCacheAndHardReload(v) {
    console.log("მიმდინარეობს განახლება ვერსიამდე " + v);
    window.caches.keys()
        .then(keys => {
            for (let key of keys) {
                caches.delete(key);
                window.location.reload(true);
            }
        });
}















