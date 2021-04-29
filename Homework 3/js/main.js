// class ProductList {
//   #goods;
//   #allProducts;
//   #privateProp;
//
//   constructor(container = '.products') {
//     this.container = container;
//     this.#goods = []; // data
//     this.#allProducts = []; // массив экземпляров товаров на основе this._goods
//
//     this.#fetchGoods();
//     this.#render();
//   }
//
//   get prop() {
//     return this.#privateProp;
//   }
//
//   set prop(value) {
//     if (value > 100) throw new Error('Значение больше 100');
//     this.#privateProp = value;
//   }
//
//   #fetchGoods() {
//     this.#goods = [
//       {id: 1, title: 'Notebook', price: 20000},
//       {id: 2, title: 'Mouse', price: 1500},
//       {id: 3, title: 'Keyboard', price: 5000},
//       {id: 4, title: 'Gamepad', price: 4500},
//     ];
//   }
//
//   #render() {
//     const block = document.querySelector(this.container);
//
//     for (const product of this.#goods) {
//       // console.log(new ProductItem(product).render());
//       const productObject = new ProductItem(product);
//
//       this.#allProducts.push(productObject);
//       block.insertAdjacentHTML('beforeend', productObject.render());
//     }
//   }
// }
const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// В ДЗ переделать на промисы не используя fetch
const getRequest = (url, callBack) => {
  return data = new Promise((resolve, reject) => {
    setTimeout(() => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status !== 200) {
          reject (console.log('Oops'));
      } else {
          resolve (callBack(xhr.responseText));
      }
    }
  };
      xhr.send();
  })}, 0);
}
// - - - - - - - - - - - - - - - - - - - - - - - - - -

class ProductList {
  constructor(container = '.products') {
    this.container = container;
    this._goods = []; // data
    this._allProducts = []; // массив экземпляров товаров на основе this._goods
    
    // this._fetchGoods();
    // this._render();
    this._getGoods()
        .then((data) => {
          this._goods = data;
          this._render();
        });
    this._init();
  }

  sum() {
    return this._goods.reduce((sum, { price }) => sum + price, 0);
  }


  _getGoods() {
    return fetch(`${API}/catalogData.json`)
        .then(result => result.json()).catch(error => console.log(error));
  }

  _render() {
    const block = document.querySelector(this.container);

    for (const product of this._goods) {
      const productObject = new ProductItem(product);
      this._allProducts.push(productObject);
      block.insertAdjacentHTML('beforeend', productObject.render());
      
    }
  }
  _init() { 
    document.querySelector(this.container).addEventListener('click', event => {
      // const target = event.target;
      if(event.target.classList.contains('buy-btn')){
        cart.addProduct(event.target);
      }
    });
  }
}

class ProductItem {
  constructor(product, img='https://via.placeholder.com/200x150') {
    this.title = product.product_name;
    this.price = product.price;
    this.id = product.id_product;
    this.img = img;
  }

  render() {
    return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} \u20bd</p>
                    <button class="buy-btn"
                      data-id="${this.id}"
                      data-name="${this.title}"
                      data-price="${this.price}">Купить</button>
                </div>
            </div>`;
  }
}

// const catalog = new ProductList();

class CartList {
constructor(container = '.cart', url = '/getBasket.json') {
    this.container = container;
    this.url = url;
    this.goods = [];
    this._allProducts = [];
    this._init();
    
    this._getGoods()
      .then((data) => {
        this._goods = data.contents;
        this._render();
      });
}
_getGoods() {
    return fetch(`${API}/getBasket.json`)
        .then(result => result.json()).catch(error => console.log(error));
  }

 getJson(url){
    return fetch(url ? url : `${API + this.url}`)
      .then(result => result.json())
      .catch(error => {
        console.log(error);
      })
 }
  _render() {
    const block = document.querySelector('.cart');
    for (const product of this._goods) {
      const productObject = new CartItem(product);
      this._allProducts.push(productObject);
      block.insertAdjacentHTML('beforeend', productObject.render());
    }
  }

addProduct(element) {
  this.getJson(`${API}/addToBasket.json`).then(data => {
    if (data.result === 1) {
      let productId = +element.dataset['id'];
      let find = this._allProducts.find(product => product.id_product === productId);
      // console.log(find);
      if(find) {
        find.quantity++;
        this._updateCart(find);
      } else {
        let product = {
          id_product: productId,
          price: +element.dataset['price'],
          product_name: element.dataset['name'],
          quantity: 1
        }
        this._goods = [product];
        this._render();
      }
    } else {
      throw new Error('Что-то пошло не так. Попробуйте обновить страницу.');
    }
})
}

removeProduct(element){
    this.getJson(`${API}/deleteFromBasket.json`)
      .then(data => {
        if(data.result === 1){
          let productId = +element.dataset['id'];
          let find = this._allProducts.find(product => product.id_product === productId);
          if(find.quantity > 1){ 
            find.quantity--;
            this._updateCart(find);
          } else { 
            this._allProducts.splice(this._allProducts.indexOf(find), 1);
            document.querySelector(`.cart-item[data-id="${productId}"]`).remove();
          }
        } else {
           throw new Error('Что-то пошло не так. Попробуйте обновить страницу.');
        }
      })
  }


_updateCart(product){ 
  let block = document.querySelector(`.cart-item[data-id="${product.id_product}"`);
  block.querySelector('.quantity').textContent = `Количество: ${product.quantity}`;
  block.querySelector('.price').textContent = `${product.price * product.quantity} руб.`;
}

_init() {
    document.querySelector('.btn-cart').addEventListener('click', () => {
      document.querySelector(this.container).classList.toggle('invisible');
    });
    document.querySelector(this.container).addEventListener('click', e => {
      if(e.target.classList.contains('cart-button-delete')){
        this.removeProduct(e.target);
      }
    })
  }

}

class CartItem {
constructor(product, img='https://via.placeholder.com/200x150') {
    this.id_product = product.id_product;
    this.title = product.product_name;
    this.price = product.price;
    this.img = img;
    this.quantity = product.quantity;
  }
render() {
    return `<div class="cart-item" data-id="${this.id_product}">
               <img src="${this.img}" alt="picture">
                <div class="cart-desc">
                    <h3>${this.title}</h3>
                    <p class ='price'>Цена:${this.price * this.quantity}</p>
                    <p class="quantity">Количество:${this.quantity}</p>
                </div>
                    <button class="cart-button-delete" type="button" data-id="${this.id_product}">X
                    </button>
            </div>`;
  }
}

const cart = new CartList();
const catalog = new ProductList();