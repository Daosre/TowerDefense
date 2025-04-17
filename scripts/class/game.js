class Game {
  constructor(life, monney) {
    this.life = life;
    this.isPlayed = false;
    this.hearth = document.querySelector("#heartNbr");
    this.monney = monney;
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
      [],
      [],
    ];
    this.nameSlime = "slime";
    this.nameBat = "bat";
    this.nameDrake = "drake";
    this.mappingLevel = [mappingLevelOne, mappingLevelTwo];
    this.roadMapMob = [roadMapMobLevelOne, roadMapMobLevelTwo, roadMapMobLevelThree];
    this.spawnLevel = ["b1", "a4", "c17"];
    this.mobExist = [];
  }
  init = () => {
    const initGame = (nbr) => {
      if (!this.isPlayed) {
        this.isPlayed = true;
        multiPage.classList.add("transition_Page");
        setTimeout(() => {
          multiPage.style.zIndex = "-2";
        }, 2000);
        titleStore.style.display = "flex";
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
  };
  start = () => {
    const terrain = new Ground(this.level);
    terrain.init();
    terrain.createGround(this.mappingLevel[this.level]);
    this.spawnWave();
  };
  nextLevel() {
    this.level++;
    this.mobExist.map((mob) => {
      mob.death();
    });
    this.mobExist = [];
    this.start();
  }
  loseLife = () => {
    this.life--;
    this.hearth.innerText = this.life;
    if (this.life <= 0) {
      this.gameOver();
    }
  };
  gameOver = () => {
    console.log("perdu");
  };
  spawnWave = () => {
    let assetMonster = this.assetMonsters[this.level][0];
    for (let i = 0; i < 20; i++) {
      setTimeout(() => {
        const bruno = new Mob(
          10,
          1,
          1,
          assetMonster,
          this.spawnLevel[this.level],
          this.nameSlime,
          i + 1,
          this.pathMob()
        );
        this.mobExist.push(bruno);
        bruno.spawn();
      }, 2000 * i);
    }
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
}

const startGame = new Game(1, 0);

startGame.init();
