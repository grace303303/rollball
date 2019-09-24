/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// setup vars and everything to be 0
var totalScore, roundScore, player, winner, gamePlaying, round=[], winningScore;

//newgame function
function newgame() {
gamePlaying=true;
totalScore = [0,0];
roundScore = 0;
player = 0;

document.getElementById('score-0').textContent = 0;
document.getElementById('current-0').textContent = 0;
document.getElementById('score-1').textContent = 0;
document.getElementById('current-1').textContent = 0;
document.querySelector('.dice').style.display='none';
document.querySelector('.dice2').style.display='none';
document.getElementById('winScore').value=winningScore=undefined;
if (winner!==undefined) {
document.getElementById('name-'+winner).textContent="Player " + (winner+1);
document.querySelector('.player-'+winner+'-panel').classList.remove('winner');
}
document.querySelector('.player-0-panel').classList.remove('active');
document.querySelector('.player-1-panel').classList.remove('active');
document.querySelector('.player-'+player+'-panel').classList.add('active');
}

newgame();

//click on ROLL Dice
document.querySelector('.btn-roll').addEventListener('click', function() {

	if (gamePlaying) {
	document.querySelector('.dice').style.display='block';
	document.querySelector('.dice2').style.display='block';
	//1. assign random numbers
	var diceNumber = Math.floor(Math.random()*6)+1;
	var diceNumber2 = Math.floor(Math.random()*6)+1;
	//2.change photos
	document.querySelector('.dice').src = 'dice-' + diceNumber + '.png';
	document.querySelector('.dice2').src = 'dice-' + diceNumber2 + '.png';
	//3.if one of dice is 1 then looses current scores
	if (diceNumber===1||diceNumber2===1) {
		reset();
	} else {
		roundScore +=(diceNumber+diceNumber2);
		document.getElementById('current-'+player).textContent=roundScore;
} 

}

})


// click on Hold
	document.querySelector('.btn-hold').addEventListener('click',function() {
	if (gamePlaying) {
	//1. change total score and UI
	totalScore[player]+=roundScore;
	document.getElementById('score-'+player).textContent = totalScore[player];
	//2. check if win the game
	winningScore = document.getElementById('winScore').value;
	var compare = 10;
	if (winningScore) {
		compare = winningScore;
	}
	if (totalScore[player]>=compare) {
	document.getElementById('name-'+player).textContent='Winner!';
	document.querySelector('.player-'+player+'-panel').classList.add('winner');
	document.querySelector('.player-'+player+'-panel').classList.remove('active');
	document.querySelector('.dice').style.display='none';
	document.querySelector('.dice2').style.display='none';
	winner=player;
	gamePlaying=false;
	} else {
	reset();}
}
})

//click on new game
document.querySelector('.btn-new').addEventListener('click',newgame);

//reset function
function reset() {
	roundScore=0;
	document.getElementById('current-'+player).textContent=roundScore;
	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');
	document.querySelector('.dice').style.display='none';
	document.querySelector('.dice2').style.display='none';
	player===0 ? player=1 : player=0;
}


