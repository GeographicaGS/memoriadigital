function toFixed (number, precision) {
    var multiplier = Math.pow( 10, precision + 1 ),
        wholeNumber = Math.floor( number * multiplier );
    return Math.round( wholeNumber / 10 ) * 10 / multiplier;
}

function parseNumber(number) {
   number = toFixed(number,2);
   x = number.toString().split(".");
   // if(x.length > 0){
	  //  number = parseInt(x[0]).toLocaleString().replace(/,/g, '.');
   // }
   // if(x.length > 1){
   // 	number += "," + x[1];
   // 	if(x[1].length < 2){
   // 		number += "0";
   // 	}
   // }else{
   // 	number += ",00";
   // }
   // return number;
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x[0])) {
        x[0] = x[0].replace(rgx, '$1' + '.' + '$2');
    }
    if(x.length > 1){
      x[0] += "," + x[1];
      if(x[1].length < 2){
        x[0] += "0";
      }
    }else{
      x[0] += ",00";
    }
    return x[0];
}

function replaceAccents(s) {
    var r = s.toLowerCase();
    non_asciis = {'a': '[àáâãäå]', 'ae': 'æ', 'c': 'ç', 'e': '[èéêë]', 'i': '[ìíîï]', 'n': 'ñ', 'o': '[òóôõö]', 'oe': 'œ', 'u': '[ùúûűü]', 'y': '[ýÿ]'};
    for (i in non_asciis) { r = r.replace(new RegExp(non_asciis[i], 'g'), i); }
    return r;
}


function init(request, response, next) {

    response.locals.parseNumber = function(){
        return parseNumber.apply(response,arguments);
    };

    response.locals.replaceAccents = function(){
        return replaceAccents.apply(response,arguments);
    };

    if (typeof next === 'function') {
        next();
    }
};

module.exports.parseNumber = parseNumber;
module.exports.replaceAccents = replaceAccents;
module.exports.init = init;