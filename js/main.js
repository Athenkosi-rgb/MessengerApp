console.log("App is alive");
//============================================================================================GLOBAL VARIABLES==============================================================================================

class Message {
  constructor(myUserName, dateTime, own, text, channelID) {
    this.createdBy = myUserName;
    this.createdOn = dateTime;
    this.own = own;
    this.text = text;
    this.id = channelID;
  }
}
let selectedChannel = channel1;

//============================================================================================CUSTOM FUNCTIONS==============================================================================================

function init() {
  console.log("App is initialized");
  getChannels();
  getMessages();
  loadMessagesIntoChannel();
  displayChannels();
  // loadEmojis();
  document.getElementById("send-button").addEventListener("click", sendMessage);
  // document
  //   .getElementById("emoticon-button")
  //   .addEventListener("click", toggleEmojiArea);
  // document
  //   .getElementById("close-emoticon-button")
  //   .addEventListener("click", toggleEmojiArea);
}

//============================================================================================SWITCH CHANNEL==============================================================================================

function switchChannel(selectedChannelID) /*channel we want to highlight.*/ {
  console.log("switchChannel Function called");
  let channels = getChannels();
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
  showMessages();
}

//============================================================================================SHOW HEADER==============================================================================================

function showHeader() {
  console.log("showHeader Function called");
  //access the channel name and the favorite boolean of the currently selected channel.

  document.getElementById("channelName").innerHTML = selectedChannel.name;

  document.getElementById("favorite-button").innerHTML =
    selectedChannel.favorite ? "favorite" : "favorite_border";
}

//============================================================================================SEND MESSAGE==============================================================================================
function showMessages() {
  console.log("showMessages Function called");
  let messages = getMessages();
  let channels = getChannels();

  let chatHtmlString = ``;
  const chatMessages = document.getElementById("chat-area");
  chatMessages.innerHTML = ""; // making sure that there is no content inside the chat area

  channels.forEach((channel) => {
    if (selectedChannel.id === channel.id) {
      channel.messages.forEach((message) => {
        if (channel.messages.own === false) {
          // the html content for incoming messages
          chatHtmlString +=
            `<div class = "incoming">
       <div class="message-wrapper">
       <i class="material-icons chat-icon">account_circle</i>
             <div class="messages">
                <div class="username">` +
            message.createdBy +
            `</div>
                  <div class="text">
                    <p>` +
            message.text +
            `</p>
                  </div>
                </div>
              </div>
              <div class="timestamp">14:00</div>
    </div>`;
        } else {
          // the html content for outgoing messages
          chatHtmlString +=
            `<div class="outgoing">
      <div class="message-wrapper">
        <div class="messages">
          <div class="text"><p>` +
            message.text +
            `</p></div>
        </div>
        <i class="material-icons chat-icon">account_circle</i>
      </div>
      <div class="timestamp">14:00</div>
      </div> 
     `;
        }
      });
    }
  });

  chatMessages.innerHTML = chatHtmlString;

  // This is the proper code but the timestamp messses up the formating, Hence I am using the temporary solution above for now

  //     chatHtmlString +=
  //       `<div class = "incoming">
  //      <div class="message-wrapper">
  //      <i class="material-icons chat-icon">account_circle</i>
  //            <div class="messages">
  //               <div class="username">` +
  //       message.createdBy +
  //       `</div>
  //                 <div class="text">
  //                   <p>` +
  //       message.text +
  //       `</p>
  //                 </div>
  //               </div>
  //             </div>
  //             <div class="timestamp">` +
  //       message.createdOn +
  //       `</div>
  //   </div>`;
  //   }
  //   // the html content for outgoing messages
  //   chatHtmlString +=
  //     `<div class="outgoing">
  //     <div class="message-wrapper">
  //       <div class="messages">
  //         <div class="text"><p>` +
  //     message.text +
  //     `</p></div>
  //       </div>
  //       <i class="material-icons chat-icon">account_circle</i>
  //     </div>
  //     <div class="timestamp">` +
  //     message.createdOn +
  //     `</div>
  //     </div>
  //    `;
  // });

  chatMessages.innerHTML += chatHtmlString;
}
//============================================================================================SEND MESSAGE==============================================================================================

function sendMessage() {
  const text = document.getElementById("message-input").value;
  if (!!text) {
    const myUserName = "Athenkosi";
    const own = true;
    const dateTime = "14:00";
    const channelID = selectedChannel.id;
    const message = new Message(myUserName, dateTime, own, text, channelID);
    console.log("New message: ", message);
    selectedChannel.messages.push(message);
    document.getElementById("message-input").value = "";
    showMessages();
    displayChannels();
  } else {
    return;
  }
}

//================================================================================================END===============================================================================================

//should load the existing channels from channels.js to an array variable.
function getChannels() {
  console.log("getChannels Function called");
  return mockChannels;
}
//should load the existing messages from messages.js to an array variable.
function getMessages() {
  console.log("getMessages Function called");
  return mockMessages;
}
//================================================================================================END===============================================================================================
// Load our existing channels into the channel area.

function displayChannels() {
  console.log("displayChannels Function called");
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
                                            <i class="material-icons group-icon">group</i>
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
  console.log("loadMessagesIntoChannel Function called");
  let messages = getMessages();
  let channels = getChannels();

  channels.forEach((channel) => {
    messages.forEach((message) => {
      if (channel.name == message.channel) {
        channel.messages.push(message);
      }
    });
  });
}

//==================================================================================================================================================================================================
