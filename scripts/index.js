const ground = document.querySelector("#ground");

for (let i = 0; i < 17 * 12; i++) {
  let addCase = document.createElement("div");
  addCase.classList.add("case");
  ground.appendChild(addCase);
}
