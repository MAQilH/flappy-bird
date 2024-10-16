import { Camera } from "@mediapipe/camera_utils"
import { Hands } from "@mediapipe/hands"

class vector {
    constructor(x, y, z) {
        this.x = x
        this.y = y
        this.z = z
    }

    static createNew(obj) {
        return new vector(obj.x, obj.y, obj.z)
    }

    add(v) {
        return new vector(
            this.x + v.x,
            this.y + v.y,
            this.z + v.z
        )
    }

    sub(v) {
        return this.add(v.mul(-1))
    }

    mul(t) {
        return new vector(this.x * t, this.y * t, this.z * t)
    }

    cross(v) {
        return new vector(
            this.y * v.z - this.z * v.y,
            this.z * v.x - this.x * v.z,
            this.x * v.y - this.y * v.x
        )
    }

    prod(v) {
        return this.x * v.x + this.y * v.y + this.z * v.z
    }

    len() {
        return Math.sqrt(
            this.x * this.x + this.y * this.y + this.z * this.z
        )
    }

    angleBetween(v) {
        return Math.acos(this.prod(v) / (this.len() * v.len()))
    }
}

function checkInLine(points) {
    for (let index = 2; index < points.length; index++) {
        const prevVector = points[index - 1].sub(points[index-2])
        const curVector = points[index].sub(points[index - 1])
        const angle = Math.abs(prevVector.angleBetween(curVector))
        if (Math.min(angle, Math.PI - angle) > Math.PI / 6) return false
    }
    return true
}

function isLike(points) {
    if (!checkInLine(points)) {
        return false
    }
    for (let index = 1; index < points.length; index++) {
        if (points[index].y > points[index - 1].y) return false
    }

    const rightLine = new vector(0, 1, 0)
    const tumpVector = points[points.length - 1].sub(points[0])
    tumpVector.z = 0

    let angle = Math.abs(rightLine.angleBetween(tumpVector))
    angle = Math.min(Math.PI - angle, angle)

    if(angle > Math.PI/8) return false
    return true
}

function isDisLike(points) {
    return isLike(
        points.map(point => point.mul(-1))
    )
}


const videoElement = document.querySelector('.input_video');

const hands = new Hands({
    locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
});
hands.setOptions({
    maxNumHands: 1,
    modelComplexity: 1,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5
});

hands.onResults(onResults);

const camera = new Camera(videoElement, {
    onFrame: async() => {
        await hands.send({
            image: videoElement
        });
    },
    width: 640,
    height: 480
});
camera.start();
console.log('34')

function onResults(results) {
    if (results.multiHandLandmarks && [...results.multiHandLandmarks].length > 0) {
        const landmarks = results.multiHandLandmarks[0]
        tumpVector = []
        for(let index = 1; index < 5; index++){
            tumpVector.push(vector.createNew(landmarks[index]))
        }
        console.log(isLike(tumpVector), isDisLike(tumpVector))
    }
}