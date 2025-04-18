class Tower {
  constructor(damage, price, asset, type, caseName, index) {
    this.level = 1;
    this.damage = damage;
    this.price = price;
    this.asset = asset;
    this.type = type;
    this.caseName = caseName;
    this.index = index;
    this.apparenceTower;
  }
  changeTower = () => {
    this.apparenceTower.classList.add(this.asset + this.level);
  };
  whatLevel = () => {
    return { level: this.level, asset: this.asset, price: this.price };
  };
  spawnTower = () => {
    buyTower.addEventListener("click", () => {
      this.newTower.src = "../assets/img/Tower/Mage/TowerMage1.png";
    });
  };
  create = () => {
    this.caseName.classList.add("turret", `tower${this.index}`, this.type + this.level);
    this.apparenceTower = document.createElement("div");
    this.apparenceTower.classList.add(this.asset + this.level);
    this.caseName.appendChild(this.apparenceTower);
  };
  upgrade = () => {
    this.price += 20;
    if (this.damage === 1) {
      this.damage = 5;
    } else {
      this.damage *= 2;
    }
    this.level++;
    this.changeTower();
  };
}

// let towerMage = new Tower(10, 20, 2);
// towerMage.spawnTower();
