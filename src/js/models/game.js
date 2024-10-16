import config from "../config"

export default class Game {
    score
    birdModel
    rectObstacleModels = []
    speed
    playerName 

    constructor(birdModel, rectObstacleModels = [], score = 0, speed = config.GAME_SPEED) {
        this.birdModel = birdModel
        this.rectObstacleModels = rectObstacleModels
        this.score = score
        this.speed = speed
    }

    addRectObstacle(rectObstacle) {
        this.rectObstacleModels.push(rectObstacle)
    }
    removeRectObstacle(rectObstacle) {
        this.rectObstacleModels.splice(
            this.rectObstacleModels.findIndex(rect => rect === rectObstacle),
            1
        )
    }
}