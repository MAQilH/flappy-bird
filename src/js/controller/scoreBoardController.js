import stage from "../stage"
import scoreBoardView from "../view/scoreBoardView"
import startMenuControler from "./startMenuControler"

class ScoreBoardController {
    init() {
        scoreBoardView.render()

        scoreBoardView.addBackHandler(this.backToStartMenu.bind(this))
        
        let sortedScore = [...stage.scoreBoard]
        sortedScore.sort((a, b) => a[1] < b[1])
        stage.scoreBoard = stage.scoreBoard

        sortedScore.forEach((record, index) => {
            const [playerName, score] = record
            scoreBoardView.insertTableRow(index + 1, playerName, Math.floor(score))
        })


    }

    backToStartMenu() {
        this.close()
        startMenuControler.init()
    }

    close() {
        scoreBoardView.close()
    }
}

export default new ScoreBoardController()