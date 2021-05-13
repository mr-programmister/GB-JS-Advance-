"use strict";

var API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
var app = new Vue({
  el: '#app',
  data: {
    catalogUrl: '/catalogData.json',
    products: [],
    cartItems: [],
    imgCatalog: 'https://picsum.photos/id/1062/200/150',
    isVisibleCart: false,
    search: ''
  },
  methods: {
    getJson: function getJson(url) {
      return fetch(url).then(function (result) {
        return result.json();
      })["catch"](function (error) {
        console.log(error);
      });
    },
    addProduct: function addProduct(product) {
      var _this = this;

      this.getJson("".concat(API, "/addToBasket.json")).then(function (data) {
        if (data.result === 1) {
          var find = _this.cartItems.find(function (target) {
            return product.id_product === target.id_product;
          });

          console.log(find);

          if (find) {
            find.quantity++;
          } else {
            var item = Object.assign({
              quantity: 1
            }, product);

            _this.cartItems.push(item);
          }
        } else {
          throw new Error('Что-то пошло не так. Попробуйте обновить страницу.');
        }
      });
    },
    remove: function remove(product) {
      var _this2 = this;

      this.getJson("".concat(API, "/deleteFromBasket.json")).then(function (data) {
        if (data.result === 1) {
          var find = _this2.cartItems.find(function (target) {
            return product.id_product === target.id_product;
          });

          if (find.quantity > 1) {
            find.quantity--;
          } else {
            _this2.cartItems.splice(_this2.cartItems.indexOf(find), 1);
          }
        } else {
          throw new Error('Что-то пошло не так. Попробуйте обновить страницу.');
        }
      });
    },
    filterGoods: function filterGoods() {
      var regexp = new RegExp(this.search, 'i');
      var filtered = this.products.filter(function (product) {
        return regexp.test(product.product_name);
      });
      this.products.forEach(function (product) {
        var block = document.querySelector(".product-item[data-id='".concat(product.id_product, "']"));

        if (!filtered.includes(product)) {
          block.classList.add('invisible');
        } else {
          block.classList.remove('invisible');
        }
      });
    }
  },
  beforeCreate: function beforeCreate() {},
  created: function created() {
    var _this3 = this;

    this.getJson("".concat(API + this.catalogUrl)).then(function (data) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var el = _step.value;

          _this3.products.push(el);
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
    });
  },
  beforeMount: function beforeMount() {},
  mounted: function mounted() {},
  beforeUpdate: function beforeUpdate() {},
  updated: function updated() {},
  beforeDestroy: function beforeDestroy() {},
  destroyed: function destroyed() {}
});