const MODELO_BASE = {
  idGenero: 0,
  descripcion: "",
  esActivo: 1,
};
let tablaData;
$(document).ready(function () {
  tablaData = $("#tbdata").DataTable({
    responsive: true,
    ajax: {
      url: "/Genero/Lista",
      type: "GET",
      datatype: "json",
    },
    columns: [
      { data: "idGenero", visible: false, searchable: false },
      { data: "descripcion" },
      {
        data: "esActivo",
        render: function (data) {
          if (data == 1) return '<span class="badge badge-info">Activo</span>';
          else return '<span class="badge badge-warning">Inactivo</span>';
        },
      },
      {
        defaultContent:
          '<button class="btn btn-primary btn-editar btn-sm mr-2"><i class="fas fa-pencil-alt"></i></button>' +
          '<button class="btn btn-warning btn-eliminar btn-sm"><i class="fas fa-trash-alt"></i></button>',
        orderable: false,
        searchable: false,
        width: "80px",
      },
    ],
    order: [[0, "desc"]],
    dom: "Bfrtip",
    buttons: [
      {
        text: "Exportar Excel",
        extend: "excelHtml5",
        title: "",
        filename: "Reporte Generos",
        exportOptions: {
          columns: [1, 2],
        },
      },
      "pageLength",
    ],
    language: {
      url: "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json",
    },
  });
});
function mostrarModal(modelo = MODELO_BASE) {
  $("#txtId").val(modelo.idGenero);
  $("#txtDescripcion").val(modelo.descripcion);
  $("#cboEstado").val(modelo.esActivo);
  $("#modalData").modal("show");
}
$("#btnNuevo").click(function () {
  mostrarModal();
});
$("#btnGuardar").click(function () {
  if ($("#txtDescripcion").val().trim() == "") {
    toastr.warning("", 'Debe completar el campo "Descripción"');
    $("#txtDescripcion").focus();
    return;
  }
  const modelo = structuredClone(MODELO_BASE);
  modelo["idGenero"] = parseInt($("#txtId").val());
  modelo["descripcion"] = $("#txtDescripcion").val();
  modelo["esActivo"] = $("#cboEstado").val();

  $("#modalData").find("div.modal-content").LoadingOverlay("show");

  if (modelo.idGenero == 0) {
    fetch("/Genero/Crear", {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify(modelo),
    })
      .then((response) => {
        $("#modalData").find("div.modal-content").LoadingOverlay("hide");
        return response.ok ? response.json() : Promise.reject(response);
      })
      .then((responseJson) => {
        if (responseJson.estado) {
          tablaData.row.add(responseJson.objeto).draw(false);
          $("#modalData").modal("hide");
          swal("Listo!", "Genero creado", "success");
        } else {
          swal("Error!", responseJson.mensaje, "error");
        }
      });
  } else {
    fetch("/Genero/Editar", {
      method: "PUT",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify(modelo),
    })
      .then((response) => {
        $("#modalData").find("div.modal-content").LoadingOverlay("hide");
        return response.ok ? response.json() : Promise.reject(response);
      })
      .then((responseJson) => {
        if (responseJson.estado) {
          tablaData.row(filaSeleccionada).data(responseJson.objeto).draw(false);
          filaSeleccionada = null;
          $("#modalData").modal("hide");
          swal("Listo!", "El Genero ha sido modificado", "success");
        } else {
          swal("error!", responseJson.mensaje, "error");
        }
      });
  }
});
let filaSeleccionada;
$("#tbdata tbody").on("click", ".btn-editar", function () {
  if ($(this).closest("tr").hasClass("child")) {
    filaSeleccionada = $(this).closest("tr").prev();
  } else {
    filaSeleccionada = $(this).closest("tr");
  }
  const data = tablaData.row(filaSeleccionada).data();
  mostrarModal(data);
});
$("#tbdata tbody").on("click", ".btn-eliminar", function () {
  let fila;
  if ($(this).closest("tr").hasClass("child")) {
    fila = $(this).closest("tr").prev();
  } else {
    fila = $(this).closest("tr");
  }
  const data = tablaData.row(fila).data();
  swal(
    {
      title: "Esta seguro?",
      text: `Eliminar Genero "${data.descripcion}"`,
      type: "warning",
      showCancelButton: true,
      confirmButtonClass: "btn-warning",
      confirmButtonText: "Si, eliminar!",
      cancelButtonText: "No, cancelar!",
      closeOnConfirm: false,
      colseOnCancel: true,
    },
    function (respuesta) {
      if (respuesta) {
        $(".showSweetAlert").LoadingOverlay("show");
        fetch(`/Genero/Eliminar?idGenero=${data.idGenero}`, {
          method: "DELETE",
        })
          .then((response) => {
            $(".showSweetAlert").LoadingOverlay("hide");
            return response.ok ? response.json() : Promise.reject(response);
          })
          .then((responseJson) => {
            if (responseJson.estado) {
              tablaData.row(fila).remove().draw(false);
              swal("Listo!", "El genero fue eliminada", "success");
            } else {
              swal("error!", responseJson.mensaje, "error");
            }
          });
      }
    }
  );
});
