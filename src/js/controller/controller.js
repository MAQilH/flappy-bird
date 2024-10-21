import stage from "../stage"
import ScoreBoardController from "./scoreBoardController"
import startMenuControler from "./startMenuControler"

class Controller {
    init() {
        stage.init()
        startMenuControler.init()
    }
}

const controller = new Controller()
controller.init()