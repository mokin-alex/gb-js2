class ProductItem {
    constructor(product, img = 'https://placehold.it/200x150') {
        this.title = product.title;
        this.price = product.price;
        this.id = product.id;
        this.img = img;
    }

    render() {
        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} \u20bd</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`
    }
}

class ProductList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this.allProducts = [];
        this._fetchProducts();
        this.render();
        console.log(this.goods);
        console.log(this.allProducts);
    }

    _fetchProducts() {
        this.goods = [
            {id: 1, title: 'Notebook', price: 1000},
            {id: 2, title: 'Mouse', price: 100},
            {id: 3, title: 'Keyboard', price: 250},
            {id: 4, title: 'Gamepad', price: 150},
        ];
    }

    render() {
        const block = document.querySelector(this.container);

        for (let product of this.goods) {
            const productObject = new ProductItem(product);
            this.allProducts.push(productObject);
            block.insertAdjacentHTML('beforeend', productObject.render());
        }
        //Добавим Итоговый элемент div после элемента div со списком товаров.
        //Вызовем метод подсчета суммы товаров.
        block.insertAdjacentHTML('afterend', `<div class="total">ИТОГО: ${this.sumGoodsPrice()} \u20bd</div>`);
    }

    sumGoodsPrice() { //Метод подсчитывающий сумму всех товаров
        let sum = 0;
        for (let product of this.goods) {
            sum = sum + product.price;
        }
        return sum;
    }
}

new ProductList();

// const products = [
//   {id: 1, title: 'Notebook', price: 1000},
//   {id: 2, title: 'Mouse', price: 100},
//   {id: 3, title: 'Keyboard', price: 250},
//   {id: 4, title: 'Gamepad', price: 150},
// ];
//
// const renderProduct = (item, img='https://placehold.it/200x150') => `<div class="product-item">
//                 <img src="${img}" alt="Some img">
//                 <div class="desc">
//                     <h3>${item.title}</h3>
//                     <p>${item.price} \u20bd</p>
//                     <button class="buy-btn">Купить</button>
//                 </div>
//             </div>`;
//
// const renderProducts = list => {
//   document.querySelector('.products').insertAdjacentHTML('beforeend', list.map(item => renderProduct(item)).join(''));
// };
//
// renderProducts(products);
