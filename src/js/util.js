class Util {
    getRandom(min, max) {
        return min + Math.random() * (max - min)
    }

    getRandomInt(min, max) {
        return Math.floor(this.getRandom(min, max))
    }

    circleRectCollision(cx, cy, r, rx, ry, rw, rh) {
        const closestX = Math.max(rx, Math.min(cx, rx + rw));
        const closestY = Math.max(ry, Math.min(cy, ry + rh));
        const distanceX = cx - closestX;
        const distanceY = cy - closestY;
        const distanceSquared = (distanceX * distanceX) + (distanceY * distanceY);
        return distanceSquared <= (r * r);
    }

    timeBlock(sec) {
        return new Promise((res, rej) => {
            setTimeout(() => {
                res()
            }, sec * 1000)
        })
    }
}

export default new Util()