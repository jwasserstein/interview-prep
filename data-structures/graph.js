// Undirected, unweighted graph using an adjacency list implemented with an object
class Graph{
    constructor(){
        this.numberOfNodes = 0;
        this.adjList = {};
    }

    addNode(node){
        if(this.adjList[node]) return false;

        this.adjList[node] = [];
        this.numberOfNodes++;
    }

    addEdge(node1, node2){
        if(!this.adjList[node1] || !this.adjList[node2]) return false;
        if(this.adjList[node1].includes(node2) || this.adjList[node2].includes(node1)) return false;
        if(node1 === node2) return false;

        this.adjList[node1].push(node2);
        this.adjList[node2].push(node1);
    }

    showConnections(){
        for(let i in this.adjList){
            console.log(`${i} --> ${this.adjList[i]}`);
        }
    }
}

let g = new Graph();
g.addNode(0);
g.addNode(1);
g.addNode(2);
g.addNode(3);

g.addEdge(1, 2);
g.addEdge(1, 3);
g.addEdge(2, 3);
g.addEdge(2, 0);

g.showConnections();
debugger;

//   2 - 0
//  / \
// 1 - 3