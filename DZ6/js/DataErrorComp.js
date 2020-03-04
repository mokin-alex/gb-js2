Vue.component('data-error', {
    data() {
        return {
            errorMessage: "Ошибка получения данных!",
        }
    },
    template: `<div>{{this.errorMessage}}</div> `,
    mounted() {
        console.log(this);
    },
});