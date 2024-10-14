class Util {
    getRandom(min, max) {
        return min + Math.random() * (max - min)
    }

    getRandomInt(min, max) {
        return Math.floor(this.getRandom(min, max))
    }
}


export default new Util()