
function setScreenSaver(bActivated, intMinutesToWait){
        
    chrome.runtime.sendMessage({cmdType: bActivated?"startScreenSaver":"stopScreenSaver", cmdMinutesToWait: intMinutesToWait}, function(response) {
        
        //console.log(response.farewell);
    });
}


function updateEcoChrome(bScreenSaverEnabled){
    
    if (bScreenSaverEnabled){
        
        setScreenSaver(true,$("#inputMinutes").val());

        // non obbligatorio ma non fa danni collaterali
        $("#inputMinutes").prop("readonly",true);
        
        $("#btnDrpDwnEnableEnableEcoChrome").text("Eco Chrome Enabled");
        $("#btnDrpDwnEnableEnableEcoChrome").removeClass("btn btn-default").addClass("btn btn-success");
        $("#btnDrpDwnArrow").removeClass("btn btn-default dropdown-toggle").addClass("btn btn-success dropdown-toggle");    

        $("#idTextActivityMinutes").hide();
        $("#idTextActivityMinutesTextOnly").text("Starts after " + $("#inputMinutes").val() + " minutes of inactivty");
        $("#idTextActivityMinutesTextOnly").show();
        
        $("#btnTry").prop('disabled', true);
    } else {
        
        setScreenSaver(false,$("#inputMinutes").val());

        // non obbligatorio ma non fa danni collaterali
        $("#inputMinutes").prop("readonly",false);

        $("#btnDrpDwnEnableEnableEcoChrome").text("Eco Chrome Disabled");
        $("#btnDrpDwnEnableEnableEcoChrome").removeClass("btn btn-success").addClass("btn btn-default");
        $("#btnDrpDwnArrow").removeClass("btn btn-success dropdown-toggle").addClass("btn btn-default dropdown-toggle");        

        $("#idTextActivityMinutes").show();
        $("#idTextActivityMinutesTextOnly").hide();
        
        $("#btnTry").prop('disabled', false);
    }
}

$("#liEnableEcoChrome").bind("click",function(){
    
    //console.log("abilito screensaver");
    updateEcoChrome(true);
});

$("#liDisableEcoChrome").bind("click",function(){

    //console.log("disabilito screensaver");
    updateEcoChrome(false);
})

$("#btnTry").bind("click",function(){
    
    chrome.app.window.create('screensaver.html', {

        alwaysOnTop: true,
        resizable: false,
        state: 'fullscreen'
    });
});

$("#btnClose").bind("click",function(){
    chrome.app.window.current().close();
});

$("#inputMinutes").bind("blur",function(){

    if (!$.isNumeric($("#inputMinutes").val()) || $("#inputMinutes").val()<1)
        $("#inputMinutes").val(5);
    
});


/*
 ***** window events *****
*/
window.onload = function (){
    
    if (window.onLoadScreenSaverEnabled !== undefined && window.onLoadMinutesToWait !== undefined){
        
        $("#inputMinutes").val(window.onLoadMinutesToWait);
        updateEcoChrome(window.onLoadScreenSaverEnabled);
    }    
}