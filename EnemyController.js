/* On importe le fichier contenant le code des images et de la taille de l'ennemi */
import Enemy from "./Enemy.js";
/* On importe le fichier contenant le code de la direction de l'ennemi */
import MovingDirection from "./MovingDirection.js";
/* On export le fichier EnemyController.js */
export default class EnemyController {
    /* dessin des ennemis en lignes dans un tableau les chiffres correspondent au numeros des ennemis dans les images */
  enemyMap = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [2, 2, 2, 3, 3, 3, 3, 2, 2, 2],
    [2, 2, 2, 3, 3, 3, 3, 2, 2, 2],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  ];
  /* On cree une methode qui permet de dessiner les ennemis dans le canvas */ 
  enemyRows = [];
   /* La première direction des space inavders c'est à droite On définit la direction dans le constructor (canvas) et la vitesse à laquelle se déplace les space invaders
    (x pour se déplacer de g à d et y de haut en bas) moveDownTimer est pour stopper les space invaders vers le bas dans un temps imparti  */

  currentDirection = MovingDirection.right;
  xVelocity = 0;
  yVelocity = 0;
  defaultXVelocity = 1;
  defaultYVelocity = 1;
  moveDownTimerDefault = 30;
  moveDownTimer = this.moveDownTimerDefault;
  /* vitesse des bullets ennemie */
  fireBulletTimerDefault = 100;
  fireBulletTimer = this.fireBulletTimerDefault;
   /*La méthode constructor est une méthode qui est utilisée pour créer et initialiser un objet (la dans le canvas)lorsqu'on utilise le mot clé class. */
  constructor(canvas, enemyBulletController, playerBulletController) {
    this.canvas = canvas;
    this.enemyBulletController = enemyBulletController;
    this.playerBulletController = playerBulletController;

    this.enemyDeathSound = new Audio("sounds/enemy-death.wav");
    this.enemyDeathSound.volume = 0.1;
    /* methode qui permet de dessiner les ennemis dans le canvas (en rappelant la méthode (getElement.context=>ctx) */
    this.createEnemies();
  }
    /* On définit une nouvelle methode draw */
    /* On définit une nouvelle méthode pour faire bouger les ennemis, pour définir la vitesse et le timer */
  draw(ctx) {
    this.decrementMoveDownTimer();
    this.updateVelocityAndDirection();
    this.collisionDetection();
    this.drawEnemies(ctx);
    this.resetMoveDownTimer();
    this.fireBullet();
  }
  /* on apelle la methode pour la collision entre les bullets et les ennemis */
  collisionDetection() {
    this.enemyRows.forEach((enemyRow) => {
      enemyRow.forEach((enemy, enemyIndex) => {
        if (this.playerBulletController.collideWith(enemy)) {
          this.enemyDeathSound.currentTime = 0;
          this.enemyDeathSound.play();
          enemyRow.splice(enemyIndex, 1);
        }
      });
    });

    this.enemyRows = this.enemyRows.filter((enemyRow) => enemyRow.length > 0);
  }
  /* On définit une nouvelle méthode pour faire bouger les ennemis, pour définir la vitesse et le timer, le timer doit être remis a zero, on met -3 pour que les bullets aillent vers le bas, le tableau permet à tous les ennemis de tirer*/ 
  fireBullet() {
    this.fireBulletTimer--;
    if (this.fireBulletTimer <= 0) {
      this.fireBulletTimer = this.fireBulletTimerDefault;
      const allEnemies = this.enemyRows.flat();
      const enemyIndex = Math.floor(Math.random() * allEnemies.length);
      const enemy = allEnemies[enemyIndex];
      this.enemyBulletController.shoot(enemy.x + enemy.width / 2, enemy.y, -3);
    }
  }
  /* On définit une nouvelle méthode pour faire bouger les ennemis, pour définir la vitesse et le timer, le timer doit être remis a zero */
  resetMoveDownTimer() {
    if (this.moveDownTimer <= 0) {
      this.moveDownTimer = this.moveDownTimerDefault;
    }
  }
   /* On définit le timer pour que les ennemis descendent dans un temps imparti avec une condition.
    L'opérateur OU logique (||) (disjonction logique) renvoie vrai si et seulement si au moins un de ses opérandes est vrai. Cet opérateur est généralement utilisé avec des valeurs booléennes et, lorsque c'est le cas, il renvoie une valeur booléenne. Toutefois, || peut aussi être utilisé avec des valeurs non-booléennes et, dans ce cas, renverra une valeur non-booléenne.*/
  decrementMoveDownTimer() {
    if (
      this.currentDirection === MovingDirection.downLeft ||
      this.currentDirection === MovingDirection.downRight
    ) {
      this.moveDownTimer--;
    }
  }
  /* On définit une méthode en premier une boucle pour faire bouger les ennemis à droite  */
    /* On boucle sur les derniers enmemies de la rangée a l'extreme gauche du tableau pour que les space invaders reviennent sur la gauche au bord du canvas la boucle et condition font bouger les space invaders en bas et à gauche  */
    /* le break en Js permet d'interrompre une boucle en cours  */
    /* On inclut dans la methode updateVelocityAndDirection la methode qui permet de régler la vitesse */
  updateVelocityAndDirection() {
    for (const enemyRow of this.enemyRows) {
      if (this.currentDirection == MovingDirection.right) {
        this.xVelocity = this.defaultXVelocity;
        this.yVelocity = 0;
        const rightMostEnemy = enemyRow[enemyRow.length - 1];
        if (rightMostEnemy.x + rightMostEnemy.width >= this.canvas.width) {
          this.currentDirection = MovingDirection.downLeft;
          break;
        }
        /* On définit le fait de faire descendre les space invaders vers le bas */ 
      } else if (this.currentDirection === MovingDirection.downLeft) {
        if (this.moveDown(MovingDirection.left)) {
          break;
        }
      } else if (this.currentDirection === MovingDirection.left) {
        this.xVelocity = -this.defaultXVelocity;
        this.yVelocity = 0;
        const leftMostEnemy = enemyRow[0];
        if (leftMostEnemy.x <= 0) {
          this.currentDirection = MovingDirection.downRight;
          break;
        }
      } else if (this.currentDirection === MovingDirection.downRight) {
        if (this.moveDown(MovingDirection.right)) {
          break;
        }
      }
    }
  }
/* On définit une nouvelle méthode pour faire bouger les ennemis, pour définir la vitesse et le timer, le timer doit être remis a zero */
  moveDown(newDirection) {
    this.xVelocity = 0;
    this.yVelocity = this.defaultYVelocity;
    if (this.moveDownTimer <= 0) {
      this.currentDirection = newDirection;
      return true;
    }
    return false;
  }
 /* On appelle la méthode draw et on crée une loupe dans les ennemies rows.On utilise la flat méthode pour convertir un tableau d'origine en un nouveau tableau. Il le fait en collectant et en concaténant les sous-tableaux d'un tableau en un seul tableau.
    */
    /* On inclut dans la methode drawEnemies la methode qui permet de régler la vitesse */
  drawEnemies(ctx) {
    this.enemyRows.flat().forEach((enemy) => {
      enemy.move(this.xVelocity, this.yVelocity);
      enemy.draw(ctx);
    });
  }

  happy = () => {};
/* On parcourt le tableau enemyMap en bouclant sur les differents tableaux avec les index */
  createEnemies() {
    this.enemyMap.forEach((row, rowIndex) => {
      this.enemyRows[rowIndex] = [];
      /* On parcourt le tableau enemyMap en bouclant sur les differents tabelaux avec les index */
      row.forEach((enemyNubmer, enemyIndex) => {
        /* on utilise la methode push pour ajouter les ennemis dans le tableau enemyRows et * pour espacer les space invaders */
        if (enemyNubmer > 0) {
          this.enemyRows[rowIndex].push(
            new Enemy(enemyIndex * 50, rowIndex * 35, enemyNubmer)
          );
        }
      });
    });
  }

  collideWith(sprite) {
    return this.enemyRows.flat().some((enemy) => enemy.collideWith(sprite));
  }
}