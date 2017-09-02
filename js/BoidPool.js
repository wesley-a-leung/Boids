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
    get(position) {
        let avgLocalVelocity = new Vector(0, 0);
        let countLocal = 0;
        for (let i = 0; i < this.size; i++) {
            let A = this._pool[i];
            if (!A.alive) break; // all Boids afterward are 'dead'
            if (position.wrapDistTo(A.p) <= BoidPool.FLOCK_RADIUS) {
                countLocal++;
                avgLocalVelocity = avgLocalVelocity.plus(A.velocity);
            } // if
        } // for i
        let velocity = new Vector(2, 0);
        if (countLocal > 0) velocity = new Vector(avgLocalVelocity.x / countLocal, avgLocalVelocity.y / countLocal);
        else velocity.rotate(Math.random() * (2 * Math.PI));
        let color = "#FFFFFF";
        if (!this._pool[this.size - 1].alive) {
            this._pool[this.size - 1].spawn(position, velocity, color);
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
            if (A.clicked) marked.add(i); // Boid has been clicked and should be removed
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
    markClicked(start, end) {
        for (let i = 1; i < this.size; i++) { // since the first Boid is the one being created, it should not be deleted
                                              // unless there is another Boid being deleted
            let A = this._pool[i]; // for non modification actions
            if (!A.alive) break; // all Boid afterward are 'dead'
            // if the both the start and end click location is inside the Boid, then the Boid has been clicked
            if (start.inside(A.a.rotate(A.angle), A.b.rotate(A.angle), A.c.rotate(A.angle)) &&
                    end.inside(A.a.rotate(A.angle), A.b.rotate(A.angle), A.c.rotate(A.angle))) {
                this._pool[i].clicked = true; // mark the Boid for deletion
                this._pool[0].clicked = true; // also mark the Boid being spawned for deletion
                break; // to prevent multiple deletions
            } // if
        } // for i
    } // markClicked function

    /*
     * Adjust the headings of boids to based on 3 rules.
     * 1. Separation: Steer to avoid crowding local flockmates.
     * 2. Alignment: Steer towards the average heading of local flockmates.
     * 3. Cohesion: Steer to move toward the average position of local flockmates.
     * A flock is any boid that can be reached by any number of jumps of the specified maximum distance.
     * Takes N^2 time to complete where N is the number of alive Boids
     */
    adjustHeadings() {
        let countAlive = 0;
        // count number of alive Boids
        for (let i = 0; i < this.size; i++) {
            let A = this._pool[i];
            if (!A.alive) break;
            countAlive++;
        } // for i
        if (countAlive <= 1) return;
        let G = new Graph(countAlive);
        // construct graph
        let markedX = new Set(); // set of Boids that needs the x value to be adjusted for wraparound
        let markedY = new Set(); // set of Boids that needs the y value to be adjusted for wraparound
        for (let i = 0; i < countAlive; i++) {
            let A = this._pool[i];
            for (let j = i + 1; j < countAlive; j++) {
                let B = this._pool[j];
                if (A.p.wrapDistTo(B.p) <= BoidPool.FLOCK_RADIUS) {
                    G.addEdge(i, j);
                    // adjust for wraparound
                    if (Math.abs(A.p.x - B.p.x) > this.canvasWidth + 2 * canvasBorder - Math.abs(A.p.x - B.p.x)) {
                        if (A.p.x < B.p.x) markedX.add(i)
                        else markedX.add(j);
                    } // if
                    if (Math.abs(A.p.y - B.p.y) > this.canvasHeight + 2 * canvasBorder - Math.abs(A.p.y - B.p.y)) {
                        if (A.p.y < B.p.y) markedY.add(i);
                        else markedY.add(j);
                    } // if
                } // if
            } // for j
        } // for i
        let cc = new ConnectedComponents(G);
        for (let i = 0; i < cc.components.length; i++) {
            let avgHeading = 0;
            let avgPos = new Point(0, 0);
            if (cc.components[i].length <= 1) continue;
            for (let j = 0; j < cc.components[i].length; j++) {
                let A = this._pool[cc.components[i][j]];
                avgHeading += A.velocity.angle();
                avgPos.x += A.p.x;
                avgPos.y += A.p.y;
                if (markedX.has(cc.components[i][j])) avgPos.x += this.canvasWidth + 2 * canvasBorder; // adjust for wraparound
                if (markedY.has(cc.components[i][j])) avgPos.y += this.canvasHeight + 2 * canvasBorder;
            } // for j
            avgHeading /= cc.components[i].length;
            avgPos.x /= cc.components[i].length;
            avgPos.y /= cc.components[i].length;
            for (let j = 0; j < cc.components[i].length; j++) {
                let A = this._pool[cc.components[i][j]];
                if (markedX.has(cc.components[i][j])) A.p.x += this.canvasWidth + 2 * canvasBorder; // adjust for wraparound
                if (markedY.has(cc.components[i][j])) A.p.y += this.canvasHeight + 2 * canvasBorder;
                let repel = 0;
                let q = new Point(avgPos.x, avgPos.y);
                q.rotate(A.p, -A.velocity.angle());
                let attract = q.y - A.p.y;
                for (let k = 0; k < cc.components[i].length; k++) {
                    if (j == k) continue;
                    let B = this._pool[cc.components[i][k]];
                    if (markedX.has(cc.components[i][k])) B.p.x += this.canvasWidth + 2 * canvasBorder; // adjust for wraparound
                    if (markedY.has(cc.components[i][k])) B.p.y += this.canvasHeight + 2 * canvasBorder;
                    if (A.p.wrapDistTo(B.p) <= BoidPool.SEPARATION_DIST) {
                        let q = new Point(B.p.x, B.p.y); // reference point to adjust heading
                        q.rotate(A.p, -A.velocity.angle());
                        repel += (A.p.y - q.y) / Math.abs(A.p.y - q.y) * (BoidPool.SEPARATION_DIST - Math.abs(A.p.y - q.y));
                    } // if
                    if (markedX.has(cc.components[i][k])) B.p.x -= this.canvasWidth + 2 * canvasBorder; // adjust back
                    if (markedY.has(cc.components[i][k])) B.p.y -= this.canvasHeight + 2 * canvasBorder;
                } // for k
                repel /= cc.components[i].length;
                attract /= cc.components[i].length;
                if (markedX.has(cc.components[i][j])) A.p.x -= this.canvasWidth + 2 * canvasBorder; // adjust back
                if (markedY.has(cc.components[i][j])) A.p.y -= this.canvasHeight + 2 * canvasBorder;
                let theta = ((repel) * (Math.PI / 2)) * BoidPool.REPEL_FACTOR + (avgHeading - A.velocity.angle()) * BoidPool.AVG_HEADING_FACTOR
                    + ((attract) * (Math.PI / 2)) * BoidPool.ATTRACT_FACTOR + (Math.random() * 2 * BoidPool.RANDOM_FACTOR - BoidPool.RANDOM_FACTOR);
                A.adjustHeading(theta);
            } // for j
        } // for i
    } // adjustHeadings function

    /*
     * Draws any in use Boids.
     */
    animate() {
        this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight); // clears old canvas
        this.checkClick(); // first checks for Boids that have been clicked and removes them if necessary
        for (let i = 0; i < this.size; i++) {
            let A = this._pool[i]; // for non modification actions
            // Only draw until we find a Boid that is not alive
            // since they are all at the front of the array
            if (!A.alive) break;
            A.draw();
        } // for i
        this.adjustHeadings(); // then adjust the headings of the Boids
    } // animate function
} // BoidPool class

BoidPool.FLOCK_RADIUS = 60;
BoidPool.SEPARATION_DIST = 20;
BoidPool.AVG_HEADING_FACTOR = 0.25;
BoidPool.REPEL_FACTOR = 0.1;
BoidPool.ATTRACT_FACTOR = 0.1;
BoidPool.RANDOM_FACTOR = 0.01;