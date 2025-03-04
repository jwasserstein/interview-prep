class Node {
    constructor(value){
        this.value = value;
        this.next = null;
    }
}

class Queue{
    constructor(){
        this.back = new Node(null);
        this.front = this.back;
        this.length = 0;
    }

    enqueue(value){
        if(!this.length){
            this.back.value = value;
        } else {
            const newNode = new Node(value);
            this.back.next = newNode;
            this.back = newNode;
        }
        this.length++;
        return this;
    }

    dequeue(){
        if(this.length === 0){
            return false;
        }

        this.length--;
        let val;
        if(this.length === 0){
            this.back = new Node(null);
            val = this.front.value;
            this.front = this.back;
        } else {
            val = this.front.value;
            this.front = this.front.next;
        }
        return val;
    }

    peek(){
        return this.front ? this.front.value : null;
    }

    isEmpty(){
        return this.length === 0;
    }
}

let q = new Queue();


// front      back
//   5 => 7 => 9

module.exports = {Queue};