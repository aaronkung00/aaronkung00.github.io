var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d')
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


//Variables
const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

const colors = [
    '#2185c5',
    '#7ECEFD',
    '#FFF6E5',
    'rgba(255, 247, 244, 0.93)', 
    '#ff2a00',
    '#66ffc4',
]

//Event Linsteners
addEventListener('mousemove' , event => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
})


addEventListener('resize' , event => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    init();
})


//Utility Functions
function randomFrIntRange(min,max) {
    return Math.floor(Math.random() * (max-min+1) +min);
}

function randomColor(colors) {
    return colors[Math.floor(Math.random()*colors.length)];
}


//Objects
function Particle(x,y,radius, color){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.radians = Math.random() * Math.PI * 2;
    this.velocity = 0.003;
    this.distfrCenter = randomFrIntRange(100,canvas.width);
    this.lastMouse = {x:x , y:y};
    
    
    this.update = () => {
        const lastPoint = {
            x: this.x,
            y: this.y
        };
        //drag motion
        this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.08;
        this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.08;
        
        //Move point overtime
        this.radians += this.velocity;
        //cicular motion
        this.x =  x + Math.cos(this.radians) * this.distfrCenter;
        this.y =  y  + Math.sin(this.radians) * this.distfrCenter;
        this.draw(lastPoint);
    };
    
    this.draw = lastPoint => {
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lengthWidth = this.radius;
        ctx.moveTo(lastPoint.x,lastPoint.y);
        ctx.lineTo(this.x,this.y);
        ctx.stroke();
        ctx.closePath();
    };
}

//Implementation
let particles;
function init() {
    particles = [];
    
    for(let i = 0 ; i < 2000 ; i++){
        const radius = (Math.random * 2) + 1;
        particles.push(new Particle(canvas.width/2,canvas.height/2,radius,
                                   randomColor(colors)));
    }
}



//Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    ctx.fillStyle = 'rgba(8, 7, 7, 0.7)';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    //ctx.clearRect(0,0,canvas.width,canvas.height);
   
    particles.forEach(particle => {
        particle.update();
    })
    
}


init();
animate();