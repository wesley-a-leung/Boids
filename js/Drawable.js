/**
 * Drawble class, which serves as a base class for all drawable objects
 */
class Drawable {
    /*
     * Initializes a drawabe object at an x, y position (Point p).
     */
    constructor(p) {
        this.p = p;
    } // constructor

    // Define abstract function to be implemented in child objects
    draw() {} // draw function
} // Drawble class