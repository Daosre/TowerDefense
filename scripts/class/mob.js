class Mob extends Ground {
  constructor(health, money, asset, spawnPlace, name, index, roadMapMob) {
    super(ground);
    this.money = money;
    this.index = index;
    this.name = name;
    this.spawnPlace = spawnPlace;
    this.health = health;
    this.life = document.createElement("div");
    this.roadMapMob = roadMapMob;
    this.asset = asset;
    this.start = document.querySelector(`.${this.spawnPlace}`);
    this.createMob = document.createElement("div");
    this.valueMooveX = this.start.getBoundingClientRect().width;
    this.valueMooveY = this.start.getBoundingClientRect().height;
    this.positionStartX = 0;
    this.positionStartY = 0;
    this.boundingMob;
    this.positionMob;
    this.intervalMove;
    this.isDeath = false;
  }
  spawn = () => {
    this.createMob.classList.add(`${this.name}${this.index}`, this.name, "moveTransition");
    if (this.name === "slime") {
      this.createMob.classList.toggle("rotateRight");
    }
    this.life.classList.add("life");
    this.life.style.width = this.health + "px";
    this.createMob.style.backgroundImage = `url('${this.asset}')`;
    this.createMob.appendChild(this.life);
    this.start.appendChild(this.createMob);
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
            if (this.name === "slime") {
              this.positionMob.classList.add("rotateRight");
            } else {
              this.positionMob.classList.remove("rotateRight");
            }
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
            if (this.name === "slime") {
              this.positionMob.classList.remove("rotateRight");
            } else {
              this.positionMob.classList.add("rotateRight");
            }
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
    }, 1000);
  };
  receiveDamage = (damage) => {
    this.health -= damage;
    this.life.style.width = this.health + "px";
    if (this.health <= 0) {
      this.death();
    }
  };
  resetLevel = () => {
    clearInterval(this.intervalMove);
  };
  death = () => {
    this.positionMob.style.backgroundImage = "url('assets/img/textureObjet/bomba.gif')";
    setTimeout(() => {
      this.positionMob.remove();
      // console.log(this.positionMob);
      clearInterval(this.intervalMove);
      if (!this.isDeath) {
        this.isDeath = true;
        startGame.earnMoney(this.money);
        startGame.deathMobs(this.index);
      }
    }, 400);
  };
}
