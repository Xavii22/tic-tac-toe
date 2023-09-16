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
let isGameFinished = false;

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

const setMove = (move, isPlayer) => {
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
            printWinner(isPlayer);
            isGameFinished = true;
        }
    }

    for (let i = 0; i < 3; i++) {
        if (
            board[i].icon == symbol &&
            board[i + 3].icon == symbol &&
            board[i + 6].icon == symbol
        ) {
            printWinner(isPlayer);
            isGameFinished = true;
        }
    }

    if (
        (board[0].icon == symbol &&
            board[4].icon == symbol &&
            board[8].icon == symbol) ||
        (board[2].icon == symbol &&
            board[4].icon == symbol &&
            board[6].icon == symbol)
    ) {
        printWinner(isPlayer);
        isGameFinished = true;
    }

    return false;
};

const restartGame = () => {
    board.forEach(function (number) {
        number.icon = "";
    });
    isRoundFinished = false;
    isGameFinished = false;

    const moves = document.querySelectorAll("h3");

    moves.forEach((element) => {
        element.remove();
    });

    const winnerMessage = document.getElementById("winner");
    winnerMessage.style.visibility = "hidden";
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

const printWinner = (isPlayer) => {
    const winnerMessage = document.getElementById("winner");

    if (isPlayer) {
        winnerMessage.textContent = "YOU WIN!";
        winnerMessage.style.visibility = "visible";
        return;
    }

    winnerMessage.textContent = "COMPUTER WIN!";
};

const showRestartButton = () => {
    const restartButton = document.querySelector("button");
    restartButton.style.visibility = "";
};

const play = (playerMove) => {
    if (isRoundFinished) {
        return;
    }
    isRoundFinished = true;

    if (isGameFinished) {
        showRestartButton();
        return;
    }

    setMove(playerMove, true);
    checkWinner(true);

    if (isGameFinished) {
        showRestartButton();
        return;
    }

    setTimeout(() => {
        setMove(generateComputerMove(), false);
        checkWinner(false);
        isRoundFinished = false;
    }, 1000);
};
