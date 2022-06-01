/* 
* 	Merge Sort - JS Implementation - nlogn 
*	Stephen Rinkus
*/

//Input size: N (number is of power 2)
//Every level: 2^j subproblems -- at every level there's 2x more problems, and half the input size
//Every loop: 6N operations...doesn't matter the level you will always have less or equal 6N operations
//Number of operations at each level j: 2^j * 6(N / 2^j) = 6N
//Number of levels: lgN + 1
//O(6N * (lgN + 1)) = O(6N*lgN + 6N) = O(n lgN)

const { performance } = require('perf_hooks');

//////////////////////////////////////////////////////////////////////////////////////////////////
//Main

//combine left and right sub arrays, maintaining linear runtime 
const merge = (left, right) => {

	out = [];

	//shrink left and right arrs until gone, comparing and copying lower value to output
	while (left.length && right.length) {
		if (left[0] < right[0]) {
			out.push(left.shift());
		} else {
			out.push(right.shift());
		}
	}
	
	//could be elements remaining...just concat because by this stage, they are sorted: out < left < right 
	return [...out, ...left, ...right];

}

//cut array in half, recursively sort each side
const mergeSort = (arr) => {

	let half = arr.length / 2;

	//base case to halt recursion
	if (arr.length < 2) {
		return arr;
	}

	//divide step: chop the array in half...the right half remains in arr
	let left = arr.splice(0, half);

	//conquer step: two recursive calls, one for each half
	return merge(mergeSort(left), mergeSort(arr));
}

//////////////////////////////////////////////////////////////////////////////////////////////////
//Driver

const arr = [3, 9, 1, 12];
console.log("Array before mergeSort: " + arr);
let startTime = performance.now();
let arrSorted = mergeSort(arr);
let endTime = performance.now();
console.log("Array after mergeSort: " + arrSorted);
console.log(`mergeSort() took ${endTime - startTime} milliseconds`);














