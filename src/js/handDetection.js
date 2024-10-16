import inputHandler from "./handler/inputHandler"
import { Hands } from '@mediapipe/hands'
import { Camera } from '@mediapipe/camera_utils'
import vector from "./libs/vector"

function isLike(points) {
    if (!vector.checkInLine(points)) {
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

async function startCapturing() {

    const videoElement = document.querySelector('.input_video');
    console.log(videoElement)
    
    const hands = new Hands({
        locateFile: (file) => {
            return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
        }
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
    
    async function onResults(results) {
        if (results.multiHandLandmarks && [...results.multiHandLandmarks].length > 0) {
            const landmarks = results.multiHandLandmarks[0]
            tumpVectors = []
            for(let index = 1; index < 5; index++){
                tumpVectors.push(vector.createNew(landmarks[index]))
            }
            inputHandler.keys['KeyW'] = isLike(tumpVectors)
            inputHandler.keys['KeyS'] = isDisLike(tumpVectors)
        }
    }
}

export {
    startCapturing
}