/**
 * Demo class, which create an object to hold all other objects and data for
 * the demo.
 */
class Demo {
    /*
     * Gets canvas information and context and sets up all objects.
     * Returns true if the canvas is supported and false if it
     * is not. This is to stop the animation script from constantly
     * running on older browsers.
     */
    init() {
        // Get the canvas element
        this.canvas = document.getElementById('demo');
        // Test to see if canvas is supported
        if (!this.canvas.getContext) return false;
        // default canvas for arrows is the main canvas
        Drawable.prototype.context = this.canvas.getContext('2d');
        Drawable.prototype.canvasWidth = this.canvas.width;
        Drawable.prototype.canvasHeight = this.canvas.height;
        this.boidPool = new BoidPool(1000); // maximum of 1000 Boids can be displayed on screen (to prevent lag)
        this.boidPool.init();
        return true;
    } // init function

    /*
     * Starts the animation loop
     */
    start() {
        animate();
    } // start function
} // Demo class