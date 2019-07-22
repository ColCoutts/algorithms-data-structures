console.log('hello');

// linked list data structure 
function linkedList() {
  let length = 0;
  let head = null;

  const Node = function(element) {
    this.element = element;
    this.next = null;
  }

  this.size = function() {
    return length;
  }

  this.head = function() {
    return head;
  }

  this.add = function(element) {
    const node = new Node(element);
    if(head === null) {
      head = node;
    } else {
      let currentNode = head;

      while(currentNode.next) {
        currentNode = currentNode.next;
      }
      currentNode.next = node;
    }
    length ++;
  };

  this.remove = function(element) {
    let currentNode = head;
    let previousNode;

    if(currentNode.element === element) {
      head = currentNode.next;
    } else {
      while(currentNode.element !== element) {
        previousNode = currentNode;
        currentNode = currentNode.next;
      }
      previousNode.next = currentNode.next;
    }

    length--;
  }

  this.isEmpty = function() {
    return length === 0;
  }

  this.indexOf = function(element) {
    let currentNode = head;
    let index = -1;

    while(currentNode) {
      index++;
      if(currentNode.element === element) {
        return index;
      } 
      currentNode = currentNode.next;
    }
    return -1;
  };

  this.elementAt = function(index) {
    let currentNode = head;
    let count = 0;
    
    while(count < index) {
      count++;
      currentNode = currentNode.next;
    }
    return currentNode.element;
  };

  this.addAt = function(index, element) {
    const node = new Node(element);
    const currentNode = head;
    let previousNode;
    let currentIndex = 0;

    if(index > length) {
      return false;
    }

    if(index === 0) {
      node.next = currentNode;
      head = node;
    } else {
      while(currentNode < index) {
        currentIndex++;
        previousNode = currentNode;
        currentNode = currentNode.next;
      }

      node.next = currentNode;
      previousNode.next = node;
    }

    length++;
  }

  this.removeAt = function(index) {
    const currentNode = head;
    let previousNode;
    let currentIndex = 0;

    if(index < 0 || index >= length) {
      return null;
    }
    if(index === 0) {
      head = currentNode.next;
    } else {
      while(currentIndex < index) {
        currentIndex++;
        previousNode = currentNode;
        currentNode = currentNode.next;
      }

      previousNode.next = currentNode.next;
    }
    length--;
    return currentNode.element;
  }
}

const testList = new linkedList();
testList.add('kittens');
testList.add('puppy');
testList.add('lizard');
testList.add('bird');
testList.add('mittens');
testList.add(9);
console.log(testList.size());
console.log(testList.elementAt(3));
console.log(testList.indexOf('puppy'));

// binary search tree

class Node {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class BST {
  constructor() {
    this.root = null;
  }

  add(data) {
    let node = this.root;
    if(node === null) {
      this.root = new Node(data);
      return;
    } else {
      const searchTree = function(node) {
        if(data < node.data) {
          if(node.left === null) {
            node.left = new Node(data);
            return;
          } else if(node.left !== null) {
            return searchTree(node.left);
          } 
        } else if(data > node.data) {
          if(node.right === null) {
            node.right = new Node(data);
            return;
          } else if(node.right !== null) {
            return searchTree(node.right);
          } 
        } else {
          return null;
        }
      };
      return searchTree(node);
    }
  }

  findMin() {
    let current = this.root;
    while(current.left !== null) {
      current = current.left;
    }
    return current.data;
  }

  findMax() {
    let current = this.root;
    while(current.right !== null) {
      current = current.right;
    }
    return current.data;
  }

  find(data) {
    let current =  this.root;
    while(current.data !== data) {
      if(data < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
      if(current === null) {
        return null;
      }
    }
    return current;
  }

  isPresent(data) {
    let current = this.root;
    while(current) {
      if(data === current.data) {
        return true;
      }
      if(data < current.data){
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return false;
  }

  remove(data){
    const removeNode = function(node, data) {
      if(node === null) {
        return null;
      }
      if(data == node.data) {
        if(node.left == null && node.right == null) {
          return null;
        }
        if(node.left == null) {
          return node.right;
        }
        if(node.right == null) {
          return node.left;
        }

        let tempNode = node.right;
        while(tempNode.left !== null) {
          tempNode = tempNode.left;
        }
        node.data = tempNode.data;
        node.right = removeNode(node.right, tempNode.data);
        return node;
      } else if(data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      } else {
        node.right = removeNode(node.right, data);
        return node;
      }
    }
    this.root = removeNode(this.root, data);
  }
}

const bst = new BST();
bst.add(8);
bst.add(7);
bst.add(45);
bst.add(13);
bst.add(44);
bst.add(11);
console.log(bst.findMax());
bst.remove(45);
console.log(bst.findMax());
console.log(bst.findMin());

// simple stack using array methods
let letters = [];
let word = 'racecar';
let rword = '';

for(let i = 0; i < word.length; i++) {
  letters.push(word[i]);
}

for(let i = 0; i < word.length; i++) {
  rword += letters.pop();
}

if(rword === word) {
  console.log(word + 'is a palindrome');
} else {
  console.log(word + 'is not a palindrome');
}

// Stack class not using array methods

const Stack = function() {
  this.count = 0;
  this.storage = {};

  this.push = function(value) {
    this.storage[this.count] = value;
    this.count++;
  }

  this.pop = function() {
    if(this.count === 0) {
      return undefined;
    }
    this.count--;
    let result = this.storage[this.count];
    delete this.storage[this.count];
    return result;
  }

  this.size = function() {
    return this.count;
  }

  this.peek = function() {
    return this.storage[this.count - 1];
  }
}

const myStack = new Stack();

myStack.push(1);
myStack.push(4);
myStack.push(6);
myStack.push(7);
console.log(myStack.peek());
myStack.pop();
console.log(myStack.peek());
console.log(myStack.size());
