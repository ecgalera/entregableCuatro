console.log("Estoy en RealTimeProducts");

const socket = io();

socket.on("products", data =>{
    const finalContent = document.getElementById("productsId")
    let content = ""
    data.forEach(product =>
        content+= `Producto: ${product.title} <br/> 
                   Price: ${product.price} <br/> 
                   Description: ${product.description} <br/>
                   Stock: ${product.stock}<br/> 
                   Category: ${product.category}<br/>
                   Id: ${product.id}<br/><br/>`);
                    
                   
        finalContent.innerHTML = content 
})