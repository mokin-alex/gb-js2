const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        isError: false,
    },
    methods: {
        getJson(url) {
            this.isError=false;
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                    this.isError = true;
                })
        },
    },
    mounted() {
        console.log(this);
    }
});

