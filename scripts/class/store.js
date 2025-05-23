class Store extends Game {
  constructor() {
    super();
    this.caseSelected;
    this.level = this.level;
    this.money = this.money;
    this.wallet = this.wallet;
    this.sectionStore = document.querySelector("#store");
    this.buyTurretOne = document.querySelector("#buyT1");
    this.buyTurretTwo = document.querySelector("#buyT2");
    this.buyTurretThree = document.querySelector("#buyT3");
    this.btnTurretUpgrade = document.querySelector("#upgradeTower");
    this.articleTurretOne = document.querySelector("#articleT1");
    this.articleTurretTwo = document.querySelector("#articleT2");
    this.articleTurretThree = document.querySelector("#articleT3");
    this.articleUpgrade = document.querySelector("#articleTowerUpgrade");
    this.assetMoney = "assets/img/textureObjet/money.png";
    this.altMoney = "Coin";
    this.assetsTower = {
      assetArrow1: "assets/img/Tower/Arrow/TowerArrow1.png",
      assetArrow2: "assets/img/Tower/Arrow/TowerArrow2.png",
      assetArrow3: "assets/img/Tower/Arrow/TowerArrow3.png",
      assetElec1: "assets/img/Tower/Elec/TowerElec1.png",
      assetElec2: "assets/img/Tower/Elec/TowerElec2.png",
      assetElec3: "assets/img/Tower/Elec/TowerElec3.png",
      assetMage1: "assets/img/Tower/Mage/TowerMage1.png",
      assetMage2: "assets/img/Tower/Mage/TowerMage2.png",
      assetMage3: "assets/img/Tower/Mage/TowerMage3.png",
    };
    this.nbrTower = 0;
    this.towers = [];
    this.caseSelected;
  }
  //initialization store
  init = () => {
    //buy arrow tower
    this.buyTurretOne.addEventListener("click", () => {
      this.addTurret(0);
    });
    //buy elec tower
    this.buyTurretTwo.addEventListener("click", () => {
      this.addTurret(1);
    });
    //buy mage tower
    this.buyTurretThree.addEventListener("click", () => {
      this.addTurret(2);
    });
  };
  //When the level is reset, clear detection and attack mob
  clearTower = () => {
    this.towers.map((tower) => tower.resetLevel());
  };
  // When the tower is buy, show upgrade tower
  showUpgradeTower = (data, turret) => {
    this.articleUpgrade.remove();
    this.articleUpgrade = document.createElement("article");
    this.articleUpgrade.id = "upgradeTower";
    this.articleUpgrade.classList.add("articleTurret");
    const imgTowerUpgrade = document.createElement("img");
    imgTowerUpgrade.src = this.assetsTower[data.asset + (data.level + 1)];
    this.articleUpgrade.appendChild(imgTowerUpgrade);
    const btnUpgrade = document.createElement("button");
    btnUpgrade.classList.add("price");
    btnUpgrade.innerText = data.price;
    const imgCoin = document.createElement("img");
    imgCoin.src = this.assetMoney;
    imgCoin.alt = this.altMoney;
    btnUpgrade.appendChild(imgCoin);
    btnUpgrade.addEventListener("click", () => {
      if (this.money >= data.price) {
        this.money -= data.price;
        this.changeWallet();
        turret.upgrade();
        if (data.level === 2) {
          this.articleUpgrade.remove();
        } else {
          const newData = turret.whatLevel();
          this.showUpgradeTower(newData, turret);
        }
      }
    });
    this.articleUpgrade.appendChild(btnUpgrade);
    this.sectionStore.appendChild(this.articleUpgrade);
  };
  //Change the money when player earn money or level is reset
  changeWallet = (nbr) => {
    this.money += nbr ? nbr : 0;
    this.wallet.innerText = String(this.money);
  };
  //Select a case by the player
  handleSelect = (caseName) => {
    this.caseSelected = caseName;
    if (!caseName.classList.contains("turret")) {
      this.showTurretLevelOne();
    } else {
      //select good instance tower
      const currentTurret = this.towers.filter((element, i) =>
        caseName.classList.contains(`tower${i}`)
      );
      if (currentTurret[0]) {
        const instanceTurret = currentTurret[0];
        const dataTower = instanceTurret.whatLevel();
        if (dataTower.level < 3) {
          this.showUpgradeTower(dataTower, instanceTurret);
        } else {
          this.articleUpgrade.style.display = "none";
        }
      }
      this.hiddenTurretLevelOne();
    }
  };
  //show tower level 1
  showTurretLevelOne = () => {
    this.articleTurretOne.style.display = "flex";
    this.articleTurretTwo.style.display = "flex";
    this.articleTurretThree.style.display = "flex";
    this.articleUpgrade.style.display = "none";
  };
  // hide tower level 1
  hiddenTurretLevelOne = () => {
    this.articleTurretOne.style.display = "none";
    this.articleTurretTwo.style.display = "none";
    this.articleTurretThree.style.display = "none";
  };
  // when player buy a tower
  addTurret = (nbr) => {
    if (!this.caseSelected.classList.contains("turret")) {
      switch (nbr) {
        case 0:
          if (this.money >= 10) {
            const turret = new Tower(
              1,
              30,
              "assetArrow",
              "arrow",
              this.caseSelected,
              this.nbrTower,
              this.level
            );
            turret.create();
            this.towers.push(turret);
            this.nbrTower++;
            this.money -= 10;
            this.wallet.innerText = this.money;
            this.hiddenTurretLevelOne();
            const dataTurret = turret.whatLevel();
            this.showUpgradeTower(dataTurret, turret);
          }
          break;
        case 1:
          if (this.money >= 20) {
            const turret = new Tower(
              5,
              50,
              "assetElec",
              "elec",
              this.caseSelected,
              this.nbrTower,
              this.level
            );
            turret.create();
            this.towers.push(turret);
            this.nbrTower++;
            this.money -= 20;
            this.wallet.innerText = this.money;
            this.hiddenTurretLevelOne();
            const dataTurret = turret.whatLevel();
            this.showUpgradeTower(dataTurret, turret);
          }
          break;
        case 2:
          if (this.money >= 50) {
            const turret = new Tower(
              10,
              70,
              "assetMage",
              "mage",
              this.caseSelected,
              this.nbrTower,
              this.level
            );
            turret.create();
            this.towers.push(turret);
            this.nbrTower++;
            this.money -= 50;
            this.wallet.innerText = this.money;
            this.hiddenTurretLevelOne();
            const dataTurret = turret.whatLevel();
            this.showUpgradeTower(dataTurret, turret);
          }
          break;
        default:
          console.log("probleme de pauvre");
          break;
        // }
      }
    }
  };
  // when player earn money or reset level change the wallet
  earnMoney = (nbr) => {
    this.money += nbr;
    this.changeWallet();
  };
  //reset the wallet
  resetMoney = () => {
    this.money = Number(this.moneyByLevel[this.level]);
    this.changeWallet(0);
  };
}
