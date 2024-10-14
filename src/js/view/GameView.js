class GameView {
    gameBoard
    context
    height
    width

    constructor() {
        this.gameBoard = document.getElementById('game-board');
        this.context = this.gameBoard.getContext('2d')
        this.height = window.innerHeight
        this.width = window.innerWidth

        this.gameBoard.width = this.width
        this.gameBoard.height = this.height
    }

    clearCanvas() {
        this.context.clearRect(0, 0, this.width, this.height)
    }
}

export default new GameView()