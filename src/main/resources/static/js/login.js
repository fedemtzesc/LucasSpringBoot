// Esta funcion hace que se ejecute todo el codigo js una vez que se haya cargado la pagina
$(document).ready(function() {
    //on ready
});

//Esta funcion sirve para recuperar datos JSON de un servicio REST
async function iniciarSesion(){
    let datos = {};
    
    datos.email=document.getElementById('txtEmail').value;
    datos.password=document.getElementById('txtPassword').value;

    //alert('Funcion para cargar usuarios ejecutandose!');
    const rawResponse = await fetch('api/login', {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    });
    const respuesta = await rawResponse.text();
    //alert(respuesta);
    if(respuesta!='FAIL'){
        localStorage.token = respuesta;
        localStorage.email = datos.email;
        alert('Usuario firmado con exito: ');
        window.location.href = 'index.html';
    }else{
        alert('Credenciales Incorrectas. Vuelva a intentarlo o cumuniquese a su administrador.');
    }


}
