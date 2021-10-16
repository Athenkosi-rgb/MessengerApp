// Hello World
console.log("App is alive");

//============================================================================================GLOBAL VARIABLES==============================================================================================

//Global variables
let selectedChannel = channel1;
let channels = getChannels();
let messages = getMessages();

//should load the existing channels from channels.js to an array variable.
function getChannels() {
  return mockChannels;
}
//should load the existing messages from messages.js to an array variable.
function getMessages() {
  return mockMessages;
}

// get browser language for formatting of time stamp -- From solution
const browserLanguage = navigator.language || navigator.userLanguage;

//classes
class Channel {
  constructor(name) {
    this.id = Math.random().toString(36).substr(2, 10);
    this.name = name;
    this.favorite = false;
    this.messages = [];
  }
}

class Message {
  constructor(myUserName, dateTime, own, text, channelID) {
    this.createdBy = myUserName;
    this.createdOn = new Date(Date.now());
    this.own = own;
    this.text = text;
    this.id = channelID;
  }
}

//============================================================================================CUSTOM FUNCTIONS==============================================================================================

// Functions to execute when DOM has loaded
function init() {
  console.log("App is initialized");
  getChannels();
  getMessages();
  loadMessagesIntoChannel();
  displayChannels();
  loadEmojis();
  document.getElementById("send-button").addEventListener("click", sendMessage);
  document
    .getElementById("emoticon-button")
    .addEventListener("click", toggleEmojiArea);
  document
    .getElementById("close-emoticon-button")
    .addEventListener("click", toggleEmojiArea);
}

//============================================================================================CUSTOM FUNCTIONS==============================================================================================

// Object method that returns the date of the latest message (to display it in channel section)
Channel.prototype.latestMessage = function () {
  //if messages exist, display timestamp
  if (!!this.messages.length) {
    const latest = new Date(
      Math.max(...this.messages.map((message) => message.createdOn))
    );
    // if message is from yesterday or older, display date, else display time
    if (new Date().getDate() - latest.getDate() > 1) {
      return latest.toLocaleDateString(browserLanguage, {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      });
    } else {
      return latest.toLocaleTimeString(browserLanguage, {
        hour: "numeric",
        minute: "numeric",
      });
    }
  } else {
    return "No Messages";
  }
};

function cancelChannel() {
  document.getElementById("newChannel-background").style.display = "none";
  document.getElementById("newChannel-name").value = "";
}

// Event listener: Call confirmChannel() if user clicks on add-button
document.getElementById("add-button").addEventListener("click", confirmChannel);

// creates Channel when Enter is pressed
function confirmChannel() {
  document.getElementById("newChannel-name").onkeydown = function (e) {
    if (e.keyCode == 13) {
      createChannel();
      document.getElementById("newChannel-background").style.display = "none";
    }
  };
}

// creates channel when create-button is pressed
function confirmChannel2() {
  createChannel();
  document.getElementById("newChannel-background").style.display = "none";
}

// New channel is created with value from input. Return if input is empty
function createChannel() {
  console.log("createChannel called");
  const newChannel = document.getElementById("newChannel-name").value;
  if (!!newChannel) {
    const chanler = new Channel(newChannel);
    console.log("New Channel: ", chanler);
    channels.push(chanler);
    //     channels.unshift(channel);
    document.getElementById("newChannel-name").value = "";
    selectedChannel = chanler;
    displayChannels();
    switchChannel(chanler.id);
  } else {
    console.log("returning from createChannel");
    return;
  }
}

// Event listener: Call favoriteChannel() if user clicks on favorite button
document
  .getElementById("favorite-button")
  .addEventListener("click", favoriteChannel);

// Event listener: Call add-button if user clicks on favorite button
document
  .getElementById("add-button")
  .addEventListener("click", displayNewChannelWindow);
function displayNewChannelWindow() {
  document.getElementById("newChannel-background").style.display = "initial";
}

// Toggles favorite property of channel and displays channel accordingly in sidebar
function favoriteChannel() {
  selectedChannel.favorite = selectedChannel.favorite ? false : true;
  channels.forEach((channel) => {
    if (channel.id === selectedChannel.id) {
      channel = selectedChannel;
    }
  });
  displayChannels();
  switchChannel(selectedChannel.id);
}

// simple sort function: insert current channel at [0] in channels array and call it if new message is sent
function sortChannels() {
  //remove first
  channels = channels.filter((channel) => channel.id !== selectedChannel.id);
  //insert
  channels.unshift(selectedChannel);
}

//================================================================================================END===============================================================================================
// Load our existing channels into the channel area.

function displayChannels() {
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
      channel.latestMessage() +
      `</span>
                                            </li>`;
    if (channel.favorite) {
      favoriteList.innerHTML += currentChannelHtmlString;
    } else {
      regularList.innerHTML += currentChannelHtmlString;
    }
  });
  // always add selected class to current channel --From Solution
  if (!!selectedChannel) {
    document.getElementById(selectedChannel.id).classList.add("selected");
  }
}

//============================================================================================CUSTOM FUNCTIONS==============================================================================================

function switchChannel(selectedChannelID) /*channel we want to highlight.*/ {
  console.log(` selected channel ID = "${selectedChannelID}"`);
  if (!!selectedChannel) {
    document.getElementById(selectedChannel.id).classList.remove("selected");
  }
  document.getElementById(selectedChannelID).classList.add("selected");
  channels.forEach((channel) => {
    if (channel.id === selectedChannelID) {
      selectedChannel = channel;
    }
  });
  // hide user prompt and show input area the first time a user selects a channel --From Solution
  if (!!document.getElementById("select-channel")) {
    document.getElementById("select-channel").style.display = "none";
    document.getElementById("input-area").style.display = "flex";
    document.getElementById("headbar-chat").style.display = "flex";
  }
  showHeader();
  showMessages();
}

//============================================================================================SHOW HEADER==============================================================================================

function showHeader() {
  //access the channel name and the favorite boolean of the currently selected channel.
  document.getElementById("channelName").innerHTML = selectedChannel.name;
  document.getElementById("favorite-button").innerHTML =
    selectedChannel.favorite ? "favorite" : "favorite_border";
}

//============================================================================================SEND MESSAGE==============================================================================================

// Object method that returns the if message is from yesterday or older
Message.prototype.yesterdayOrOlder = function () {
  return new Date().getDate() - this.createdOn.getDate() > 1;
};

// Event Listener: New message will be sent if user clicks send button or presses enter.
// send button is grayed out if there is no input provided
document.getElementById("send-button").addEventListener("click", sendMessage);
document.getElementById("message-input").onkeyup = function (e) {
  if (!!document.getElementById("message-input").value) {
    document.getElementById("send-button").style.color = "#00838f";
  } else {
    document.getElementById("send-button").style.color = "#00838f54";
  }
  if (e.keyCode == 13) {
    sendMessage();
  }
};

function showMessages() {
  let chatHtmlString = ``;
  const chatMessages = document.getElementById("chat-area");
  chatMessages.innerHTML = ""; // making sure that there is no content inside the chat area

  channels.forEach((channel) => {
    if (selectedChannel.id === channel.id) {
      channel.messages.forEach((message) => {
        // if message is older than 24 hours, display full date
        let messageTime;
        if (message.yesterdayOrOlder) {
          messageTime = message.createdOn.toLocaleTimeString(browserLanguage, {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          });
        } else {
          messageTime = message.createdOn.toLocaleTimeString(browserLanguage, {
            hour: "numeric",
            minute: "numeric",
          });
        }
        if (message.own == false) {
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
              <div class="timestamp">` +
            messageTime +
            `</div>
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
      <div class="timestamp">` +
            messageTime +
            `</div>
      </div> 
     `;
        }
      });
    }
  });
  chatMessages.innerHTML += chatHtmlString;
  chatMessages.scrollTop = chatMessages.scrollHeight;
  //update timestamp in channel area
  document
    .getElementById(selectedChannel.id)
    .querySelector(".timestamp").innerHTML = selectedChannel.latestMessage();
}

//============================================================================================SEND MESSAGE==============================================================================================
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
    document.getElementById("send-button").style.color = "#00838f54";
    showMessages();
    sortChannels();
    displayChannels();
  } else {
    return;
  }
}

//================================================================================================END===============================================================================================
// Load messages into the chat section - for each channel

function loadMessagesIntoChannel() {
  channels.forEach((channel) => {
    messages.forEach((message) => {
      if (channel.name == message.channel) {
        channel.messages.push(message);
      }
    });
  });
}

//==================================================================================================================================================================================================

// load emojis into div
function loadEmojis() {
  for (let i = 0; i < emojis.length; i++) {
    document.getElementById("emoji-list").innerHTML +=
      `<span class="button">` + emojis[i] + `</span>`;
  }
  const emojisInArea = document.getElementById("emoji-list").childNodes;
  for (let i = 0; i < emojisInArea.length; i++) {
    emojisInArea[i].addEventListener("click", function () {
      document.getElementById("message-input").value += this.innerHTML;
      document.getElementById("send-button").style.color = "#00838f";
    });
  }
}

document
  .getElementById("emoticon-button")
  .addEventListener("click", toggleEmojiArea);
document
  .getElementById("close-emoticon-button")
  .addEventListener("click", toggleEmojiArea);

function toggleEmojiArea() {
  const emojiArea = document.getElementById("emoji-area");
  const chatArea = document.getElementById("chat-area");
  emojiArea.classList.toggle("toggle-area");
  chatArea.style.height = emojiArea.classList.contains("toggle-area")
    ? "calc(100vh - 132px - 250px)"
    : "calc(100vh - 132px)";
  chatArea.scrollTop = chatArea.scrollHeight;
}
