class ScoreBoardView {
    _startMenu
    _tabelBody

    render() {
        const htmlComponent = `
            <div class="start-menu">
                <div class="scoreboard-card">
                    <i class="back__btn fas fa-arrow-left"></i>
                    <h1>Score Board</h1>
                    <table class="score-table">
                        <thead>
                            <tr>
                                <th>Rank</th>
                                <th>Player Name</th>
                                <th>Score</th>
                            </tr>
                        </thead>
                        <tbody class="table-body">
                        </tbody>
                    </table>
                </div>
            </div>
        `
        document.body.insertAdjacentHTML('afterbegin', htmlComponent)

        this._startMenu = document.querySelector('.start-menu')
        this._tabelBody = this._startMenu.querySelector('.table-body')
        this._backBtn = this._startMenu.querySelector('.back__btn')
    }

    insertTableRow(rank, name, score) {
        const htmlComponent = `
             <tr>
                <td>${rank}</td>
                <td>${name}</td>
                <td>${score}</td>
            </tr>
        `
        this._tabelBody.insertAdjacentHTML('beforeend', htmlComponent)
    }

    close() {
        document.body.removeChild(this._startMenu)
    }

    addBackHandler(handler) {
        this._backBtn.addEventListener('click', handler)
    }
}

export default new ScoreBoardView()