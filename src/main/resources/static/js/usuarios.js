// Esta funcion hace que se ejecute todo el codigo js una vez que se haya cargado la pagina
$(document).ready(function() {
    cargarUsuarios();
    $('#usuarios').DataTable();
});

//Esta funcion sirve para recuperar datos JSON de un servicio REST
async function cargarUsuarios(){
      //alert('Funcion para cargar usuarios ejecutandose!');
      const rawResponse = await fetch('api/usuarios', {
        method: 'GET',
        headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                      'Authorization' : localStorage.token
                    }
        //body: JSON.stringify({a: 1, b: 'Textual content'})
      });
      const usuarios = await rawResponse.json();
      console.log(usuarios);

      let usrsHTML = '';
      for(let usuario of usuarios) {
        let btnEliminar = '<a onclick="eliminarUsuario('+usuario.id+')" href="#" class="btn btn-danger btn-circle btn-sm">';
        usrsHTML += '<tr>';
        usrsHTML += '<td>' + usuario.id + '</td>';
        usrsHTML += '<td>' + usuario.nombre + ' ' + usuario.apellido + '</td>';
        usrsHTML += '<td>' + usuario.email + '</td>';
        usrsHTML += '<td>' + usuario.telefono + '</td>';
        usrsHTML += '<td>';
        usrsHTML += btnEliminar;
        usrsHTML += '<i class="fas fa-trash"></i>';
        usrsHTML += '</a>';
        usrsHTML += '</td>';
        usrsHTML += '</tr>';
        usrsHTML += '\n';
      }
      document.querySelector('#usuarios tbody').outerHTML = usrsHTML;
}

    async function eliminarUsuario(id){
    if(!confirm('Esta seguro que desea eliminar el usuario con ID: ' + id + '?')){
        alert('Operacion Cancelada.');
        return;
    }

    const rawResponse = await fetch('api/usuario/' + id, {
            method: 'DELETE',
            headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                      'Authorization' : localStorage.token
                    }
            //body: JSON.stringify({a: 1, b: 'Textual content'})
          });

    alert('ID:' + id + ' ha sido Eliminada!');

    location.reload();
}