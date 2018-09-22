# 二叉树的遍历

二叉树的遍历，是指按照一定的顺序对二叉树的每一个节点均访问一次，且只访问一次

按照访问根节点的访问位置不同通常把二叉树的遍历分为三种方式：

1. 前序遍历
2. 中序遍历
3. 后序遍历

一棵简单的二叉树
![](https://raw.githubusercontent.com/Krryxa/WORK-LEARNING/master/images/17.jpg)

## 前序遍历

首先访问根节点，然后访问根节点的左子树，在访问根节点的右子树

遍历结果：abdefgc
```js
function DLR (tree) {
  console.log(tree.name);
  if (tree.left) {
    DLR(tree.left);
  }
  if (tree.right) {
    DLR(tree.right);
  }
}
```

## 中序遍历

首先访问根节点的左子树，然后访问根节点，再访问根节点右子树

遍历结果: debgfac
```js
function LDR (tree) {
  if (tree.left) {
    LDR(tree.left);
  }
  console.log(tree.name);
  if (tree.right) {
    LDR(tree.right);
  }
}
```

## 后序遍历

首先访问根节点的左子树，然后访问根节点的右子树，最后访问根节点

遍历结果：edgfbca
```js
function LRD (tree) {
  if(tree.left){
    LRD(tree.left);
  }
  if(tree.right){
    LRD(tree.right);
  }
  console.log(tree.name);
}
```

## 二叉树的数据结构
```js
let tree = {
  "id": 0,
  "name": "root",
  "left": {
    "id": 1,
    "name": "Simon",
    "left": {
      "id": 3,
      "name": "Carl",
      "left": {
        "id": 7,
        "name": "Lee",
        "left": {
          "id": 11,
          "name": "Fate"
        }
      },
      "right": {
        "id": 8,
        "name": "Annie",
        "left": {
          "id": 12,
          "name": "Saber"
        }
      }
    },
    "right": {
      "id": 4,
      "name": "Tony",
      "left": {
        "id": 9,
        "name": "Candy"
      }
    }
},
"right": {
    "id": 2,
    "name": "right",
    "left": {
      "id": 5,
      "name": "Carl",
    },
    "right": {
      "id": 6,
      "name": "Carl",
      "right": {
        "id": 10,
        "name": "Kai"
      }        
    }
  }
}
```