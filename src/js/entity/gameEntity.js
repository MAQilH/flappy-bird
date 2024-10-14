
class GameEntity {
    _gameBoard
    _context

    constructor(gameBoard, context) {
        this._gameBoard = gameBoard
        this._context = context
    }
    
    render() {
        this._context.fillStyle = 'black'
        this._context.fillRect(0, 0, this._width, this._height)
    }

    update() {

    }
}


export default GameEntity