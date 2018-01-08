class Graphics {
    constructor(options) {
        this.cellWidth = options.cellWidth;
        this.cellHeight = options.cellHeight;

        this.boardWidth = options.gameWidth,
        this.boardHeight = options.gameHeight,

        this.spcBetweenSquares = options.spcBetweenSquares;
        this.backgroundColor = options.backgroundColor;
        this.squareColor = options.squareColor;
        this.snakeColor = options.snakeColor;
        this.headColor = options.headColor;
        this.foodColor = options.foodColor;

        this.gridSize = this.getGridSize(options.boardWidth, options.boardHeight);
        this.initGraphics(this.gridSize[0], this.gridSize[1]);
    }

    getGridSize (width, height) {
        let singleGridWidth = (width * (this.cellWidth + this.spcBetweenSquares)
         + this.spcBetweenSquares);
        let singleGridHeight = (height * (this.cellHeight + this.spcBetweenSquares)
         + this.spcBetweenSquares); 
         return [singleGridWidth, singleGridHeight];
    }

    initGraphics (singleGridWidth, singleGridHeight) {
        let canvas = document.getElementById('canvas');
        canvas.width = singleGridWidth;
        canvas.height = singleGridHeight;
        
        this.context = canvas.getContext("2d");
        this.context.fillStyle = this.backgroundColor;
        this.context.fillRect(0, 0, canvas.width, canvas.height);
    }

    drawBoard (player) {
        player.board.data.forEach ((row, y) => {
            row.forEach ((square, x) => {
                if (square.snakeHere) {
                    this.context.fillStyle = this.snakeColor; 
                    if (square.x === player.head.x && square.y === player.head.y) {
                        this.context.fillStyle = this.headColor;
                    }
                }
                else if (square.foodHere) {
                    this.context.fillStyle = this.foodColor;
                }
                else {
                    this.context.fillStyle = this.squareColor;                    
                }
                // if I set color myself
                // this.context.fillStyle = square.getColor();
                this.context.fillRect(x * (this.cellWidth + this.spcBetweenSquares) + this.spcBetweenSquares, 
                y * (this.cellHeight + this.spcBetweenSquares) + this.spcBetweenSquares, this.cellWidth, this.cellHeight);
            });
        });
    }
}