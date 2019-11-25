function removerows (tablebody) {
    var rows = tablebody.getElementsByTagName("div");
    while (rows.length)
        rows[0].parentNode.removeChild(rows[0]);
}

function addrows (tablebody, n) {
    for (var i=1; i<(n+1); i++) {
        var row = document.createElement("div");
        var titlecell = document.createElement("lable");
        titlecell.appendChild(document.createTextNode("Фаза " + i));
        row.appendChild(titlecell);

        var input = document.createElement("input");
        input.setAttribute("id", "row"+i);
        input.setAttribute("type", "number");
        input.setAttribute("class", "form-control");
        input.setAttribute("min", "0");
        row.appendChild(input);
        tablebody.appendChild(row);
    }
}

function change () {
    var select = document.getElementById("numrows");
    var n = parseInt(select.value);
    var tablebody = document.getElementById("maintablebody");
    removerows(tablebody);
    addrows(tablebody, n);
}