console.log("App is alive");
//============================================================================================GLOBAL VARIABLES==============================================================================================

let selectedChannel = channel1;

//============================================================================================CUSTOM FUNCTIONS==============================================================================================

function init() {
  console.log("App is initialized");
  getChannels();
  getMessages();
  loadMessagesIntoChannel();
  displayChannels();
  // loadEmojis();
  // document.getElementById("send-button").addEventListener("click", sendMessage);
  // document
  //   .getElementById("emoticon-button")
  //   .addEventListener("click", toggleEmojiArea);
  // document
  //   .getElementById("close-emoticon-button")
  //   .addEventListener("click", toggleEmojiArea);
}

//============================================================================================SWITCH CHANNEL==============================================================================================

// function switchChannel(channel) /*channel we want to highlight.*/ {
//   console.log(` current channel = "${channel.name}"`); // log the name of the selected channel to the console log.
//   document.getElementById(selectedChannel.id).classList.remove("selected"); //remove the selectedChannel
//   //   console.log(`"selected" class removed from "${selectedChannel.name}"`);
//   document.getElementById(channel.id).classList.add("selected"); //add the “selected” class to the new channel.
//   selectedChannel = channel;
//   //   console.log(`"selected" class added to "${channel.name}"`);
//   //   console.log(`"selectedChannel" now equals to "${selectedChannel.name}"`);
//   showHeader();
// }

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

//should load the existing channels from channels.js to an array variable.
function getChannels() {
  return mockChannels;
}
//should load the existing messages from messages.js to an array variable.
function getMessages() {
  return mockMessages;
}
//================================================================================================END===============================================================================================
// Load our existing channels into the channel area.

function displayChannels() {
  let channels = getChannels();

  const favoriteList = document.getElementById("favorite-channels");
  const regularList = document.getElementById("regular-channels");
  favoriteList.innerHTML = ""; // making sure that there is no content inside these two lists
  regularList.innerHTML = "";

  //The code below takes the empty favorite and regular list, and loads the channels into these two lists

  channels.forEach((channel) => {
    const currentChannelHtmlString =
      `  <li id="` +
      channel.id +
      `"onclick="switchChannel(this.id)">
                                            <i class="material-icons">group</i>
                                            <span class="channel-name">` +
      channel.name +
      `</span>
                                            <span class="timestamp">` +
      channel.latestMessage +
      `</span>
                                            </li>`;
    if (channel.favorite) {
      favoriteList.innerHTML += currentChannelHtmlString;
    } else {
      regularList.innerHTML += currentChannelHtmlString;
    }
  });
}
//================================================================================================END===============================================================================================
// Load messages into the chat section - for each channel

function loadMessagesIntoChannel() {
  let messages = getMessages();
  let channels = getChannels();

  channels.forEach((channel) => {
    message.forEach((message) => {
      if (channel.name == message.channel) {
        channel.messages.push(message);
      }
    });
  });

  // let chatHtmlString = ``;

  // const chatMessages = document.getElementsByClassName("chat-area");
  // chatMessages.innerHTML = ""; // making sure that there is no content inside the chat area

  // messages.forEach((message) => {
  //   if (!messages.own) {
  //     // the html content for incoming messages
  //     chatHtmlString +=
  //       `<div class = "incoming">
  //          <div class="message-wrapper">
  //                <i class="materials-icons chat-icon">account_circle</i>
  //                <div class="messages">
  //                   <div class="username">` +
  //       message.createdBy +
  //       `</div>
  //                     <div class="text">
  //                       <p>` +
  //       message.text +
  //       `</p>
  //                     </div>
  //                   </div>
  //                 </div>
  //                 <div class="timestamp">` +
  //       message.createdOn +
  //       `</div>
  //       </div>`;
  //   } else {
  //     // the html content for outgoing messages
  //     chatHtmlString +=
  //       ` <div class = "outgoing">
  //           <div class="message-wrapper">
  //              <div class="messages">
  //                   <div class="text">
  //                     <p>` +
  //       message.text +
  //       `</p>
  //                   </div>
  //                 </div>
  //                 <i class="materials-icons chat-icon">account_circle</i>
  //               </div>
  //               <div class="timestamp">` +
  //       message.createdOn +
  //       `</div>
  //       </div>`;
  //   }
  // });
  // chatMessages.innerHTML += chatHtmlString;
}

//================================================================================================END===============================================================================================//

// New and Improved Switch Channel Function

function switchChannel(selectedChannelID) /*channel we want to highlight.*/ {
  console.log(` selected channel ID = "${selectedChannelID}"`); // log the selected channel ID to the console log.
  if (!!selectedChannel) {
    document.getElementById(selectedChannel.id).classList.remove("selected");
  } //remove the class “selected” from all the channels which have a different id than the one we clicked.
  document.getElementById(selectedChannelID).classList.add("selected"); //add the “selected” class to the correct channel
  channels.forEach((channel) => {
    if (channel.id === selectedChannelID) {
      selectedChannel = channel;
    }
  }); // make sure that our new channel is saved in the selectedChannel variable.
  showHeader();
  // showMessages();
}

//================================================================================================END===============================================================================================//
