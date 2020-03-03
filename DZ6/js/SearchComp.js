Vue.component('search-form', {
    data() {
        return {
            userSearch: 'искать',
            productsAPI: this.$root.$refs.products,
        };
    },
    template: `
<!--            <form action="#" class="search-form" @submit.prevent="this.productsAPI.filter(userSearch)">-->
                <form action="#" class="search-form" @submit.prevent="$root.$refs.products.filter(userSearch)">
                <input type="text" class="search-field" v-model="userSearch">
                <button class="btn-search" type="submit">
                    <i class="fas fa-search"></i>
                </button>
            </form>`

});