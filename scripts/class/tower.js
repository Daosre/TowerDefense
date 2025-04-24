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
  changeTower = () => {
    this.apparenceTower.classList.add(this.asset + this.levelTower);
  };
  whatLevel = () => {
    return { level: this.levelTower, asset: this.asset, price: this.price };
  };
  spawnTower = () => {
    buyTower.addEventListener("click", () => {
      this.newTower.src = "../assets/img/Tower/Mage/TowerMage1.png";
    });
  };
  resetLevel = () => {
    clearInterval(this.intervalTower);
  };
  create = () => {
    this.caseName.classList.add("turret", `tower${this.index}`, this.type + this.levelTower);
    this.apparenceTower = document.createElement("div");
    this.apparenceTower.classList.add(this.asset + this.levelTower);
    this.caseName.appendChild(this.apparenceTower);
    this.detectMob();
  };
  upgrade = () => {
    this.price += 20;
    if (this.damage === 1) {
      this.damage = 5;
    } else {
      this.damage *= 2;
    }
    this.levelTower++;
    this.changeTower();
  };
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
  attack = (index) => {
    startGame.damageMob(index - 1, this.damage);
  };
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

// let towerMage = new Tower(10, 20, 2);
// towerMage.spawnTower();
