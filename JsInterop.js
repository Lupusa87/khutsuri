function routeEvent(msg) {
    window.BJSFDEJsFunctions.InvokeOnMessageAction(msg);
}

function uint8ToBase64(bytes) {
    let binary = "";
    const chunkSize = 0x8000;

    for (let i = 0; i < bytes.length; i += chunkSize) {
        const slice = bytes.subarray(i, i + chunkSize);
        binary += String.fromCharCode.apply(null, slice);
    }

    return btoa(binary);
}

window.BJSFDEJsFunctions = {
    SetStringData: function (variableName, text) {
        window[variableName] = text;
        return true;
    },
    GetStringData: function (variableName) {
        const result = window[variableName] ?? "";
        delete window[variableName];
        return result;
    },
    GetBinaryDataLenght: function (variableName) {
        const result = window[variableName];
        return result ? result.byteLength : 0;
    },
    GetBinaryDataBase64: function (variableName) {
        const result = window[variableName];
        delete window[variableName];

        if (!result) {
            return "";
        }

        return uint8ToBase64(new Uint8Array(result));
    },
    GetBinaryDataChunkBase64: function (variableName, position, chunkSize) {
        const result = window[variableName];

        if (!result) {
            return "";
        }

        return uint8ToBase64(new Uint8Array(result, position, chunkSize));
    },
    InvokeOnMessageAction: function (msg) {
        DotNet.invokeMethodAsync("BlazorOldGeorgianScripts", "HandleMessage", msg);
        return true;
    },
    InvokeOnProgressAction: function (msg) {
        DotNet.invokeMethodAsync("BlazorOldGeorgianScripts", "HandleProgress", msg);
        return true;
    }
};


function getArrayBufferFromFileAsync(file, o) {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
        reader.onload = function () { resolve(reader.result); };
        reader.onprogress = function (e) {
            window.BJSFDEJsFunctions.InvokeOnProgressAction("loadprogress," + e.loaded + "," + e.total);
        };
        reader.onerror = function (err) { reject(err); };

        switch (o) {
            case 0:
                reader.readAsArrayBuffer(file);
                break;
            case 1:
                reader.readAsText(file);
                break;
            default:
                reader.readAsArrayBuffer(file);
        }


    });
}



window.JsFunctions = {
    AdjustPageHeigh: function () {
        
        //let rect = document.getElementById("mydiv1").getBoundingClientRect();

        //var x = rect.height;
        //var pageH = 1600;
   
        //x = x % pageH;
        //x = pageH - x;
        //x = x + pageH*3;
        var x = 3000;
        document.getElementById("mydiv2").style = "height:"+x+"px";
        return 0;
    },
    SetHtmlValue: function () {
        if (document.getElementById("mydiv555") !== null) {
            document.getElementById("mydiv555").innerHTML = window["mytmpvar123"];
            document.getElementById("mydivparent").scrollTop = 0;

        }
        delete window["mytmpvar123"];
    },
    HasFile: function (inputFile) {
        return document.getElementById(inputFile).files.length > 0;
    },
    OpenInputFileDialog: function (inputFile) {
        document.getElementById(inputFile).click();
        return true;
    },
    ReadFile: async function (v, inputFile) {
        window[v] = await getArrayBufferFromFileAsync(document.getElementById(inputFile).files[0], 0);
        window.BJSFDEJsFunctions.InvokeOnMessageAction("fileloadingdone");
        return true;
    },
    SaveAsFile: function (filename) {
        var link = document.createElement('a');
        link.download = filename;
        link.href = "data:application/octet-stream;base64," + btoa(window["tmpexportdata1"]);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        delete window["tmpexportdata1"];
        return true;
    }
};
