"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ProductsList =
/*#__PURE__*/
function () {
  function ProductsList() {
    var container = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '.products';

    _classCallCheck(this, ProductsList);

    this.container = container;
    this.goods = [];

    this._fetchProducts();
  }

  _createClass(ProductsList, [{
    key: "_fetchProducts",
    value: function _fetchProducts() {
      this.goods = [{
        id: 1,
        title: 'Notebook',
        price: 2000
      }, {
        id: 2,
        title: 'Mouse',
        price: 20
      }, {
        id: 3,
        title: 'Keyboard',
        price: 200
      }, {
        id: 4,
        title: 'Gamepad',
        price: 50
      }];
    }
  }, {
    key: "render",
    value: function render() {
      var block = document.querySelector(this.container);
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.goods[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var product = _step.value;
          var productObj = new ProductItem(product);
          block.insertAdjacentHTML('beforeend', productObj.render()); //            block.innerHTML += productObj.render();
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
    key: "sum",
    value: function sum() {
      var sum = 0;
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.goods[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var item = _step2.value;
          sum += item.price;
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

      console.log(sum);
    }
  }]);

  return ProductsList;
}();

var ProductItem =
/*#__PURE__*/
function () {
  function ProductItem(product) {
    var img = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'https://picsum.photos/200/150';

    _classCallCheck(this, ProductItem);

    this.title = product.title;
    this.price = product.price;
    this.id = product.id;
    this.img = img;
  }

  _createClass(ProductItem, [{
    key: "render",
    value: function render() {
      return "<div class=\"product-item\" data-id=\"".concat(this.id, "\">\n                <img src=\"").concat(this.img, "\" alt=\"Some img\">\n                <h3>").concat(this.title, "</h3>\n                <p>").concat(this.price, "</p>\n                <button class=\"buy-btn\">\u041A\u0443\u043F\u0438\u0442\u044C</button>\n            </div>");
    }
  }]);

  return ProductItem;
}();

var Basket =
/*#__PURE__*/
function () {
  function Basket() {
    _classCallCheck(this, Basket);
  }

  _createClass(Basket, [{
    key: "render",
    value: function render() {}
  }, {
    key: "add",
    value: function add() {}
  }, {
    key: "remove",
    value: function remove() {}
  }, {
    key: "promoCode",
    value: function promoCode() {}
  }, {
    key: "totalPrice",
    value: function totalPrice() {}
  }]);

  return Basket;
}();

var BasketItem =
/*#__PURE__*/
function () {
  function BasketItem() {
    _classCallCheck(this, BasketItem);
  }

  _createClass(BasketItem, [{
    key: "render",
    value: function render() {}
  }, {
    key: "increase",
    value: function increase() {}
  }, {
    key: "reduce",
    value: function reduce() {}
  }]);

  return BasketItem;
}();

var list = new ProductsList();
list.render();
list.sum();