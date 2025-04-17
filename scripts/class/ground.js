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
  constructor(level) {
    super(level);
    this.level = level;
    this.ground = document.querySelector("#ground");
    this.spawnLevel = ["b1", "a4", "c17"];
    this.mappingLevel = [mappingLevelOne, mappingLevelTwo];
    this.freeCaseImage = [assetFreeCaseLevelOne, assetFreeCaseLevelTwo, assetFreeCaseLevelThree];
    this.roadMapMob = [roadMapMobLevelOne, roadMapMobLevelTwo, roadMapMobLevelThree];
    this.assetSlime = "assets/img/mobs/slime/bruno.gif";
    this.nameSlime = "slime";
    this.nameBat = "bat";
    this.nameDrake = "drake";
    this.mobExist = [];
    this.reset = document.querySelector("#next");
  }
  init = () => {
    this.reset.addEventListener("click", () => {
      this.resetMap();
      this.nextLevel();
    });
  };
  start = () => {
    this.createGround(this.mappingLevel[this.level]);
    const mobRemy = new Mob(
      10,
      1,
      this.assetSlime,
      this.spawnLevel[this.level],
      this.nameSlime,
      1,
      this.pathMob()
    );
    this.mobExist.push(mobRemy);
    mobRemy.spawn();
  };
  spawnMob = () => {};
  pathMob = () => {
    const arrayMob = [];
    this.roadMapMob[this.level].map((element) => {
      arrayMob.push({
        element: document.querySelector(`.${element.case}`).getBoundingClientRect(),
        direction: element.direction,
      });
    });
    return arrayMob;
  };
  resetMap = () => {
    this.ground.replaceChildren();
  };
  nextLevel() {
    this.level++;
    this.mobExist.map((mob) => {
      mob.death();
    });
    this.mobExist = [];
    this.start();
  }
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
