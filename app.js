// □ ■

let formatTab = 10;
let emptyCase = ' - ';
let pawnWhite = ' ■ ';
let pawnBlack = ' □ ';
let QueenWhite = ' ♦ ';
let QueenBlack = ' ♢ ';
let verticalBoard = [
    0,
    ' A ',
    ' B ',
    ' C ',
    ' D ',
    ' E ',
    ' F ',
    ' G ',
    ' H ',
    ' I ',
    ' J ',
    ' K ',
    ' L ',
];
let horizontalBoard = [
    0,
    ' 1 ',
    ' 2 ',
    ' 3 ',
    ' 4 ',
    ' 5 ',
    ' 6 ',
    ' 7 ',
    ' 8 ',
    ' 9 ',
    ' 10',
    ' 11',
    ' 12',
];
let cornerBoard = ' * ';
let playersTurn = 1;
let history = [];

let tab = board(formatTab, emptyCase, pawnBlack, pawnWhite);

function board(formatTab, emptyCase, pawnBlack, pawnWhite) {
    let tab = [];
    for (let j = 0; j < formatTab; j++) {
        let line = [];
        for (let i = 0; i < formatTab; i++) {
            if (
                (j === 0 && i === 0) ||
                (j === formatTab - 1 && i === formatTab - 1) ||
                (j === 0 && i === formatTab - 1) ||
                (j === formatTab - 1 && i === 0)
            ) {
                line.push(cornerBoard);
            } else if (j === 0 || j === formatTab - 1) {
                line.push(verticalBoard[i]);
            } else if (i === 0 || i === formatTab - 1) {
                line.push(horizontalBoard[j]);
            } else if (j > Math.ceil(formatTab / 2 - 1)) {
                if (j === Math.ceil(formatTab / 2)) {
                    line.push(emptyCase);
                } else if (j % 2) {
                    if (i % 2) {
                        line.push(emptyCase);
                    } else {
                        line.push(pawnWhite);
                    }
                } else {
                    if (i % 2) {
                        line.push(pawnWhite);
                    } else {
                        line.push(emptyCase);
                    }
                }
            } else if (j < Math.ceil(formatTab / 2)) {
                if (j === Math.ceil(formatTab / 2 - 1)) {
                    line.push(emptyCase);
                } else if (j % 2) {
                    if (i % 2) {
                        line.push(emptyCase);
                    } else {
                        line.push(pawnBlack);
                    }
                } else {
                    if (i % 2) {
                        line.push(pawnBlack);
                    } else {
                        line.push(emptyCase);
                    }
                }
            }
        }
        tab.push(line);
    }
    return tab;
}

function displayBoard() {
    return tab.join('\n').replace(/,/g, '') + '\n------------------------------';
}

function movePawn(X, Y, endX, endY) {
    let validateMove = validationMove(X, Y, endX, endY);

    if (validateMove[0] === true) {
        history.push([X, Y, endX, endY]);

        tab[endX][endY] = tab[X][Y];

        if (endX === 1 && tab[endX][endY] === pawnWhite) {
            tab[endX][endY] = QueenWhite;
        }

        if (endX === 8 && tab[endX][endY] === pawnBlack) {
            tab[endX][endY] = QueenBlack;
        }

        tab[X][Y] = emptyCase;

        playersTurn++;

        return displayBoard();
    } else {
        return validateMove[1];
    }
}

function validationMove(X, Y, endX, endY) {
    if (
        (playersTurn % 2 === 0 && tab[X][Y] === pawnWhite) ||
        (playersTurn % 2 === 1 && tab[X][Y] === pawnBlack)
    ) {
        return [false, 'a l autre de jouer'];
    }

    if (tab[X][Y] === emptyCase) {
        return [false, 'case vide'];
    }

    if (X === endX && Y === endY) {
        return [false, 'arrive = depart'];
    }

    if (tab[endX][endY] !== emptyCase) {
        return [false, 'il y a un pion'];
    }

    if (!(X >= 1 && Y >= 1 && X <= formatTab - 2 && Y <= formatTab - 2)) {
        return [false, 'dehors board'];
    }

    if (!(Math.abs(X - endX) === Math.abs(Y - endY))) {
        return [false, 'que en diagognale'];
    }

    let validateToEat = obligationToEat();

    if (
        validateToEat[0] === true &&
        X !== validateToEat[1] &&
        Y !== validateToEat[2]
    ) {
        return [
            false,
            `vous devez mangez avec le pion en ${validateToEat[1]} - ${validateToEat[2]}`,
        ];
    }

    if (tab[X][Y] === QueenWhite || tab[X][Y] === QueenBlack) {
        return validationQueen(X, Y, endX, endY);
    }

    if (tab[X][Y] === pawnWhite || tab[X][Y] === pawnBlack) {
        return validationPawn(X, Y, endX, endY);
    }
}

function validationEat(X, Y, endX, endY) {
    let sensX = X < endX ? -1 : 1;
    let sensY = Y < endY ? -1 : 1;

    if (tab[endX + sensX][endY + sensY] !== emptyCase) {
        tab[endX + sensX][endY + sensY] = emptyCase;
        return [true];
    }
    return [false, 'deplacement 1 case ou 2 pour mager (validationEat)'];
}

function obligationToEat() {
    let colorPawn = playersTurn % 2 === 0 ? pawnBlack : pawnWhite;
    let repeat = formatTab - 1;

    for (let i = 1; i < repeat; i++) {
        for (let j = 1; j < repeat; j++) {
            if (tab[i][j] === colorPawn) {
                if (i + 2 < repeat && j + 2 < repeat) {
                    if (
                        tab[i + 1][j + 1] !== colorPawn &&
                        tab[i + 1][j + 1] !== emptyCase &&
                        tab[i + 2][j + 2] === emptyCase
                    ) {
                        return [true, i, j];
                    }
                }

                if (i - 2 > 0 && j - 2 > 0) {
                    if (
                        tab[i - 1][j - 1] !== colorPawn &&
                        tab[i - 1][j - 1] !== emptyCase &&
                        tab[i - 2][j - 2] === emptyCase
                    ) {
                        return [true, i, j];
                    }
                }

                if (i - 2 > 0 && j + 2 < repeat) {
                    if (
                        tab[i - 1][j + 1] !== colorPawn &&
                        tab[i - 1][j + 1] !== emptyCase &&
                        tab[i - 2][j + 2] === emptyCase
                    ) {
                        return [true, i, j];
                    }
                }

                if (i + 2 < repeat && j - 2 > 0) {
                    if (
                        tab[i + 1][j - 1] !== colorPawn &&
                        tab[i + 1][j - 1] !== emptyCase &&
                        tab[i + 2][j - 2] === emptyCase
                    ) {
                        return [true, i, j];
                    }
                }
            }
        }
    }
    return [false];
}

function validationPawn(X, Y, endX, endY) {
    if (Math.abs(X - endX) > 2 && Math.abs(Y - endY) > 2) {
        return [false, 'deplacement 1 case ou 2 pour mager (validationPawn)'];
    }

    if (Math.abs(X - endX) === 1 && Math.abs(Y - endY) === 1) {
        return [true];
    }

    if (Math.abs(X - endX) === 2 && Math.abs(Y - endY) === 2) {
        return validationEat(X, Y, endX, endY);
    }
}

function validationQueen(X, Y, endX, endY) {
    let sensX = X < endX ? 1 : -1;
    let sensY = Y < endY ? 1 : -1;

    if (X !== endX && Y !== endY) {
        for (
            let i = X + sensX, j = Y + sensY;
            i < endX || j < endY;
            i += sensX, j += sensY
        ) {
            if (tab[i][j] !== emptyCase) {
                return validationEat(X, Y, endX, endY);
            }
        }
        return [true];
    }
}

console.log(displayBoard());

console.log(movePawn(6, 1, 5, 2));
console.log(movePawn(3, 2, 4, 3));
console.log(movePawn(6, 3, 5, 4));
console.log(movePawn(2, 1, 3, 2));
console.log(movePawn(4, 3, 6, 1));

console.log('HISTORY\n-------\n' + history.join('\n-------\n'));
