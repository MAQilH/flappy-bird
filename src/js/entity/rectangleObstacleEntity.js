import inputHandler from "../handler/inputHandler"
import util from "../util"
import gameView from "../view/gameView"

export default class RectangelObstacleEntity {
    _context
    _game
    _rectModel
    _removeHandler
    _rectColor
    _rectAccelerate
    
    constructor(rectModel, context, game) {
        this._context = context
        this._game = game
        this._rectModel = rectModel

        this._rectColor = `rgb(${util.getRandomInt(0, 256)} ${util.getRandomInt(0, 256)} ${util.getRandomInt(0, 256)} / ${util.getRandomInt(80, 90)}%)`
    }

    render() {
        this._context.fillStyle = this._rectColor
        this._context.fillRect(this._rectModel.xPos, this._rectModel.yPos, this._rectModel.width, this._rectModel.height)
    }

    update() {
        this._rectModel.xPos -= this._game.speed + this._rectModel.speed

        if (this._rectModel.xPos + this._rectModel.width < 0) {
            this._removeHandler(this)
        }
    }

    addRemoveHandler(handler) {
        this._removeHandler = handler
    }
}