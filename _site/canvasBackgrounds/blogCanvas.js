const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

// Event Listeners
let mouseDown = false
addEventListener('mousedown', () => {
    mouseDown = true
})

let mouseUp = false
addEventListener('mouseup', () => {
    mouseDown = false
})

addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight

    init()
})

// Objects
class Particle {
    constructor(x, y, radius, color) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
    }

    draw() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.shadowColor = this.color
        c.shadowBlur = 15
        c.fillStyle = this.color
        c.fill()
        c.closePath()
    }

    update() {
        this.draw()
    }
}

// Implementation 
let particles
function init() {
    particles = []

    for (let i = 0; i < 1000; i++) {
        const canvasWidth = canvas.width + 350
        const canvasHeight = canvas.height + 500
        const x = Math.random() * canvasWidth - canvasWidth / 2
        const y = Math.random() * canvasHeight - canvasHeight / 2
        const radius = Math.random() * 2
        const color = colors[Math.floor(Math.random() * colors.length)]
        particles.push(new Particle(x, y, radius, color))
    }
}

// Animation Loop
let radians = 0
let alpha = 1
function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = `rgba(255, 255, 255, ${alpha})`
    c.fillRect(0, 0, canvas.width, canvas.height) 

    c.save()
    c.translate(canvas.width / 2, canvas.height / 2)
    c.rotate(radians)

    particles.forEach(particle => {
        particle.update()
    })

    c.restore()

    radians += 0.003
    if (mouseDown && alpha >= 0.03) {
        alpha -= 0.01
    } else if (!mouseDown && alpha < 1) {
        alpha += 0.01
    } 
}

init()
animate()