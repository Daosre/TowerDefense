class Ground {
  constructor() {
    this.ground = document.querySelector("#ground");
  }
  start = () => {
    createGroundLevelOne();
  };
  
}
const terrain = new Ground();
terrain.start();
