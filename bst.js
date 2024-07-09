import { Node } from "./node.js";

class Tree {
    constructor() {
        this.root = null;
        this.queue = [];
    }

    buildTree(array, start = 0, end = array.length - 1) {
        if (start > end) {
            return null;
        }

        const middle = Math.floor((start + end) / 2);

        const node = new Node(array[middle]);

        node.left = this.buildTree(array, start, middle - 1);
        node.right = this.buildTree(array, middle + 1, end);

        return node;
    }

    insert(value, node = this.root) {
        if (node === null) {
            node = new Node(value);
            return node;
        }

        if (node.data > value) {
            node.left = this.insert(value, node.left);
        } else {
            node.right = this.insert(value, node.right);
        }

        return node;
    }

    deleteItem(value, node = this.root) {
        if (node.left === null && node.right === null) {
            node = null;
            return node;
        }

        if (node.data > value) {
            node.left = this.deleteItem(value, node.left);
        } else if (node.data < value) {
            node.right = this.deleteItem(value, node.right);
        } else {
            if (node.left === null) {
                return node.right;
            } else if (node.right === null) {
                return node.left;
            }

            node.data = this.minValue(node.right);
            node.right = this.deleteItem(node.data, node.right);
        }

        return node;
    }

    minValue(node) {
        if (node.left !== null) {
            node = this.minValue(node.left);
        }

        return node.data;
    }

    find(value, node = this.root) {
        if (node.data === value) {
            return node;
        }

        let returnNode = null;

        if (node.data > value) {
            returnNode = this.find(value, node.left);
        } else {
            returnNode = this.find(value, node.right);
        }

        return returnNode;
    }

    levelOrder(queue = [this.root]) {
        if (this.root === null) return null;

        if (queue.length !== 0) {
            const current = queue.pop();
            console.log(current.data);
            if (current.left !== null) queue.unshift(current.left);
            if (current.right !== null) queue.unshift(current.right);
            this.levelOrder(queue);
        }
    }

    inOrder(node = this.root) {
        if (node === null) return [];

        let leftHalf = [...this.inOrder(node.left)];
        let rightHalf = [...this.inOrder(node.right)];
    
        return [...leftHalf, node.data ,...rightHalf];
    }

    preOrder(node = this.root) {
        if (node === null) return;

        console.log(node.data);
        this.preOrder(node.left);
        this.preOrder(node.right);
    }

    postOrder(node = this.root) {
        if (node === null) return;

        this.postOrder(node.left);
        this.postOrder(node.right);
        
        console.log(node.data);
    }

    height(node) {
        if (node === null)
            return 0;

        let leftNode = this.height(node.left) + 1;
        let rightNode = this.height(node.right) + 1;
    
        return leftNode >= rightNode ? leftNode : rightNode;
    }

    depth(node, root = this.root) {
        if (root.data === node.data) {
            return 0;
        }

        if (root.data > node.data) {
            return this.depth(node, root.left) + 1;
        } else {
            return this.depth(node, root.right) + 1;
        }
    }

    isBalanced(node = this.root) {
        if (node === null) {
            return 0;
        }

        let leftNode = 0, rightNode = 0;

        if (this.root.left !== null)
            leftNode = this.height(node.left) + 1;
        if (this.root.right !== null)
            rightNode = this.height(node.right) + 1;

        if (leftNode - rightNode > 1) return false;

        return true;
    }

    rebalance() {
        const arrayFromTree = this.inOrder();

        this.root = this.buildTree(arrayFromTree);
    }
}

export { Tree }