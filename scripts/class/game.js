class Game {
  constructor(life, monney) {
    this.life = life;
    this.monney = monney;
    this.screenTitle = document.querySelector("#screenTitle");
    this.startButton = document.querySelector("#start");
    this.level = 0;
  }
  init = () => {
    this.startButton.addEventListener("click", () => {
      this.start();
      this.screenTitle.style.display = "none";
    });
  };
  start = () => {
    const terrain = new Ground(this.level);
    terrain.start();
  };
  loseLife = () => {
    this.life--;
    if (this.life === 0) {
      //gameOver
    }
  };
}
const startGame = new Game(5, 0);
startGame.init();
