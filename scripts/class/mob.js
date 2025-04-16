class Mob extends Ground {
  constructor(health, speed, asset, spawnPlace, name, index, roadMapMob) {
    super(ground);
    this.index = index;
    this.name = name;
    this.spawnPlace = spawnPlace;
    this.health = health;
    this.speed = speed;
    this.roadMapMob = roadMapMob;
    this.asset = asset;
    this.start = document.querySelector(`.${this.spawnPlace}`);
    this.createSlime = document.createElement("img");
    this.mobEntity = document.querySelector(`.${this.name}${this.index}`);
  }
  spawn = () => {
    this.createSlime.src = this.asset;
    this.createSlime.classList.add(`${this.name}${this.index}`, this.name, "moveTransition");
    this.createSlime.classList.toggle("rotateRight");
    this.start.appendChild(this.createSlime);
    this.move();
  };
  move = async () => {
    let positionMob = document.querySelector(`.${this.name}${this.index}`);
    let positionStartX = positionMob.getBoundingClientRect().left;
    let positionStartY = positionMob.getBoundingClientRect().top;
    let indexRoadMapMob = 0;
    let moveInterval = setInterval(() => {
      switch (this.roadMapMob[indexRoadMapMob].direction) {
        case "right":
          if (positionStartX < this.roadMapMob[indexRoadMapMob].element.left) {
            positionStartX += 50;
            positionMob.classList.add("rotateRight");
            positionMob.style.left = positionStartX + "px";
          } else {
            indexRoadMapMob++;
          }
          break;
        case "bottom":
          if (positionStartY + 50 < this.roadMapMob[indexRoadMapMob].element.top) {
            positionStartY += 50;

            positionMob.style.top = positionStartY + "px";
          } else {
            indexRoadMapMob++;
          }
          break;
        case "left":
          if (positionStartX - 50 > this.roadMapMob[indexRoadMapMob].element.left) {
            positionStartX -= 50;
            positionMob.classList.remove("rotateRight");
            positionMob.style.left = positionStartX + "px";
          } else {
            indexRoadMapMob++;
          }
          break;
        case "top":
          if (positionStartY > this.roadMapMob[indexRoadMapMob].element.top) {
            positionStartY -= 50;
            positionMob.style.top = positionStartY + "px";
          } else {
            indexRoadMapMob++;
          }
          break;
        default:
          break;
      }
      if (indexRoadMapMob >= this.roadMapMob.length) {
        clearInterval(moveInterval);
        positionMob.src = "bombe";
        setTimeout(() => {
          positionMob.remove();
          startGame.loseLife();
        }, 500);
        // changement explosion
        //disparition 0.5/1 sec plus tard
      }
    }, 1000);
  };
  death = () => {};
}
