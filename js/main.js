console.log("App is alive");
//============================================================================================GLOBAL VARIABLES==============================================================================================

let selectedChannel = channel1;

//============================================================================================CUSTOM FUNCTIONS==============================================================================================

//============================================================================================SWITCH CHANNEL==============================================================================================

function switchChannel(channel) /*channel we want to highlight.*/ {
  console.log(` current channel = "${channel.name}"`); // log the name of the selected channel to the console log.
  document.getElementById(selectedChannel.id).classList.remove("selected"); //remove the selectedChannel
  //   console.log(`"selected" class removed from "${selectedChannel.name}"`);
  document.getElementById(channel.id).classList.add("selected"); //add the “selected” class to the new channel.
  selectedChannel = channel;
  //   console.log(`"selected" class added to "${channel.name}"`);
  //   console.log(`"selectedChannel" now equals to "${selectedChannel.name}"`);
  showHeader();
}

//============================================================================================SHOW HEADER==============================================================================================

function showHeader() {
  console.log("showHeader Function called");
  document.getElementById("channelName").innerHTML = selectedChannel.name;

  document.getElementById("favorite-button").innerHTML =
    selectedChannel.favorite ? "favorite" : "favorite_border";
}

//============================================================================================SEND MESSAGE==============================================================================================

function sendMessage() {
  let messageId = document.getElementById("message-input");
  let messageText = messageId.value; // Assign the value of the message input to the variable 'messageText'
  console.log(messageText); // Make sure the message text is logged into the console.

  let messageString;
  messageString = ` 
     <div class="outgoing">
        <div class="message-wrapper">
           <div class="messages">
              <div class="text"><p>${messageText}</p></div>
            </div>
          <i class="material-icons chat-icon">account_circle</i>
        </div>
        <div class="timestamp">11:52</div>
     </div>`;

  document.getElementById("chat-area").innerHTML = messageString; // Now we just have to make sure that our message gets actually displayed in our message area.

  messageId.value = ``; // We now want to clear our input field after our message was sent.
}

//================================================================================================END===============================================================================================

// 8. Save your work
// Do not forget to save your work! You will build upon your code in the next implementation challenge.
