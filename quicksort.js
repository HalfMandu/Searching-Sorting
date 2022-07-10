/* 
* 	QuickSort - JS Implementation - O(nlogn)
*   Stephen Rinkus
*/

const { performance } = require('perf_hooks');


//Swap array items i and j
const swap = (arr, i, j) => {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
};

//Partition array on either side of pivot -- linear runtime O(n)
const partition = (arr, left, right) => {

    let i = left + 1;  
    const pivotPos = left; //choosing 1st element as pivot in this implementation

    //i and j both start at one position to the right of pivot, j marches to the end
    for (let j = i; j <= right; j++) {
        //if j finds a value > pivot value, swap arr[j] and arr[i] and increment i	
        //ensures all values on left side will be lower than pivot by the end				
        if (arr[j] < arr[pivotPos]) {
            swap(arr, i, j);
            i++;
        }
    }

    //finally, place the pivot in the last remaining opening, wherever i finished
    swap(arr, pivotPos, i - 1);

    //return the pivot location so that quickSort() knows where to divide the work
    return i;  
}


//Main recursive call
const quickSort = (arr, leftPos, rightPos) => {

    //base case, else recursion continues
    if (leftPos >= rightPos) {
        return;
    }

    //partition around a chosen pivot
    //once the pivot and array is rearranged their proper place, recurse both sides
    //return the location of the newly placed pivot of the partially sorted array
    const pivotPos = partition(arr, leftPos, rightPos);   //1st loop: (arr, 0, 3)

    //recurse both sides, split around pivot
    //all elements before the pivot index go to the left, the rest to the right
    quickSort(arr, leftPos, pivotPos - 1);
    quickSort(arr, pivotPos, rightPos);

    return arr;
}

///////////////////////////////////////////////////////////////////////////////////
//Driver


const arr = [3, 4, 7, 6, 9, 16, 10, 11, 12, 2, 5, 8, 1, 13, 14, 15];
console.log("Initial array : " + arr);
const startTime = performance.now();
const arrSorted = quickSort(arr, 0, arr.length - 1);
const endTime = performance.now();
console.log("Sorted array: " + arrSorted);
console.log(`quickSort() took ${endTime - startTime} milliseconds`);

///////////////////////////////////////////////////////////////////////////////////

exports.quickSort = quickSort;