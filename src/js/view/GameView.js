class GameView {
    _gameContainer
    gameBoard
    context
    height
    width
    _pauseGameHandler

    render() {
        const htmlContent = `
            <div class="game">
                <canvas id="game-board"></canvas>
                <video class="input_video" style="display: none;"></video>
            </div>
        `
        document.body.insertAdjacentHTML('afterbegin', htmlContent)
        this._gameContainer = document.querySelector('.game')

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

    addPauseGameHandler(handler) {
        this._pauseGameHandler = handler
        document.addEventListener('keydown', this._pauseGameHandler)
    }

    close() {
        document.removeEventListener('keydown', this._pauseGameHandler)
        document.body.removeChild(this._gameContainer)
    }
}

export default new GameView()