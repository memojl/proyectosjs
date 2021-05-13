// Your web app's Firebase configuration
var firebaseConfig = {
    //***ATENCIÓN***//
    //AQUÍ VA EL SDK QUE TE GENERE TÚ FIREBASE//
	  apiKey: "AIzaSyDj81oaNKnG79MlpRY83MOK0QksHyqx7qc",
    authDomain: "crud-ce022.firebaseapp.com",
    databaseURL: "https://crud-ce022.firebaseio.com",
    projectId: "crud-ce022",
    storageBucket: "crud-ce022.appspot.com",
    messagingSenderId: "419867682880",
    appId: "1:419867682880:web:408d053b7d2425ec6017a5"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  window.onload=iniciar;
  const db = firebase.database();
  var form1 = document.getElementById("form1");
  var refTable1 = db.ref().child('productos');
  var edit = false;

  function iniciar(){
    listar();
  }

  //Mostrar(Listar)
  function listar(){
    const iconoEditar = '<svg class="bi bi-pencil-square" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/><path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/></svg>';
    const iconoBorrar = '<svg class="bi bi-trash" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg>';
    var reg = {};    
    refTable1.on('value',function(datos){
        var template = '';
        reg=datos.val();
        // Recorremos los productos y los mostramos
        $.each(reg, function(indice,valor){
          template += `<tr productoId="${indice}">
          <td>${indice}</td>
          <td>${valor.codigo}</td>
          <td>${valor.descripcion}</td>
          <td>${valor.cantidad}</td>
          <td><button class="btnEditar btn btn-secondary" data-toggle="modal" data-target="#exampleModal" title="Editar">${iconoEditar}</button><button class="btnBorrar btn btn-danger" data-toggle="tooltip" title="Borrar" >${iconoBorrar}</button></td>
          </tr>`                
        });
        $('#lista-producto').html(template);
    });
  }

  //Guardar(Enviar)/Editar
  $('#form1').submit(function(e){
    e.preventDefault();
    var Id=$('#Id').val();
    var action='';

    const postData = {
      codigo: $('#codigo').val(), 
      descripcion: $('#descripcion').val(), 
      cantidad: $('#cantidad').val()    
    };
    //console.log(postData);
    if(edit==false){action='Guardado';
      refTable1.push(postData); // Guardamos los datos en referencia
    }else{action='Actualizado';
      refTable1.child(Id).update(postData); // Actualizamos los datos en referencia
    }
    console.log('Se ha '+action+' el registro');
    $("#form1").trigger('reset');
    $('#exampleModal').modal('hide');
    edit = false;
  });

  $('.btn-add').click(function(){
    $("#form1").trigger('reset');    
  });

  //Form_Editar
  $('#lista-producto').on('click','.btnEditar',function(){	
    const productoId = $(this).closest('tr').attr('productoId');    
    console.log(productoId);
    refTable1.child(productoId).once('value',function(datos){
    //refTable1.ref(productoId).on('child_added',function(datos){
        valor=datos.val();console.log(valor);
    });
    edit = true;
  });

//Borrar/
function borrar(id){
  //$("#botonActualizar").click(function(){
  if (confirm("¿Está seguro/a de que quiere borrar este artículo "+id+"?") == true){
    refTable1.child(id).remove();
  }
}

$('#lista-producto').on('click', '.btnBorrar', function(){
  Swal.fire({
    title: '¿Está seguro de eliminar el producto?',
    text: "¡Está operación no se puede revertir!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Borrar'
  }).then((result) => {
    if (result.value) {
        let productoId = $(this).closest('tr').attr('productoId');
        //let id = $(this).closest('tr').attr('id'); //capturamos el atributo ID de la fila  
        refTable1.child(productoId).remove(); //eliminamos el producto de firebase      
        Swal.fire('¡Eliminado!', 'El producto ha sido eliminado.','success')
    }
  })        
});

function alError(error){
  if (error){
    alert('Ha habido problemas al realizar la operación: '+error.code);
  }else{
    alert('Operación realizada con éxito !');
  }
}