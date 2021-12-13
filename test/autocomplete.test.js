const waitFor = (selector) => {
  return new Promise((resolve, reject) => {
    const interval = setInterval(() => {
      if (document.querySelector(selector)) {
        clearInterval(interval);
        clearTimeout(timeout);
        resolve();
      }
    }, 30);
    const timeout = setTimeout(() => {
      clearInterval(interval);
      reject();
    }, 2000);
  });
};

beforeEach(() => {
  document.querySelector("#target").innerHTML = "";
  createAutoComplete({
    root: document.querySelector("#target"),
    fetchData() {
      return [
        { Title: "Avengers" },
        { Title: "Avengers: Infinity War" },
        { Title: "Avengers: Endgame" },
        { Title: "Avengers: Age of Ultron" },
        { Title: "Avengers: The Avengers" },
        { Title: "Avengers: The Initiative" },
        { Title: "Avengers: The End Game" },
        { Title: "Avengers: The Avengers" },
        { Title: "Avengers: The Initiative" },
      ];
    },
    renderOption(movie) {
      return movie.Title;
    },
  });
});

it("Dropdown starts closed", () => {
  const dropdown = document.querySelector(".dropdown");
  expect(dropdown.className).not.to.include("is-active");
});

it("After searching, dropdown opens up", async () => {
  const input = document.querySelector("input");
  input.value = "Avengers";
  input.dispatchEvent(new Event("input"));
  await waitFor(".dropdown-item");
  const dropdown = document.querySelector(".dropdown");

  expect(dropdown.className).to.include("is-active");
});

it("After searching displays some results", async () => {
  const input = document.querySelector("input");
  input.value = "Avengers";
  input.dispatchEvent(new Event("input"));
  await waitFor(".dropdown-item");
  expect(document.querySelectorAll(".dropdown-item").length).to.equal(9);
});
