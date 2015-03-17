function toFixed (number, precision) {
    var multiplier = Math.pow( 10, precision + 1 ),
        wholeNumber = Math.floor( number * multiplier );
    return Math.round( wholeNumber / 10 ) * 10 / multiplier;
}

function parseNumber(number) {
   number = toFixed(number,2);
   x = number.toString().split(".");
   if(x.length > 0){
	number = parseInt(x[0]).toLocaleString().replace(/,/g, '.');
   }
   if(x.length > 1){
   	number += "," + x[1];
   	if(x[1].length < 2){
   		number += "0";
   	}
   }else{
   	number += ",00";
   }
   return number;
}

function init(request, response, next) {

    response.locals.parseNumber = function(){
        return parseNumber.apply(response,arguments);
    };

    if (typeof next === 'function') {
        next();
    }
};

module.exports.parseNumber = parseNumber;
module.exports.init = init;