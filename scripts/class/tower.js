class Tower {
  constructor(damage, price, asset, type, caseName, index, levelMap) {
    this.levelMap = levelMap;
    this.levelTower = 1;
    this.damage = damage;
    this.price = price;
    this.asset = asset;
    this.type = type;
    this.caseName = caseName;
    this.index = index;
    this.apparenceTower;
    this.intervalTower;
    this.assetAttackElec = "assets/img/projectile/projectileElec.png";
    this.assetAttackMage = "assets/img/projectile/projectileMage.png";
    this.assetAttackArrow = "assets/img/projectile/projectileArrow.png";
  }
  //When tower is upgrade change tower appearance
  changeTower = () => {
    this.apparenceTower.classList.add(this.asset + this.levelTower);
  };
  // return information of tower
  whatLevel = () => {
    return { level: this.levelTower, asset: this.asset, price: this.price };
  };
  //when user buy tower spawn a tower
  spawnTower = () => {
    buyTower.addEventListener("click", () => {
      this.newTower.src = "../assets/img/Tower/Mage/TowerMage1.png";
    });
  };
  //clear interval attack of the tower
  resetLevel = () => {
    clearInterval(this.intervalTower);
  };
  //create a tower
  create = () => {
    this.caseName.classList.add("turret", `tower${this.index}`, this.type + this.levelTower);
    this.apparenceTower = document.createElement("div");
    this.apparenceTower.classList.add(this.asset + this.levelTower);
    this.caseName.appendChild(this.apparenceTower);
    this.detectMob();
  };
  //upgrade tower
  upgrade = () => {
    this.price += 20;
    if (this.damage === 1) {
      this.damage = 5;
    } else {
      this.damage *= 2;
    }
    this.levelTower++;
    if (this.type === "arrow" && this.levelTower === 3) {
      this.damage += 30;
    }
    this.changeTower();
  };
  //detection creature if creature is in the range tower attack
  detectMob = () => {
    this.intervalTower = setInterval(() => {
      const boundingTower = this.caseName.getBoundingClientRect();
      const towerCenterX = boundingTower.left;
      const towerCenterY = boundingTower.top;
      for (let i = 1; i < 21; i++) {
        const existingMob = document.querySelector(`.${nameMonster[this.levelMap]}${i}`);
        if (existingMob) {
          const boundingMob = existingMob.getBoundingClientRect();
          if (
            towerCenterY - 100 <= boundingMob.top + 25 &&
            towerCenterY + 100 >= boundingMob.top - 25 &&
            towerCenterX - 100 <= boundingMob.left + 25 &&
            towerCenterX + 100 >= boundingMob.left - 25
          ) {
            this.attackAnimation(boundingTower, boundingMob);
            setTimeout(() => {
              this.attack(i);
            }, 300);

            return;
          }
        }
      }
    }, 2000);
  };
  //attack creature
  attack = (index) => {
    startGame.damageMob(index - 1, this.damage);
  };
  // attack animation
  attackAnimation = (boundingTower, boundingMob) => {
    const imageAttack = document.createElement("img");
    imageAttack.classList.add("attackAnimation");
    switch (this.type) {
      case "arrow":
        this.attackArrow(boundingTower, boundingMob, imageAttack);
        break;
      case "mage":
        this.attackMage(boundingTower, boundingMob, imageAttack);
        break;
      case "elec":
        this.attackElec(boundingMob, imageAttack);
        break;
    }
  };
  // attack animation by arrow tower
  attackArrow = (boundingTower, boundingMob, image) => {
    image.style.top = boundingTower.top + 25 + "px";
    image.style.left = boundingTower.left + 25 + "px";
    image.src = this.assetAttackArrow;
    image.classList.add("attackRock");
    this.caseName.appendChild(image);
    setTimeout(() => {
      image.style.top = boundingMob.top + boundingMob.height / 2 + "px";
      image.style.left = boundingMob.left + "px";
    }, 100);

    setTimeout(() => {
      image.remove();
    }, 300);
  };
  // attack animation by mage tower
  attackMage = (boundingTower, boundingMob, image) => {
    image.style.top = boundingTower.top + "px";
    image.style.left = boundingTower.left + "px";
    image.src = this.assetAttackMage;
    this.caseName.appendChild(image);
    setTimeout(() => {
      image.style.top = boundingMob.top + boundingMob.height / 2 + "px";
      image.style.left = boundingMob.left + "px";
    }, 100);

    setTimeout(() => {
      image.remove();
    }, 300);
  };
  // attack animation by elec tower
  attackElec = (boundingMob, image) => {
    image.style.top = boundingMob.top + "px";
    image.style.left = boundingMob.left - 4 + "px";
    image.src = this.assetAttackElec;
    this.caseName.appendChild(image);
    setTimeout(() => {
      image.remove();
    }, 300);
  };
}
