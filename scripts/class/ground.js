function addClassByElement(array, word, caseName, elementCase) {
  let isFree = true;
  array.map((element) => {
    if (caseName === element) {
      let imageElement = document.createElement("div");
      imageElement.classList.add(`${word}Image`);
      elementCase.appendChild(imageElement);
      elementCase.classList.add(word);
      isFree = false;
    }
  });
  return isFree;
}
class Ground extends Game {
  constructor(level, store) {
    super(level, store);
    this.store = store;
    this.level = level;
    this.ground = document.querySelector("#ground");
    this.freeCaseImage = [assetFreeCaseLevelOne, assetFreeCaseLevelTwo, assetFreeCaseLevelThree];
    this.reset = document.querySelector("#next");
  }
  init = () => {
    this.reset.addEventListener("click", () => {
      this.resetMap();
      this.nextLevel();
    });
  };
  resetMap = () => {
    this.ground.replaceChildren();
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
        let isFreeCase = true;
        mapping.map((element) => {
          if (isFreeCase) {
            isFreeCase = addClassByElement(element.array, element.word, caseName, addCase);
          }
        });
        if (isFreeCase) {
          let grassAsset = this.randomGrass();
          addCase.classList.add(grassAsset);
          addCase.addEventListener("click", () => {
            const previousSelected = document.querySelector("#selected");
            if (previousSelected) {
              previousSelected.id = "";
            }
            addCase.id = "selected";
            this.store.caseSelected();
          });
        }
        ground.appendChild(addCase);
      }
    }
  };
  randomGrass = () => {
    let randomNbr = Math.round(Math.random() * (this.freeCaseImage[this.level].length - 1 - 0) + 0);
    return this.freeCaseImage[this.level][randomNbr];
  };
}
