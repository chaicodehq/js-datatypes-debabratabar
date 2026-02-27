/**
 * 📋 Jugaad Form Validator - Indian Style!
 *
 * India mein form bharna ek art hai! College admission ka form validate
 * karna hai. Har field ke apne rules hain. Tujhe ek errors object return
 * karna hai jisme galat fields ke error messages hain. Agar sab sahi hai
 * toh empty errors object aur isValid = true.
 *
 * formData object:
 *   { name, email, phone, age, pincode, state, agreeTerms }
 *
 * Validation Rules:
 *   1. name: must be a non-empty trimmed string, min 2 chars, max 50 chars
 *      Error: "Name must be 2-50 characters"
 *
 *   2. email: must be a string containing exactly one "@" and at least one "."
 *      after the "@". Use indexOf(), lastIndexOf(), includes().
 *      Error: "Invalid email format"
 *
 *   3. phone: must be a string of exactly 10 digits, starting with 6, 7, 8, or 9
 *      (Indian mobile numbers). Check each char is a digit.
 *      Error: "Invalid Indian phone number"
 *
 *   4. age: must be a number between 16 and 100 inclusive, and an integer.
 *      JUGAAD: Agar string mein number diya hai (e.g., "22"), toh parseInt()
 *      se convert karo. Agar convert nahi ho paya (isNaN), toh error.
 *      Error: "Age must be an integer between 16 and 100"
 *
 *   5. pincode: must be a string of exactly 6 digits, NOT starting with "0"
 *      Error: "Invalid Indian pincode"
 *
 *   6. state: Use optional chaining (?.) and nullish coalescing (??) -
 *      if state is null/undefined, treat as "". Must be a non-empty string.
 *      Error: "State is required"
 *
 *   7. agreeTerms: must be truthy (Boolean(agreeTerms) === true).
 *      Falsy values: 0, "", null, undefined, NaN, false
 *      Error: "Must agree to terms"
 *
 * Return:
 *   { isValid: boolean, errors: { fieldName: "error message", ... } }
 *   - isValid is true ONLY when errors object has zero keys
 *
 * Hint: Use typeof, Boolean(), parseInt(), isNaN(), Number.isInteger(),
 *   ?. (optional chaining), ?? (nullish coalescing), Object.keys(),
 *   startsWith(), trim(), length
 *
 * @param {object} formData - Form fields to validate
 * @returns {{ isValid: boolean, errors: object }}
 *
 * @example
 *   validateForm({
 *     name: "Rahul Sharma", email: "rahul@gmail.com", phone: "9876543210",
 *     age: 20, pincode: "400001", state: "Maharashtra", agreeTerms: true
 *   })
 *   // => { isValid: true, errors: {} }
 *
 *   validateForm({
 *     name: "", email: "bad-email", phone: "12345", age: 10,
 *     pincode: "0123", state: null, agreeTerms: false
 *   })
 *   // => { isValid: false, errors: { name: "...", email: "...", ... } }
 */
export function validateForm(formData) {
  // Your code here
  let errors={}

  if(formData.name.trim() =='' || ( formData.name.trim().length <2 || formData.name.trim().length >50   ) ){
    errors.name = 'Name must be 2-50 characters'
  }

  if(typeof formData.email !='string' || 
    !formData.email.includes('@') ||
    !formData.email.includes('.') ||
    formData.email.indexOf('@') != formData.email.lastIndexOf('@') ||
    !formData.email.split('@')[1].split('.').length >=2 
  ){
    errors.email = 'Invalid email format'
  }

  if ( typeof formData.phone !='string' ||
    formData.phone.length !=10 || 
     !'6789'.includes(formData.phone[0]) ||
     formData.phone.split('').filter((ele) =>  Number.isInteger(parseInt(ele)) ).length !=10
   ){
    errors.phone = 'Invalid Indian phone number'
   }

   if( !Number.isInteger(parseInt(formData.age)) || 
    formData.age - Math.trunc(formData.age) !=0 ||
    parseInt(formData.age ) <16 ||
    parseInt(formData.age ) >100
   ){
        errors.age = 'Age must be an integer between 16 and 100'
   }

   if( formData.pincode.length != 6 ||
    formData.pincode.startsWith('0') ||
    formData.pincode.split('').filter((ele) =>  Number.isInteger(parseInt(ele)) ).length !=6
   ){
        errors.pincode = 'Invalid Indian pincode'
   }


    if( !formData.hasOwnProperty('state') ||
      formData.state == null  ||
      formData.state == ""
   ){
        errors.state = 'State is required'
   }


   if ( !formData.agreeTerms ===true){
    errors.agreeTerms = 'Must agree to terms'
   }

  return (Object.keys(errors).length ==0 )? {isValid :true , errors :{}} : { isValid: false , errors : errors }

}



console.log(validateForm({
      name: "Rahul Sharma", email: "rahul@gmail.com", phone: "9876543210",
      age: 20, pincode: "400001", state: "Maharashtra", agreeTerms: true
    }));


  console.log(validateForm({
    name: "", email: "bad-email", phone: "12345", age: 25.5,
     pincode: "0123", state: null, agreeTerms: false
   }));
  
