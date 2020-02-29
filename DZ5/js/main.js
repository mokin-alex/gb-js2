const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        products: [],
        imgCatalog: 'https://placehold.it/200x150',
        searchLine: '', //слово для тестирования связки
        filtered: [],
        isVisibleCart: false,
        cart: [{id_product: 1, img: 'https://placehold.it/200x150', product_name: 'Монитор', price: 9000, quantity: 1}],
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },
        addProduct(product) {
            console.log(product.id_product);
        },
        filterGoods() {
            const regexp = new RegExp(this.searchLine, 'i');
            this.filtered = this.products.filter(product => regexp.test(product.product_name));
            //TODO: не понятно теперь как обратиться к :key где лежит наш id
            this.products.forEach(el => {
                //пока реализовано на JS, (как это красиво сделать на vue.js не понятно)
                const block = document.querySelector(`.product-item[data-id="${el.id_product}"]`);
                if (!this.filtered.includes(el)) {
                    block.classList.add('invisible');
                } else {
                    block.classList.remove('invisible');
                }
            })
        },
    },
    // хук жизненного цикла
    mounted() {
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                }
            });
    }
});
