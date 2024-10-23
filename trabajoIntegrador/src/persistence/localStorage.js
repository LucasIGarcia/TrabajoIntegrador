//===========LOCALSTORAGE========

//FUNCION QUE OBTIENE ELEMENTOS

export const handleGetProductLocalStorage = ()=>{
    const products = JSON.parse(localStorage.getItem("products"));

    if(products){
        return products;
    } else {
        return [];
    }
};

//FUNCION QUE GUARDA EN LOCALSTORAGE

    // RECIBIMOS UN PRODUCTO
export const setInLocalStorage = (productIn)=>{
    
    // TRAEMOS LOS ELEMENTOS
    let productInLocal = handleGetProductLocalStorage();

    const existingIndex = productInLocal.findIndex((productsLocal)=>
        productsLocal.id === productInLocal.id
    );
    //VERIFICAR SI EXISTE
    if(existingIndex !== -1){
        productInLocal[existingIndex] = productIn;
    }else{
    //SI NO EXISTE LO AGREGO
        productInLocal.push(productIn);
    }
//SETEAR EL NUEVO ARRAY
localStorage.setItem("products", JSON.stringify(productInLocal));
};