//ceci est un quadrillage
function addElement(array, word, caseName, elementCase) {
  array.map((element) => {
    if (caseName == element) {
      elementCase.classList.add(word);
    }
  });
}
function createGroundLevelOne() {
  //row
  for (let x = 0; x < 12; x++) {
    //collumn
    for (let y = 1; y < 18; y++) {
      let caseName = String.fromCharCode(97 + x) + y;
      let addCase = document.createElement("div");
      addCase.classList.add("case", `${caseName}`);
      addElement(waterLevelOne, "water", caseName, addCase);
      addElement(treeLevelOne, "tree", caseName, addCase);
      addElement(houseLevelOne, "house", caseName, addCase);
      addElement(roadLevelOne, "road", caseName, addCase);

      ground.appendChild(addCase);
    }
  }
}
// console.log(waterLevelOne);

createGroundLevelOne();
//function isClass(element, word) {
//   return element.classList.contains(word);
// }
// if (
//   !isClass(addCase, "water") &&
//   !isClass(addCase, "tree") &&
//   !isClass(addCase, "house") &&
//   !isClass(addCase, "road")
// ) {
//   addCase.classList.add("grass");
// }
