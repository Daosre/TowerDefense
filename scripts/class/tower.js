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
            this.attack(i);
            return;
          }
        }
      }
    }, 2000);
  };
  attack = (index) => {
    startGame.damageMob(index - 1, this.damage);
  };
}

// let towerMage = new Tower(10, 20, 2);
// towerMage.spawnTower();
