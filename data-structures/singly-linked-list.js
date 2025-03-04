class Node {
    constructor(value){
        this.value = value;
        this.next = null;
    }
}

class LinkedList {
    constructor(value){
        this.head = new Node(value);
        this.tail = this.head;
        this.length = 1;
    }

    append(value){ // O(1)
        const node = new Node(value);
        this.tail.next = node;
        this.tail = node;
        this.length++;
        return this;
    }

    prepend(value){ // O(1)
        const node = new Node(value);
        node.next = this.head;
        this.head = node;
        this.length++;
        return this;
    }

    insert(value, index){ // O(n)
        if(index >= this.length){
            return false;
        }
    
        const newNode = new Node(value);
        let currentNode = this.head;
        for(let i = 1; i < index; i++){
            currentNode = currentNode.next;
        }
        newNode.next = currentNode.next;
        currentNode.next = newNode;
        this.length++;
        return this;
    }

    lookup(index){ //O(n)
        if(index >= this.length || index < 0){
            return this;
        }

        let currentNode = this.head;
        for(let i = 0; i < index; i++){
            currentNode = currentNode.next;
        }
        return currentNode.value;
        return this;
    }

    delete(index){ //O(n)
        if(index >= this.length || index < 0){
            return this;
        }

        if(index === 0){
            this.head = this.head.next;
            return this;
        }

        let currentNode = this.head;
        for(let i = 1; i < index; i++){
            currentNode = currentNode.next;
        }
        
        if(index === this.length - 1){
            this.tail = currentNode;
            currentNode.next = null;
            return this;
        }

        currentNode.next = currentNode.next.next;
        this.length--;
        return this;
    }

    reverse(){
        if(this.length <= 1){
            return this;
        }

        let currentNode = this.head;
        let prevNode = null;
        let nextNode;
        while(currentNode !== null){
            nextNode = currentNode.next;
            currentNode.next = prevNode;
            prevNode = currentNode;
            currentNode = nextNode;
        }
        [this.head, this.tail] = [this.tail, this.head];
        return this;
    }

    toArray(){ // O(n)
        const arr = [];
        let currentNode = this.head;
        while(currentNode !== null){
            arr.push(currentNode.value);
            currentNode = currentNode.next;
        }
        return arr;
    }
}
