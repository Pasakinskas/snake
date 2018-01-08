class Board {
    constructor (width, height) {
        this.width = width;
        this.height = height;
        this.data = this.createSquareArray();
        this.populateNeighbors();
    }

    fetchSquare(x, y) {
        return this.data[y][x];
    }
  
    getSquareNeighbors(square) {
        let squareNeighbors = [];
        let x = square.x;
        let y = square.y;
        if (x + 1 < this.width) {
            squareNeighbors.push(this.fetchSquare(x + 1, y));
            if (y + 1 <  this.height) {
                squareNeighbors.push(this.fetchSquare(x + 1, y + 1));               
            }
            if (y !== 0) {
                squareNeighbors.push(this.fetchSquare(x + 1, y - 1));               
            }
        }
        if (x !== 0) {
            squareNeighbors.push(this.fetchSquare(x - 1, y));
            if (y + 1 <  this.height) {
                squareNeighbors.push(this.fetchSquare(x - 1, y + 1));               
            }
            if (y !== 0) {
                squareNeighbors.push(this.fetchSquare(x - 1, y - 1));               
            }
        }
        if (y !== 0) {
            squareNeighbors.push(this.fetchSquare(x, y - 1));
        }
        if (y + 1 < this.height) {
            squareNeighbors.push(this.fetchSquare(x, y + 1));
        }
        return squareNeighbors;
    }

    populateNeighbors() {
        for (let row of this.data) {
            for (let square of row) {
                square.neighbors = this.getSquareNeighbors(square);
            }
        }
    }

    createSquareArray () {
        var board = [];
        while (board.length < this.height) {
            var row = [];
            while (row.length < this.width) {
                row.push(new Square(row.length, board.length));
            }
            board.push(row);
        }
        return board;
    }
}