function checkifmobile() {

    var w = window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;

    var h = window.innerHeight
        || document.documentElement.clientHeight
        || document.body.clientHeight;

    if (w < h) {
        
        alert("ბოდიში, ეს აპლიკაცია არ არის თავსებადი მობილური ეკრანის ზომებთან, მისი მოხმარება შესაძლებელია მხოლოდ კომპიუტერით!\n\nთქვენ ხედავთ ამ შეტყობინებას რადგან მოწყობილობის ეკრანის სიმაღლე მეტია ვიდრე სიგანე.");
        window.open("https://m.facebook.com/groups/743514949543906?view=permalink&id=752187548676646", "_self");
        //location.reload();

        //var win = window.open("https://www.facebook.com/groups/geokhutsuri/?post_id=752187548676646", "_blank");
        //win.focus();
    }
}

