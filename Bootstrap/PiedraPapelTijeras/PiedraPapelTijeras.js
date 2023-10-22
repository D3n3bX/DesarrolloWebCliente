// Opciones de juego
const options1 = ["Piedra.png", "Papel.png", "Tijera.png"]; // Primera opción de imágenes
const options2 = ["Piedra.jpeg", "Papel.jpeg", "Tijera.jpeg"]; // Segunda opción de imágenes
let options = []; // Array donde copiaré el array options1 o el arrya options2 según lo que haya escogido el usuario

// Contadores de puntuación
let player1Score = 0;
let player2Score = 0;

/*  FUNCIÓN
    setImages()
        Seleccinna el set de imágenes que ha escogido previamente el usuario
        Parámetros:
            - Ninguno
        Return:
            - Ninguno
*/
function setImages() {
    const selectedImageSet = document.getElementById("imageSet").value;
    options = (selectedImageSet === "options1") ? options1 : options2; // Copio el array seleccionnado por el jugador en el array options
}

/*  FUNCIÓN
    getRandomChoice()
        Obtiene una opcion aleatoria entre Piedra, Papel o Tijera
        Parámetros:
            - Ninguno
        Return:
            - Un elemento aleatorio del array options (Piedra.jpg, Papel.jpg, Tijera.jpg)
*/
function getRandomChoice() {
    return options[Math.floor(Math.random() * 3)];
}

/*  FUNCIÓN
    getPlayerChoice(message)
        Muestra al jugador las opciones para que pueda elegir entre Piedra, Papel o Tijera
        Parámetros:
            - message -> un mensaje dirigido al jugador 1 o al jugador 2 con las distintas opciones que tiene
        Return:
            - choice -> la decisión del jugador
*/
function getPlayerChoice(message) {
    let choice = prompt(message);

    if (choice === null) {
        return null; // El jugador canceló la selección.
    }

    choice = parseInt(choice);

    if (isNaN(choice) || choice < 1 || choice > 3) {
        alert("Selecciona una opción válida (1-Piedra, 2-Papel, 3-Tijera)."); 
        return getPlayerChoice(message);
    }

    return choice;
}

/*  FUNCIÓN
    determineWinner(choice1, choice2)
        Determina quien ha ganado la ronda
        Parámetros:
            - choice1 -> un elemento del array options
            - choice2 -> un elemento del array options
        Return:
            - Un entero que indica quien ha ganado:
                - 1 -> gana choice1
                - 0 -> empate
                - 2 -> gana choice2
*/
function determineWinner(choice1, choice2) {
    // Opciones para que choice1 gane
    if ( (choice1 === "Piedra.png" && choice2 === "Tijera.png") || (choice1 === "Tijera.png" && choice2 === "Papel.png") || (choice1 === "Papel.png" && choice2 === "Piedra.png") ||
         (choice1 === "Piedra.jpeg" && choice2 === "Tijera.jpeg") || (choice1 === "Tijera.jpeg" && choice2 === "Papel.jpeg") || (choice1 === "Papel.jpeg" && choice2 === "Piedra.jpeg" ) ) {
        return 1;
    } 
    else if (choice1 === choice2) {
        return 0;
    } 
    else {
        return 2;
    }
}

/*  FUNCIÓN
    updateResult(result)
        Actualiza la tabla de puntuaciones de los jugadores
        Parámetros:
            - result -> indica qué jugador ha ganado 
                - 1 -> gana el jugador 1
                - 2 -> gana el jugador 2
        Return:
            - Ninguno
*/
function updateScores(result) {
    if (result === 1) {
        player1Score++;
    } else if (result === 2) {
        player2Score++;
    }

    document.getElementById("player1Score").textContent = `Jugador 1: ${player1Score}`;
    document.getElementById("player2Score").textContent = `Jugador 2: ${player2Score}`;
}

/*  FUNCIÓN
    displayResult()
        Muestra quien ha ganado la ronda juugada
        Parámetros:
            - result -> inidica el jugador que ha gannado
        Return:
            - Ninguno
*/
function displayResult(result) {
    setTimeout(() => { // Con setTimeOut peudo ejecutar el codigo que este dentro pasado determinado tiempo
        updateScores(result)
        if (result == 1) {
            document.getElementById("winner").textContent = "Ganador: Jugador 1";
        } 
        else if (result == 2) {
            document.getElementById("winner").textContent = "Ganador: Jugador 2";
        } 
        else {
            document.getElementById("winner").textContent = "Ganador: Empate";
        }
    }, 1000); // Muestro el resultado de quien ha ganado pasado 1 segundo
}

/*  FUNCIÓN
    play()
        Contiene la lógica para jugar en función de los jugadores que haya 0, 1 o 2
        Parámetros:
            - Ninguno
        Return:
            - Ninguno
*/
function play() {
    const numPlayers = parseInt(document.getElementById("numPlayers").value); // Obtengo el número de jugadores
    let result;
    
    setImages(); // Seteo las imágenes que se van a usar

    // Hay 0 jugadores, el ordenador juega contra sí mismo, como si fuesen 2 bots
    if (numPlayers === 0) {
        
        const computerChoice1 = getRandomChoice();
        const computerChoice2 = getRandomChoice();

        document.getElementById("player1Choice").src = computerChoice1;
        document.getElementById("player2Choice").src = computerChoice2;
        result = determineWinner(computerChoice1, computerChoice2);
    }
    // Hay 1 jugador, un humano juega contra el ordenador
    else if (numPlayers === 1) {

        const playerChoice = getPlayerChoice("Elige: 1-Piedra, 2-Papel, 3-Tijera"); 
        if (playerChoice === null) {
            return; // El jugador canceló la selección.
        }

        const computerChoice = getRandomChoice(); 

        document.getElementById("player1Choice").src = options[playerChoice - 1]; 
        document.getElementById("player2Choice").src = computerChoice;
        result = determineWinner(options[playerChoice - 1], computerChoice);

    } 
    // Hay 2 jugadores, un humano juega contra otro humano
    else if (numPlayers === 2) {

        const player1Choice = getPlayerChoice("Jugador 1, elige: 1-Piedra, 2-Papel, 3-Tijera"); 
        if (player1Choice === null) {
            return; // El jugador canceló la selección.
        }

        const player2Choice = getPlayerChoice("Jugador 2, elige: 1-Piedra, 2-Papel, 3-Tijera");
        if (player2Choice === null) {
            return; // El jugador canceló la selección.
        }

        document.getElementById("player1Choice").src = options[player1Choice - 1]; 
        document.getElementById("player2Choice").src = options[player2Choice - 1];
        result = determineWinner(options[player1Choice - 1], options[player2Choice - 1]);
        
    }

    displayResult(result);
}

/*  FUNCIÓN
    disabledEnableElement(element, isDisable)
        Permite activar o desactivar determinados elementos
        Parámetros:
            - element -> indica el elemento a activar o desactivar
            - isDisable -> indica si se quiere activar o desactivar
        Return:
            - Ninguno
*/
function disabledEnableElement(element, isDisable) {
    document.getElementById(element).disabled = isDisable;
}

/*  FUNCIÓN
    determineWinnerGame()
        Determina el ganador del juego después de dar al botón finalizar
        Parámetros:
            - Ninguno
        Return:
            - Ninguno
*/
function determineWinnerGame() {
    if (player1Score > player2Score) {
        document.getElementById("winner").textContent = "Ganador: Jugador 1";
    } 
    else if (player1Score < player2Score) {
        document.getElementById("winner").textContent = "Ganador: Jugador 2";
    } 
    else {
        document.getElementById("winner").textContent = "Ganador: Empate";
    }
    document.getElementById("winner").style.color = "red"; 
}

/*  FUNCIÓN
    winnerActivateAnimation()
        Activa la animación del jugador ganador
        Parámetros:
            - Ninguno
        Return:
            - Ninguno
*/
function winnerActivateAnimation() {
    const winnerCard1 = document.getElementById("player1");
    const winnerCard2 = document.getElementById("player2");

    if (player1Score > player2Score) {
        winnerCard1.classList.add("winner-card");
        winnerCard2.classList.remove("winner-card");
    } else if (player2Score > player1Score) {
        winnerCard2.classList.add("winner-card");
        winnerCard1.classList.remove("winner-card");
    } else {
        winnerCard1.classList.remove("winner-card");
        winnerCard2.classList.remove("winner-card");
    }
}

/*  FUNCIÓN
    winnerDesativateAnimation()
        Desactiva la animación del jugador ganador
        Parámetros:
            - Ninguno
        Return:
            - Ninguno
*/
function winnerDesativateAnimation() {
    winnerCard1.classList.remove("winner-card");
    winnerCard2.classList.remove("winner-card");
}

/*  FUNCIÓN
    ressetGame()
        Ressetea la partida
        Parámetros:
            - Ninguno
        Return:
            - Ninguno
*/
function ressetGame() {
    player1Score = 0;
        player2Score = 0;
        winnerDesativateAnimation();
        document.getElementById("player1Score").textContent = "Jugador 1: 0";
        document.getElementById("player2Score").textContent = "Jugador 2: 0";
        document.getElementById("winner").textContent = "Ganador: ";
        document.getElementById("winner").style.color = "black";
        document.getElementById("player1Choice").src = "";
        document.getElementById("player2Choice").src = "";
        disabledEnableElement("playButton", false);
        disabledEnableElement("finishButton", false);
}

/*  FUNCIÓN
    finish()
        Finaliza la partida destacando al ganador y resetenado todo para empezar una nueva partida
        Parámetros:
            - Ninguno
        Return:
            - Ninguno
*/
function finish() {
    disabledEnableElement("playButton", true);
    disabledEnableElement("finishButton", true);

    determineWinnerGame();
    winnerActivateAnimation();

    setTimeout(function () {
        ressetGame();
    }, 10000);
}