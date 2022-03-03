// Challenge 1
/* TODO
Problem 1

Description

Given an integer array, all items repeat 3 times except for just one item that appears once. Please
find this single item.

Example 1.
INPUT: [1, 1, 0, 1]
OUTPUT: 0

Example 2.
INPUT: [3, 1, 3, 3, 5, 1, 1]
OUTPUT: 5

Note

Input array is always non empty.

Try to optimize time and space complexity.
*/
function findOnceElement(arrayInput: number[]) {
  let ones: number = 0;
  let twos: number = 0;

  for (let item of arrayInput) {
    ones = (ones ^ item) & ~twos;
    twos = (twos ^ item) & ~ones;
  }

  return ones;
}

let arr = [1, 1, 0, 1];
console.time();
console.log("Element appear once time: ", findOnceElement(arr));
console.timeEnd();

// Explain:
/*

1. Cách 1: Lặp từng phần tử và count từng phần tử. Nhược điểm là trường hợp ví dụ array lớn khổng lồ. sẽ tốn performance và lặp lại tất cả nếu scan hết array 100 hoặc 1000 items. 
Complexity sẽ là: O(n2)
2. Cách 2: Lưu trữ mỗi phần từ (element ) trong một hash table. sau đó count từng element đó vào hashTable này. Cách này tốn bộ nhớ hơn, memory hơn. Complexity là : O(n)
3. Cách 3: mình dùng bitwise xor để check. mục đích mình làm này khi xor 1 số với chính nó thì là 0 và XOR với 0 thì kết quả sẽ là chính nó.
Mình sẽ tạo 2 biến là: biến ones sẽ giữ bit xảy ra 1 lần và twos là những bit xảy ra 2 lần.
Mỗi bit từ mỗi phần tử vào biến ones đầu tiên.
Khi bit đó đến lần thứ 2 sẽ vào biến twos.
Khi đến lần 3 thì sẽ bị remove trong biến twos.
Chúng ta không quan tâm số / phần tử nào. chỉ quan tâm bit.
Khi kết thúc vòng lặp. ta trả về ones and nó sẽ giữ bit của số chỉ xuất hiện 1 lần.

*/

// Challenge 2

/*
 * Definition for a binary tree node.
 *
 */

// class TreeNode {
//   val: number;
//   left: TreeNode | null;
//   right: TreeNode | null;
//   constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
//     this.val = val === undefined ? 0 : val;
//     this.left = left === undefined ? null : left;
//     this.right = right === undefined ? null : right;
//   }
// }

interface INode<U> {
  value: U;
  left: INode<U> | null;
  right: INode<U> | null;
}

class BinaryTree<U> {
  private root: INode<U> | undefined;
  private sum: number = 0;
  createNewNode = (value: U): INode<U> => {
    return {
      value,
      left: null,
      right: null,
    };
  };

  insert = (value: U) => {
    const currentNode = this.createNewNode(value);
    if (!this.root) {
      this.root = currentNode;
    } else {
      this.insertIntoCurrentNode(currentNode);
    }
    return this;
  };

  private insertIntoCurrentNode = (currentNode: INode<U>) => {
    const { value } = currentNode;
    const traverse = (node: INode<U>) => {
      if (value > node.value) {
        if (!node.right) {
          node.right = currentNode;
        } else traverse(node.right);
      } else if (value < node.value) {
        if (!node.left) {
          node.left = currentNode;
        } else traverse(node.left);
      }
    };
    traverse(this.root as INode<U>);
  };

  public sumEvenGrandparent(): number {
    // Base case
    if (this.root == null) return 0;
    this.dfs(this.root as INode<any>, null, null);
    return this.sum;
  }

  private dfs(
    root: INode<number>,
    parent: INode<number> | null,
    grandparent: INode<number> | null
  ) {
    if (root == null) return;
    if (grandparent != null && grandparent.value % 2 == 0) {
      this.sum += root.value;
    }

    if (root.left != null) {
      this.dfs(root.left, root, parent);
    }

    if (root.right != null) {
      this.dfs(root.right, root, parent);
    }
  }
}

const binaryTree = new BinaryTree();
binaryTree
  .insert(6)
  .insert(7)
  .insert(8)
  .insert(2)
  .insert(7)
  .insert(1)
  .insert(3)
  .insert(9)
  .insert(null)
  .insert(1)
  .insert(4)
  .insert(null)
  .insert(null)
  .insert(null)
  .insert(5);

//   binaryTree.insert(1)

console.log(binaryTree.sumEvenGrandparent());

// Explain 
// 1. Tạo một class INode. 1 node gồm left, right và value. chứa data. 
// 2. Duyệt theo DFS. Tạo một cây nhị phân trong đó mỗi node là dạng INode.
// 3. và cứ như theo function sumEvenGrandparent, ở đây cũng tách hàm và gọi đệ qui. tính % 2 ==0 là xét số chẵn và sum lại thôi. 
// 4. Grandparent là node ông nội / ngoại..
// 5. Tính sum và trả kết quả.