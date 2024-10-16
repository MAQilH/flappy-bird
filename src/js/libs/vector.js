export default class vector {
    constructor(x, y, z) {
        this.x = x
        this.y = y
        this.z = z
    }

    static createNew(obj) {
        return new vector(obj.x, obj.y, obj.z)
    }

    add(v) {
        return new vector(
            this.x + v.x,
            this.y + v.y,
            this.z + v.z
        )
    }

    sub(v) {
        return this.add(v.mul(-1))
    }

    mul(t) {
        return new vector(this.x * t, this.y * t, this.z * t)
    }

    cross(v) {
        return new vector(
            this.y * v.z - this.z * v.y,
            this.z * v.x - this.x * v.z,
            this.x * v.y - this.y * v.x
        )
    }

    prod(v) {
        return this.x * v.x + this.y * v.y + this.z * v.z
    }

    len() {
        return Math.sqrt(
            this.x * this.x + this.y * this.y + this.z * this.z
        )
    }

    angleBetween(v) {
        return Math.acos(this.prod(v) / (this.len() * v.len()))
    }

    static checkInLine(points) {
        for (let index = 2; index < points.length; index++) {
            const prevVector = points[index - 1].sub(points[index-2])
            const curVector = points[index].sub(points[index - 1])
            const angle = Math.abs(prevVector.angleBetween(curVector))
            if (Math.min(angle, Math.PI - angle) > Math.PI / 4) return false
        }
        return true
    }
}