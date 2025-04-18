class Mob extends Ground {
  constructor(health, speed, money, asset, spawnPlace, name, index, roadMapMob) {
    super(ground);
    this.money = money;
    this.index = index;
    this.name = name;
    this.spawnPlace = spawnPlace;
    this.health = health;
    this.speed = speed;
    this.roadMapMob = roadMapMob;
    this.asset = asset;
    this.start = document.querySelector(`.${this.spawnPlace}`);
    this.createSlime = document.createElement("img");
    this.valueMooveX = this.start.getBoundingClientRect().width;
    this.valueMooveY = this.start.getBoundingClientRect().height;
    this.positionStartX = 0;
    this.positionStartY = 0;
    this.boundingMob;
    this.positionMob;
    this.intervalMove;
  }
  spawn = () => {
    this.createSlime.src = this.asset;
    this.createSlime.classList.add(`${this.name}${this.index}`, this.name, "moveTransition");
    this.createSlime.classList.toggle("rotateRight");
    this.start.appendChild(this.createSlime);
    this.initPosition();
    this.move();
  };
  initPosition = () => {
    // initialialiser les position etc
    this.positionMob = document.querySelector(`.${this.name}${this.index}`);
    this.boundingMob = this.positionMob.getBoundingClientRect();
    switch (this.roadMapMob[0].direction) {
      case "right":
        this.positionMob.style.top =
          this.boundingMob.top - (this.valueMooveY - this.boundingMob.height) / 2 + "px";
        this.positionMob.style.left =
          this.boundingMob.left -
          this.boundingMob.width -
          (this.valueMooveX - this.boundingMob.width) / 2 +
          "px";
        break;
      case "bottom":
        this.positionMob.style.top =
          0 - this.valueMooveY - (this.valueMooveY - this.boundingMob.height) / 2 + "px";
        this.positionMob.style.left =
          this.boundingMob.left + (this.valueMooveX - this.boundingMob.width) / 2 + "px";
        break;
      default:
        break;
    }
    this.positionStartX = this.positionMob.getBoundingClientRect().left;
    this.positionStartY = this.positionMob.getBoundingClientRect().top;
  };
  move = async () => {
    let indexRoadMapMob = 0;
    this.intervalMove = setInterval(() => {
      this.boundingMob = this.positionMob.getBoundingClientRect();
      switch (this.roadMapMob[indexRoadMapMob].direction) {
        case "right":
          if (this.positionStartX < this.roadMapMob[indexRoadMapMob].element.left) {
            this.positionStartX += this.valueMooveX;
            this.positionMob.classList.add("rotateRight");
            this.positionMob.style.left = this.positionStartX + "px";
          } else {
            indexRoadMapMob++;
          }
          break;
        case "bottom":
          if (
            this.positionStartY + this.valueMooveY <
            this.roadMapMob[indexRoadMapMob].element.top
          ) {
            this.positionStartY += this.valueMooveY;
            this.positionMob.style.top = this.positionStartY + "px";
          } else {
            indexRoadMapMob++;
          }
          break;
        case "left":
          if (
            this.positionStartX - this.valueMooveX >
            this.roadMapMob[indexRoadMapMob].element.left
          ) {
            this.positionStartX -= this.valueMooveX;
            this.positionMob.classList.remove("rotateRight");
            this.positionMob.style.left = this.positionStartX + "px";
          } else {
            indexRoadMapMob++;
          }
          break;
        case "top":
          if (this.positionStartY > this.roadMapMob[indexRoadMapMob].element.top) {
            this.positionStartY -= this.valueMooveY;
            this.positionMob.style.top = this.positionStartY + "px";
          } else {
            indexRoadMapMob++;
          }
          break;
        default:
          break;
      }
      if (indexRoadMapMob >= this.roadMapMob.length) {
        clearInterval(this.intervalMovemoveInterval);
        this.death();
        setTimeout(() => {
          startGame.loseLife();
        }, 400);
      }
    }, 100);
  };
  death = () => {
    this.positionMob.src = "assets/img/textureObjet/bomba.gif";
    setTimeout(() => {
      this.positionMob.remove();
      clearInterval(this.intervalMove);
    }, 400);
  };
}
