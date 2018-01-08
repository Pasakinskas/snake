class Square {
    constructor (x, y, color, foodHere, snakeHere, neighbors) {
        this.x = x;
        this.y = y;
        this.color = null;
        this.foodHere = false;
        this.snakeHere = false;
        this.neighbors = null;
    }

    setColor(color) {
        this.color = color;
    }

    getColor() {
        return this.color;
    }

    setFoodHere() {
        this.foodHere = true;
    }
    
    setNeutral() {
        this.snakeHere = false;
    }

    setSnakeHere() {
        this.snakeHere = true;
    }
}