/**
 * Vector class, represented by x and y components.
 */
class Vector {
    /*
     * Creates a vector with the respective x and y components.
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    } // constructor

    /*
     * Returns the magnitude of the vector.
     */
    magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    } // magnitude function

    /*
     * Returns the angle (between -pi and pi) that the vector is pointing relative to horizontal.
     */
    angle() {
        return Math.atan2(this.y, this.x);
    } // angle function

    /*
     * Returns a new vector that is the sum of vectors this vector and that vector,
     * leaving the original vectors unchanged.
     */
    plus(that) {
        return new Vector(this.x + that.x, this.y + that.y);
    } // plus function

    /*
     * Rotates this vector theta degrees around origin.
     */
    rotate(theta) {
        let xPrime = this.x * Math.cos(theta) - this.y * Math.sin(theta);
        let yPrime = this.x * Math.sin(theta) + this.y * Math.cos(theta);
        this.x = xPrime;
        this.y = yPrime;
    } // rotate function
} // Vector class