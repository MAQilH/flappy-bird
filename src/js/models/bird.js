export default class Bird {
    xCenter
    yCenter
    radius
    speed
    hidden

    constructor(speed, xCenter, yCenter, radius, hidden = false) {
        this.speed = speed
        this.xCenter = xCenter
        this.yCenter = yCenter
        this.radius = radius
        this.hidden = hidden
    }
}