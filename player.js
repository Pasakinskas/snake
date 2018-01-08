class Player {
    constructor(name, board, size) {
        this.size = size;
        this.name = name;
        this.board = null;
        this.head = null;
        this.size = 3;
        this.tail = [];
    }

    delHead() {
        this.head = null;
    }

    setHeadLocation(square) {
        this.head = square;
    }

    pickRandSquare() {
        let square = this.board.fetchSquare(Utilities.randinteger(this.board.width), 
        Utilities.randinteger(this.board.height));
        if (square.snakeHere == false) {
            return square;
        }
        // shoddy solution
        else {
            while (square.snakeHere == true) {
                square = this.board.fetchSquare(Utilities.randinteger(this.board.width), 
        Utilities.randinteger(this.board.height));
            }
            return square;
        }
    }
}