class InputHandler {
    constructor() {
        this.keys = {};

        window.addEventListener('keydown', (event) => {
            this.keys[event.code] = true;
        });

        window.addEventListener('keyup', (event) => {
            this.keys[event.code] = false;
        });
    }

    isKeyPressed(keyCode) {
        return !!this.keys[keyCode];
    }
}

export default new InputHandler()