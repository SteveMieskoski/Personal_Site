

function findOdd(A) {
    var i, idx, Odd, counter = [], nums = [];
    for(i=0; i< A.length; i++){
        idx = nums.indexOf(A[i]);
        if( idx !== -1){
            counter[idx][1] += 1;
        } else {
            nums.push(A[i]);
            counter.push([A[i], 1]);
        }
    }
    counter.map(function(val){
        if(Number.isInteger(val[1]/2) !== true) {
            Odd = val[0];
        }
    });
    return Odd;
}

console.log(findOdd([20,1,-1,2,-2,3,3,5,5,1,2,4,20,4,-1,-2,5]));

/*
 function tickets(peopleInLine){
 var i, quarter = 0, half = 0;
 if(peopleInLine[0] === 25){
 for (i = 0; i < peopleInLine.length; i++){
 switch (peopleInLine[i]) {
 case 25:
 quarter++;
 console.log('case 25', quarter, half);
 break;
 case 50:
 if (quarter >= 1) {
 half++;
 quarter--;
 }
 else {
 return 'NO';
 }
 console.log('case 50', quarter, half);
 break;
 case 100:
 if (half >= 1 && quarter >= 1) {
 half--;
 quarter--;
 } else if (quarter >= 3) {
 quarter -= 3;
 } else {
 return 'NO';
 }
 console.log('case 100', quarter, half);
 break;
 default:
 return 'YES';
 }
 }
 return 'YES';
 }
 else {
 return 'NO'
 }
 }

 console.log(tickets([25, 25, 50, 50]));
 */
