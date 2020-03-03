Vue.component('search',{
    data(){
        return{};
    },
    template:`
            <form action="#" class="search-form" @submit.prevent="filter">
                <input type="text" class="search-field" v-model="userSearch">
                <button class="btn-search" type="submit">
                    <i class="fas fa-search"></i>
                </button>
            </form>`

});