class Node {
    constructor(value){
        this.value = value;
        this.next = null;
    }
}

class StackLL{
    constructor(){
        this.top = null; //equivalent to head
        this.length = 0;
    }
    
    push(value){
        const newNode = new Node(value);
        newNode.next = this.top;
        this.top = newNode;
        this.length++;
    }
    
    pop(){
        if(!this.top){
            return null;
        }
        this.top = this.top.next;
        this.length--;
    }

    peek(){
        return this.top ? this.top.value : null;
    }

    isEmpty(){
        return this.length === 0;
    }
}

class StackArr{
    constructor(){
        this.data = [];
        this.length = 0;
    }

    push(value){
        this.data.push(value);
        this.length = this.data.length;
    }

    pop(){
        const val = this.data.pop();
        this.length = this.data.length;
        return val;
    }

    peek(){
        return this.data[this.data.length - 1];
    }

    isEmpty(){
        return this.data.length === 0;
    }
}

class QueueUsingStack{
    constructor(){
        this.data = new StackArr();
    }

    enqueue(value){
        this.data.push(value);
    }

    dequeue(){
        const back = new StackArr();
        let loops = this.data.length
        for(let i = 0; i < loops; i++){
            back.push(this.data.pop());
        }
        const val = back.pop();
        loops = back.length;
        for(let i = 0; i < loops; i++){
            this.data.push(back.pop());
        }
        return val;
    }

    peek(){
        const back = new StackArr();
        let loops = this.data.length;
        for(let i = 0; i < loops; i++){
            back.push(this.data.pop());
        }
        const val = back.peek();
        for(let i = 0; i < loops; i++){
           this.data.push(back.pop());
        }
        return val;
    }
}

module.exports = {Stack: StackArr};