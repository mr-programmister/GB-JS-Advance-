const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
  el: '#app',
  data: {
    catalogUrl: '/catalogData.json',
    products: [],
    cartItems: [],
    imgCatalog: 'https://picsum.photos/id/1062/200/150',
    isVisibleCart: false,
    search: '',
  },
  methods: {
    getJson(url){
      return fetch(url)
        .then(result => result.json())
        .catch(error => {
          console.log(error);
        })
    },
    addProduct(product) {
    this.getJson(`${API}/addToBasket.json`).then(data => {
    if (data.result === 1) {
      let find = this.cartItems.find(target => product.id_product === target.id_product);
      console.log(find);
      if(find) {
        find.quantity++;
      } else {
        let item = Object.assign({quantity:1}, product)
        this.cartItems.push(item)
      }
    } else {
      throw new Error('Что-то пошло не так. Попробуйте обновить страницу.');
    }
    })},
    remove(product){
      this.getJson(`${API}/deleteFromBasket.json`)
      .then(data => {
        if(data.result === 1){
          let find = this.cartItems.find(target => product.id_product === target.id_product);
          if(find.quantity > 1){ 
            find.quantity--;
          } else { 
            this.cartItems.splice(this.cartItems.indexOf(find), 1);
          }
        } else {
           throw new Error('Что-то пошло не так. Попробуйте обновить страницу.');
        }
      })
    },
    filterGoods() {
      const regexp = new RegExp(this.search, 'i');
      const filtered = this.products.filter(product => regexp.test(product.product_name)); 
      this.products.forEach((product) => {
        const block = document.querySelector(`.product-item[data-id='${product.id_product}']`);
        if(!filtered.includes(product)){
        block.classList.add('invisible');
      } else {
        block.classList.remove('invisible');
      }
      })
      
    }

  },
  beforeCreate() {},
  created() {
    this.getJson(`${API + this.catalogUrl}`)
      .then(data => {
        for(let el of data){
          this.products.push(el);
        }
      });
  },
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
});
