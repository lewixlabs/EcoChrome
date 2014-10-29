var bPopoverActive = false;

function handlePopover(){
    
    if (!bPopoverActive){

        $("#imgEcoChrome").popover({
            content: "Press ESC key to exit",
            html: false,
            placement: "bottom",
            /* seems not working
            delay: {
                show: 50000,
                hide: 30000
            },
            */
            
            animation: true
        });
        
        $("#imgEcoChrome").popover("show");
        setTimeout(function(){$("#imgEcoChrome").popover("hide");},3000);        
    }
}

window.onload = function () {

    // mouse cursor hidden by css
    /*
    $('html').css({
                cursor: 'none'
            });
    */
    //lockPointer();

    // popover on mousemove
    window.addEventListener("mousemove", function(e) {

        handlePopover();
    }, false);

    
    $('#imgEcoChrome').on('hidden.bs.popover', function () {

        // do something…
        bPopoverActive = false;
    });


    $('#imgEcoChrome').on('show.bs.popover', function () {

        // do something…
        bPopoverActive = true;
    });

}

window.onkeydown = function (e) {

    if (e.keyCode == 27 /* ESC */ ) {

        chrome.app.window.current().close();
        e.preventDefault();
    } else {

        // popover on keydown (except ESC used to exit)
        handlePopover();
    }
}

