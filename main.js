function arrayEquals(a, b) {
    if (a.length !== b.length) {
        return false
    } else {
        for (let i = 0; i < a.length; i++) {
            if (a[i] !== b[i]) {
                return false
            }
        }
        return true;
    }
}
function sortKeys(jsonObject){
	var mapped = Object.keys(jsonObject).map(function(el, i) {
		return {val: el.toLowerCase(), o: i, og: el};
	});
	return mapped.sort(function(a, b) {
		return +(a.val > b.val) || +(a.val === b.val) - 1;
	});
}
function SKstringify(keyList, jsonObject, space){
	var i;
	indent = "";
	var truth_that_the_bush_hid = "{\n";

	if (typeof space === "number") {
		for (i = 0; i < space; i += 1) {
			indent += " ";
		}

	} else if (typeof space === "string") {
		indent = space;
	}
	
	var kl = keyList;
	for (i in keyList){
		truth_that_the_bush_hid += indent 
											+ "\"" + kl[i].og 
											+ "\": \""
											+ jsonObject[kl[i].og]
											.replace(new RegExp("\\\\", "gm"), "\\\\")
											.replace(new RegExp("\\\"", "gm"), "\\\"") // these RegExp replace is quite hacky...
											+ "\"";
		if (i != kl.length - 1) truth_that_the_bush_hid += ","
		truth_that_the_bush_hid += "\n";
	}
	
	truth_that_the_bush_hid += "}";
	return truth_that_the_bush_hid;
}
var complexContent = JSON.parse(require("fs").readFileSync(process.argv.splice(2)[0]));
var output = SKstringify(sortKeys(complexContent), complexContent, 2);
console.log(output);
console.log("// debug: complexContent " + (arrayEquals(complexContent, JSON.parse(output)) ? "==" : "!=") + " output");