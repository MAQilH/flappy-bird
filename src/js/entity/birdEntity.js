import inputHandler from "../handler/inputHandler"
import gameView from "../view/gameView"
import config from "../config"

export default class BirdEntity {
    _birdModel
    _context
    _game

    constructor(birdModel, context, game) {
        this._birdModel = birdModel
        this._context = context
        this._game = game
    }

    render() {
        this._context.beginPath()
        this._context.arc(this._birdModel.xCenter, this._birdModel.yCenter, this._birdModel.radius, 0, 2 * Math.PI, false);
        this._context.fillStyle = 'skyblue'
        this._context.fill()
        this._context.closePath()
    }

    update() {
        if (inputHandler.isKeyPressed('KeyW')) {
            this._birdMoveUp()
        } else if (inputHandler.isKeyPressed('KeyS')) {
            this._birdMoveDown()
        }
    }

    _birdMoveDown() {
        this._birdModel.yCenter = Math.min(gameView.height - config.BIRD_RADIUS * 1.5, this._birdModel.yCenter + this._birdModel.speed)
    }

    _birdMoveUp() {
        this._birdModel.yCenter = Math.max(config.BIRD_RADIUS * 1.5, this._birdModel.yCenter - this._birdModel.speed)
    }
}