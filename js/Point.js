/**
 * Point class, represented by x and y values.
 */
 class Point {
    /*
     * Creates a point with the respective x and y components.
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    } // constructor

        /*
     * Returns the distance squared between this Point and that Point.
     */
    distSqTo(that) {
        return (this.x - that.x) * (this.x - that.x) + (this.y - that.y) * (this.y - that.y);
    } // calcDistSq function

    /*
     * Returns the angle from this Point to that Point.
     */
    angleTo(that) {
        return Math.atan2((that.y - this.y), (that.x - this.x));
    } // angleTo function

    /*
     * Returns the polar radius of this point.
     */
    r() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    } // magnitude function

    /*
     * Returns the polar angle (between -pi and pi) of the point.
     */
    theta() {
        return Math.atan2(this.y, this.x);
    } // angle function

    /*
     * Returns whether if a→b→c is a counterclockwise turn.
     * @return { -1, 0, +1 } if a→b→c is a { clockwise, collinear; counterclocwise } turn.
     */
    static ccw(a, b, c) {
        let area2 = (b.x-a.x)*(c.y-a.y) - (b.y-a.y)*(c.x-a.x);
        if      (area2 < 0) return -1;
        else if (area2 > 0) return +1;
        else                return  0;
    } // ccw function

    /*
     * Rotates this point theta degrees around that point.
     */
    rotate(that, theta) {
        let xPrime = that.x + (this.x - that.x) * Math.cos(theta) - (this.y - that.y) * Math.sin(theta);
        let yPrime = that.y + (this.x - that.x) * Math.sin(theta) + (this.y - that.y) * Math.cos(theta);
        this.x = xPrime;
        this.y = yPrime;
    } // rotate function

    /*
     * Returns whether this Point coordinate is inside the triangle a, b, c.
     */
    inside(a, b, c) {
        if (ccw(a, b, c) == 1) return ccw(a, this, b) <= 0 && ccw(b, this, c) <= 0 && ccw(c, this, a) <= 0;
        else return ccw(a, this, b) >= 0 && ccw(b, this, c) >= 0 && ccw(c, this, a) >= 0;
    } // inside function
} // Point class