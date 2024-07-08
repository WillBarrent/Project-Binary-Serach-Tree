import { Tree } from "./bst.js";

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
        return null;
    }
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? "|   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "|   "}`, true);
    }
}

const sortAndRemove = (array) => {
    array.sort((a, b) => a - b);

    const newArray = [];

    for (let i = 0; i < array.length;) {
        newArray.push(array[i]);
        const similarValues = array.filter(val => val === array[i]);
        i += similarValues.length;
    }

    return newArray;
}

const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const tree = new Tree();

tree.root = tree.buildTree(sortAndRemove(array));
tree.insert(2);
prettyPrint(tree.root);

console.log(tree.height(tree.root));