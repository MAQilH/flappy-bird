class GameEntity {
    _gameBoard
    _context
    _game

    constructor(gameBoard, context, game) {
        this._gameBoard = gameBoard
        this._context = context
        this._game = game
    }

    render() {
        this.renderBackground()
        this.renderScoreText()
        
    }

    renderBackground() {
        this._context.fillStyle = 'black'
        this._context.fillRect(0, 0, this._gameBoard.width, this._gameBoard.height) 
    }

    renderScoreText() {
        this._context.font = "40px Arial"
        this._context.fillStyle = 'white'
        this._context.textBaseline = 'top'
        this._context.textAlign = 'center'
        this._context.fillText(`Score: ${Math.floor(this._game.score)}`, this._gameBoard.width/2, 10)
    }

    update() {
        this._game.score += 0.1
    }
}


export default GameEntity