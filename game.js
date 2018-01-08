class Game {
    constructor() {
        this.delayTime = 75;
        this.gameWidth = 25;
        this.gameHeight = 25;
        this.direction = "d";
        const self = this;
        this.loopRuns = true;
        this.alive = true;

        this.graphics = new Graphics({
            cellWidth: 10,
            cellHeight: 10,
            spcBetweenSquares: 2,
            backgroundColor: "green",
            squareColor: "pink",
            snakeColor: "red",
            headColor: "#A62A2A",
            foodColor: "black",
            boardWidth: this.gameWidth,
            boardHeight: this.gameHeight,
        });

        this.createPlayers(this.gameWidth, this.gameHeight);
    }

    createPlayers(width, height) {
        const names = ["Mrello"];
        this.players = names.map(name => {
            return new Player(name);
        });
 
        this.players.forEach((player) => {
            player.board = new Board(width, height);
        });
    }

    placeSnake(x, y, player) {
        let target = player.board.fetchSquare(x, y);
        target.setSnakeHere();
        player.setHeadLocation(target);
    }

    growSnake(player, currHead) {
        if (player.head.foodHere == true) {
            player.head.foodHere = false;
            this.placeFood();
            player.size++;
        }
        if (player.tail.length == player.size) {
            let missingno = player.tail.splice(0, 1);
            missingno[0].setNeutral();
        }
        player.tail.push(currHead);
    }

    moveSnake(player, direction) {
        let origin = player.head;
        this.growSnake(player, origin);
        let target = null;

        if (direction == "d") {
            // if (origin.x + 1 >= player.board.width) {
            //     origin.x -= player.board.width;
            // }
            target = player.board.fetchSquare(origin.x + 1, origin.y);
        }
        else if (direction == "w") {
            // if (origin.y == 0) {
            //     origin.y += player.board.height;
            // }
            target = player.board.fetchSquare(origin.x, origin.y - 1);
        }
        else if (direction == "a") {
            target = player.board.fetchSquare(origin.x - 1, origin.y);
        }
        else if (direction == "s") {
            target = player.board.fetchSquare(origin.x, origin.y + 1);
        }

        if (target.snakeHere == true) {
            this.alive = false;
        }
        target.setSnakeHere();
        player.setHeadLocation(target);
    }

    placeFood() {
        let foodPlace = this.players[0].pickRandSquare();
        foodPlace.setFoodHere();
    }

    draw() {
        for (const player of this.players) {
            this.graphics.drawBoard(player);
        }
    }

    start () {
        let firstX = Math.floor(this.gameWidth / 2);
        let firstY = Math.floor(this.gameHeight / 2);
        this.placeSnake(firstX, firstY, this.players[0]);
        this.placeFood();
        this.draw();

        var eventsKey = {
            w: "KeyW",
            s: "KeyS",
            d: "KeyD",
            a: "KeyA",
            p: "KeyP",
            space: "space"
        };

        document.addEventListener("keydown", () => {
            if (event.code == eventsKey.s && this.direction != "w") {
                this.direction = "s";
            }
            if (event.code == eventsKey.w && this.direction != "s") {
                this.direction = "w";
            }
            if (event.code == eventsKey.d && this.direction != "a") {
                this.direction = "d";       
            }
            if (event.code == eventsKey.a && this.direction != "d") {
                this.direction = "a";       
            }       
        });

        if (this.alive) {
            window.setInterval(this.update.bind(this), this.delayTime);
        }
    }

    update() {
        if (this.alive) {
            this.moveSnake(this.players[0], this.direction);
            this.draw();
        }
    }
}

var game = new Game();
game.start();
