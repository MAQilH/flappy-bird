import alertAskNameView from "../view/alertAskNameView"

class AlertAskNameController {
    _finishHandler
    init() {
        alertAskNameView.render()
        alertAskNameView.addFinishHandler(this.finish.bind(this))
    }

    finish(username) {
        alertAskNameView.close()
        this._finishHandler(username)
    }

    addFinishHandler(handler) {
        this._finishHandler = handler
    }
}

export default new AlertAskNameController()