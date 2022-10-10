/* fichier Enemy.js qui comporte les images des space invaders */

export default class Enemy {

    constructor(x, y, imageNumber) {
/* On met les differentes images des space invaders dans le tableau */
        this.x = x;
        this.y = y;
/* on definie la taille des images space invaders */
        this.width = 50;
        this.height = 38;

        this.image = new Image();
/* on injecte les images dynamiquement, cele va peremttre d'aller chercher les differents space invaders dans les images */        
        this.image.src = `images/enemy${imageNumber}.png`;
        
        
    }
/* On définit la mehode draw dans le fichier Enemy.js et dans le canvas(ctx) */
    draw(ctx){
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
/* += (x += y  =>  x = x + y) L'opérateur JavaScript += prend les valeurs à droite de l'opérateur et les ajoute à la variable de gauche. Il s'agit d'une méthode très concise pour ajouter deux valeurs et affecter le résultat à une variable, d'où son nom d'opérateur d'affectation d'addition. */
    move(xVelocity, yVelocity){
        this.x += xVelocity;
        this.y += yVelocity;
    }
}
