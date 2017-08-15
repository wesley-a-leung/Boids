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
     * Draws the Boid on the canvas.
     */
    draw() {
        // TODO
    } // draw function

    /*
     * Resets the Boid values, including erasing it from the canvas.
     */
    reset() {
        // TODO
    } // reset function
} // Boid class