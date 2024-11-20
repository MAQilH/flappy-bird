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

    if(angle > Math.PI/6) return false
    return true
}

function isDisLike(points) {
    return isLike(
        points.map(point => point.mul(-1))
    )
}

function isHorizontal(littleFingureLandmark) {
    
    if(!vector.checkInLine(littleFingureLandmark)) {
        return false
    }
    
    for(let landmarkIndex = 1; landmarkIndex < littleFingureLandmark.length; landmarkIndex++) {
        if(littleFingureLandmark[landmarkIndex-1].x > littleFingureLandmark[landmarkIndex].x) {
            return false
        }
    }

    const littleFingureVector = littleFingureLandmark[littleFingureLandmark.length - 1].sub(littleFingureLandmark[0])
    const rightLine = new vector(-1, 0, 0)
    let angle = Math.abs(rightLine.angleBetween(littleFingureVector))
    angle = Math.min(Math.PI - angle, angle)

    return angle < Math.PI/4
}

async function startCapturing() {

    const videoElement = document.querySelector('.input_video');
    
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

    let lastTimeout = null;
    
    const camera = new Camera(videoElement, {
        onFrame: async function() {
            if(!lastTimeout) {
                lastTimeout = setTimeout(async function() {
                    await hands.send({
                        image: videoElement
                    });
                    lastTimeout = null
                }, 100)
            }
        },
        width: 640,
        height: 480
    });
    camera.start();
    
    async function onResults(results) {
        if (results.multiHandLandmarks && [...results.multiHandLandmarks].length > 0) {
            const landmarks = results.multiHandLandmarks[0]
            let tumpVectors = []
            for(let index = 1; index < 5; index++){
                tumpVectors.push(vector.createNew(landmarks[index]))
            }
            inputHandler.keys['KeyW'] = isLike(tumpVectors)
            inputHandler.keys['KeyS'] = isDisLike(tumpVectors)


            const littleFingureLandmarkId = [17, 18, 19, 20]
            const littleFingureVectors = littleFingureLandmarkId.map(landmarkId => {
                return vector.createNew(landmarks[landmarkId])
            }) 

            inputHandler.keys['KeyF'] = isHorizontal(littleFingureVectors)
        }
    }
}

export {
    startCapturing
}