/* 
* 	BinarySearch - JS Implementation - logn
*   Stephen Rinkus
*/

/* Search a sorted array by repeatedly dividing the array in half. Begins with the the whole array. 
If the target value is less than the middle element of array, recurse into lower half. 
Otherwise, narrow down to the upper half. Repeatedly check until the value is found or the array is empty.  
  runtime: O(logn) 
  best-case : O(1) when the central index would directly match the target value. 
  worst-case : logn - value's near either end of the list or value's not in the list. 
  space complexity : O(log n)
*/

const { performance } = require('perf_hooks');


const binarySearchRecursive = (arr, min, max, target) => {

	console.log("Min: " + min + ", Max: " + max + ", Target: " + target);
	
	//base case
	if ((target > max) || (target < min)){
		console.log("Target " + target + " not found");
		return -1;
	}
	
	//index halfway into the array each pass through
	let mid = Math.floor((min + max)/2);
	
	console.log("mid: " + mid);
	
	if (target == arr[mid]){
		//target found, no need to recurse further
		console.log("Target found -- " + target + " was found at position " + mid + " of " + (arr.length - 1));
		return target;
	}
	
	if (target < arr[mid])
		//target must be on lower side...ignore right half and recurse to the left
		return binarySearchRecursive(arr, min, mid, target); 
	
	else //(target > arr[mid])
		//target must be on higher side...ignore left half and recurse to the right
		return binarySearchRecursive(arr, mid, max, target);	

}


///////////////////////////////////////////////////////////////////////////////////
//Driver

//let sortedArr = [1, 3, 4, 5, 8, 9, 10, 16];

let val = 22;
let sortedArr = [];
for (let i = 1; i <= 100; i++){
	sortedArr.push(i);
}

console.log("BinarySearching array for target: " + val);

let startTime = performance.now();
binarySearchRecursive(sortedArr, 0, sortedArr.length-1, val);
let endTime = performance.now();
	
console.log(`binarySearchRecursive() took ${endTime - startTime} milliseconds`);



