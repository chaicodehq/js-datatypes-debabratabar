/**
 * 🍕 Zomato Order Builder
 *
 * Zomato jaisa order summary banana hai! Cart mein items hain (with quantity
 * aur addons), ek optional coupon code hai, aur tujhe final bill banana hai
 * with itemwise breakdown, taxes, delivery fee, aur discount.
 *
 * Rules:
 *   - cart is array of items:
 *     [{ name: "Butter Chicken", price: 350, qty: 2, addons: ["Extra Butter:50", "Naan:40"] }, ...]
 *   - Each addon string format: "AddonName:Price" (split by ":" to get price)
 *   - Per item total = (price + sum of addon prices) * qty
 *   - Calculate:
 *     - items: array of { name, qty, basePrice, addonTotal, itemTotal }
 *     - subtotal: sum of all itemTotals
 *     - deliveryFee: Rs 30 if subtotal < 500, Rs 15 if 500-999, FREE (0) if >= 1000
 *     - gst: 5% of subtotal, rounded to 2 decimal places parseFloat(val.toFixed(2))
 *     - discount: based on coupon (see below)
 *     - grandTotal: subtotal + deliveryFee + gst - discount (minimum 0, use Math.max)
 *     - Round grandTotal to 2 decimal places
 *
 *   Coupon codes (case-insensitive):
 *     - "FIRST50"  => 50% off subtotal, max Rs 150 (use Math.min)
 *     - "FLAT100"  => flat Rs 100 off
 *     - "FREESHIP" => delivery fee becomes 0 (discount = original delivery fee value)
 *     - null/undefined/invalid string => no discount (0)
 *
 *   - Items with qty <= 0 ko skip karo
 *   - Hint: Use map(), reduce(), filter(), split(), parseFloat(),
 *     toFixed(), Math.max(), Math.min(), toLowerCase()
 *
 * Validation:
 *   - Agar cart array nahi hai ya empty hai, return null
 *
 * @param {Array<{ name: string, price: number, qty: number, addons?: string[] }>} cart
 * @param {string} [coupon] - Optional coupon code
 * @returns {{ items: Array<{ name: string, qty: number, basePrice: number, addonTotal: number, itemTotal: number }>, subtotal: number, deliveryFee: number, gst: number, discount: number, grandTotal: number } | null}
 *
 * @example
 *   buildZomatoOrder([{ name: "Biryani", price: 300, qty: 1, addons: ["Raita:30"] }], "FLAT100")
 *   // subtotal: 330, deliveryFee: 30, gst: 16.5, discount: 100
 *   // grandTotal: 330 + 30 + 16.5 - 100 = 276.5
 *
 *   buildZomatoOrder([{ name: "Pizza", price: 500, qty: 2, addons: [] }], "FIRST50")
 *   // subtotal: 1000, deliveryFee: 0, gst: 50, discount: min(500, 150) = 150
 *   // grandTotal: 1000 + 0 + 50 - 150 = 900
 */
export function buildZomatoOrder(cart, coupon) {
  // Your code here
  if(cart == undefined || !Array.isArray(cart) ||  cart.length == 0 ){return null }


  let filtered_cart = cart.filter((ele) => (ele.qty>0)).map((ele) => ({...ele , addOnTot : 
    !ele.hasOwnProperty('addons') ? 0 : ele.addons.reduce((acc,curVal) => acc+ parseInt(curVal.split(':')[1]) ,0)}))
  
  
  // (!ele.hasOwnProperty('addons')) ? 0 :   ele.addons.reduce((acc , ele) =>(acc + parseInt(ele.split(':')[1] )),0) 


  let result =filtered_cart.map((ele) => {
    return {
      name : ele.name ,
      qty : ele.qty ,
      basePrice : ele.price , 
      addonTotal : ele.addOnTot, 
      itemTotal :(ele.price + ele.addOnTot ) * ele.qty

    }
  })
  let sTot = result.reduce((acc , curVal) => (acc+curVal.itemTotal)  , 0 )
  let dlvFee = 0

  if(sTot<500){
    dlvFee=30
  }
  else if( sTot >=500 &&  sTot<=999){
    dlvFee =15
  }
  else{
    dlvFee=0
  }

  let discount = 0

  if(coupon ==null ||
    coupon == undefined ||
    typeof coupon != 'string'
  ){
    discount = 0 
  }
  else if ( coupon.toUpperCase() == 'FIRST50' ){
    discount =Math.min( 150 , ((50*sTot)/100))
  }else if (coupon.toUpperCase() == 'FLAT100'){
    discount = 100

  }else if(coupon.toUpperCase()=='FREESHIP'){
      discount= dlvFee
      dlvFee =0
  }
  // else{
  //   discount =0 
  // }




  return {
    items : result ,
    subtotal : sTot , 
    deliveryFee :dlvFee,
    gst : parseFloat(((sTot*5)/100).toFixed(2)),
    discount :discount,
    grandTotal : Math.max( parseFloat((sTot+dlvFee+parseFloat(((sTot*5)/100).toFixed(2)) -discount).toFixed(2)) , 0 )
    
  }


}



// console.log( buildZomatoOrder([{ name: "Chai", price: 20, qty: 2 }]))
console.log(buildZomatoOrder([{ name: "Biryani", price: 300, qty: 1, addons: ["Raita:30"] }], "FLAT100"));

