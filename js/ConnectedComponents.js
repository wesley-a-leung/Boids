/**
 * ConnectedComponents class to determine the connected components of a graph. The constructor takes
 * time proportional to V + E, where V is the number of verticies and E is the number of edges in the
 * graph. Afterwards, all operations take constant time.
 */
class ConnectedComponents {
    dfs(G, v) {
        this.marked[v] = true;
        this.id[v] = this.count;
        this.component[count].push(v);
        for (let i = 0; i < G.adj[v].length; i++) {
            let w = G.adj[v][i];
            if (!this.marked[w]) dfs(G, w);
        } // for i
    } // dfs function


    /*
     * Computes the connected components of the undirected graph.
     */
    constructor(G) {
        this.marked = [];
        this.id = [];
        this.component = [];
        for (let v = 0; v < G.V; v++) {
            this.marked.push(false);
            this.id.push(0);
        } // for v
        this.count = 0
        for (let v = 0; v < G.V; v++) {
            if (!this.marked[v]) {
                this.component.push([]);
                this.dfs(G, v);
                this.count++;
            } // if
        } // for v
    } // constructor
} // ConnectedComponents class