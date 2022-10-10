/* fichier Enemy.js qui comporte l'image du player */

export default class Player {
/* On introduuit dans le canvas le player,on le place dans la canvas avec la position this.x et this.y et avec la taille */   

/* On définit comment le player va se déplacer avec les boutons */
    rightPressed = false;
    leftPressed = false;
/* On définit le shoot du player */
    shootPressed = false;

/* Dans le constructor il y a toutes les méthodes du player */
  constructor(canvas, velocity, bulletController) {
    this.canvas = canvas;
    this.velocity = velocity;
    this.bulletController = bulletController;
    this.x = this.canvas.width / 2.1;
    this.y = this.canvas.height - 80;
    this.width = 50;
    this.height = 48;
    this.image = new Image();
    this.image.src = "./images/player.png";

/* permet de se deplacer avec les flèches */
    document.addEventListener("keydown", this.keydown);
    document.addEventListener("keyup", this.keyup);


}
/* On définit la mehode draw dans le fichier Player.js et dans le canvas(ctx) pour 
afficher l'image dans le canvas, on indique aussi le shoot du player avec une condition */
    draw(ctx) {     
        if (this.shootPressed) {

/* On prend la position x avec sa largeur que l'on divise par 2 pour indiquer a la balle d'être au milieu du player, le 10 correspond à la marge que va faire la balle en partant du vaisseau,sinon cela ressemble à un faisseau lazer */            
            this.bulletController.shoot(this.x + this.width / 2, this.y, 4, 10);
          }
        this.move();
/* On définit une méthode pour que le player ne sorte pas du canvas */        
        this.collideWithWalls();
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

/* On appelle notre méthode pour que le player ne sorte pas du canvas */  
  collideWithWalls() {
    //left
    if (this.x < 0) {
      this.x = 0;
    }

    //right
    if (this.x > this.canvas.width - this.width) {
      this.x = this.canvas.width - this.width;
    }
  }
/* On définit la mehode .move pour que le player se deplace avec les flèchesn on crée une condition en lien avec le constructor */  
    move() {
        if (this.rightPressed) {
            this.x += this.velocity;
          } else if (this.leftPressed) {
            this.x += -this.velocity;
          }
    }
  /* permet de dépacer le player avec les flèches */
  keydown = (event) => {
    if (event.code == "ArrowRight") {
      this.rightPressed = true;
    }
    if (event.code == "ArrowLeft") {
      this.leftPressed = true;
    }
    if (event.code == "Space") {
      this.shootPressed = true;
    }
/* On définit la mehode .shoot pour que le player tire avec la barre espace */
    
  };

  keyup = (event) => {
    if (event.code == "ArrowRight") {
      this.rightPressed = false;
    }
    if (event.code == "ArrowLeft") {
      this.leftPressed = false;
    }

/* On définit la mehode .shoot pour que le player tire avec la barre espace */    
    if (event.code == "Space") {
      this.shootPressed = false;
    }
    
  };
}