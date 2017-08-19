var demo = new Demo();
/**
 * Initializes the demo.
 */
function init() {
    if (demo.init()) { // if the canvas was successfully initialized
        demo.start();
    } // if
} // init function

/**
 * The animation loop. Calls the requestAnimationFrame shim to
 * optimize the loop and draws all objects. This function
 * must be a global function and cannot be within an object.
 */
function animate() {
    requestAnimFrame(animate);
    if (demo.boidPool) demo.boidPool.animate(); // animates all the particles if the pool exists
} // animate function

/**
 * requestAnim shim layer by Paul Irish
 * Finds the first API that works to optimize the animation loop,
 * otherwise defaults to setTimeout().
 */
window.requestAnimFrame = (function() {
    return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            window.oRequestAnimationFrame      ||
            window.msRequestAnimationFrame     ||
            function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
            }; // anon function (callback)
})(); // anon function (animation)