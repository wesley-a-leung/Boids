/**
 * Boid class representing a boid with an (x, y) position, and a velocity vector.
 * The boid is a DrawableTriangle.
 */
class Boid extends DrawableTriangle {
    /*
     * Instantiates a 'dead' Boid with no values except the DrawableTriangle defaults.
     */
    constructor() {
        super(new Point(0, 0), 0, 0, 0, "#FFFFFF");
        this.alive = false; // Is true if the Boid is currently in use
    } // constructor

    /*
     * Spawns the Boid with the corresponding values.
     */
    spawn(position, velocity, color) {
        this.p = new Point(position.x, position.y);
        this.height = 20;
        this.width = 12;
        this.color = color;
        this.velocity = velocity;
        this.angle = velocity.angle();
        this.alive = true;
        this.clicked = false;
        this.a = new Point(this.p.x + this.height / 2, this.p.y);
        this.b = new Point(this.p.x - this.height / 2, this.p.y + this.width / 2);
        this.c = new Point(this.p.x - this.height / 2, this.p.y - this.width / 2);
        this.a.rotate(this.p, this.angle);
        this.b.rotate(this.p, this.angle);
        this.c.rotate(this.p, this.angle);
    } // spawn function

    /*
     * Updates the Boid's x and y position based on the velocity.
     */
    updatePosition() {
        // the Boid can be at most 2 times the Boid's height outside the canvas before it wraps around
        let dax = this.a.x - this.p.x;
        let day = this.a.y - this.p.y;
        let dbx = this.b.x - this.p.x;
        let dby = this.b.y - this.p.y;
        let dcx = this.c.x - this.p.x;
        let dcy = this.c.y - this.p.y;
        this.p.x = (this.p.x + 2 * this.height + this.velocity.x + (this.canvasWidth + 4 * this.height)) % (this.canvasWidth + 4 * this.height) - 2 * this.height;
        this.p.y = (this.p.y + 2 * this.height + this.velocity.y + (this.canvasHeight + 4 * this.height)) % (this.canvasHeight + 4 * this.height) - 2 * this.height;
        this.a.x = this.p.x + dax;
        this.a.y = this.p.y + day;
        this.b.x = this.p.x + dbx;
        this.b.y = this.p.y + dby;
        this.c.x = this.p.x + dcx;
        this.c.y = this.p.y + dcy;
    } // updatePosition function

    /*
     * Updates the Boid's velocity and rotates the triangle.
     */
    adjustHeading(theta) {
        this.velocity.rotate(theta);
        this.a.rotate(this.p, theta);
        this.b.rotate(this.p, theta);
        this.c.rotate(this.p, theta);
    } // adjustHeading function

    /*
     * Draws the Boid on the canvas.
     */
    draw() {
        this.updatePosition();
        this.drawTriangle(); // draws the Boid at the new loation
    } // draw function

    /*
     * Resets the Boid values, including erasing it from the canvas.
     */
    reset() {
        this.clearTriangle();
        this.p.x = 0;
        this.p.y = 0;
        this.height = 0;
        this.width = 0;
        this.color = "#FFFFFF";
        this.velocity = new Vector(0, 0);
        this.alive = false;
        this.clicked = false;
    } // reset function
} // Boid class