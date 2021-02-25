function convert(n){
    var input_text = document.querySelector('textarea.input-text').value
    var output_text = document.querySelector('textarea#output-text')
    switch (n){ 
        case 1: // JSON to CSV
            
            index = [input_text.split(':')[0].replace(/[{}\[\]]/g, ''), (input_text.split(',')[1]).split(':')[0]]
            var array = typeof input_text != 'object' ? JSON.parse(input_text) : input_text
            
            var str = `${index[0]},${index[1]}\r\n`
            // var str = '';
            var line = '';
            for (var i = 0; i < array.length; i++) {
                var line = '';
                for (var index in array[i]) {
                    var value = array[i][index] + "";
                    line += `"${value}",`
                }
                line = line.slice(0, -1);
                str += line + '\r\n';
            }
            output_text.innerHTML = str
            break
        case 2: // CSV to JSON

            index = [input_text.split(',')[0], (input_text.split(',')[1]).split('\n')[0]]
            // for (var i= 0; i<(input_text.match(/,/g) || []).length; i++){
            //     // str = `[]`
            //     window.alert(i)
            // }

            var strDelimiter = (strDelimiter || ",");
            
            // var objPattern = new RegExp((// Delimiters.
            //     "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
            //     // Quoted fields.
            //     "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
            //     // Standard fields.
            //     "([^\"\\" + strDelimiter + "\\r\\n]*))"), "gi");

            // var objPattern = new RegExp((// Delimiters.

            //     `/\w+/${strDelimiter}/\w+/${strDelimiter}`), 'gi')

            var objPattern = new RegExp((
            // Delimiters.
            "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
            // Quoted fields.
            "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
            // Standard fields.
            "([^\"\\" + strDelimiter + "\\r\\n]*))"), "gi");
                
            var arrData = [[]];
                
            var arrMatches = null;

            while (arrMatches = objPattern.exec(input_text)) {
                // Get the delimiter that was found.
                var strMatchedDelimiter = arrMatches[1];
                // Check to see if the given delimiter has a length
                // (is not the start of string) and if it matches
                // field delimiter. If id does not, then we know
                // that this delimiter is a row delimiter.
                if (strMatchedDelimiter.length && (strMatchedDelimiter != strDelimiter)) {
                    // Since we have reached a new row of data,
                    // add an empty row to our data array.
                    arrData.push([]);
                }
                // Now that we have our delimiter out of the way,
                // let's check to see which kind of value we
                // captured (quoted or unquoted).
                if (arrMatches[2]) {
                    // We found a quoted value. When we capture
                    // this value, unescape any double quotes.
                    var strMatchedValue = arrMatches[2].replace(
                    new RegExp("\"\"", "g"), "\"");
                } else {
                    // We found a non-quoted value.
                    var strMatchedValue = arrMatches[3];
                }
                // Now that we have our value string, let's add
                // it to the data array.
                arrData[arrData.length - 1].push(strMatchedValue);
            }
            // Return the parsed data.
            // window.alert(arrData)
            array = arrData
            var objArray = [];
            for (var i = 1; i < array.length; i++) {
                objArray[i - 1] = {};
                for (var k = 0; k < array[0].length && k < array[i].length; k++) {
                    var key = array[0][k];
                    objArray[i - 1][key] = array[i][k]
                }
            }

            var json = JSON.stringify(objArray);
            var str = json.replace(/},/g, "},\r\n");

            output_text.innerHTML = str

            break
    }
}

function importFile(){
    window.open("file:///")
}