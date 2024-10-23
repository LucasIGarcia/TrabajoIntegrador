import { categoriaActiva } from "../../main";
import { handleGetProductLocalStorage } from "../persistence/localstorage";
import { handleRenderList } from "../views/store";


//Filtro por categorias
const handleFilterProductsByCategory =(categoryIn) =>{
    const products = handleGetProductLocalStorage();

    switch (categoryIn) {
        case categoriaActiva:
            handleRenderList(products);
            break;
        case "Todo":
            handleRenderList(products);
            break;
        case "Hamburguesas":
        case "Papas":
        case "Gaseosas":
            const result = products.filter((el)=> el.categories === categoryIn);
            handleRenderList(result);
        default:
            break;
        case "mayorPrecio":
            const resultPrecioMayor = products.sort((a,b)=> b.precio - a.precio)
            handleRenderList(resultPrecioMayor);
        break;
        case "menorPrecio":
            const resultPrecioMenor = products.sort((a,b)=> a.precio - b.precio)
            handleRenderList(resultPrecioMenor);
        break;
    }
}

//Render de la vista de Categorias
export const renderCategories = () =>{
    //Tomo elementos de la lista
    const ulList = document.getElementById("listFilter");
    //Creo esos elementos dentro de la lista ulList
    ulList.innerHTML = `                        
    <li id="Todo"> Todos los productos </li>
    <li id="Hamburguesas"> Hamburguesas </li>
    <li id="Papas"> Papas </li>
    <li id="Gaseosas"> Gaseosas </li>
    <li id="mayorPrecio"> Mayor Precio </li>
    <li id="menorPrecio"> Menor Precio </li>
    `;
    //Agrego dinámicamente el evento click a la lista
    const liElements = ulList.querySelectorAll("li");   //Recorro todos los elementos li
    liElements.forEach((liElements)=>{
        liElements.addEventListener('click', ()=>{      //Agrego evento click
        handleClick(liElements)                         //Llamo a la función
        })
    })
    
    //Verifico y manejo el estilo del elemento activo
    const handleClick = (elemento) =>{
        handleFilterProductsByCategory(elemento.id);
        liElements.forEach((el)=>{
            if(el.classList.contains("liActive")){
                el.classList.remove("liActive");
            }else{
                if(elemento === el){
                    el.classList.add("liActive");
                }
            }
        })
    }
}