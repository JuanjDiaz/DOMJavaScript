document.getElementById("btnBuscar").addEventListener("click", buscarCoincidencia);
document.getElementById("btnReestablecer").addEventListener("click", reestablecerBusqueda);

function buscarCoincidencia() {
    const terminoBusqueda = obtenerTerminoBusqueda();
    const filas = obtenerFilasTabla();
    const totalCoincidencias = procesarFilas(filas, terminoBusqueda);
    actualizarResultados(totalCoincidencias);
}

function obtenerTerminoBusqueda() {
    return document.getElementById("inputBusqueda").value.toLowerCase().trim();
}

function obtenerFilasTabla() {
    return document.querySelectorAll("#tablaDiccionario tbody tr");
}

function procesarFilas(filas, terminoBusqueda) {
    let contador = 0;
    filas.forEach(fila => {
        const palabra = fila.children[0];
        const definicion = fila.children[1];
        const coincidenciasPalabra = resaltarCoincidencias(palabra, terminoBusqueda);
        const coincidenciasDefinicion = resaltarCoincidencias(definicion, terminoBusqueda);
        if (coincidenciasPalabra || coincidenciasDefinicion) {
            fila.style.display = "";
            contador++;
        } else {
            fila.style.display = "none";
        }
    });
    return contador;
}

function resaltarCoincidencias(celda, terminoBusqueda) {
    const textoOriginal = celda.textContent.toLowerCase();
    if (textoOriginal.includes(terminoBusqueda) && terminoBusqueda !== "") {
        const regex = new RegExp(`(${terminoBusqueda})`, "gi");
        celda.innerHTML = celda.textContent.replace(regex, "<span class='resaltado'>$1</span>");
        return true;
    } else {
        celda.innerHTML = celda.textContent;
        return false;
    }
}

function actualizarResultados(totalCoincidencias) {
    const mensaje = totalCoincidencias > 0 
        ? `Se encontraron ${totalCoincidencias} coincidencia${totalCoincidencias > 1 ? "s" : ""}.`
        : "No se encontraron coincidencias.";
    document.getElementById("contador").textContent = mensaje;
}

function reestablecerBusqueda() {
    const filas = obtenerFilasTabla();
    filas.forEach(fila => {
        fila.style.display = "";
        const celdas = fila.querySelectorAll("td");
        celdas.forEach(celda => {
            celda.innerHTML = celda.textContent;
        });
    });
    document.getElementById("contador").textContent = "Se encontraron 0 coincidencias.";
    document.getElementById("inputBusqueda").value = "";
}
