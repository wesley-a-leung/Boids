/**
 * Graph data structure, represented by an adjacency list.
 */
class Graph {
    /*
     * Instantiates a graph of size V
     */
    constructor(V) {
        this.V = V;
        this.E = 0;
        this.adj = [];
        for (let v = 0; v < V; v++) {
            this.adj.push([]);
        } // for v
    } // constructor

    /*
     * Adds a bidirectional edges from vertex v to w.
     */
    addEdge(v, w) {
        this.adj[v].push(w);
        this.adj[w].push(v);
        this.E++;
    } // addEdge function
} // Graph class