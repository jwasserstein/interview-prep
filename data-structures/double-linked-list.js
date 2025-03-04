class Node{
    constructor(value){
        this.value = value;
        this.next = null;
        this.previous = null;
    }
}

class DoublyLinkedList{
    constructor(value){
        this.head = new Node(value);
        this.tail = this.head;
        this.length = 1;
    }

    append(value){ // O(1)
        const newNode = new Node(value);
        this.tail.next = newNode;
        newNode.previous = this.tail;
        this.tail = newNode;
        this.length++;
    }

    prepend(value){ // O(1)
        const newNode = new Node(value);
        newNode.next = this.head;
        this.head.previous = newNode;
        this.head = newNode;
        this.length++;
    }

    lookup(index){ // O(n)
        if(index >= this.length){
            return false;
        }

        let currentNode = this.head;
        for(let i = 0; i < index; i++){
            currentNode = currentNode.next;
        }

        return currentNode.value;
    }

    insert(value, index){ // O(n)
        if(index >= this.length){
            return false;
        }
        
        const newNode = new Node(value);
        
        let currentNode = this.head;
        for(let i = 0; i < index; i++){
            currentNode = currentNode.next;
        }

        newNode.previous = currentNode.previous;
        newNode.next = currentNode;
        currentNode.previous.next = newNode;
        currentNode.previous = newNode;

        this.length++;
    }

    delete(index){ // O(n)
        if(index >= this.length){
            return false;
        }

        let currentNode = this.head;
        for(let i = 0; i < index; i++){
            currentNode = currentNode.next;
        }

        currentNode.previous.next = currentNode.next;
        currentNode.next.previous = currentNode.previous;

        this.length--;
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

    reverse(){
        let currentNode = this.head;
        while(currentNode !== null){
            [currentNode.next, currentNode.previous] = [currentNode.previous, currentNode.next];
            currentNode = currentNode.previous; // use previous because we just swapped next and previous
        }
        [this.head, this.tail] = [this.tail, this.head];
    }
}

let ll = new DoublyLinkedList(3);
ll.append(5);
ll.append(8);
ll.append(11);
ll.prepend(1);
ll.insert(15, 2);

console.log(ll.toArray());
console.log(ll);

ll.delete(2);
console.log(ll.toArray());
console.log(ll);
console.log(ll.lookup(1));

ll.reverse();
console.log(ll.toArray());
console.log(ll.lookup(0));