const inputMock = {
  value: "",
  style: {
    border: "",
  },
};

const getCoords = (input) => {
  const cleanedInput = input.replace(/\[|\]/g, "").trim();
  const coordinates = cleanedInput.split(",");
  if (coordinates.length !== 2) {
    inputMock.style.border = "1px solid red";
    return null;
  }
  const latitude = parseFloat(coordinates[0]);
  const longitude = parseFloat(coordinates[1]);
  if (isNaN(latitude) || isNaN(longitude)) {
    inputMock.style.border = "1px solid red";
    return null;
  }
  return { latitude, longitude };
};

const validateCoords = () => {
  const coords = getCoords(inputMock.value);
  if (coords) {
    inputMock.style.border = "1px solid green";
  } else {
    inputMock.style.border = "1px solid red";
  }
};

describe("getCoords", () => {
  it("should handle valid coordinates with space", () => {
    inputMock.value = "51.50851, -0.12572";
    validateCoords();
    expect(inputMock.style.border).toBe("1px solid green");
    expect(getCoords(inputMock.value)).toEqual({
      latitude: 51.50851,
      longitude: -0.12572,
    });
  });
  it("should handle valid coordinates without space", () => {
    inputMock.value = "51.50851,-0.12572";
    validateCoords();
    expect(inputMock.style.border).toBe("1px solid green");
    expect(getCoords(inputMock.value)).toEqual({
      latitude: 51.50851,
      longitude: -0.12572,
    });
  });
  it("should handle valid coordinates with square brackets", () => {
    inputMock.value = "[51.50851, -0.12572]";
    validateCoords();
    expect(inputMock.style.border).toBe("1px solid green");
    expect(getCoords(inputMock.value)).toEqual({
      latitude: 51.50851,
      longitude: -0.12572,
    });
  });
  it("should handle invalid coordinates", () => {
    inputMock.value = "51.50851,-0.12572,1";
    validateCoords();
    expect(inputMock.style.border).toBe("1px solid red");
    expect(getCoords(inputMock.value)).toBe(null);
  });
  it("should handle invalid coordinates with non-numeric values", () => {
    inputMock.value = "51.50851,abc";
    validateCoords();
    expect(inputMock.style.border).toBe("1px solid red");
    expect(getCoords(inputMock.value)).toBe(null);
  });
});
