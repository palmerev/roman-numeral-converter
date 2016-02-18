function convert(num) {
    "uses strict";
    // console.log("num: ", num);
    // convert num to string
    // find the length / number of digits
    var numStr = num.toString(),
        len = numStr.length,
        // need variable for place multiplier?
        place = 1,
        placeValues = [],
        romanList = ["M", "D", "C", "L", "X", "V", "I"],
        decList = [1000, 500, 100, 50, 10, 5, 1],
        i = len - 1,
        digit;
    // backwards loop assigning places
    // break out into 1000s, 100s, 10s, 1s: placeValues []
    while (i >= 0) {
        digit = parseInt(numStr[i]);
        placeValues.unshift(digit * place);
        place = place * 10;
        i--;
    }
    var conversion, conversionTotal, placeValue, conversionList = [];
    // do each coversion
    for (var j = 0; j < placeValues.length; j++) {
        conversion = "";
        conversionTotal = 0;
        placeValue = placeValues[j];
        for (var k = 0; k < decList.length; k++) {
            var currentDec = decList[k], currentNumeral = romanList[k];
            while (currentDec + conversionTotal <= placeValue) {
                conversionTotal += currentDec;
                conversion += currentNumeral;
            }
            if (conversionTotal === placeValue) {
                console.log("initial conversion: ", conversion);
                // replace four repetitions with subtraction form
                // find four repetitions, note the character
                var repeatedFourTimes = /(.?)(.)\2\2\2/g,
                    regexResults, repeatedChar, precedingChar, msg;
                while ((regexResults = repeatedFourTimes.exec(conversion)) !== null) {
                    // msg = 'Found ' + regexResults[0] + '. ';
                    // msg += 'Next match starts at ' + repeatedFourTimes.lastIndex;
                    precedingChar = regexResults[1];
                    repeatedChar = regexResults[2];
                    // console.log(msg);
                    // if there is a preceding character
                    if (precedingChar !== "") {
                        var precedingIndex = romanList.indexOf(precedingChar);
                        if (precedingIndex === -1) { throw "precedingChar not found in romanList."; }
                        else if (precedingIndex > 0) {
                            // find numeral next biggest from base numeral, and do the replacement
                            var nextFromPreceding = romanList[precedingIndex - 1];
                            // if the placeValue starts with 9, use different replacement pattern
                            if (placeValue.toString().indexOf("9") === 0) {
                                conversion = conversion.replace(repeatedFourTimes, repeatedChar + nextFromPreceding);
                            }
                            conversion = conversion.replace(repeatedFourTimes, precedingChar + nextFromPreceding);
                        }
                        else { throw "precedingIndex 0 is invalid"; }
                    }
                    //else if not a preceding character
                    else {
                        var repeatedIndex = romanList.indexOf(repeatedChar);
                        if (repeatedIndex === -1) { throw "repeatedChar not found in romanList."; }
                        else if (repeatedIndex > 0) {
                            var nextFromRepeated = romanList[repeatedIndex - 1];
                            conversion = conversion.replace(repeatedFourTimes, repeatedChar + nextFromRepeated);
                        } else { throw "repeatedIndex " + repeatedIndex + " means the number is too large."; }
                    }
                }
                conversionList.push(conversion);
                break;
            }
        }
    }
    // join the converted numerals
    // return the result
    // console.log("conversionList: ", conversionList);
    return conversionList.join("");
}

function doConversion(evt) {
    "use strict";
    var userNumber = document.getElementById("user-number"),
        result = document.getElementById("result");
    console.log("button clicked");
    if (userNumber.value) {
        console.log("value found");
        result.innerHTML = convert(parseInt(userNumber.value));
    }
}

function init() {
    "use strict";
    var convertButton = document.getElementById("convert-button"),
        form = document.forms[0];
    convertButton.addEventListener("click", doConversion);
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        doConversion();
    })
}

window.addEventListener("DOMContentLoaded", init);
