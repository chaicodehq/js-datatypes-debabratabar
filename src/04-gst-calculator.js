/**
 * 🧾 GST Calculator - Tax Lagao Bhai!
 *
 * Bunty apni dukaan ke liye GST calculator bana raha hai. Customer ko bill
 * dena hai jisme base price, GST amount, aur total clearly dikhna chahiye.
 * GST rate category ke hisaab se change hota hai.
 *
 * GST Rates (by category string, case-insensitive):
 *   - "essential"   => 0% GST  (dal, chawal, atta, etc.)
 *   - "food"        => 5% GST  (packaged food, restaurant below Rs 7500)
 *   - "standard"    => 12% GST (processed food, business class tickets)
 *   - "electronics" => 18% GST (phones, laptops, etc.)
 *   - "luxury"      => 28% GST (cars, aerated drinks, tobacco)
 *   - Any other category => return null
 *
 * Rules:
 *   - Calculate: gstAmount = amount * rate / 100
 *   - Calculate: totalAmount = amount + gstAmount
 *   - Round gstAmount aur totalAmount to 2 decimal places using
 *     parseFloat(value.toFixed(2))
 *   - Return object: { baseAmount, gstRate, gstAmount, totalAmount }
 *   - category ko lowercase mein compare karo (case-insensitive)
 *   - Hint: Use toFixed(), parseFloat(), Number.isFinite(), toLowerCase()
 *
 * Validation:
 *   - Agar amount positive finite number nahi hai, return null
 *   - Agar category string nahi hai, return null
 *   - Agar category unknown hai, return null
 *
 * @param {number} amount - Base amount before tax
 * @param {string} category - Product category
 * @returns {{ baseAmount: number, gstRate: number, gstAmount: number, totalAmount: number } | null}
 *
 * @example
 *   calculateGST(1000, "electronics")
 *   // => { baseAmount: 1000, gstRate: 18, gstAmount: 180, totalAmount: 1180 }
 *
 *   calculateGST(500, "essential")
 *   // => { baseAmount: 500, gstRate: 0, gstAmount: 0, totalAmount: 500 }
 */
export function calculateGST(amount, category) {
  // Your code here


  if (amount <=0 || amount == Infinity || Number.isNaN(amount) || typeof amount != 'number' || typeof category != 'string'){
    return null 
  }

  let gstrate = 0
  if ( category.toLowerCase() == 'essential' ){
    gstrate = 0
  }else if ( category.toLowerCase() == 'food'){
    gstrate = 5
  }else if ( category.toLowerCase() == 'standard'){
    gstrate = 12
  }else if ( category.toLowerCase() == 'electronics'){
    gstrate = 18
  }else if ( category.toLowerCase() == 'luxury'){
    gstrate = 28
  }
  else{
    return null 
  }

  return { "baseAmount" : amount , "gstRate" : gstrate , "gstAmount" : ( (amount*gstrate)/100 ) != Math.trunc((amount*gstrate)/100)  ? parseFloat(( (amount*gstrate)/100 ).toFixed(2)) :  (amount*gstrate)/100    , 
    "totalAmount" : amount+parseFloat(((amount*gstrate)/100 ).toFixed(2))
  } ;


}


// console.log(calculateGST(1000, "electronics"));
// console.log(calculateGST(500, "essential"));

