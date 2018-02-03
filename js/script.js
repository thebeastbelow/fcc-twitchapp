var channelList = [
  "ESL_SC2",
  "OgamingSC2",
  "cretetion",
  "freecodecamp",
  "storbeck",
  "habathcx",
  "RobotCaleb",
  "noobs2ninjas",
  "bipdongoe",
  "freecookiess"
];
var channelURL = "https://wind-bow.glitch.me/twitch-api/channels/";
var streamURL = "https://wind-bow.glitch.me/twitch-api/streams/";
var userList;

$(document).ready(function() {
  userList = $("#userList");
  for (var i = 0; i < channelList.length; i++) {
    createListItemFor(channelList[i]);
  }
});

function createListItemFor(username) {
  var data = {};
  $.getJSON(channelURL + username, function(channelData) {
    data.name = channelData.display_name;
    data.url = channelData.url;
    data.logoUrl = channelData.logo;
    data.details = channelData.status;
    $.getJSON(streamURL + username, function(streamData) {
      data.status = (streamData.stream != null);
      var instance = $("#template").clone().removeClass("d-none");
      instance.attr("href", data.url);
      instance.find("#name").text(data.name);
      instance.find("#status")
        .text(data.status ? "online" : "offline")
        .addClass(data.status ? "blue" : "red");
      instance.find("#details")
        .text(data.status ? data.details : "");
      instance.find("#logo").attr("src", data.logoUrl);
      if (data.status) {
        userList.prepend(instance);
      } else {
        userList.append(instance);
      }
    });
  });
}
