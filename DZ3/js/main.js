const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const dummyImgURL = "https://via.placeholder.com/150.png/55909C/969696";

// Переделать в ДЗ
// let getRequest = (url, cb) => {
//   let xhr = new XMLHttpRequest();
//   xhr.open('GET', url, true);
//   xhr.onreadystatechange = () => {
//     if (xhr.readyState === 4) {
//       if (xhr.status !== 200) {
//         console.log('Error');
//       } else {
//         cb(xhr.responseText);
//       }
//     }
//   };
//   xhr.send();
// };

class ProductList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this.allProducts = [];
        // this._fetchProducts();
        this._getProducts()
            .then(data => {
                this.goods = [...data];
                this.render();
            });

    }

    // _fetchProducts() {
    //   getRequest(`${API}/catalogData.json`, (data) => {
    //     this.goods = JSON.parse(data);
    //     this.render();
    //     console.log(this.goods);
    //   });
    // }

    _getProducts() {
        return fetch(`${API}/catalogData.json`)
            .then(result => {
                if (result.ok) return result.json();
                else console.log('Error:', result);
            })
            .catch(error => {
                console.log('Error:', error);
            });
    }

    calcSum() {
        return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    }

    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObject = new ProductItem(product);
            this.allProducts.push(productObject);
            block.insertAdjacentHTML('beforeend', productObject.render());
        }
        block.insertAdjacentHTML('afterend', `<div class="total">ИТОГО: ${this.calcSum()} \u20bd</div>`);
    }
}

class ProductItem {
    constructor(product, img = dummyImgURL) {
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
        this.quantity=product.quantity;
    }

    render() {
        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <h3>${this.title}</h3>
                <p>${this.price} \u20bd</p>
                <button class="button button_add-cart"><a class="button_link" href="#">Добавить в корзину</a></button>
            </div>`;
    }
}

class CartItem extends ProductItem { //класс продукт в корзине
    constructor(id, title, price, img, quantity, subtotal) {
        super(id, title, price, img, quantity);   //у клсса-родителя берем базовые параметры
        // this.quantity = product.quantity;       //это количество одного и того же товара.
        this.subtotal = this.price * this.quantity; //стоимость товара = цена умноженная на количество
        this.shipping(); //метод доставка для каждого товара может быть свои расчеты по доставке
        this.render();  //рендеринг diva экзепляра товара  в корзине
    }

    shipping() {
        //TODO:Метот связанный с доставкой конкретного товара, например, возвращает FREE
    }

    render() { // самостоятельный рендер - не от родительского класса
        //TODO:Метод рендеринга экзепляра товара в корзине
        return `<div class="cart-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="cart-item__txt">
                <h3>${this.title}</h3>
                <p>${this.price} \u20bd</p>
                <p>${this.quantity} шт.</p>
                <p>${this.subtotal} \u20bd</p>
                </div>
            </div>`;
    }

}

class Cart { //"Набросок" класса Корзина
    constructor(container = ".cart", paymentAddress, containerCount = ".header-cart__count") {
        this.container = container;
        this.containerCount = containerCount;
        this.goods = [];
        this.goodsAmount = 0; //из запроса json
        this.goodsCount = 0;  //из запроса json
        this.allItems = []; //корзина содержищая CartItem
        this.paymentAddress = paymentAddress; //Адрес доставки
        this._getCart()
            .then(data => {
                this.goodsAmount = data.amount;
                this.goodsCount = data.countGoods;
                this.goods = [...data.contents];
                this.render();  //рендеринг страницы корзины со всеми экзеплярами товара.
            });

    }

    shipping() { //метод расчета доставки товара.
    };

    discount() {  //метод расчета скидки
    };

    grandtotal() { //метод расчета полной стоимости всей корзины товаров (с количсетвом, скидками и доставкой)// с учетом CartItem.subtotal и discount() и shipping();
    };

    checkout() { //метод Вызов оплаты корзины
    };

    render() { //рендеринг страницы корзины со всеми экзеплярами товара.
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObject = new CartItem(product);
            this.allItems.push(productObject);
            block.insertAdjacentHTML('beforeend', productObject.render());
        }//рендеринг страницы корзины со всеми экзеплярами товара.
        document.querySelector("#total-price").innerHTML = this.goodsAmount+" \u20bd";
        document.querySelector(this.containerCount).innerHTML = this.goodsCount;

    }

    addToCart() { //добавление в корзину
    }

    delFromCart() { //удаление из корзины
    }

    _getCart() {
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            // .then(result => {
            //     if (result.ok) return result.json();
            //     else console.log('Error:', result);
            // })
            .catch(error => {
                console.log('Error:', error);
            });
    }
}

const list = new ProductList();
const cart = new Cart();

