Vue.component('data-error', {
    data() {
        return {
            errorMessage: "Ошибка получения данных!",
        }
    },
    template: `<div class="products_empty">{{this.errorMessage}}</div> `,
    mounted() {
        console.log(this);
    },
});