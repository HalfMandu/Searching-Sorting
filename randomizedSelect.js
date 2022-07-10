/* 
* 	Randomized Selection - JS Implementation - O(n)
*   Stephen Rinkus
* 	
*	Input: Array A with n distinct numbers and a number i in {1,2,...,n} 
*	Goal: Output a single number: the ith order statistic
*/

const { performance } = require('perf_hooks');

/////////////////////////////////////////////////////////////////////////////////////////////////////////
//Helpers

//Convert txt file to array
const parseTxtFile = async (csvFile) => {

    const util = require('util');
    const fs = require('fs');
    fs.readFileAsync = util.promisify(fs.readFile);
    const data = await fs.readFileAsync(csvFile);
    const str = data.toString();
    const lines = str.split('\r\n');

    lines.map(line => {
        if (!line) {
            return null;
        }
        fileArray.push(Number(line));
    })

    return fileArray;
};

//Random whole number, min and max included 
const getBoundedRandomNumber = (min, max) => {
	//take a random fraction of the distance between min and max, and add it to min
    return Math.floor(Math.random() * (max - min + 1) + min)
};

//Swap array items i and j
const swap = (arr, i, j) => {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////
//Main

//Subroutine for partitioning the given array around a pivot element such that leftside < pivot < rightside
//This implementation implies that the first element (arr[0]) is pivot each time
const partition = (arr) => {	
	
    //i will always start one spot ahead of leftmost boundary, holding the left side while j moves forward
	let i = 1; 
	
    //walk j from beginning to end, swapping smaller values backwards with i as it goes
    for (let j = 1; j <= arr.length - 1; j++) {
        if (arr[j] < arr[0]) {
            swap(arr, i, j);
            i++;
        }
    }
	
    //finally, put the pivot into its rightful place: the last open spot remaining
	//need to subtract 1, since i will finish 1 spot ahead of split
    swap(arr, 0, i-1);
		
    //send back final sorted location of pivot, so quickSort knows where to cut it
    return i;
};

//Choosing and setting a pivot to part the array around...in this approach, choosing a random element
const choosePivot = (arr) => {

	//choose pivot from arr uniformly at random
	const pivot = getBoundedRandomNumber(0, arr.length-1);
	
	//place the (randomly) chosen pivot at the front, so partition() can chug it as it usually does
	swap(arr, 0, pivot);
	
};

//each recursive call will be on a slice of input array
const RSelect = (arr, len, i) => {
	
	//base case
	if (len == 1){
		return arr[0];  //element must be found, it's the only one there
	}
	
	//choose the pivot and set it to first element so partition() can process it
	choosePivot(arr);	
		
	//partition arr around pivot...j = new index of pivot, after placed in partition
	const j = partition(arr);

	//lucky case where chosen pivot is the i we are looking for
	if (j == i){
		return arr[j-1];
	}
	else if (j > i) {
		//recurse on the left side
		return RSelect (arr.slice(0, j-1), j-1, i);
	}
	else {
		//recurse on the right side...i-j since already eliminated the smaller ones (j) 
		return RSelect (arr.slice(j, arr.length), len-j, i-j);
	}
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////
//Driver

//let arr = [3, 4, 7, 6, 9, 16, 10, 11, 12, 2, 5, 8, 1, 13, 14, 15]
const orderStatistic = 1351;

console.log("RandomizedSelection()...Looking for orderStatistic: " + orderStatistic);

const fileArray = [];

parseTxtFile('./QuickSort.txt').then(() => {

	if (orderStatistic > fileArray.length){
		
		console.log("ERROR: There are less than " + orderStatistic + " elements in the array (size = " + fileArray.length + ")");
		
	} else {
		
		//run the code and time it 
		const startTime = performance.now();
		const ithOrderStatistic = RSelect(fileArray, fileArray.length, orderStatistic); 
		const endTime = performance.now();
		
		console.log("orderStatistic " + orderStatistic + " = " + ithOrderStatistic);
		console.log(`RSelect() took ${endTime - startTime} milliseconds`);
		
		//Time: ~ 4 milliseconds (for 10,000 integers array)...compared to two or three times this for quicksort on same size file...
	}

})



/////////////////////////////////////////////////////////////////////////////////////////////////////////



