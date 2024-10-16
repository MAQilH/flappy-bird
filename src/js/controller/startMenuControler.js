import Game from "../models/game"
import startMenuView from "../view/startMenuView"
import gameController from "./gameController"
import scoreBoardController from "./scoreBoardController"

class StartMenuControler {
    init() {
        startMenuView.render()

        startMenuView.addStartGameHandler(this.showStartGame.bind(this))
        startMenuView.addResumeGameHandler(this.showResumeGame.bind(this))
        startMenuView.addScoreBoardHandler(this.showScoreBoard.bind(this))
    }

    showStartGame() {
        this.close()
        gameController.init()
    }

    showResumeGame() {
        this.close()
        this.loadResume()
    }

    loadResume() {
        const prevGame = JSON.parse(localStorage.getItem('prevGame'))
        console.log(prevGame)
        if(!prevGame) {
            return
        } 
        prevGame.__proto__ = Game.prototype
        
        gameController.init(prevGame)
    }

    showScoreBoard() {
        this.close()
        scoreBoardController.init()
    }

    close() {
        startMenuView.close()
    }
}

export default new StartMenuControler()