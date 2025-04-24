class Game {
  constructor() {
    this.life;
    this.isPlayed = false;
    this.hearth = document.querySelector("#heartNbr");
    this.money = 100;
    this.moneyByLevel = [100, 150, 200];
    this.wallet = document.querySelector("#wallet");
    this.screenTitle = document.querySelector("#screenTitle");
    this.easyButton = document.querySelector("#easy");
    this.normalButton = document.querySelector("#normal");
    this.hardButton = document.querySelector("#hard");
    this.level = 0;
    this.waveNbr = 1;
    this.assetMonsters = [
      [
        "assets/img/mobs/slime/bruno.gif",
        "assets/img/mobs/slime/redSlime.gif",
        "assets/img/mobs/slime/yellowSlime.gif",
      ],
      ["assets/img/mobs/bat/bruceDown.gif"],
      ["assets/img/mobs/dragon/moderLeft.gif"],
      ["assets/img/mobs/slime/pouleto.gif"],
    ];
    this.assetProjectiles = [
      ["assets/img/projectile/projectileArrow.png"],
      ["assets/img/projectile/projectileElec.png"],
      ["assets/img/projectile/projectileMage.png"],
    ];
    this.nameSlime = "slime";
    this.nameBat = "bat";
    this.nameDrake = "drake";
    this.mappingLevel = [mappingLevelOne, mappingLevelTwo];
    this.roadMapMob = [
      roadMapMobLevelOne,
      roadMapMobLevelTwo,
      roadMapMobLevelThree,
    ];
    this.spawnLevel = ["b1", "a4", "c17"];
    this.waveNbr = 0;
    this.mappingLevel = [mappingLevelOne, mappingLevelTwo, mappingLevelThree];
    this.roadMapMob = [
      roadMapMobLevelOne,
      roadMapMobLevelTwo,
      roadMapMobLevelThree,
    ];
    this.spawnLevel = ["b1", "a4", "a2"];
    this.mobExist = [];
    this.intervalMobs = [];
    this.currentWave;
    this.store;
    this.nbrDeathMob = 0;
    this.delayDisplay = document.querySelector("#delay");
    this.terrain;
    this.isDead = false;
    this.multiPage = document.querySelector("#multiple_Page");
    this.titleStore = document.querySelector(".title_Store");
    this.menuStart = document.querySelector(".start");
    this.menuFail = document.querySelector("#looser");
    this.menuVictory = document.querySelector("#ending");
    this.buttonRetry = document.querySelector("#retry");
  }
  init = () => {
    const initGame = (nbr) => {
      if (!this.isPlayed) {
        this.store = new Store();
        this.store.init();
        this.isPlayed = true;
        this.multiPage.classList.add("transition_Page");
        setTimeout(() => {
          this.multiPage.style.zIndex = "-2";
          this.menuStart.style.display = "none";
        }, 2000);
        this.titleStore.style.display = "flex";
        this.life = nbr;
        this.hearth.innerText = nbr;
        this.start();
      }
    };
    this.easyButton.addEventListener("click", () => {
      initGame(5);
    });
    this.normalButton.addEventListener("click", () => {
      initGame(3);
    });
    this.hardButton.addEventListener("click", () => {
      initGame(1);
    });
    this.buttonRetry.addEventListener("click", () => {
      if (this.life === 0) {
        this.life = 5;
        this.hearth.innerText = this.life;
        this.clearMob();
        this.store.clearTower();
        this.store.resetMoney();
        setTimeout(() => {
          this.multiPage.style.zIndex = "-2";
          this.menuFail.style.display = "none";
          this.isDead = false;
          this.terrain.resetMap();
          this.start();
        }, 2000);
        this.multiPage.style.opacity = "0";
      }
    });
  };
  clearMob = () => {
    this.intervalMobs.map((interval) => clearTimeout(interval));
    this.mobExist.map((mob) => mob.resetLevel());
  };
  start = () => {
    this.terrain = new Ground(this.level, this.store);
    this.terrain.createGround(this.mappingLevel[this.level]);
    this.delay();
  };
  win = () => {
    this.multiPage.style.zIndex = "2";
    this.multiPage.style.opacity = "1";
    this.menuVictory.style.display = "flex";
  };
  nextLevel = () => {
    this.level++;
    this.terrain.init();
    this.terrain = new Ground(this.level, this.store);
    this.store.level = this.level;
    this.store.resetMoney();
    this.mobExist.map((mob) => {
      mob.death();
    });
    this.mobExist = [];
    this.terrain.createGround(this.mappingLevel[this.level]);
    this.delay();
  };
  loseLife = () => {
    if (!this.isDead) {
      this.life--;
    }
    if (this.life <= 0) {
      if (!this.isDead) {
        this.hearth.innerText = this.life;
        this.isDead = true;
        this.gameOver();
      }
    } else {
      this.hearth.innerText = this.life;
    }
  };
  gameOver = () => {
    this.multiPage.style.zIndex = "2";
    this.multiPage.style.opacity = "1";
    this.menuFail.style.display = "flex";
    this.nbrDeathMob = 0;
    this.clearMob();
  };
  spawnWave = () => {
    this.mobExist = [];
    for (let i = 1; i < 21; i++) {
      const mob = setTimeout(() => {
        const bruno = new Mob(
          statsMonster[this.level][this.waveNbr].life,
          statsMonster[this.level][this.waveNbr].gold,
          assetMonster[this.level][this.waveNbr],
          this.spawnLevel[this.level],
          nameMonster[this.level],
          i,
          this.pathMob()
        );
        this.mobExist.push(bruno);
        bruno.spawn();
      }, 2000 * i);
      this.intervalMobs.push(mob);
    }
  };
  pathMob = () => {
    const arrayMob = [];
    this.roadMapMob[this.level].map((element) => {
      arrayMob.push({
        element: document
          .querySelector(`.${element.case}`)
          .getBoundingClientRect(),
        direction: element.direction,
      });
    });
    return arrayMob;
  };
  damageMob = (index, damage) => {
    this.mobExist[index].receiveDamage(damage);
  };
  earnMoney = (nbr) => {
    this.money += nbr;
    this.wallet = this.money;
    this.store.changeWallet(nbr);
  };
  deathMobs = (index) => {
    this.nbrDeathMob++;
    if (this.nbrDeathMob === 20) {
      this.nbrDeathMob = 0;
      this.waveNbr++;
      if (this.waveNbr === 3) {
        this.waveNbr = 0;
        if (this.level === 3) {
          this.win();
        } else {
          this.nextLevel();
        }
      } else {
        this.delay();
      }
    }
  };
  delay = () => {
    let delay10 = 10;
    this.delayDisplay.classList.add("delay");
    this.delayDisplay.innerText = delay10;
    const delayNextWave = setInterval(() => {
      delay10--;
      this.delayDisplay.innerText = delay10;
      if (delay10 === 0) {
        clearInterval(delayNextWave);
        this.spawnWave();
        this.delayDisplay.classList.remove("delay");
      }
    }, 1000);
  };
}

const startGame = new Game(1);

startGame.init();
