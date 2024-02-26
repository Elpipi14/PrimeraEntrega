const socketClient = io();

socketClient.on('saludo desde back', (msg) => {
    console.log(msg);
});


const form = document.getElementById('form');

const inputId = document.getElementById('id');
const inputTitle = document.getElementById('title');
const inputDescription = document.getElementById('description');
const inputPrice = document.getElementById('price');
const inputStock = document.getElementById('stock');
const inputThumbnail = document.getElementById('thumbnail');
const inputCode = document.getElementById('code');
const inputCategory = document.getElementById('category');

const productList = document.getElementById('home');


form.onsubmit = (e) => {
    e.preventDefault()
    const id = inputId.value;
    const title = inputTitle.value;
    const description = inputDescription.value;
    const price = inputPrice.value;
    const stock = inputStock.value;
    const thumbnail = inputThumbnail.value;
    const code = inputCode.value;
    const category = inputCategory.value;
    const product = { id, title, description, price, stock,thumbnail, code, category };
    socketClient.emit('newProducts', product);
}


document.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete')) {
        const productId = event.target.getAttribute('id');
        socketClient.emit('deleteProduct', productId);
    }
});


socketClient.on('arrayProducts', (updatedProducts) => {
    console.log(updatedProducts); // Verifica los productos recibidos en la consola
    let productListHTML = ``;
    updatedProducts.forEach(e => {
        productListHTML +=
            ` 
            <div class="card" style="width: 18rem;">
                <img src="${e.thumbnail}" class="mx-auto img-thumbnail img" alt="${e.thumbnail}">
                <div class="card_info card-body">
                    <h2 class="card-text">Title: ${e.title}</h2>
                    <p class="card-text">ID: ${e.id}</p>
                    <p class="card-text">Description: ${e.description}</p>
                    <p class="card-text">Price: ${e.price}</p>
                    <p class="card-text">Stocks: ${e.stock}</p>
                    <p class="card-text">Category: ${e.category}</p>
                </div>
                <div class="delete">
                    <button class="btn cart px-auto delete" id="${e.id}">Delete</button>
                </div>
            </div>
            `
    });
    console.log(productListHTML);
    productList.innerHTML = productListHTML;
});








