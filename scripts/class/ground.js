function addClassByElement(array, word, caseName, elementCase) {
  array.map((element) => {
    if (caseName == element) {
      elementCase.classList.add(word);
    }
  });
}
class Ground extends Game {
  constructor(level) {
    super(level);
    this.level = level;
    this.ground = document.querySelector("#ground");
    this.spawnLevel = ["b1", "a4", "c17"];
    this.mappingLevel = [mappingLevelOne, mappingLevelTwo];
    this.roadMapMob = [roadMapMobLevelOne, roadMapMobLevelTwo, roadMapMobLevelThree];
    this.assetSlime = "assets/img/mobs/slime/bruno.gif";
    this.nameSlime = "slime";
    this.nameBat = "bat";
    this.nameDrake = "drake";
    // temporaire
    this.reset = document.querySelector("#next");
  }
  start = () => {
    this.createGround(this.mappingLevel[this.level]);
    // let positionStart = document.querySelector(`.${this.spawnLevel[this.level]}`);
    // let positionOSEF = positionStart.getBoundingClientRect();
    // let test = positionStart.clientHeight;
    const roadMob = this.pathMob();
    const mobRemy = new Mob(
      10,
      1,
      this.assetSlime,
      this.spawnLevel[this.level],
      this.nameSlime,
      1,
      roadMob
    );
    mobRemy.spawn();
    this.reset.addEventListener("click", () => {
      this.resetMap();
    });
  };
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
    this.nextLevel();
  };
  nextLevel() {
    this.level++;
    this.createGround(this.mappingLevel[this.level]);
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

        mapping.map((element) => {
          addClassByElement(element.array, element.word, caseName, addCase);
        });
        ground.appendChild(addCase);
      }
    }
  };
}
// blueSlime
