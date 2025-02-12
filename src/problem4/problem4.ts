// Problem 4: Three ways to sum to n

// 1. Mathematical formula
// Time Complexity: O(1) - constant time
// Space Complexity: O(1) - constant space
// The most efficient, works instantly regardless of input size
function sumToN_A(n: number): number {
    if (n <= 0) return 0;
    return (n * (n + 1)) / 2;
};

// 2. Iterative approach, using a for loop
// Time Complexity: O(n) - linear time
// Space Complexity: O(1) - constant space
// Not efficient, but easy to understand and still good for a small input
function sumToN_B(n: number): number {
    if (n <= 0) return 0;
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
};

// 3. Recursive approach
// Time Complexity: O(n) - linear time
// Space Complexity: O(n) - linear space due to call stack
// The worst approach in 3 ways.Can cause stack overflow for large numbers, less efficient
function sumToN_C(n: number): number {
    if (n <= 0) return 0;
    return n + sumToN_C(n - 1);
};
