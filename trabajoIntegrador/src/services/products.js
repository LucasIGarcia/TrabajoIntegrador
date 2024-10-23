//------ PRODUCTOS ------  
import Swal from "sweetalert2";
import {productoActivo } from "../../main";
import { handleGetProductLocalStorage, setInLocalStorage } from "../persistence/localstorage";
import { closeModal } from "../views/modal";
import { handleGetProductsToStore, handleRenderList } from "../views/store";

//Guardar o modificar elementos
const aceptButton = document.getElementById('aceptButton');
aceptButton.addEventListener('click', ()=>{
    handleSaveOrModifyElements();
})
//Funcion de guardado
const handleSaveOrModifyElements = ()=>{
    const nombre = document.getElementById("nombre").value,
    imagen = document.getElementById("img").value,
    precio = document.getElementById("precio").value,
    categories = document.getElementById("categoria").value;
    let object = null;

    if(productoActivo){
        object = {
            ...productoActivo,
            nombre,
            imagen,
            precio,
            categories,
        };
    }else{
        object = {
            id : new Date().toISOString(),
            nombre,
            imagen,
            precio,
            categories,
        };
    }
    Swal.fire({
        title: "Correcto!",
        text: "Producto guardado.",
        icon: "success"
      });

    setInLocalStorage(object);
    handleGetProductsToStore();
    //Al apretar aceptar se nos cierra el popUp
    closeModal();
}

//Eliminar elementos
export const handleDeleteProduct = ()=>{
//INSERTO ALERTA
    Swal.fire({
        title: "¿Desea eliminar este elemento?",
        text: "No se puede revertir la acción",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Eliminar"
      }).then((result) => {
        if (result.isConfirmed) {
            const products = handleGetProductLocalStorage(); //CORREGIR
            const result = products.filter((el)=>el.id !== productoActivo.id);
            localStorage.setItem("products", JSON.stringify(result));
            const newProducts = handleGetProductLocalStorage();
            handleRenderList(newProducts);
            closeModal();
        }else{
            closeModal();
        }
      });

}