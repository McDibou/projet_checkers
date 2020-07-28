// □ ■

let formatTab = 10;
let emptyCase = ' - ';
let pawnBlack = ' ■ ';
let pawnWhite = ' □ ';
let pawnQueen = ' x ';
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
let cornerBoard = ' - ';

let tab = board(formatTab, emptyCase, pawnBlack, pawnWhite);

console.log(afficheBoard());
console.log(movePawn(3, 2, 7, 5));


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
                if (
                    j === Math.ceil(formatTab / 2) ||
                    j === Math.ceil(formatTab / 2 - 1)
                ) {
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
            } else if (j < Math.ceil(formatTab / 2)) {
                if (
                    j === Math.ceil(formatTab / 2) ||
                    j === Math.ceil(formatTab / 2 - 1)
                ) {
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

    let validateMove = validationMove(X, Y, endX, endY)

    if (validateMove[0] === true) {

        tab[endX][endY] = tab[X][Y];
        tab[X][Y] = ' - ';
        return displayBoard();
        // return tab;

    } else {

        return validateMove[1];

    }

}

function validationMove(X, Y, endX, endY) {

    if (tab[X][Y] === ' - ') {
        return [false, 'case vide'];
    }

    if (tab[endX][endY] !== ' - ') {
        return [false, 'il y a un pion']
    }

    if (X === endX && Y === endY) {
        return [false, 'arrive = depart'];
    }

    if (!(X >= 1 && Y >= 1 && X <= formatTab - 2 && Y <= formatTab - 2)) {
        return [false, 'dehors board'];
    }

    if (tab[X][Y] === pawnBlack || pawnWhite) {
        return validationPawn(X, Y, endX, endY);
    }

    if (tab[X][Y] === pawnQueen) {
        return validationQueen(X, Y, endX, endY);
    }
}

function validationPawn(X, Y, endX, endY) {

}

function validationQueen(X, Y, endX, endY) {

}