const Vista_Busqueda = {
  busquedaFecha: () => {
    $("#txtFechaInicio").val("");
    $("#txtFechaFin").val("");
    $("#txtNumeroVenta").val("");

    $(".busqueda-fecha").show();
    $(".busqueda-venta").hide();
  },
  busquedaVenta: () => {
    $("#txtFechaInicio").val("");
    $("#txtFechaFin").val("");
    $("#txtNumeroVenta").val("");

    $(".busqueda-fecha").hide();
    $(".busqueda-venta").show();
  },
};
$(document).ready(function () {
  Vista_Busqueda["busquedaFecha"]();
  $.datepicker.setDefaults($.datepicker.regional["es"]);

  $("#txtFechaInicio").datepicker({ dateFormat: "dd/mm/yy" }),
    $("#txtFechaFin").datepicker({ dateFormat: "dd/mm/yy" });
});

$("#cboBuscarPor").change(function () {
  if ($("#cboBuscarPor").val() == "fecha") Vista_Busqueda["busquedaFecha"]();
  else Vista_Busqueda["busquedaVenta"]();
});

$("#btnBuscar").click(function () {
  if ($("#cboBuscarPor").val() == "fecha") {
    if (
      $("#txtFechaInicio").val().trim() == "" ||
      $("#txtFechaFin").val().trim() == ""
    ) {
      toastr.warning("Debe ingresar un rango de fechas");
      return;
    }
  } else {
    if ($("#txtNumeroVenta").val().trim() == "") {
      toastr.warning("Debe ingresar un numero de venta");
      return;
    }
  }
  let numeroVenta = $("#txtNumeroVenta").val();
  let fechaInicio = $("#txtFechaInicio").val();
  let fechaFin = $("#txtFechaFin").val();

  $(".card-body").find("div.row").LoadingOverlay("show");
  fetch(
    `/Venta/Historial?numeroVenta=${numeroVenta}&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`
  )
    .then((response) => {
      $(".card-body").find("div.row").LoadingOverlay("hide");
      return response.ok ? response.json() : Promise.reject(response);
    })
    .then((responseJson) => {
      $("#tbventa tbody").html("");
      if (responseJson.length > 0) {
        responseJson.forEach((item) => {
          $("#tbventa tbody").append(
            $("<tr>").append(
              $("<td>").text(item.fechaRegistro),
              $("<td>").text(item.numeroVenta),
              $("<td>").text(item.tipoDocumentoVenta),
              $("<td>").text(item.documentoCliente),
              $("<td>").text(item.nombreCliente),
              $("<td>").text(item.total),
              $("<td>").append(
                $("<button>")
                  .addClass("btn btn-info btn-sm")
                  .append($("<i>").addClass("fas fa-eye"))
                  .data("venta", item)
              )
            )
          );
        });
      }
    });
});

$("#tbventa tbody").on("click", ".btn-info", function () {
  let d = $(this).data("venta");
  $("#txtFechaRegistro").val(d.fechaRegistro);
  $("#txtNumVenta").val(d.numeroVenta);
  $("#txtUsuarioRegistro").val(d.usuario);
  $("#txtTipoDocumento").val(d.tipoDocumentoVenta);
  $("#txtDocumentoCliente").val(d.documentoCliente);
  $("#txtNombreCliente").val(d.nombreCliente);
  $("#txtSubTotal").val(d.subTotal);
  $("#txtIGV").val(d.impuestoTotal);
  $("#txtTotal").val(d.total);

  $("#tbProductos tbody").html("");
  d.detalleVenta.forEach((item) => {
    $("#tbProductos tbody").append(
      $("<tr>").append(
        $("<td>").text(item.tituloLibro),
        $("<td>").text(item.cantidad),
        $("<td>").text(item.precio),
        $("<td>").text(item.total)
      )
    );
  });
  $("#linkImprimir").attr(
    "href",
    `/Venta/MostrarPdfVenta?numeroVenta=${d.numeroVenta}`
  );
  $("#modalData").modal("show");
});
