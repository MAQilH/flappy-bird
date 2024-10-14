import inputHandler from "../handler/inputHandler"
import gameView from "../view/gameView"

export default class RectangelObstacleEntity {
    _context
    _game
    _rectModel
    _removeHandler
    constructor(rectModel, context, game) {
        this._context = context
        this._game = game
        this._rectModel = rectModel
    }

    render() {
        this._context.fillRect(this._rectModel.xPos, this._rectModel.yPos, this._rectModel.width, this._rectModel.height)       
    }

    update() {
        this._rectModel.xPos -= this._game.speed

        if(this._rectModel.xPos + this._rectModel.width < 0) {
            this._removeHandler(this)
        }
    }

    addRemoveHandler(handler) {
        this._removeHandler = handler
    }
}