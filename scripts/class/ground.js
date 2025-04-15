class Ground {
  constructor() {
    this.ground = document.querySelector("#ground");
  }
  start = () => {
    createGroundLevelOne();
  };
  resetMap = ()=>{
    
  }
}
const terrain = new Ground();
terrain.start();
