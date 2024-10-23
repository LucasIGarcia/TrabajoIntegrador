/* ------ STORE ------ */

import { setProductoActivo } from "../../main";
import { handleGetProductLocalStorage } from "../persistence/localstorage";
import { openModal } from "./modal";

//Funcion que me trae los elementos y llama al render
export const handleGetProductsToStore = () =>{
    const products =  handleGetProductLocalStorage()
    if (products) {
        handleRenderList(products);
    }
};

//Funcion que se encarga que filtrar y de renderizar la seccion con sus elementos
export const handleRenderList = (productsIn)=>{
    //Filtrado de Arrays por categoria
    const burgers = productsIn.filter((el)=> el.categories === "Hamburguesas");
    const papas = productsIn.filter((el)=> el.categories === "Papas");
    const gaseosas = productsIn.filter((el)=> el.categories === "Gaseosas");

//Funcion que renderiza los elementos de la seccion
    const renderProductGroup = (productos, titulo) =>{
        if(productos.length>0){
            const productosHTML = productos.map((producto, index)=>{
                return `
                <div 
                class="containerTargetItem"
                id="product-${producto.categories}-${index}">
                <div>
                <img src='${producto.imagen}'/>
                <div>
                <h2>${producto.nombre}</h2>
                </div>
                <div class='targetProps'>
                <p><b>Precio:</b> $ ${producto.precio}</p>
                </div>
                </div>
                </div> `;
            });
//                          Retorna la seccion con todos los elementos dentro 
            return `
                <section class='sectionStore'>
                <div class='containerTitleSection'>
                <h3>${titulo}</h3>
                </div>
                <div class='containerProductStore'>
                ${productosHTML.join("")}
                </div>
                </section> `;
        }else{
            return ""
        }
    }

//Renderizar cada uno de los productos dentro de su categoria
    const appContainer = document.getElementById("storeContainer");
    appContainer.innerHTML = `
    ${renderProductGroup(burgers, "Hamburguesas")}
    ${renderProductGroup(papas, "Papas")}
    ${renderProductGroup(gaseosas, "Gaseosas")}
    `;

    const addEvents = (productsIn)=>{
        productsIn.forEach((element, index) => {
            const productContainer = document.getElementById(
                `product-${element.categories}-${index}`
            );
            productContainer.addEventListener('click',()=>{
                setProductoActivo(element);
                openModal();
            });  
        });
    };
    addEvents(burgers);
    addEvents(papas);
    addEvents(gaseosas);
};