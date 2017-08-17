/**
 * DrawableTriangle class that takes a center point, a height, and a width.
 * The resulting triangle is drawn on the canvas.
 */
class DrawableTriangle extends Drawable {
    /*
     * Initializes the triangle with a center x, y coordinate by calling the drawable constructor,
     * and a height and width of the base.
     */
    constructor(x, y, height, width) {
        super(x, y);
        this.height = height;
        this.width = width;
    } // constructor

    /**
     * Returns whether the x, y coordinate is inside the triangle.
     */
    inside(x, y) {
        // TODO
    } // inside function

    // Define abstract function to be implemented in child objects
    draw() {} // draw function

    /*
     * Draws the triangle on the canvas.
     */
    drawTriangle() {
        // TODO
    } // draw function

    /*
     * Clears the triangle from the canvas.
     */
    clearTriangle() {
        // TODO
    } // clearTriangle function   
} // DrawableTriangle class