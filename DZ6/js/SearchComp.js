Vue.component('search-form', {
    data() {
        return {
            userSearch: '',
        };
    },
    computed: {
        productsAPI() {
            return this.$root.$refs.products;
            // Это подразумевается только как обходной путь для прямого манипулирования потомками
            // — вам следует избегать доступа к $refs из шаблонов или вычисляемых свойств.

            //вот такое указание в документашке -
        }
    },
    template: `
            <form action="#" class="search-form" @submit.prevent="productsAPI.filter(userSearch)">
<!--                <form action="#" class="search-form" @submit.prevent="$root.$refs.products.filter(userSearch)">-->
                <input type="text" class="search-field" v-model="userSearch">
                <button class="btn-search" type="submit">
                    <i class="fas fa-search"></i>
                </button>
            </form>`,
    mounted() {
        console.log(this);
    },
});