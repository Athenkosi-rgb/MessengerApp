const message1 = {
  createdBy: "Meety Up",
  createdOn: new Date("October 14, 2021 01:58:00"),
  channel: "MeetUp",
  own: true,
  text: "This message is under MeetUp.",
  yesterdayOrOlder() {
    return new Date().getDate() - this.createdOn.getDate() > 1;
  },
};
const message2 = {
  createdBy: "Drake Oktober",
  createdOn: new Date("October 14, 2021 01:58:00"),
  channel: "OktoberFest",
  own: true,
  text: "This message is under OktoberFest",
  yesterdayOrOlder() {
    return new Date().getDate() - this.createdOn.getDate() > 1;
  },
};
const message3 = {
  createdBy: "Weather Weathy",
  createdOn: new Date("October 14, 2021 01:58:00"),
  channel: "WeatherChannel",
  own: false,
  text: "This message is under WeatherChannel",
  yesterdayOrOlder() {
    return new Date().getDate() - this.createdOn.getDate() > 1;
  },
};
const message4 = {
  createdBy: "Seven Sven",
  createdOn: new Date("October 14, 2021 01:58:00"),
  channel: "SevenContinents",
  own: false,
  text: "This message is under SevenContinents",
  yesterdayOrOlder() {
    return new Date().getDate() - this.createdOn.getDate() > 1;
  },
};

const mockMessages = [message1, message2, message3, message4];
