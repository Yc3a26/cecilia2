const value = document.querySelector("#value-speed");
const input = document.querySelector("#speed");
value.textContent = input.value;
input.addEventListener("input", (event) => {
  value.textContent = event.target.value;
});