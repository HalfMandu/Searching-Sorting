/* 
* 	QuickSort - JS Implementation - nlogn
*   Stephen Rinkus
*/

const { performance } = require('perf_hooks');

///////////////////////////////////////////////////////////////////////////////////
//Helpers

//Keeping track of pivot options
const FIRST_ELEMENT = 1;
const MIDDLE_ELEMENT = 2;
const LAST_ELEMENT = 3;
const MEDIAN_ELEMENT = 4;
const RANDOM_ELEMENT = 5;

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
        result.push(Number(line));
    })

    return result;
}

//Random whole number, min and max included 
const getBoundedRandomNumber = (min, max) => {
	//take a random fraction of the distance between min and max, and add it to min
    return Math.floor(Math.random() * (max - min + 1) + min)
}

//Swap array items i and j
const swap = (arr, i, j) => {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
};

//Identify location of which of three elements is the median (i.e., the index of the one whose value is in between the value of the other two)
const getMedian = (arr, first, mid, last) => {

	//bitwise XOR -- return element ONLY if it is greater than JUST ONE of the other two elements...
	if ((arr[first] > arr[mid]) ^ (arr[first] > arr[last]))
		return first;
	if ((arr[mid] > arr[first]) ^ (arr[mid] > arr[last]))
		return mid;
	else
		return last;
}

//Pivot options: 1st element, middle element, last element, median element, or random element
const choosePivot = (arr, left, right, pivotType) => {

    let pivotPos;  //by default, pivotPos will first entry in array
	
    //find desired pivot point, then swap with 1st element if needed
    switch (pivotType) {
        case FIRST_ELEMENT:
            return;
        case MIDDLE_ELEMENT:
            pivotPos = Math.floor((left + right) / 2);
            break;
		case LAST_ELEMENT: 
			pivotPos = right;
			break;
		case MEDIAN_ELEMENT: 
			pivotPos = getMedian(arr, left, Math.floor((left + right) / 2), right);
			break;
        case RANDOM_ELEMENT:
            pivotPos = getBoundedRandomNumber(left, right);
            break;
        default:
            return;
    }
	
    //swap the chosen pivot with the left-bound, so partition() can treat it as pivot 
    swap(arr, left, pivotPos);
	
    return;
}

///////////////////////////////////////////////////////////////////////////////////
//Main

//Takes the full array each time, along with the left and right subarray boundaries
//partitions the array around a pivot, so that leftside < pivot < rightside
const partition = (arr, left, right) => {

    const pivotPos = left;  //pivot always chosen as 1st element in this method
    let i = left + 1;     //i will always start one spot ahead of leftmost boundary
	
    //walk j from beginning to end, swapping smaller values backwards with i as it goes
    for (let j = left + 1; j <= right; j++) {
        if (arr[j] < arr[pivotPos]) {
            swap(arr, i, j);
            i++;
        }
    }

    //finally, put the pivot into its rightful place: the last open spot remaining
	//need to subtract 1, since i will finish 1 spot ahead of split
    swap(arr, pivotPos, i - 1);
	
    //send back final sorted location of pivot, so quickSort knows where to cut it
    return i-1;
}

//Main recursive call
const quickSort = (arr, leftPos, rightPos) => {

    //base case, else recursion continues
    if (leftPos >= rightPos) {
        return;
    }

    //partition types: FIRST_ELEMENT, MIDDLE_ELEMENT, LAST_ELEMENT, MEDIAN_ELEMENT, RANDOM_ELEMENT
    //all choices will swap with 1st element, allowing partition() to use 1st element as pivot regardless
    choosePivot(arr.array, leftPos, rightPos, MEDIAN_ELEMENT);

    //partition around chosen pivot...once properly placed, can recurse both sides
    const sortedPivotPos = partition(arr.array, leftPos, rightPos);
	
    //recurse both sides...all elements before the pivot index go to the left, the rest to the right
    quickSort(arr, leftPos, sortedPivotPos - 1);
    quickSort(arr, sortedPivotPos + 1, rightPos);
	
	//the number of comparisons is the number of spots between the boundaries
    arr.compCounter += (rightPos - leftPos);

	//each call to quickSort will return an object, which holds both data-array and counter
    return { 
		"array": arr.array,
		"compCounter": arr.compCounter
	}
}

//////////////////////////////////////////////////////////////////////////////////////////////////////
//Driver

const result = [];

parseTxtFile('./QuickSort.txt').then(() => {

	const arr = {
		"array": result,
		"compCounter": 0
	} 
 
    const startTime = performance.now();
    const arrSorted = quickSort(arr, 0, arr.array.length - 1);
    const endTime = performance.now();
	
	console.log("Final compCounter : " + arrSorted.compCounter);    
	console.log(`quickSort() took ${endTime - startTime} milliseconds`);
	
	//first element as pivot: 162,085 comparisons, ~9.051 milliseconds
	//middle element as pivot: 150,657 comparisons, ~10.006 milliseconds
	//last element as pivot: 164,123 comparisons, ~14.915 milliseconds
	//median element as pivot: 138,382 comparisons, ~16.614 milliseconds
	
})

///////////////////////////////////////////////////////////////////////////////////

exports.quickSort = quickSort;
