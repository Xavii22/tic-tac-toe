let board = [
    {
        icon: "",
    },
    {
        icon: "",
    },
    {
        icon: "",
    },
    {
        icon: "",
    },
    {
        icon: "",
    },
    {
        icon: "",
    },
    {
        icon: "",
    },
    {
        icon: "",
    },
    {
        icon: "",
    },
];

let isRoundFinished = false;

const generateComputerMove = () => {
    let position;
    let isFreePosition = false;

    do {
        position = Math.floor(Math.random() * 9);

        board.forEach((number) => {
            if (number.icon == "") {
                isFreePosition = true;
            }
        });

        if (!isFreePosition) {
            return;
        }
    } while (board[position].icon !== "");

    return position;
};

const checkWinner = (isPlayer) => {
    let symbol;

    if (isPlayer) {
        symbol = "X";
    } else {
        symbol = "0";
    }

    for (let i = 0; i < 9; i += 3) {
        if (
            board[i].icon == symbol &&
            board[i + 1].icon == symbol &&
            board[i + 2].icon == symbol
        ) {
            console.log("Winner: " + symbol);
        }
    }

    for (let i = 0; i < 3; i++) {
        if (
            board[i].icon == symbol &&
            board[i + 3].icon == symbol &&
            board[i + 6].icon == symbol
        ) {
            console.log("Winner: " + symbol);
        }
    }

    if (
        (board[0].icon == symbol &&
            board[4].icon == symbol &&
            board[8].icon == symbol) 
            ||
        (board[2].icon == symbol &&
            board[4].icon == symbol &&
            board[6].icon == symbol)
    ) {
        console.log("Winner: " + symbol);
    }

    return false;
};

const printResults = (isPlayer) => {};

const showRestartButton = () => {
    const restartButton = document.querySelector("button");
    restartButton.style.visibility = "";
    console.log(restartButton);
};

const printMove = (move, isPlayer) => {
    const board = document.querySelector(".board");
    const position = board.children[move];
    let symbol = document.createElement("h3");

    if (isPlayer) {
        symbol.textContent = "X";
    } else {
        symbol.textContent = "O";
    }

    position.appendChild(symbol);
};

const setMoveToBoard = (move, isPlayer) => {
    if (board[move].icon != "") {
        return;
    }

    if (isPlayer) {
        board[move].icon = "X";
        printMove(move, true);
    } else {
        board[move].icon = "O";
        printMove(move, false);
    }
    
};

const play = (playerMove) => {
    if (isRoundFinished) {
        return;
    }
    isRoundFinished = true;
    showRestartButton();

    setMoveToBoard(playerMove, true);

    setTimeout(() => {
        setMoveToBoard(generateComputerMove(), false);
        isRoundFinished = false;
    }, 1000);
};
