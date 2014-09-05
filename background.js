var screenSaverSettings = {
    bScreenSaverEnabled : false,
    minutesToWait: 5
};

// local data
var local_bScreenSaverStarted = false;

chrome.app.runtime.onLaunched.addListener(function() {
    //console.log("app lanciata");
    
    chrome.storage.sync.get("storage_screenSaverSettings", function(items) {
        
        if (items.storage_screenSaverSettings === undefined){
            
            screenSaverSettings.bScreenSaverEnabled = false;
            screenSaverSettings.minutesToWait = 5;
        } else {
            
            screenSaverSettings = items.storage_screenSaverSettings;
        }
        
        //console.log("ok settings loaded");
        //console.log(screenSaverSettings.bScreenSaverEnabled);
        //console.log(screenSaverSettings.minutesToWait);
        
        // local settings
        local_bScreenSaverStarted = false;
        
        chrome.app.window.create(
            'window.html',
            {
                id: 'idWinEcoChromeSettings',
                
                outerBounds: {
                    minWidth: 575,
                    minHeight: 450
                },
                
                resizable: false
            },
            function (createdWindow) {
                
                createdWindow.contentWindow.onLoadScreenSaverEnabled = screenSaverSettings.bScreenSaverEnabled;
                createdWindow.contentWindow.onLoadMinutesToWait = screenSaverSettings.minutesToWait;
            }
        );
    });
        
});


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    
    /*
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension/app");
    */
      
    if (
        (request.cmdType !== undefined && request.cmdMinutesToWait !== undefined)   &&
        (request.cmdType == "startScreenSaver" || request.cmdType == "stopScreenSaver")
    ){
        
        // update settings
        screenSaverSettings.bScreenSaverEnabled = request.cmdType == "startScreenSaver"?true:false;
        screenSaverSettings.minutesToWait = request.cmdMinutesToWait;
        
        // saves to Google Sync
        chrome.storage.sync.set({"storage_screenSaverSettings": screenSaverSettings}, function() {

            // Notify that we saved.
            //console.log("ok settings saved");
            //console.log(screenSaverSettings.bScreenSaverEnabled);
            //console.log(screenSaverSettings.minutesToWait);
            
            if (request.cmdType == "startScreenSaver"){

                chrome.alarms.create("alarmScreenSaver",{
                    'when': Date.now(),
                    'periodInMinutes': 1
                });

                sendResponse({farewell: "okStarted!"});
            }

            if (request.cmdType == "stopScreenSaver"){

                chrome.alarms.clearAll();

                // update settings
                local_bScreenSaverStarted = false;

                sendResponse({farewell: "okStopped!"});
            }

        });
    }
      
});


chrome.alarms.onAlarm.addListener(function (alarm){
    //console.log("alarm event");
    
    chrome.idle.queryState(screenSaverSettings.minutesToWait*60, function (newState){

        switch (newState){
            case "idle":
                //console.log("newState = idle");
                if (!local_bScreenSaverStarted){

                    chrome.app.window.create('screensaver.html', {
                        //id: 'idWinEcoChromeScreenSaver',
                        /*'bounds': {
                            'width': 750,
                            'height': 295
                        },*/
                        alwaysOnTop: true,
                        resizable: false,
                        state: 'fullscreen'
                    });

                    local_bScreenSaverStarted = true;
                }
                break;

            case "active":
                //console.log("newState = active");
                break;

            case "locked":
                //console.log("newState = locked");
                break;
        }
    });

});
