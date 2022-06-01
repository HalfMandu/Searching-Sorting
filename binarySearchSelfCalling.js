/* 
* 	Binary Search - JS Implementation - logn
*   Stephen Rinkus
*/

/* Search a sorted array by repeatedly dividing the array in half. Begins with the the whole array. If the target value is less than the middle element of array, recurse into lower half. Otherwise, narrow down to the upper half. Repeatedly check until the value is found or the array is empty.  
  runtime: O(logn) 
  best-case : O(1) when the central index would directly match the target value. 
  worst-case : logn - value's near either end of the list or value's not in the list. 
  space complexity : O(log n)
*/

const { performance } = require('perf_hooks');


//alternative approach which allows to "trap" the recursion within the selfcalling function which exists inside of binarySearch()...
//this approach allows binarySearch to mask its internal logic better 
const binarySearch = (array, val) => {

	let minPos = 0;
	let maxPos = array.length - 1;
	let mid;
	let search;
	
	//self calling named function to enable recursion
	(search = () => {
		
		mid = Math.floor((minPos + maxPos) / 2);

		console.log(`Looking between ${array[minPos]} and ${array[maxPos]}`);
		
		//target value found -- end recursion
		if (array[mid] === val ){
		  console.log(`Value found -- ${val} == ${array[mid]}`);
		  return;
		}
		
		//if val > mid, then target value must be to the right...move the min forward to halfway point
		if (val > array[mid]){
		  minPos = mid + 1;
		}
		
		//if val < mid, then target value must be to the left...move the max backwards to halfway point
		if (val < array[mid]){
		  maxPos = mid -1;
		}

		search();  //value not yet found, so recurse again
		
	})();
}


//let arr = [1, 3, 4, 5, 8, 10, 15, 18, 20, 21, 22, 25, 26, 29, 34, 35];
let val = 96;
let sortedArr = [];
for (let i = 1; i <= 100; i++){
	sortedArr.push(i);
}

let startTime = performance.now();
binarySearch(sortedArr, val);
let endTime = performance.now();
	
console.log(`binarySearch() took ${endTime - startTime} milliseconds`);


module.exports = {binarySearch};
