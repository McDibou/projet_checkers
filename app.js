let formatTab = 10;
let endFormatTab = formatTab - 1;
let playersTurn = 1;
let history = [];
let player = {
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0,
    typeStart: '',
    colorStart: '',
    typeEnd: '',
    colorEnd: '',
    selected: false,
}

/**
 * Construit le plateau de jeu dans le navigateur
 * @param {number} formatTab - Defini la taille du plateau de jeu
 */
function board(formatTab) {
    let tab = document.createElement('tbody')
    tab.classList.add('board')
    for (let j = 0; j < formatTab; j++) {
        let line = document.createElement('tr')
        tab.insertAdjacentElement('beforeend', line)
        for (let i = 0; i < formatTab; i++) {
            if (
                (j === 0 && i === 0) ||
                (j === endFormatTab && i === endFormatTab) ||
                (j === 0 && i === endFormatTab) ||
                (j === endFormatTab && i === 0)
            ) {
                let corner = document.createElement('td')
                corner.id = `${j} ${i}`
                corner.classList.add('corner')
                line.insertAdjacentElement('beforeend', corner);
            } else if (j === 0 || j === endFormatTab) {
                let vertical = document.createElement('td')
                vertical.id = `${j} ${i}`
                vertical.classList.add('vertical')
                line.insertAdjacentElement('beforeend', vertical);
            } else if (i === 0 || i === endFormatTab) {
                let horizontal = document.createElement('td')
                horizontal.id = `${j} ${i}`
                horizontal.classList.add('horizontal')
                line.insertAdjacentElement('beforeend', horizontal);
            } else if (j > Math.ceil(formatTab / 2 - 1)) {
                if (j === Math.ceil(formatTab / 2)) {
                    let empty = document.createElement('td')
                    line.insertAdjacentElement('beforeend', empty);
                    empty.id = `${j} ${i}`
                    empty.classList.add('empty-none')
                } else if (j % 2) {
                    if (i % 2) {
                        let empty = document.createElement('td')
                        line.insertAdjacentElement('beforeend', empty);
                        empty.id = `${j} ${i}`
                        empty.classList.add('empty-none')
                    } else {
                        let empty = document.createElement('td')
                        line.insertAdjacentElement('beforeend', empty);
                        empty.id = `${j} ${i}`
                        empty.classList.add('pawn-white')
                    }
                } else {
                    if (i % 2) {
                        let empty = document.createElement('td')
                        line.insertAdjacentElement('beforeend', empty);
                        empty.id = `${j} ${i}`
                        empty.classList.add('pawn-white')
                    } else {
                        let empty = document.createElement('td')
                        line.insertAdjacentElement('beforeend', empty);
                        empty.id = `${j} ${i}`
                        empty.classList.add('empty-none')
                    }
                }
            } else if (j < Math.ceil(formatTab / 2)) {
                if (j === Math.ceil(formatTab / 2 - 1)) {
                    let empty = document.createElement('td')
                    line.insertAdjacentElement('beforeend', empty);
                    empty.id = `${j} ${i}`
                    empty.classList.add('empty-none')
                } else if (j % 2) {
                    if (i % 2) {
                        let empty = document.createElement('td')
                        line.insertAdjacentElement('beforeend', empty);
                        empty.id = `${j} ${i}`
                        empty.classList.add('empty-none')
                    } else {
                        let empty = document.createElement('td')
                        line.insertAdjacentElement('beforeend', empty);
                        empty.id = `${j} ${i}`
                        empty.classList.add('pawn-black')
                    }
                } else {
                    if (i % 2) {
                        let empty = document.createElement('td')
                        line.insertAdjacentElement('beforeend', empty);
                        empty.id = `${j} ${i}`
                        empty.classList.add('pawn-black')
                    } else {
                        let empty = document.createElement('td')
                        line.insertAdjacentElement('beforeend', empty);
                        empty.id = `${j} ${i}`
                        empty.classList.add('empty-none')
                    }
                }
            }
        }
        tab.insertAdjacentElement('beforeend', line);
    }
    document.querySelector('#checkers').insertAdjacentElement('beforeend', tab)
}

board(formatTab)

// Ajoute un evenement click à toutes les cases du plateau de jeux et appel la fonction play()
let allCase = document.querySelectorAll('td')
for (let element of allCase) {
    if (!(
        element.className === 'corner' ||
        element.className === 'vertical' ||
        element.className === 'horizontal'
    )) {
        element.addEventListener('click', function () {
            play(this)
        })
    }

}

// selectionne tout les case
let allTable = document.querySelectorAll('tr')
// parcour tout les cases et creer un damier de couleur pour le plateau
for (let i = 0; i < allTable.length; i++) {
    let allCaseTable = allTable[i].querySelectorAll('td')
    if (i % 2 === 0) {
        for (let x = 0; x < allCaseTable.length; x++) {
            if (x % 2 === 0) {
                allCaseTable[x].style.backgroundColor = '#efd5af'
                allCaseTable[x + 1].style.backgroundColor = '#88611b'
            }
        }
    } else {
        for (let x = 0; x < allCaseTable.length; x++) {
            if (x % 2 === 1) {
                allCaseTable[x].style.backgroundColor = '#efd5af'
                allCaseTable[x - 1].style.backgroundColor = '#88611b'
            }
        }
    }
}

function cssTurn(turn) {
    if(turn % 2 === 1) {
        document.querySelector('.black-turn').classList.remove('on')
        document.querySelector('.black-turn').classList.add('off')
        document.querySelector('.white-turn').classList.remove('off')
        document.querySelector('.white-turn').classList.add('on')
    } else {
        document.querySelector('.black-turn').classList.remove('off')
        document.querySelector('.black-turn').classList.add('on')
        document.querySelector('.white-turn').classList.remove('on')
        document.querySelector('.white-turn').classList.add('off')
    }
}

/**
 * Replit les valeurs de l'objet player
 * @param {object} value - Stocke l'element cliqué
 */
function play(value) {
    let className = value.className.split('-')
    let id = value.id.split(' ')

    // Si c'est le debut du tour, stocke les valeurs du point de depart
    if (!player.startX && !player.startY) {
        player.startX = parseInt(id[0])
        player.startY = parseInt(id[1])
        player.typeStart = className[0]
        player.colorStart = className[1]
        // Sinon stocke les valeurs du point d'arriver
    } else {
        player.endX = parseInt(id[0])
        player.endY = parseInt(id[1])
        player.typeEnd = className[0]
        player.colorEnd = className[1]
        player.selected = true
        movePawn(player)
    }
}

/**
 * Applique les déplacements ou revoie les erreur au navigateur selon les conditions
 * @param {object} player - Stocke les valeurs utile pour le tour
 */
function movePawn(player) {

    // stocke la reponse des fonctions validationEat() & validationMove()

    let validateMove = validationMove(player);
    let validateEat = validationEat(player);

    // si le deplacement est valider

    if (validateMove[0]) {
        // ajoute le deplacement à un historique
        history.push([player.startX, player.startY, player.endX, player.endY]);

        // remplace le point d'arriver par le pion de depart
        document.getElementById(`${player.endX} ${player.endY}`).className = document.getElementById(`${player.startX} ${player.startY}`).className

        // vide la case de depart
        document.getElementById(`${player.startX} ${player.startY}`).className = 'empty-none'


        // si l'action est de manger un pion et qu'il est valider, supprime le pion manger
        if (validateEat[0]) {
            document.getElementById(`${validateEat[1]} ${validateEat[2]}`).className = 'empty-none'
        }

        // stocke le valuer de retour de obligationToEat()
        let playerMustEat = obligationToEat();
        // si le joueur à manger un pion et ne peut plus en manger passe le tour
        playersTurn++;
        cssTurn(playersTurn)

        // si le pion arrive de l'autre coter du plateau, il devient une dame
        if (player.endX === 1 && player.colorStart === 'white') {
            document.getElementById(`${player.endX} ${player.endY}`).className = 'queen-white'
        }
        if (player.endX === (formatTab - 2) && player.colorStart === 'black') {
            document.getElementById(`${player.endX} ${player.endY}`).className = 'queen-black'
        }
        // vide la div error si le deplacement est valide
        document.querySelector('.error').innerHTML = ''
        document.querySelector('.error').classList.remove('error-css')

        // si le deplacement n'est pas valide retourne un erreur à l'utilisateur
    } else {
        document.querySelector('.error').innerHTML = validateMove[1]
        document.querySelector('.error').classList.add('error-css')
    }
    // une fois que le tour est fini, vide tout les valeurs de l'objet players pour le tour suivant
    if (player.selected) {
        player.startX = player.startY = player.endX = player.endY = player.typeStart = player.typeEnd = player.colorStart = player.colorEnd = ''
        player.selected = false
    }
}

/**
 * Valide le deplacement
 * @param {object} player
 * @returns {(boolean|string)[]|*|[boolean]|[boolean, *, *]}
 */
function validationMove(player) {

    // stocke le valuer de retour de obligationToEat()
    let validateToEat = obligationToEat();

    // verifie si c'est bien le tour de la bonne couleur sinon revoie une erreur
    if (
        (playersTurn % 2 === 0 && player.colorStart === 'white') ||
        (playersTurn % 2 === 1 && player.colorStart === 'black')
    ) {
        return [false, `It's my "${playersTurn % 2 === 0 ? 'black' : 'white'}" player to play`];
    }

    // verifie si le deplacement ne se fait pas en dehors du tableau sinon revoie une erreur
    if (
        !(player.startX >= 1 && player.startY >= 1 && player.startX <= endFormatTab && player.startY <= endFormatTab) ||
        !(player.endX >= 1 && player.endY >= 1 && player.endX <= endFormatTab && player.endY <= endFormatTab)
    ) {
        return [false, 'You are outside the game board'];
    }

    // verifie si l'utilisateur ne selectione pas une case de depart vide
    if (player.typeStart === 'empty') {
        return [false, 'You select an empty box'];
    }

    // verifie si le point de depart n'est pas le meme que le point d'arriver
    if (player.startX === player.endX && player.startY === player.endY) {
        return [false, 'Your point of departure is the same as your arrival.'];
    }

    // verifie que le deplacement se fait que en diagonal
    if (!(Math.abs(player.startX - player.endX) === Math.abs(player.startY - player.endY))) {
        return [false, 'You can only move diagonally.'];
    }

    // verifie si le point d'arriver est vide
    if (player.typeEnd !== 'empty') {
        return [false, `You can't move, there's a pawn`];
    }

    // oblige l'utilisateur à manger un pion
    if (validateToEat[0] === true) {
        if (player.startX !== validateToEat[1] && player.startY !== validateToEat[2]) {
            return [
                false,
                `You must eat the pawn in ${validateToEat[3]} - ${validateToEat[4]}`,
            ];
        }
    }

    // verifie de quel type est le pion et appel un fonction qui verifie le déplacement
    if (player.typeStart === 'queen') {
        return validationQueen(player);
    }
    if (player.typeStart === 'pawn') {
        return validationPawn(player);
    }
}

/**
 * Valide que l'on peu manger un pion
 * @param {object} player
 * @returns {(boolean|*)[]|boolean[]}
 */
function validationEat(player) {
    // defini a qui est le tour
    let colorPawn = playersTurn % 2 === 0 ? 'black' : 'white';

    // si le case selectionner est un pion
    if (player.typeStart === 'pawn') {
        // creer un sens de lecture pour les verifications
        let sensX = player.startX < player.endX ? 1 : -1;
        let sensY = player.startY < player.endY ? 1 : -1;

        // verifie si le case entre le point de depart et d'arriver n'est pas vide ou qu'il y a un pion du camp adverse
        if ((player.startX > 0) || (player.startX < endFormatTab) && (player.startY > 0) || (player.startY < endFormatTab)) {
            if (
                document.getElementById(`${player.startX + sensX} ${player.startY + sensY}`).className.split('-')[1] !== colorPawn &&
                document.getElementById(`${player.startX + sensX} ${player.startY + sensY}`).className.split('-')[0] !== 'empty'
            ) {
                return [true, player.startX + sensX, player.startY + sensY];
            }
        }
        return [false];
    }

    // si le case selectionner est un reine
    if (player.typeStart === 'queen') {
        // creer un sens de lecture pour les verifications
        let sensX = player.startX < player.endX ? 1 : -1;
        let sensY = player.startY < player.endY ? 1 : -1;

        // creer un tableau pour savoir si il y a plusieur pion sur le chemin de la reine
        let tabEatValited = [];
        // parcour les cases entre le point de depart et d'arriver et verifie elles n'sont pas vide ou qu'il y a un pion du camp adverse et ajoute au tableau
        for (let i = player.startX + sensX, j = player.startY + sensY; i != player.endX; i += sensX, j += sensY) {
            if ((i > 0 || i < endFormatTab) && (j > 0 || j < endFormatTab)) {
                if (
                    document.getElementById(`${i} ${j}`).className.split('-')[1] !== colorPawn &&
                    document.getElementById(`${i} ${j}`).className.split('-')[0] !== 'empty'
                ) {
                    tabEatValited.push([true, i, j])
                }
            }
        }
        // recupere les occurances dans le tableau pour verifier si il y a plusieur pion sur la diagonal
        let number = occurency(tabEatValited)
        // si il y a plusieur pion renvoi une erreur
        if (number.true > 1 || number.all.length === 0) {
            return [false, `You can't move, there are several pieces on the way.`]
            // sinon revoie les coordonner du pions
        } else {
            for (let i = 0; i < number.all.length; i++) {
                if (number.all[i][0]) {
                    return number.all[i]
                }
            }
        }
    }
}

/**
 * recupere les occurrances
 * @param {array} value
 * @returns {{all: []}}
 */
function occurency(value) {
    let l = value.length;
    let result = {all: []};
    while (l--) {
        result[value[l][0]] = result[value[l][0]] ? ++result[value[l][0]] : 1;
        result.all.push(value[l]);
    }
    return result
}

/**
 * Parcour l'enssemble du plateau pour verifier si un pion doit en manger un autre ou non
 * @returns {(boolean|number)[]|boolean[]}
 */
function obligationToEat() {
    // defini a qui est le tour
    let colorPawn = playersTurn % 2 === 0 ? 'black' : 'white';

    // parcour le plateau
    for (let i = 1; i < endFormatTab; i++) {
        for (let j = 1; j < endFormatTab; j++) {
            // verifie que les pions appartiennent joueur en cours
            if (
                document.getElementById(`${i} ${j}`).className.split('-')[1] === colorPawn &&
                document.getElementById(`${i} ${j}`).className.split('-')[0] === 'pawn'
            ) {
                // verifie que l'on ne sort pas du tableau selon le point de depart et le sens de lecture
                if (i + 2 < endFormatTab && j + 2 < endFormatTab) {
                    // verifie si la case entre le point de depart et d'arriver est differente de la couleur en cours ou qu'elle n'est pas vide et que le point dárriver est vide
                    if (
                        document.getElementById(`${i + 1} ${j + 1}`).className.split('-')[1] !== colorPawn &&
                        document.getElementById(`${i + 1} ${j + 1}`).className.split('-')[0] !== 'empty' &&
                        document.getElementById(`${i + 2} ${j + 2}`).className.split('-')[0] === 'empty'
                    ) {
                        return [true, i, j, i + 1, j + 1];
                    }
                }

                if (i - 2 > 0 && j - 2 > 0) {
                    if (
                        document.getElementById(`${i - 1} ${j - 1}`).className.split('-')[1] !== colorPawn &&
                        document.getElementById(`${i - 1} ${j - 1}`).className.split('-')[0] !== 'empty' &&
                        document.getElementById(`${i - 2} ${j - 2}`).className.split('-')[0] === 'empty'
                    ) {
                        return [true, i, j, i - 1, j - 1];
                    }
                }

                if (i - 2 > 0 && j + 2 < endFormatTab) {
                    if (
                        document.getElementById(`${i - 1} ${j + 1}`).className.split('-')[1] !== colorPawn &&
                        document.getElementById(`${i - 1} ${j + 1}`).className.split('-')[0] !== 'empty' &&
                        document.getElementById(`${i - 2} ${j + 2}`).className.split('-')[0] === 'empty'
                    ) {
                        return [true, i, j, i - 1, j + 1];
                    }
                }

                if (i + 2 < endFormatTab && j - 2 > 0) {
                    if (
                        document.getElementById(`${i + 1} ${j - 1}`).className.split('-')[1] !== colorPawn &&
                        document.getElementById(`${i + 1} ${j - 1}`).className.split('-')[0] !== 'empty' &&
                        document.getElementById(`${i + 2} ${j - 2}`).className.split('-')[0] === 'empty'
                    ) {
                        return [true, i, j, i + 1, j - 1];
                    }
                }
            }
            if (
                document.getElementById(`${i} ${j}`).className.split('-')[1] === colorPawn &&
                document.getElementById(`${i} ${j}`).className.split('-')[0] === 'queen'
            ) {
                if (i + 1 < endFormatTab && j + 1 < endFormatTab) {
                    let tabEatValited = [];
                    for (let x = i + 1; x < endFormatTab; x++) {
                        for (let y = j + 1; y < endFormatTab; y++) {
                            if (
                                document.getElementById(`${x} ${y}`).className.split('-')[1] !== colorPawn &&
                                document.getElementById(`${x} ${y}`).className.split('-')[0] !== 'empty'

                            ) {
                                if (x + 1 < endFormatTab && y + 1 < endFormatTab) {
                                    if (document.getElementById(`${x + 1} ${y + 1}`).className.split('-')[0] === 'empty') {
                                        tabEatValited.push([true, i, j, x, y])
                                    }
                                }

                            }
                        }
                    }
                    let number = occurency(tabEatValited)
                    if (number.true === 1) {
                        for (let i = 0; i < number.all.length; i++) {
                            if (number.all[i][0]) {
                                return number.all[i]
                            }
                        }
                    }
                }

                if (i - 1 > 1 && j - 1 > 1) {
                    let tabEatValited = [];
                    for (let x = i - 1; x > 0; x--) {
                        for (let y = j - 1; y > 0; y--) {
                            if (
                                document.getElementById(`${x} ${y}`).className.split('-')[1] !== colorPawn &&
                                document.getElementById(`${x} ${y}`).className.split('-')[0] !== 'empty'
                            ) {
                                if (x - 1 > 0 && y - 1 > 0) {
                                    if (document.getElementById(`${x - 1} ${y - 1}`).className.split('-')[0] === 'empty') {
                                        tabEatValited.push([true, i, j, x, y])
                                    }
                                }
                            }
                        }
                    }
                    let number = occurency(tabEatValited)
                    if (number.true === 1) {
                        for (let i = 0; i < number.all.length; i++) {
                            if (number.all[i][0]) {
                                return number.all[i]
                            }
                        }
                    }
                }

                if (i - 1 > 1 && j + 1 < endFormatTab) {
                    let tabEatValited = [];
                    for (let x = i - 1; x > 0; x--) {
                        for (let y = j + 1; y < endFormatTab; y++) {
                            if (
                                document.getElementById(`${x} ${y}`).className.split('-')[1] !== colorPawn &&
                                document.getElementById(`${x} ${y}`).className.split('-')[0] !== 'empty'

                            ) {
                                if (x - 1 > 0 && y + 1 < endFormatTab) {
                                    if (document.getElementById(`${x - 1} ${y + 1}`).className.split('-')[0] === 'empty') {
                                        tabEatValited.push([true, i, j, x, y])
                                    }
                                }
                            }
                        }
                    }
                    let number = occurency(tabEatValited)
                    if (number.true === 1) {
                        for (let i = 0; i < number.all.length; i++) {
                            if (number.all[i][0]) {
                                return number.all[i]
                            }
                        }
                    }
                }

                if (i + 1 < endFormatTab && j - 1 > 1) {
                    let tabEatValited = [];
                    for (let x = i + 1; x < endFormatTab; x++) {
                        for (let y = j - 1; y > 0; y--) {
                            if (
                                document.getElementById(`${x} ${y}`).className.split('-')[1] !== colorPawn &&
                                document.getElementById(`${x} ${y}`).className.split('-')[0] !== 'empty'

                            ) {
                                if (x + 1 < endFormatTab && y - 1 > 0) {
                                    if (document.getElementById(`${x + 1} ${y - 1}`).className.split('-')[0] === 'empty') {
                                        tabEatValited.push([true, i, j, x, y])
                                    }
                                }
                            }
                        }
                    }
                    let number = occurency(tabEatValited)
                    if (number.true === 1) {
                        for (let i = 0; i < number.all.length; i++) {
                            if (number.all[i][0]) {
                                return number.all[i]
                            }
                        }
                    }
                }
            }
        }
    }
    return [false];
}

/**
 * Verifie si le pion vas manger ou se déplacer
 * @param {object} player
 * @returns {(boolean|*)[]|boolean[]}
 */
function validationPawn(player) {
    // si le pion n'avance que d'une case valide le deplacement
    if (Math.abs(player.startX - player.endX) === 1 && Math.abs(player.startY - player.endY) === 1) {
        return [true];
    }

    // si le pion avance de deux case verifie si il peut manger
    if (Math.abs(player.startX - player.endX) === 2 && Math.abs(player.startY - player.endY) === 2) {
        return validationEat(player);
    }
}

/**
 * Verifie si la dame vas manger ou se déplacer
 * @param {object} player
 * @returns {(boolean|*)[]|boolean[]}
 */
function validationQueen(player) {
    // creer un sens de lecture pour les verifications
    let sensX = player.startX < player.endX ? 1 : -1;
    let sensY = player.startY < player.endY ? 1 : -1;

    // parcour toutes les case entres le point de depart et d'arriver et verifie si elle peut manger/ ou non et valide le deplacement
    if (player.startX !== player.endX && player.startY !== player.endY) {
        for (let i = player.startX + sensX, j = player.startY + sensY; i != player.endX; i += sensX, j += sensY) {
            if (document.getElementById(`${i} ${j}`).className.split('-')[0] !== 'empty') {
                return validationEat(player);
            }
        }
        return [true];
    }
}

// probleme tour++