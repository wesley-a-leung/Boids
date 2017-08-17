/**
 * BoidPool class, which will create a pool that holds Boid objects to be managed to prevent
 * garbage collection. This prevents constant creation and deletion of Boids.
 */
class BoidPool {
    /*
     * Instantiates a pool with a maximum size.
     */
    constructor(maxSize) {
        this._pool = []; // Private variable (just a guideline using underscore notation)
        this.size = maxSize; // Max Boids allowed in the pool
    } // constructor
    
    /*
     * Populates the pool array with Boid objects
     */
    init() {
        for (let i = 0; i < this.size; i++) {
            // Initalize the Boid object
            let boid = new Boid();
            this._pool[i] = boid;
        } // for i
    } // init function

    /*
     * Grabs the last item in the list and initializes it and
     * pushes it to the front of the array.
     */
    get(x, y, velocity) {
        if(!this._pool[this.size - 1].alive) {
            this._pool[this.size - 1].spawn(x, y, velocity);
            this._pool.unshift(this._pool.pop());
        } // if
    } // get function

    /*
     * Checks if a Boid has been clicked. If so, then if should be removed from the canvas. Takes N
     * time to complete where N is the number of alive Boids. Takes N log N time to complete where
     * N is the number of alive Boids.
     */
    checkClick() {
        let marked = new Set(); // array holding Boids marked for deletion
        for (let i = 0; i < this.size; i++) {
            let A = this._pool[i]; // for non modification actions
            if (!A.alive) break; // all Boids afterward are 'dead'
            if (A.clicked) { // Boid has been clicked and should be removed
                marked.add(i);
            } // if
        } // for i
        let arr = Array.from(marked); // converts to array for sorting
        arr.sort();
        let adj = 0; // adjustment is required since elements are removed from array
        for (let i of arr) {
            this._pool[i - adj].reset(); // resets values
            this._pool.push((this._pool.splice(i - adj, 1))[0]); // moves to end of array
            adj++; // array indicies have changed
        } // for marked
    } // checkClick function

    /*
     * Marks Boids for deletion given a click location. Take N time to complete where N is the number
     * of alive Boids.
     */
    markClicked(xStart, yStart, xEnd, yEnd) {
        for (let i = 1; i < this.size; i++) { // since the first Boid is the one being created, it should not be deleted
                                              // unless there is another Boid being deleted
            let A = this._pool[i]; // for non modification actions
            if (!A.alive) break; // all Boid afterward are 'dead'
            // if the both the start and end click location is inside the Boid, then the Boid has been clicked
            if (A.inside(xStart, xEnd)) {
                this._pool[i].clicked = true; // mark the Boid for deletion
                this._pool[0].clicked = true; // also mark the Boid being spawned for deletion
                break; // to prevent multiple deletions
            } // if
        } // for i
    } // markClicked function

    /*
     * Draws any in use Boids. If a Boid goes off the screen, it is reset and pushed to the end of the array.
     */
    animate() {
        this.checkClick(); // first checks for Boids that have been clicked removes them if necessary
        this.update(); // updates force vectors
        this.checkCollision() // checks for Boids that have collided
        for (let i = 0; i < this.size; i++) {
            let A = this._pool[i]; // for non modification actions
            // Only draw until we find a Boid that is not alive
            // since they are all at the front of the array
            if (!A.alive) break;
            A.draw();
        } // for i
    } // animate function
} // BoidPool class