function addClassByElement(array, word, caseName, elementCase) {
  array.map((element) => {
    if (caseName == element) {
      elementCase.classList.add(word);
    }
  });
}
class Ground {
  constructor() {
    this.ground = document.querySelector("#ground");
    this.level = 0;
    this.mappingLevel = [mappingLevelOne, mappingLevelTwo];
    //temporaire
    this.reset = document.querySelector("#next");
  }
  start = () => {
    this.createGround(this.mappingLevel[0]);
    this.reset.addEventListener("click", () => {
      this.resetMap();
    });
  };
  resetMap = () => {
    this.ground.replaceChildren();
    this.nextLevel();
  };
  createGround = (mapping) => {
    //row
    for (let x = 0; x < 12; x++) {
      //collumn
      for (let y = 1; y < 18; y++) {
        //name of case a1, a2, a3
        let caseName = String.fromCharCode(97 + x) + y;
        //create case
        let addCase = document.createElement("div");
        //add classes
        addCase.classList.add("case", `${caseName}`);

        mapping.map((element) => {
          addClassByElement(element.array, element.word, caseName, addCase);
        });
        ground.appendChild(addCase);
      }
    }
  };
  nextLevel() {
    this.level++;
    this.createGround(this.mappingLevel[this.level]);
  }
}
const terrain = new Ground();
terrain.start();
