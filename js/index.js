// window.onload = () => {
//   document.getElementById('start-button').onclick = () => {
//     startGame();
//   };

//   function startGame() {

//   }
// };
let canvas = document.getElementById("cava") // connecting canvas to js
console.log(canvas)
canvas.height = window.innerHeight //adjusting via js
canvas.width = window.innerWidth
const ctx = canvas.getContext("2d") // how to use canvas (ctx .)







let road = new Image() 
road.src = '/images/road.png'  //Laasign ssource of image 
road.onload = function(e){ // when it loads 
    drawRoad() // call the function 
}
// below draws the values from above?
function drawRoad(){ // draw car 
    ctx.drawImage(road, 200, 0, canvas.width/2, canvas.height)

}
let car = {
  x: 260,
  y: 450,
  w: 100,
  h: 110,
}

// Image load and drawing with canvas
let image = new Image() 
image.src = '../images/car.png'  //Laasign ssource of image 
image.onload = function(e){ // when it loads 
    drawCar() // call the function 
}
// below draws the values from above?
function drawCar(){ // draw car 
    ctx.drawImage(image, car.x, car.y, car.w, car.h)
}




document.body.onkeypress = function(e){
    if(e.key === 'w'){ //Move up
        car.y-=10
    }
    if(e.key === 'd'){ //Move right
        car.x+=10
    }
    if(e.key === 'a'){ //Move left
        car.x-=10
    }
    if(e.key === 's'){ //Move down
        car.y+=10; 
    }
}
