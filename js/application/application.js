$(document).ready(function(){

	$('#btn_calc').click(function() {
	    var how_phase = Number($('#numrows').val());
		var N = Number($('#zaiv_number').val());
		var n_a_p = Number($('#number_after_poinnt').val());
        var res_time = $('#what_time').val();

        var mas_of_time = [];
        for(let i = 1; i < (how_phase+1); i++){
            mas_of_time.push(document.getElementById("row"+i).value)
        }

        var X = [1];
        var G = [1];
        var g_arr = [1];
        for(let i = 1; i < (how_phase); i++){
            X.push(mas_of_time[i]/mas_of_time[0]);
            g_arr.push(1);
        }

        for (let i = 0; i < N; i++){
            var g = 1;
            for (let j = 1; j < how_phase; j++){
                g += X[j]*g_arr[j];
                g_arr[j] = g;
            }
            G.push(g);
        }

        var p = [];
        var p1 = G[N-1]/G[N];
        p.push(p1);
        for (let i = 1; i < how_phase; i++){
            p.push(p1*X[i]);
        }

        var Tc = N*mas_of_time[0]/p[0];
        var lambda = N/Tc;

        var L = [];
        var Q = [];
        var T = [];
        var W = [];
        for (let i = 0; i < how_phase; i++){
            L.push(sum_for_L_bas(X[i], N, G));
            Q.push(L[i]-p[i]);
            T.push(L[i]/lambda);
            W.push(T[i]-mas_of_time[i]);
        }
        console.log(p);
        console.log(mas_of_time);
        console.log(G);
        console.log(p);
        console.log(L);
        console.log(Q);
        console.log(lambda);
        console.log(T);
        console.log(W);
        console.log(Tc);

        var result = document.getElementById("result_table");
        clear_place(result);
        answer(result,p,L,Q,Tc,T,W,how_phase,n_a_p,res_time);
	});
});

function sum_for_L_bas(X, N, G) {
    var L = 0;
    for (let i = 1; i < (N+1); i++){
        L += (Math.pow(X,i))*G[N-i];
    }
    return L/G[N];
}

function answer(result_table,p,L,Q,Tc,T,W,n,n_a_p, time) {
    var table_head = document.createElement("thead");
    var name = document.createElement("tr");
    var colum = document.createElement("th");
    colum.setAttribute("scope", "col");
    colum.appendChild(document.createTextNode("Параметр"));
    name.appendChild(colum);
    for (let j = 1; j < n+1; j++){
        colum = document.createElement("th");
        colum.setAttribute("scope", "col");
        colum.appendChild(document.createTextNode("Фаза " + j));
        name.appendChild(colum);
    }
    table_head.appendChild(name);
    result_table.appendChild(table_head);

    var table_body = document.createElement("tbody");

    //добавляем строку Загрузка ОА
    row = document.createElement("tr");
    row_name = document.createElement("th");
    row_name.setAttribute("scope", "row");
    row_name.appendChild(document.createTextNode("Загрузка ОА"));
    row.appendChild(row_name);
    for (let j = 0; j < n; j++){
        colum = document.createElement("td");
        colum.appendChild(document.createTextNode(p[j].toFixed(n_a_p)));
        row.appendChild(colum);
    }
    table_body.appendChild(row);

    //добавляем строку Кол-во заявок в СМО
    row = document.createElement("tr");
    row_name = document.createElement("th");
    row_name.setAttribute("scope", "row");
    row_name.appendChild(document.createTextNode("Кол-во заявок в СМО"));
    row.appendChild(row_name);
    for (let j = 0; j < n; j++){
        colum = document.createElement("td");
        colum.appendChild(document.createTextNode(L[j].toFixed(n_a_p)));
        row.appendChild(colum);
    }
    table_body.appendChild(row);

    //добавляем строку Кол-во заявок в очереди каждой СМО
    row = document.createElement("tr");
    row_name = document.createElement("th");
    row_name.setAttribute("scope", "row");
    row_name.appendChild(document.createTextNode("Кол-во заявок в очереди каждой СМО"));
    row.appendChild(row_name);
    for (let j = 0; j < n; j++){
        colum = document.createElement("td");
        colum.appendChild(document.createTextNode(Q[j].toFixed(n_a_p)));
        row.appendChild(colum);
    }
    table_body.appendChild(row);

    //добавляем строку Время цикла
    row = document.createElement("tr");
    row_name = document.createElement("th");
    row_name.setAttribute("scope", "row");
    row_name.appendChild(document.createTextNode("Среднее время цикла"));
    row.appendChild(row_name);
    colum = document.createElement("td");
    colum.setAttribute("colspan", n);
    colum.appendChild(document.createTextNode(Tc.toFixed(n_a_p)+time));
    row.appendChild(colum);
    table_body.appendChild(row);

    //добавляем строку Среднее время пребывания в каждой СМО
    row = document.createElement("tr");
    row_name = document.createElement("th");
    row_name.setAttribute("scope", "row");
    row_name.appendChild(document.createTextNode("Среднее время пребывания в каждой СМО"));
    row.appendChild(row_name);
    for (let j = 0; j < n; j++){
        colum = document.createElement("td");
        colum.appendChild(document.createTextNode(T[j].toFixed(n_a_p)+time));
        row.appendChild(colum);
    }
    table_body.appendChild(row);

    //добавляем строку Время ожидания в очереди
    row = document.createElement("tr");
    row_name = document.createElement("th");
    row_name.setAttribute("scope", "row");
    row_name.appendChild(document.createTextNode("Среднее время ожидания в очереди каждой СМО"));
    row.appendChild(row_name);
    for (let j = 0; j < n; j++){
        colum = document.createElement("td");
        colum.appendChild(document.createTextNode(W[j].toFixed(n_a_p)+time));
        row.appendChild(colum);
    }
    table_body.appendChild(row);

    result_table.appendChild(table_body);
}

function clear_place (tablebody) {
    var rows = tablebody.getElementsByTagName("thead");
    while (rows.length)
        rows[0].parentNode.removeChild(rows[0]);
    rows = tablebody.getElementsByTagName("tbody");
    while (rows.length)
        rows[0].parentNode.removeChild(rows[0]);
}