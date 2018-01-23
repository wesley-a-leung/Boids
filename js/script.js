var demo = new Demo();
var canvasBorder = 40;
var helpMessages = ["Click anywhere to spawn a boid.",
"The boids will move around with a small random factor, but steer toward the direction of other boids, without getting too close."];


/**
 * Initializes the demo.
 */
function init() {
    if (demo.init()) { // if the canvas was successfully initialized
        demo.start();
    } // if
    dialog(0); // starts the help dialog chain
} // init function

/**
 * Recursively calls the function to display help messages one after another.
 */
function dialog(i){
    $("<div></div>").html(helpMessages[i]).dialog({
        title: "Help",
        show: {effect: "slide", direction: "right", duration: 1000},
        hide: {effect: "slide", direction: "left", duration: 1000},
        resizable: false,
        modal: true,
        buttons: {
            "Next": function() {
                $(this).dialog("close");
                if (i < helpMessages.length - 1) dialog(i + 1);
            } // anon function (Next button)
        } // buttons
    }); // dialog
} // dialog function

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