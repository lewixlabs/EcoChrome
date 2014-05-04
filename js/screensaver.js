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



/*
<button onclick="lockPointer();">Lock it!</button>
<div id="pointer-lock-element"></div>
<script>
// Note: at the time of writing, only Mozilla and WebKit support Pointer Lock.

// The element we'll make fullscreen and pointer locked.
var elem;

document.addEventListener("mousemove", function(e) {
  var movementX = e.movementX       ||
                  e.mozMovementX    ||
                  e.webkitMovementX ||
                  0,
      movementY = e.movementY       ||
                  e.mozMovementY    ||
                  e.webkitMovementY ||
                  0;

  // Print the mouse movement delta values
  console.log("movementX=" + movementX, "movementY=" + movementY);
}, false);

function fullscreenChange() {
  if (document.webkitFullscreenElement === elem ||
      document.mozFullscreenElement === elem ||
      document.mozFullScreenElement === elem) { // Older API upper case 'S'.
    // Element is fullscreen, now we can request pointer lock
    elem.requestPointerLock = elem.requestPointerLock    ||
                              elem.mozRequestPointerLock ||
                              elem.webkitRequestPointerLock;
    elem.requestPointerLock();
  }
}

document.addEventListener('fullscreenchange', fullscreenChange, false);
document.addEventListener('mozfullscreenchange', fullscreenChange, false);
document.addEventListener('webkitfullscreenchange', fullscreenChange, false);

function pointerLockChange() {
  if (document.mozPointerLockElement === elem ||
      document.webkitPointerLockElement === elem) {
    console.log("Pointer Lock was successful.");
  } else {
    console.log("Pointer Lock was lost.");
  }
}

document.addEventListener('pointerlockchange', pointerLockChange, false);
document.addEventListener('mozpointerlockchange', pointerLockChange, false);
document.addEventListener('webkitpointerlockchange', pointerLockChange, false);

function pointerLockError() {
  console.log("Error while locking pointer.");
}

document.addEventListener('pointerlockerror', pointerLockError, false);
document.addEventListener('mozpointerlockerror', pointerLockError, false);
document.addEventListener('webkitpointerlockerror', pointerLockError, false);

function lockPointer() {
  elem = document.getElementById("pointer-lock-element");
  // Start by going fullscreen with the element. Current implementations
  // require the element to be in fullscreen before requesting pointer
  // lock--something that will likely change in the future.
  elem.requestFullscreen = elem.requestFullscreen    ||
                           elem.mozRequestFullscreen ||
                           elem.mozRequestFullScreen || // Older API upper case 'S'.
                           elem.webkitRequestFullscreen;
  elem.requestFullscreen();
}
</script>
*/