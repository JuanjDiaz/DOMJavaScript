function validarDatos(){
    let nombre=document.getElementById("inputNombre").value;
    let correo=document.getElementById("inputCorreo").value;
    let clave=document.getElementById("inputContraseña").value;

    limpiarErrores();

    let nombreValido=validarNombre(nombre);
    let correoValido=validarCorreo(correo);
    let claveValida=validarClave(clave);

    if (nombreValido && correoValido && claveValida){
        console.log("Formulario válido:");
        console.log(`Nombre: ${nombre}`);
        console.log(`Correo: ${correo}`);
        console.log(`Contraseña: ${clave}`);

        alert("El registro fue exitoso. Sus datos pueden ser visualizados en consola.")

        limpiarCampos();
    }
}
function limpiarErrores(){
    document.querySelectorAll(".mensajeError").forEach(error=>error.remove())
}

function limpiarCampos() {
    document.getElementById("inputNombre").value = "";
    document.getElementById("inputCorreo").value = "";
    document.getElementById("inputContraseña").value = "";
}

function validarNombre(nombre){
    if (nombre.trim() === ""){
        mostrarError("divNombre","El campo nombre no puede estar vacío.");
        return false;
    }
    return true;
}

function validarCorreo(correo){
    if (correo.trim() === ""){
        mostrarError("divCorreo","El campo correo no puede estar vacío.");
        return false;
    }else if (!/\S+@\S+\.\S+/.test(correo)){
        mostrarError("divCorreo","El correo ingresado no es válido.");
        return false;
    }
    return true;
}

function validarClave(clave){
    if (clave.trim() === ""){
        mostrarError("divContraseña","El campo contraseña no puede estar vacío.")
        return false;
    }else if (clave.length <6){
        mostrarError("divContraseña","La contraseña debe tener al menos 6 caracteres.")
        return false;
    }
    return true;
}

function mostrarError(idDiv,mensaje){
    const contenedor=document.getElementById(idDiv);
    const mensajeError=document.createElement("p");
    mensajeError.classList.add("mensajeError");
    mensajeError.textContent=mensaje;
    contenedor.appendChild(mensajeError);
}

