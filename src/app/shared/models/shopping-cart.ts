import { Product } from './product';
import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart { 
  items: ShoppingCartItem[] = [];
  key;
  

  constructor(private itemsMap: { [productId: string]: ShoppingCartItem }, key) { // key-value thing. key is string value is shopingcartitem
    this.itemsMap = itemsMap || {};
    this.key = key;
    for (let productId in itemsMap) {
      let item = itemsMap[productId];
     // console.log(item);
     // console.log(productId);
     // console.log(itemsMap);
      this.items.push(new ShoppingCartItem({ ...item, $key: productId }));
    }
  }

  getQuantity(product: Product) {
    let item = this.itemsMap[product.key];
    return item ? item.quantity : 0;
  }
  
  get totalPrice() {
    let sum = 0;
    for (let productId in this.items) 
      sum += this.items[productId].totalPrice;
    return sum;
  }
  
  get totalItemsCount() {
    let count = 0;
    for (let productId in this.itemsMap) 
      count += this.itemsMap[productId].quantity;
    return count;
  }

  get itemsCount(){
    return this.items.length;
  }
}