//ceci est un quadrillage
function createGroundLevelOne() {
  //row
  for (let x = 0; x < 12; x++) {
    //collumn
    for (let y = 1; y < 18; y++) {
      let caseName = String.fromCharCode(97 + x) + y;
      console.log(`${String.fromCharCode(97 + x)}${y}`);
      let addCase = document.createElement("div");
      addCase.classList.add("case", `${caseName}`);
      ground.appendChild(addCase);
    }
  }
}
createGroundLevelOne();
