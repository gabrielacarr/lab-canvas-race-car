window.onload = () => {
    document.getElementById('start-button').onclick = () => {
      startGame();
    };
 
    function startGame() {}
  };
 
  let canvas = document.querySelector("#canvas")
  let ctx = canvas.getContext('2d')
 
  canvas.width = window.innerWidth / 1.2 
  canvas.height = window.innerHeight - 100
 
  let carImage = new Image()
  carImage.src = './images/car.png'
  carImage.onload = carDrawing;
 
  function drawRoad(){
    ctx.fillStyle = 'green'
    ctx.fillRect(0,0,canvas.width,canvas.height)
    ctx.fillStyle = 'grey'
    ctx.fillRect(150,0,canvas.width - 300,canvas.height)
  }
 
 
  function drawLine(){
    //They were all the same color but changing fast
    lines.forEach(line => { 
      //They were all different colors and changing fast 
      ctx.fillStyle = line.color; 
      ctx.fillRect(line.x,line.y+=3,line.w,line.h)  //White line 
    })
  }
 
  //THIS Creates one line every second 
  let lines = []
  setInterval(function(){ //This happens every 1000 milliseconds 
    let line = {
      x: canvas.width/2-5,
      y: 0,
      w: 10,
      h: 50,
      color: "#"+((1<<24)*Math.random()|0).toString(16) //They are all set with one color from the moment they are created
    }
    lines.push(line)
  },700)
 
 
 
 
 
  function drawObstacles(){
    obstacles.forEach((obstacle,index) => { 
      ctx.fillStyle = obstacle.color; 
      ctx.fillRect(obstacle.x,obstacle.y+=15,obstacle.w,obstacle.h)  //Red Obstacle
      detectCollision(obstacle) //collision with car
      detectBulletCollision(obstacle, index) //collison with bullets
    })
  }
 
 
  let obstacles = [] //This will continue to grow with obstacles
  setInterval(function(){
    let obstacle = {
      x:Math.random()*canvas.width,
      y: 0,
      w: Math.random()*canvas.width,
      h: 50,
      color: 'red'
    }
    obstacles.push(obstacle)
  },1222)
 
 
  let animateId; 
 
  function detectCollision(obs){  //Detect collision between every obstacle and the car
      if (obs.x < car.x + car.w &&
        obs.x + obs.w > car.x &&
        obs.y < car.y + car.h &&
        obs.y + obs.h > car.y) {
          window.cancelAnimationFrame(animateId)
      }
  }
 
 
 
  function detectBulletCollision(obs, index){ //Detect collision between every obstacle and every bullet
 
    bullets.forEach((bullet, i) => {
      if (obs.x < bullet.x + bullet.w &&
        obs.x + obs.w > bullet.x &&
        obs.y < bullet.y + bullet.h &&
        obs.y + obs.h > bullet.y) {
          console.log("bullet hit obstacle")
          obstacles.splice(index, 1)
          bullets.splice(i, 1)
          // window.cancelAnimationFrame(animateId)
      }
    })
  }
 
  function carDrawing() { //Hoisting 
    ctx.drawImage(carImage, car.x, car.y, car.w, car.h)
  }
 
 
  let car = {
    x: canvas.width/2,
    y: canvas.height - 120,
    w: 70,
    h: 120
  }
 
 
  document.onkeydown= function(e){
    switch(e.key){
      case 'ArrowUp'    : car.y -= 15; break; 
      case 'ArrowLeft'  : car.x -= 15; break; 
      case 'ArrowDown'  : car.y += 15; break; 
      case 'ArrowRight' : car.x += 15; break; 
      case ' ' : shoot(); break;
    }
  }
 
  let bullets = []
  function shoot(){
    if(bullets.length > 50){
      console.log('out of ammo')
      return 
    }
    let bullet = {
      x: car.x + (car.w/2),
      y: car.y,
      w: 10,
      h: 20
    }
    bullets.push(bullet)
  }
 
 
  function drawBullets(){
    ctx.fillStyle = 'white'
    bullets.forEach(bullet=> {
      ctx.fillRect(bullet.x,bullet.y-=15,bullet.w,bullet.h)
    })
  }
 
 
  function animate(){ //infinte loop 
    animateId = window.requestAnimationFrame(animate) 
    ctx.clearRect(0,0, canvas.width, canvas.height) //cleared everythign 
    drawRoad()
    drawLine()
    drawObstacles()
    carDrawing() 
    drawBullets()
  }
 
  window.requestAnimationFrame(animate) 