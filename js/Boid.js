/**
 * Boid class representing a boid with an (x, y) position, and a velocity vector.
 * The boid is a DrawableTriangle.
 */
class Boid extends DrawableTriangle {
    /*
     * Instantiates a 'dead' Boid with no values except the DrawableTriangle defaults.
     */
    constructor() {
        super(0, 0, 0, 0);
        this.alive = false; // Is true if the Boid is currently in use
    } // constructor

    /*
     * Spawns the Boid with the corresponding values.
     */
    spawn(x, y, velocity) { 
        this.x = x;
        this.y = y;
        this.height = 20;
        this.width = 12;
        this.color = "#FFFFFF"
        this.velocity = velocity;
        this.alive = true;
        this.clicked = false;
    } // spawn function

    /*
     * Returns the distance squared between this Boid and Boid B.
     */
    distSqTo(B) {
        return (this.x - B.x) * (this.x - B.x) + (this.y - B.y) * (this.y - B.y);
    } // calcDistSq function

    /*
     * Returns the angle from this Boid to Boid B.
     */
    angleTo(B) {
        return Math.atan2((B.y - this.y), (B.x - this.x));
    } // angleTo function

    /*
     * Updates the Boid's x and y position based on the velocity.
     */
    updatePosition() {
        // the Boid can be at most 2 times the Boid's height outside the canvas
        this.x = (this.x + 2 * this.height + this.velocity.x) % (this.canvasWidth + 4 * this.height) - 2 * this.height;
        this.y += (this.y + 2 * this.height + this.velocity.y) % (this.canvasHeight + 4 * this.height) - 2 * this.height;
    } // updatePosition function

    /*
     * Draws the Boid on the canvas.
     */
    draw() {
        this.clearTriangle();
        this.updatePosition();
        this.drawTriangle();
    } // draw function

    /*
     * Resets the Boid values, including erasing it from the canvas.
     */
    reset() {
        this.clearTriangle();
        this.x = 0;
        this.y = 0;
        this.height = 0;
        this.width = 0;
        this.color = "#FFFFFF";
        this.velocity = new Vector(0, 0);
        this.alive = false;
        this.clicked = false;
    } // reset function
} // Boid class