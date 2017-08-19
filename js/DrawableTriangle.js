/**
 * DrawableTriangle class that takes a center point, a height, a width, angle, and color.
 * The resulting triangle is drawn on the canvas.
 */
class DrawableTriangle extends Drawable {
    /*
     * Initializes the triangle with a center point by calling the drawable constructor,
     * a height of the triangle, width of the base, angle, and color.
     */
    constructor(center, height, width, angle, color) {
        super(center);
        this.height = height;
        this.width = width;
        this.angle = angle;
        this.color = color;
        // a, b, c are the original points of the triangle
        this.a = new Point(this.p.x + this.height / 2, this.p.y);
        this.b = new Point(this.p.x + this.height / 2, this.p.y + this.width / 2);
        this.c = new Point(this.p.x + this.height / 2, this.p.y - this.width / 2);
    } // constructor

    // Define abstract function to be implemented in child objects
    draw() {} // draw function

    /*
     * Draws the triangle on the canvas.
     */
    drawTriangle() {
        this.context.beginPath();
        this.context.moveTo(this.a.x, this.a.y);
        this.context.lineTo(this.b.x, this.b.y);
        this.context.lineTo(this.c.x, this.c.y);
        this.context.closePath();
        this.context.fillStyle = this.color;
        this.context.fill();
    } // draw function

    /*
     * Clears the triangle from the canvas.
     */
    clearTriangle() {
        this.context.save();
        this.context.beginPath();
        // adjustment is determined by which side the x, y coordinates are compared to the center
        let adjX = 2 * Math.cos(this.p.angleTo(this.a));
        let adjY = 2 * Math.sin(this.p.angleTo(this.a));
        this.context.moveTo(this.a.x + adjX, this.a.y + adjY);
        adjX = 2 * Math.cos(this.p.angleTo(this.b));
        adjY = 2 * Math.sin(this.p.angleTo(this.b));
        this.context.lineTo(this.b.x + adjX, this.b.y + adjY);
        adjX = 2 * Math.cos(this.p.angleTo(this.c));
        adjY = 2 * Math.sin(this.p.angleTo(this.c));
        this.context.lineTo(this.c.x + adjX, this.c.y + adjY);
        this.context.closePath();
        this.context.clip();
        this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        this.context.restore();
    } // clearTriangle function   
} // DrawableTriangle class