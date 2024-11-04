export class Modal {
  constructor(element) {
    this.element = element;
    this.input = this.element.querySelector(".popup-input");
    this.ok = this.element.querySelector(".ok");
    this.cancel = this.element.querySelector(".cancel");

    this.cancel.addEventListener("click", () => {
      this.hideModal();
    });

    this.input.addEventListener("change", () => {
      this.validateCoords();
    });
  }

  showModal() {
    this.element.style.display = "flex";
  }

  hideModal() {
    this.element.style.display = "none";
  }

  getCoords(input) {
    const cleanedInput = input.replace(/\[|\]/g, "").trim();
    const coordinates = cleanedInput.split(",");
    if (coordinates.length !== 2) {
      this.input.style.border = "1px solid red";
    }
    const latitude = parseFloat(coordinates[0]);
    const longitude = parseFloat(coordinates[1]);
    if (isNaN(latitude) || isNaN(longitude)) {
      this.input.style.border = "1px solid red";
      return null;
    }
    return { latitude, longitude };
  }

  validateCoords() {
    const coords = this.getCoords(this.input.value);
    if (coords) {
      this.input.style.border = "1px solid green";
    } else {
      this.input.style.border = "1px solid red";
    }
  }
}