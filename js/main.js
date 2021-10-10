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
}

// Therefore we need to add an id “channelName” to the <h1> tag in the “message-area”.

// Now we can start writing a function we call “showHeader()”. We do not need to pass any arguments to it.

// We have two elements we want to address with the function, the channel name and the favorite button. As we want to change the actual html code with our function we need to address the innerHTML of the specific element. In order to do so document.getElementById('channelName').innerHTML = ... is the syntax we need.

// Tip: Remember that the selectedChannel variable always contains the newest selected channel. Then you only need to insert the respective name of the channel object to the syntax you just saw.

// We need to do the same thing but with the favorite button. Here it gets tricky because we need to use our ternary operator ? to distinguish if the favorite attribute of the object is “true” or “false”. If it is true we want to use the “favorite” icon. If it is false we want to use the “favorite_border” icon.
// Tip: If you are struggeling try to google for examples of how to use the ternary operator.

// The last thing we need to do is to call the “showHeader()” function within our “switchChannel(channel)” function.
// Now your app should show the currently highlighted channel’s name and favorite icon in the headbar. That’s already pretty impressive, right?
