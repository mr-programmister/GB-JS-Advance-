class ProductsList{
    constructor(container = '.products'){
        this.container = container;
        this.goods = [];
        this._fetchGoods();
        this._render();
    } 
    
    _fetchGoods(){
        this.goods = [
            {id: 1, title: 'Notebook', price: 20000},
            {id: 2, title: 'Mouse', price: 1500},
            {id: 3, title: 'Keyboard', price: 5000},
            {id: 4, title: 'Gamepad', price: 4500},
        ];
    }
    _render() {
        const block = document.querySelector(this.container);
        for(const product of this.goods){
            const productObj = new ProductItem(product);
            block.insertAdjacentHTML('beforeend',productObj.render())
        }
    }
    
    sum () {
        let sum = 0;
        for (let item of this.goods) {
            sum += item.price;
        }
        console.log(sum);
    }
}


class ProductItem{
	constructor(product, img = 'https://picsum.photos/200/150'){
		this.title = product.title;
		this.price = product.price;
		this.id = product.id;
		this.img = img;
		
	}
	
	render(){
		 return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <h3>${this.title}</h3>
                <p>${this.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
	}
}

class Basket {
    render(){}

    add(){}

    remove(){}

    promoCode(){}
   
    totalPrice(){}
}

class BasketItem {
    render() {}

    increase(){}

    reduce(){}
}

let list = new ProductsList();
list.sum();






    



