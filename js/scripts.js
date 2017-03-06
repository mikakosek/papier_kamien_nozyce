$(function() {
    
    var $newGameBtn = $('#js-newGameButton').click(newGame),
        $newGameElem = $('#js-newGameElement'),
        $pickElem = $('#js-playerPickElement'),
        $resultsElem = $('#js-resultsTableElement'),
        $pickRock = $('#js-playerPick_rock').click(playerPick.bind(undefined,'rock')),
        $pickPaper = $('#js-playerPick_paper').click(playerPick.bind(undefined,'paper')),
        $pickScissors = $('#js-playerPick_scissors').click(playerPick.bind(undefined,'scissors')),
        $playerPointsElem = $('#js-playerPoints'),
        $playerNameElem = $('#js-playerName'),
        $computerPointsElem = $('#js-computerPoints'),
        $playerPickElem = $('#js-playerPick'),
        $computerPickElem = $('#js-computerPick'),
        $playerResultElem = $('#js-playerResult'),
        $computerResultElem = $('#js-computerResult');
    
    setGameElements();
    
    
    
    
    var gameState = 'notStarted',  //started // ended
        player = {
            name: '',
            score: 0
        },
        computer = {
            score: 0
        };
    
    function setGameElements() {
        switch(gameState) {
            case 'started':
                $newGameElem.css('display', 'none');
                $pickElem.css('display', 'block');
                $resultsElem.css('display', 'block');
                break;
            case 'ended':
                if (computer.score == 10) {
                    $newGameBtn.text('Komputer wygrał. Jeszcze raz');
                } else {
                    $newGameBtn.text('Wygrałeś! Jeszcze raz');
                }
            case 'notStarted':
            default:
                $newGameElem.css('display', 'block');
                $pickElem.css('display', 'none');
                $resultsElem.css('display', 'none');
        }
    }
    
    function newGame() {
        player.name = prompt('Graczu, wpisz swoje imię', 'imię gracza');
        if (player.name) {
            player.score = computer.score = 0;
            gameState = 'started';
            setGameElements();

            $playerNameElem.text(player.name);
            $playerResultElem.text('');
            $computerResultElem.text('');
            $playerPickElem.text('');
            $computerPickElem.text('');
            setGamePoints();
        }
    }
        
    
    function playerPick(playerPick) {
        var computerPick = getComputerPick();
    
        $playerPickElem.text(playerPick);
        $computerPickElem.text(computerPick);
        
        checkRoundWinner(playerPick, computerPick);
    }
    
    function getComputerPick() {
        var possiblePicks = ['rock', 'paper', 'scissors'];
        return possiblePicks[Math.floor(Math.random()*3)];
    }

    
    function checkRoundWinner(playerPick, computerPick) {
        $playerResultElem.text('');
        $computerResultElem.text('');

        var winnerIs = 'player';

        if (playerPick == computerPick) {
            winnerIs = 'noone'; // remis
        } else if (
            (computerPick == 'rock' &&  playerPick == 'scissors') ||
            (computerPick == 'scissors' &&  playerPick == 'paper') ||
            (computerPick == 'paper' &&  playerPick == 'rock') ) {
        
                winnerIs = 'computer';
        }

        if (winnerIs == 'player') {
            $playerResultElem.text("Wygrana!");
            player.score++;
        } else if (winnerIs == 'computer') {
            $computerResultElem.text("Wygrana!");
            computer.score++;
        }
        setGamePoints();
        
        if (computer.score == 10 || player.score == 10) {
            finishGame();                
        }
    }
    
    function setGamePoints() {
        $playerPointsElem.text(player.score);
        $computerPointsElem.text(computer.score);
    }
    
    function finishGame() {
        gameState = 'ended';
        setGameElements();
    }

});


