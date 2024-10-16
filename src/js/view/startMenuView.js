class StartMenuView {
    _startMenu
    _startGameBtn
    _resumeBtn
    _scoreBoardBtn
    
    _startGameHandler
    _resumeHandler
    _scoreBoardHandler

    render() {
        const htmlComponent = `
            <div class="start-menu">
                <div class="menu-card">
                    <button class="menu-button start-game">Start Game</button>
                    <button class="menu-button resume">Resume</button>
                    <button class="menu-button score-board">Score Board</button>
                </div>
            </div>
        `
        document.body.insertAdjacentHTML('afterbegin', htmlComponent)
        
        this._startMenu = document.querySelector('.start-menu')
        this._startGameBtn = this._startMenu.querySelector('.start-game')
        this._resumeBtn = this._startMenu.querySelector('.resume')
        this._scoreBoardBtn = this._startMenu.querySelector('.score-board')
    }

    addStartGameHandler(handler) {
        this._startGameBtn.addEventListener('click', handler)
    }

    addResumeGameHandler(handler) {
        this._resumeBtn.addEventListener('click', handler)
    }

    addScoreBoardHandler(handler) {
        this._scoreBoardBtn.addEventListener('click', handler)
    }

    close() {
        document.body.removeChild(this._startMenu)
    }
}

export default new StartMenuView()