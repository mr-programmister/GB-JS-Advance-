"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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
var API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'; // В ДЗ переделать на промисы не используя fetch

var getRequest = function getRequest(url, callBack) {
  return data = new Promise(function (resolve, reject) {
    setTimeout(function () {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status !== 200) {
            reject(console.log('Oops'));
          } else {
            resolve(callBack(xhr.responseText));
          }
        }
      };

      xhr.send();
    });
  }, 0);
}; // - - - - - - - - - - - - - - - - - - - - - - - - - -


var ProductList =
/*#__PURE__*/
function () {
  function ProductList() {
    var _this = this;

    var container = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '.products';

    _classCallCheck(this, ProductList);

    this.container = container;
    this._goods = []; // data

    this._allProducts = []; // массив экземпляров товаров на основе this._goods
    // this._fetchGoods();
    // this._render();

    this._getGoods().then(function (data) {
      _this._goods = data;

      _this._render();
    });

    this._init();
  }

  _createClass(ProductList, [{
    key: "sum",
    value: function sum() {
      return this._goods.reduce(function (sum, _ref) {
        var price = _ref.price;
        return sum + price;
      }, 0);
    }
  }, {
    key: "_getGoods",
    value: function _getGoods() {
      return fetch("".concat(API, "/catalogData.json")).then(function (result) {
        return result.json();
      })["catch"](function (error) {
        return console.log(error);
      });
    }
  }, {
    key: "_render",
    value: function _render() {
      var block = document.querySelector(this.container);
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this._goods[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var product = _step.value;
          var productObject = new ProductItem(product);

          this._allProducts.push(productObject);

          block.insertAdjacentHTML('beforeend', productObject.render());
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: "_init",
    value: function _init() {
      document.querySelector(this.container).addEventListener('click', function (event) {
        // const target = event.target;
        if (event.target.classList.contains('buy-btn')) {
          cart.addProduct(event.target);
        }
      });
    }
  }]);

  return ProductList;
}();

var ProductItem =
/*#__PURE__*/
function () {
  function ProductItem(product) {
    var img = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'https://via.placeholder.com/200x150';

    _classCallCheck(this, ProductItem);

    this.title = product.product_name;
    this.price = product.price;
    this.id = product.id_product;
    this.img = img;
  }

  _createClass(ProductItem, [{
    key: "render",
    value: function render() {
      return "<div class=\"product-item\" data-id=\"".concat(this.id, "\">\n                <img src=\"").concat(this.img, "\" alt=\"Some img\">\n                <div class=\"desc\">\n                    <h3>").concat(this.title, "</h3>\n                    <p>").concat(this.price, " \u20BD</p>\n                    <button class=\"buy-btn\"\n                      data-id=\"").concat(this.id, "\"\n                      data-name=\"").concat(this.title, "\"\n                      data-price=\"").concat(this.price, "\">\u041A\u0443\u043F\u0438\u0442\u044C</button>\n                </div>\n            </div>");
    }
  }]);

  return ProductItem;
}(); // const catalog = new ProductList();


var CartList =
/*#__PURE__*/
function () {
  function CartList() {
    var _this2 = this;

    var container = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '.cart';
    var url = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '/getBasket.json';

    _classCallCheck(this, CartList);

    this.container = container;
    this.url = url;
    this.goods = [];
    this._allProducts = [];

    this._init();

    this._getGoods().then(function (data) {
      _this2._goods = data.contents;

      _this2._render();
    });
  }

  _createClass(CartList, [{
    key: "_getGoods",
    value: function _getGoods() {
      return fetch("".concat(API, "/getBasket.json")).then(function (result) {
        return result.json();
      })["catch"](function (error) {
        return console.log(error);
      });
    }
  }, {
    key: "getJson",
    value: function getJson(url) {
      return fetch(url ? url : "".concat(API + this.url)).then(function (result) {
        return result.json();
      })["catch"](function (error) {
        console.log(error);
      });
    }
  }, {
    key: "_render",
    value: function _render() {
      var block = document.querySelector('.cart');
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this._goods[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var product = _step2.value;
          var productObject = new CartItem(product);

          this._allProducts.push(productObject);

          block.insertAdjacentHTML('beforeend', productObject.render());
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
  }, {
    key: "addProduct",
    value: function addProduct(element) {
      var _this3 = this;

      this.getJson("".concat(API, "/addToBasket.json")).then(function (data) {
        if (data.result === 1) {
          var productId = +element.dataset['id'];

          var find = _this3._allProducts.find(function (product) {
            return product.id_product === productId;
          }); // console.log(find);


          if (find) {
            find.quantity++;

            _this3._updateCart(find);
          } else {
            var product = {
              id_product: productId,
              price: +element.dataset['price'],
              product_name: element.dataset['name'],
              quantity: 1
            };
            _this3._goods = [product];

            _this3._render();
          }
        } else {
          throw new Error('Что-то пошло не так. Попробуйте обновить страницу.');
        }
      });
    }
  }, {
    key: "removeProduct",
    value: function removeProduct(element) {
      var _this4 = this;

      this.getJson("".concat(API, "/deleteFromBasket.json")).then(function (data) {
        if (data.result === 1) {
          var productId = +element.dataset['id'];

          var find = _this4._allProducts.find(function (product) {
            return product.id_product === productId;
          });

          if (find.quantity > 1) {
            find.quantity--;

            _this4._updateCart(find);
          } else {
            _this4._allProducts.splice(_this4._allProducts.indexOf(find), 1);

            document.querySelector(".cart-item[data-id=\"".concat(productId, "\"]")).remove();
          }
        } else {
          throw new Error('Что-то пошло не так. Попробуйте обновить страницу.');
        }
      });
    }
  }, {
    key: "_updateCart",
    value: function _updateCart(product) {
      var block = document.querySelector(".cart-item[data-id=\"".concat(product.id_product, "\""));
      block.querySelector('.quantity').textContent = "\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E: ".concat(product.quantity);
      block.querySelector('.price').textContent = "".concat(product.price * product.quantity, " \u0440\u0443\u0431.");
    }
  }, {
    key: "_init",
    value: function _init() {
      var _this5 = this;

      document.querySelector('.btn-cart').addEventListener('click', function () {
        document.querySelector(_this5.container).classList.toggle('invisible');
      });
      document.querySelector(this.container).addEventListener('click', function (e) {
        if (e.target.classList.contains('cart-button-delete')) {
          _this5.removeProduct(e.target);
        }
      });
    }
  }]);

  return CartList;
}();

var CartItem =
/*#__PURE__*/
function () {
  function CartItem(product) {
    var img = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'https://via.placeholder.com/200x150';

    _classCallCheck(this, CartItem);

    this.id_product = product.id_product;
    this.title = product.product_name;
    this.price = product.price;
    this.img = img;
    this.quantity = product.quantity;
  }

  _createClass(CartItem, [{
    key: "render",
    value: function render() {
      return "<div class=\"cart-item\" data-id=\"".concat(this.id_product, "\">\n               <img src=\"").concat(this.img, "\" alt=\"picture\">\n                <div class=\"cart-desc\">\n                    <h3>").concat(this.title, "</h3>\n                    <p class ='price'>\u0426\u0435\u043D\u0430:").concat(this.price * this.quantity, "</p>\n                    <p class=\"quantity\">\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E:").concat(this.quantity, "</p>\n                </div>\n                    <button class=\"cart-button-delete\" type=\"button\" data-id=\"").concat(this.id_product, "\">X\n                    </button>\n            </div>");
    }
  }]);

  return CartItem;
}();

var cart = new CartList();
var catalog = new ProductList();