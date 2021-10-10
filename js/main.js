console.log("App is alive");

let selectedChannel = channel1;
//============================================================================================CUSTOM FUNCTIONS==============================================================================================

function switchChannel(channel) /*channel we want to highlight.*/ {
  console.log(channel.name);

  console.log(` current channel = "${channel.name}"`); // log the name of the selected channel to the console log.

  document.getElementById(selectedChannel.id).classList.remove("selected"); //remove the selectedChannel
  console.log(`"selected" class removed from "${selectedChannel.name}"`);

  document.getElementById(channel.id).classList.add("selected"); //add the “selected” class to the new channel.

  selectedChannel = channel;
  console.log(`"selected" class added to "${channel.name}"`);
  console.log(`"selectedChannel" now equals to "${selectedChannel.name}"`);

  showHeader();
}

function showHeader() {
  console.log("showHeader Function called");
  document.getElementById("channelName").innerHTML = selectedChannel.name;

  document.getElementById("favorite-button").innerHTML =
    selectedChannel.favorite ? "favorite" : "favorite_border";
}
