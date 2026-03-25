function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}



window.BCHJsFunctions = {
    DisableContextMenu: function (cID) {
        document.getElementById(cID).addEventListener("contextmenu", (e) => { e.preventDefault(); return false; })
        return true;
    },
    LogCanvas: function (cID) {
        var ctx = document.getElementById(cID).getContext('2d');
        console.log(ctx);
        return true;
    },
    BeginPath: function (cID) {
        document.getElementById(cID).getContext('2d').beginPath();
        return true;
    },
    MoveTo: function (cID, x, y) {
        document.getElementById(cID).getContext('2d').moveTo(x, y);
        return true;
    },
    LineTo: function (cID, x, y) {
        document.getElementById(cID).getContext('2d').lineTo(x, y);
        return true;
    },
    MouseMoveTo: function (cID, x, y) {
        var c = document.getElementById(cID);
        let rect = c.getBoundingClientRect();

        c.getContext('2d').moveTo(Math.trunc(x - rect.left), Math.trunc(y - rect.top));

        return true;
    },
    MouseLineTo: function (cID, x, y) {
        let c = document.getElementById(cID);
        let rect = c.getBoundingClientRect();

        c.getContext('2d').lineTo(x - rect.left, y - rect.top);
        return true;
    },
    Stroke: function (cID) {
        document.getElementById(cID).getContext('2d').stroke();
        return true;
    },
    SetProperty: function (cID, p, v) {
        document.getElementById(cID).getContext('2d')[p] = v;
        return true;
    },
    ClearCanvas: function (cID) {
        var ctx = document.getElementById(cID).getContext('2d');
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        return true;
    },
    SetBG: function (cID, c) {
        var ctx = document.getElementById(cID).getContext('2d');
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = c;
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        return true;
    },
    FillText: function (cID, t) {
        var ctx = document.getElementById(cID).getContext('2d');
        ctx.fillText(t, ctx.canvas.clientHeight / 2, ctx.canvas.clientHeight / 2);
        return true;
    }
};
