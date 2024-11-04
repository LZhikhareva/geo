import { Modal } from "./modal";

export class Chat {
  constructor(element, modal) {
    this.element = element;
    this.input = this.element.querySelector(".input");
    this.messagesBox = this.element.querySelector(".messages-container");
    this.latitude = null;
    this.longitude = null;
    this.modal = modal;
    this.currentMessageText = '';

    this.input.addEventListener("keyup", (event) => {
      if (event.code === "Enter") {
        console.log("enter was pressed");
        this.currentMessageText = this.input.value;
        this.sendMessage(this.currentMessageText);
        this.input.value = "";
      }
    });

    this.modal.ok.addEventListener("click", () => {
      const coords = this.modal.getCoords(this.modal.input.value);
      if (coords) {
        const lat = coords.latitude;
        const long = coords.longitude;
        this.modal.hideModal();
        const message = this.createMessage(this.currentMessageText, lat, long);
        this.messagesBox.append(message);
      }
    });

    this.checkGeo();
  }

  checkGeo() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (data) => {
          const { latitude, longitude } = data.coords;
          this.latitude = latitude;
          this.longitude = longitude;
          console.log("lat " + latitude);
          console.log("long " + longitude);
        },
        function (err) {
          console.log(err);
        },
        { enableHighAccuracy: true },
      );
    }
  }

  sendMessage(value) {
    if (this.latitude && this.longitude) {
      const text = value;
      const message = this.createMessage(text, this.latitude, this.longitude);
      this.messagesBox.append(message);
    } else {
      this.showPopup();
    }
  }

  createMessage(text, latitude, longitude) {
    const message = document.createElement("div");
    message.classList.add("message");
    const messageText = document.createElement("div");
    messageText.classList.add("message-text");
    messageText.textContent = text;
    message.append(messageText);
    const messageDate = document.createElement("div");
    messageDate.classList.add("message-date");
    messageDate.textContent = new Date().toLocaleString("ru-RU");
    message.append(messageDate);
    if (latitude && longitude) {
      const messageGeo = document.createElement("div");
      messageGeo.classList.add("message-geo");
      messageGeo.textContent = `${latitude}, ${longitude}`;
      message.append(messageGeo);
    }
    return message;
  }
  showPopup() {
    this.modal.showModal();
  }
}

export const modal = new Modal(document.querySelector(".popup-container"));
const chat = new Chat(document.querySelector(".chat"), modal);