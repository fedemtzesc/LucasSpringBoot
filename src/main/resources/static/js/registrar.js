// Esta funcion hace que se ejecute todo el codigo js una vez que se haya cargado la pagina
$(document).ready(function() {
    //on ready
});

//Esta funcion sirve para recuperar datos JSON de un servicio REST
async function registrarUsr(){
    let datos = {};
    datos.nombre=document.getElementById('txtNombre').value;
    datos.apellido=document.getElementById('txtApellido').value;
    datos.email=document.getElementById('txtEmail').value;
    datos.telefono=document.getElementById('txtTelefono').value;
    datos.password=document.getElementById('txtPassword').value;
    let repetirPassword = document.getElementById('txtRepetirPassword').value;

    if(datos.password==''){
        alert('Tiene que capturar el password y su confirmacion!');
        return;
    }

    if(repetirPassword!=datos.password){
        alert('La confirmacion del password no es correcta!');
        return;
    }

    //alert('Funcion para cargar usuarios ejecutandose!');
    const rawResponse = await fetch('api/usuarios', {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    });
    //const usuarios = await rawResponse.json();
    alert('Usuario registrado con exito!');
    window.location='login.html';
}
