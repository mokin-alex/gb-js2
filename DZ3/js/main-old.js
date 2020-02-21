const products = [
    {id: 1, title: 'Notebook', price: 40000},
    {id: 2, title: 'Mouse', price: 350},
    {id: 3, title: 'Keyboard', price: 700},
    {id: 4, title: 'Gamepad', price: 7500},
    {id: 5, title: 'Monitor', price: 8000},
    {id: 6, title: 'USB Flash', price: 950},
    {id: 7, title: 'Desktop', price: 35700},
    {id: 8, title: 'HDD', price: 3500},
];
const dummyImgURL = "https://via.placeholder.com/150.png/55909C/969696";
//Задание 2. Доп.параметр функции со значением по-умолчанию - URL картинки-заглушки
const renderProduct = (title, price, img = dummyImgURL) => {
    return `<div class="product-item">
                <img src="${img}">
                <h3>${title}</h3>
                <p>${price} руб.</p>
                <button class="button button_add-cart"><a class="button_link" href="#">Добавить в корзину</a></button>
            </div>`;
};

const renderProducts = (list) => {
    const productList = list.map((item) => renderProduct(item.title, item.price));
    document.querySelector('.products').innerHTML = productList.join('');
    /* Задание 3 - ответ: запятая появляется в следствии вывода значений массива, которые разделяются запятыми
        Метод .join() объединяет все элементы массива в строку с заданным разделителем,
        в нашем случае разделитель "пустой", т.е. отсутствует совсем.
    */
};

renderProducts(products);
