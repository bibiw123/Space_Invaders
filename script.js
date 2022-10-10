/* On importe le fichier contenant le code du contrôleur de l'ennemi */

import EnemyController from "./EnemyController.js";

/* On importe le fichier contenant le code du player */
import Player from "./Player.js";

/* On importe le fichier contenant le code des bullets */

import BulletController from "./BulletController.js";


/* On cible l'Id canvas pour dessiner en 2d a l'interieur et on lui donne une taille, la variable ctx renvoie à la méthode canvas.getContext */
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

canvas.width = 1000;
canvas.height = 550;

/* On ajoute un background */
const background = new Image();
background.src = '/images/space.png';

/* On ajoute une constante qui permet de tirer sur les ennemis dans le canvas 10 correspond au nombre de tirs, true au son */
const playerBulletController = new BulletController(canvas, 5, "red", true);
/* On crée une constante qui permet aux ennemis de tirer */
const enemyBulletController = new BulletController(canvas, 4, "white", false);
/* On instance le fichier EnemyController dans le canvas */
/* On met l'argument playerBulletController dans ma const enemyController pour créer la collision */
const enemyController = new EnemyController(canvas,enemyBulletController,playerBulletController);
/* variable poour le game over */
let isGameOver = false;
let didWin = false;
/* On instance le bullet controller dans le canvas en lien avec le player */

/* On instance le fichir Player dans le canvas */
const player = new Player(canvas, 3,playerBulletController);

/* On ecrit une fonction qui permet de dessiner dans le canvas en prenant en compte sa taille, on met dedans aussi le fichier EnemyController pour dessiner les ennemis, on met aussi dedans le dessin des players bullets*/
function game(){
    
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    enemyController.draw(ctx);
    player.draw(ctx);
    playerBulletController.draw(ctx);
    enemyBulletController.draw(ctx);
}

/* Methode utilisée en jeu qui permet de boucler dans le canvas */
setInterval(game, 500/60);