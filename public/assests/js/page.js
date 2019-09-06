let jbtnTransaccion;

let jddlTipoTransaccion;
let jtxbMonto;


let tmplista = null;
let jtbody;

jQuery(document).ready(function() {
    CargaInicial();


    jbtnTransaccion.click(function() {

        var dto = {
            monto: Number(jtxbMonto.val()),
            tipotransaccion: Number(jddlTipoTransaccion.val())
        };
        sendDataAjax("guardar", dto, function(data, status) {
            console.log(data);
            imprimir(data.result);
        });
    });

});



function CargaInicial() {
    jbtnTransaccion = $("#btnTransaccion");
    tmplista = $.templates("#tmplista");
    jtbody = $("#tbody");

    jddlTipoTransaccion = $("#ddlTipoTransaccion");
    jtxbMonto = $("#txbMonto");
}

function imprimir(data) {
    jtbody.append(" <tr> <th scope='row'>" + data.fecha + "</th>  <td>" + (data.tipotransaccion == 1 ? "Ingreso" : "Salida") + "</td>   <td>" + (data.tipotransaccion == 1 ? "" + data.monto : "-" + data.monto) + "</td> <td>" + data.saldo + "</td>  </tr>");
    /*for (var j = 0; j < data.length; j++) {

        jtbody.append(" <tr> <th scope='row'>" + data[j].fecha + "</th>  <td>" + data[j].tipotransaccion + "</td>   <td>" + data[j].monto + "</td> <td>" + data[j].saldo + "</td>  </tr>");
    }*/

}

function sendDataAjax(NombreAjax, dto, callbackExito) {
    var dd = JSON.stringify(dto);

    $.ajax({
        url: "/" + NombreAjax,
        data: JSON.stringify(dto),
        dataType: "json",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function(data, status) {
            if (callbackExito) {
                if (data.hasOwnProperty("d")) {
                    callbackExito(data.d, status, this);
                } else {
                    callbackExito(data, status, this);
                }
            }
        },
        //error: function (result) {
        //    alert("ERROR " + result.status + ' ' + result.statusText);
        //}
        error: function(jqXHR, exception) {
            if (jqXHR.status === 0) {
                // alert('Not connect.\n Verify Network.');
                console.log('Not connect.\n Verify Network.')
            } else if (jqXHR.status == 404) {
                // alert('Requested page not found. [404]');
                console.log('Requested page not found. [404]');
            } else if (jqXHR.status == 500) {
                // alert('Internal Server Error :) [500].');
                console.log('Internal Server Error :) [500].');
            } else if (exception === 'parsererror') {
                //  alert('Requested JSON parse failed.');
                console.log('Internal Server Error :) [500].');
            } else if (exception === 'timeout') {
                // alert('Time out error.');
            } else if (exception === 'abort') {
                //  alert('Ajax request aborted.');
                console.log('Internal Server Error :) [500].');
            } else {
                console.log('Uncaught Error.\n' + jqXHR.responseText);
            }
        }
    });
};