/*fichier BulletController.js qui comporte les images des bullets */
/* on importe le fichier Bullet.js */
import Bullet from "./Bullet.js";
export default class BulletController{
/* On définit le nombre de bullets dans le tableau */    
    bullets = [];
    timeTillNextBulletAllowed = 0;

    constructor(canvas, maxBulletsAtATime, bulletColor, soundEnabled){
    this.canvas = canvas;
    this.maxBulletsAtATime = maxBulletsAtATime;
    this.bulletColor = bulletColor;
    this.soundEnabled = soundEnabled;

/* On met le son du bullet dans le fichier BulletController.js */    
    this.shootSound = new Audio("sounds/shoot.wav");
    this.shootSound.volume = 0.5;
    }
/* pemet de tirer dans le canvas plusieurs fois  */    
    draw(ctx) {
/* on met le temps de tir dans le canvas et cela permet de tirer autant de bullets que l'on veut */
        this.bullets = this.bullets.filter(
            (bullet) => bullet.y + bullet.width > 0 && bullet.y <= this.canvas.height
          );
        this.bullets.forEach((bullet) => bullet.draw(ctx));
        if (this.timeTillNextBulletAllowed > 0) {
          this.timeTillNextBulletAllowed--;
        }
      }
      collideWith(sprite) {
        const bulletThatHitSpriteIndex = this.bullets.findIndex((bullet) =>
          bullet.collideWith(sprite)
        );
    
        if (bulletThatHitSpriteIndex >= 0) {
          this.bullets.splice(bulletThatHitSpriteIndex, 1);
          return true;
        }
    
        return false;
      }
      
    shoot(x, y, velocity, timeTillNextBulletAllowed = 0) {
        if (
            this.timeTillNextBulletAllowed <= 0 &&
            this.bullets.length < this.maxBulletsAtATime
          ) {
            const bullet = new Bullet(this.canvas, x, y, velocity, this.bulletColor);
            this.bullets.push(bullet);
            if (this.soundEnabled) {
              this.shootSound.currentTime = 0;
              this.shootSound.play();
            }
            this.timeTillNextBulletAllowed = timeTillNextBulletAllowed;
          }
    }    
}