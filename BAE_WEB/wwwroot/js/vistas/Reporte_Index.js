let tablaData;
$(document).ready(function () {
  $.datepicker.setDefaults($.datepicker.regional["es"]);

  $("#txtFechaInicio").datepicker({ dateFormat: "dd/mm/yy" }),
    $("#txtFechaFin").datepicker({ dateFormat: "dd/mm/yy" });

  tablaData = $("#tbdata").DataTable({
    responsive: true,
    ajax: {
      url: "/Reporte/ReporteVenta?fechaInicio=01/01/1991&fechaFin=01/01/1991",
      type: "GET",
      datatype: "json",
    },
    columns: [
      { data: "fechaReigstro" },
      { data: "numeroVenta" },
      { data: "tipoDocumento" },
      { data: "tipoDocumentoCliente" },
      { data: "nombreCliente" },
      { data: "subtotalVenta" },
      { data: "impuestoTotalVenta" },
      { data: "totalVenta" },
      { data: "libro" },
      { data: "cantidad" },
      { data: "precio" },
      { data: "total" },
    ],
    order: [[0, "desc"]],
    dom: "Bfrtip",
    buttons: [
      {
        text: "Exportar Excel",
        extend: "excelHtml5",
        title: "",
        filename: "Reporte Ventas",
      },
      "pageLength",
    ],
    language: {
      url: "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json",
    },
  });
});

$("#btnBuscar").click(function () {
  if (
    $("#txtFechaInicio").val().trim() == "" ||
    $("#txtFechaFin").val().trim() == ""
  ) {
    toastr.warning("Debe ingresar un rango de fechas");
    return;
  }
  let fechaInicio = $("#txtFechaInicio").val().trim();
  let fechaFin = $("#txtFechaFin").val().trim();
  let nueva_Url = `/Reporte/ReporteVenta?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`;
  tablaData.ajax.url(nueva_Url).load();
});
