class Stage {
    game 
    scoreBoard = []

    init() {
        this.loadScores()
    }

    loadScores() {
        this.scoreBoard = JSON.parse(localStorage.getItem('scores')) || []
    }

    addScoreRecord(username, score) {
        this.scoreBoard.push([username, score])
        localStorage.setItem('scores', JSON.stringify(this.scoreBoard))
    }
}

export default new Stage()