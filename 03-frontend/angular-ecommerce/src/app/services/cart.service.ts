import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})

export class CartService {

  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() { }

  addToCart(theCartItem: CartItem){

    //check if we already have item in our cart
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem = undefined;

    if(this.cartItems.length > 0) {
    //find item in the cart based on item id
    //tempCartItem is current element in the array
    existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.id === theCartItem.id);
    
    //check if we found it
    alreadyExistsInCart = (existingCartItem != undefined);
  }

  if(alreadyExistsInCart){
    //increment the quantity
    existingCartItem.quantity++;
  } else {
    //just add item to the array
    this.cartItems.push(theCartItem);
  }

  //compute cart total price and total quantity
  this.computeCartTotals();

  }

  computeCartTotals() {
    
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for(let currentCartItem of this.cartItems){
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;

    }

    // publish new values to all subscribers
    // next methods sends an a event
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    // log cart data
    this.logCartData(totalPriceValue, totalQuantityValue);

  }

  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    console.log(`contents of the cart`);
    for(let tempCartItem of this.cartItems){
      const subTotalPrice = tempCartItem.quantity * tempCartItem.unitPrice;

      console.log(`name= ${tempCartItem.name},
       quantity=${tempCartItem.quantity},
        unitPrice=${tempCartItem.unitPrice},
         subtotalprice=${subTotalPrice}`);
    }

    console.log(`total price=${totalPriceValue.toFixed(2)}, totalQuantity=${totalQuantityValue}`);
    console.log(`~~~~~~~~~~~~`);
  }
}
