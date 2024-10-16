class AlertAskNameView {
    _finishHandler 
    render() {
        const htmlComponent = `
            <div class="alert">
                <div class="overlay"></div>
                <form class="alert-form" action="/">
                    <input type="text" class="alert-input" placeholder="Your name ...">
                    <button class="alert-submit__btn">Enter</button>
                </div>
            </div>
        `
        document.body.insertAdjacentHTML('afterbegin', htmlComponent)
    
        this._alert = document.querySelector('.alert')
        this._submitBtn = this._alert.querySelector('.alert-submit__btn')
        this._alertInput = this._alert.querySelector('.alert-input')
        
        this._submitBtn.addEventListener('click', function(e){
            e.preventDefault()
            const username = this._alertInput.value
            if(!username) return
            this._alertInput.value = ''
            this._finishHandler(username)
        }.bind(this))
    }

    addFinishHandler(handler) {
        this._finishHandler = handler
    }

    close() {
        console.log(this)
        console.log(this._alert, document.body)
        document.body.removeChild(this._alert)
    }
}

export default new AlertAskNameView()