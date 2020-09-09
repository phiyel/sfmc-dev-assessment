// Vars
let fName = document.querySelector('#firstName');
let lName = document.querySelector('#lastName');
let eMail = document.querySelector('#email');
let phoneNumb = document.querySelector('#phone');
let addLine = document.querySelector('#addressLine');
let city = document.querySelector('#city');
let province = document.querySelector('#regionCode');
let postCode = document.querySelector('#postalCode');
let country = document.querySelector('#country');
let amountNumb = document.querySelector('#quantity');
let delivery = document.querySelector('#deliverytype');
let additionalInfor = document.querySelector('textarea');
let paymentType = document.querySelector('#paymentmethod');
let paymentPaypal = document.querySelector('#paypal');
let paymentCard = document.querySelector('#creditcard');
let paymentCardExpiryMonth = document.querySelector('#expirymonth');
let paymentCardExpiryYear = document.querySelector('#expiryyear');
let paymentCardCvv = document.querySelector('#cvv');
let inputNumbers = document.querySelectorAll('input[type="tel"]');
let submitBut = document.querySelector('.bestbuy-content__form--button');
let letterNumber = /^[0-9a-zA-Z]+$/;
let allInput =  document.querySelectorAll('input');
let mainForm = document.querySelector('#form');

//Pushing input data into Arr object for review
const formDetails = [];

//Restrict input with numbers
for(let i = 0; i < inputNumbers.length; i++){
    inputNumbers[i].addEventListener('keydown', (e) =>{
        let key = e.keyCode ? e.keyCode : e.which;
        if(!( [8, 9, 13, 27, 46, 110, 190].indexOf(key) !== -1 ||
        (key == 65 && ( e.ctrlKey || e.metaKey  ) ) || 
        (key >= 35 && key <= 40) ||
        (key >= 48 && key <= 57 && !(e.shiftKey || e.altKey)) ||
        (key >= 96 && key <= 105)
      )){
            e.preventDefault();
        }
    })
}

//Payment format
//Rest payment type on input select change
paymentType.addEventListener ('change', function(){
    let hiddenCard = document.querySelector('#payment-card');
    let hiddenPaypal = document.querySelector('#payment-paypal');
    hiddenCard.style.display = (this.value == 'CardCard') ? 'block':'none';
    hiddenPaypal.style.display = (this.value == 'PayPal') ? 'block':'none';
    paymentCard.value = '';
    paymentCardCvv.value = '';
    paymentCardExpiryMonth.value = 1;
    paymentCardExpiryYear.value = 2020;
    paymentPaypal.checked = false;

});

//paypal
paymentPaypal.addEventListener('click', () =>{
    window.open('https://www.paypal.com/us/signin', '_blank', 'toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400')
});

//Focus out validations
//needs refactoring
function checkInput (){
    
   
   for(i = 0; i < allInput.length; i++){
    
    if((allInput[i].id == 'postalCode' && allInput[i].value.match(letterNumber))){
            allInput[i].classList.toggle('bestbuy-error')

        } else if((allInput[i].id == 'phone' && allInput[i].value.length != 10)){ 
            allInput[i].classList.toggle('bestbuy-error')

        } else if((allInput[i].id == 'email' && allInput[i].value.indexOf('@') < 1) || 
        (allInput[i].id == 'email' && (allInput[i].value.lastIndexOf('.') - allInput[i].value.indexOf('@') < 2))){
            allInput[i].classList.toggle('bestbuy-error')

        } else if (allInput[i].id == 'addressLine' && allInput[i].value.match(letterNumber)){
            allInput[i].classList.toggle('bestbuy-error')

        } else if (allInput[i].id == 'creditcard' && allInput[i].value.length != 16){
            allInput[i].classList.toggle('bestbuy-error')

        } else if (allInput[i].id == 'cvv' && allInput[i].value.length != 3){
            allInput[i].classList.toggle('bestbuy-error')

        } else if(allInput[i].value == ''){
            allInput[i].classList.toggle('bestbuy-error');

        } else {
            allInput[i].classList.toggle('bestbuy-error')
        }
    }   
}

//IE Support
// Array.from(allInput).forEach(input =>{
//     input.addEventListener('focusout', checkInput);
// });
let newAllInput = Array.prototype.slice.call(allInput);
newAllInput.forEach(input =>{
    input.addEventListener('focusout', checkInput);
});

//ToDo
//Error message below each input ToDo  
 
// Form Validation
// needs refactoring
function validate(e) {

    e.preventDefault();

    let firstName = fName.value;
    let lastName = lName.value;
    let email = eMail.value;
    let contactNumber = phoneNumb.value;
    let address = addLine.value;
    let currentCity = city.value;
    let provincial = province.value;
    let postalCode = postCode.value;
    let countryCode = country.value;
    let orderQuantity = amountNumb.value;
    let deliver = delivery.value;
    let additionalRequest = additionalInfor.value;
    let paymentMethod = paymentType.value;
    let creditCardNumber = paymentCard.value;
    let cardExpiryMonth = paymentCardExpiryMonth.value;
    let cardExpiryYear = paymentCardExpiryYear.value;
    let cardCvv = paymentCardCvv.value;
   
    formDetails.push({
        firstName, 
        lastName, 
        email, 
        contactNumber, 
        address, 
        currentCity, 
        provincial, 
        postalCode, 
        countryCode, 
        orderQuantity, 
        deliver, 
        additionalRequest, 
        paymentMethod,
        creditCardNumber,
        cardExpiryMonth,
        cardExpiryYear,
        cardCvv
    });
    console.log(formDetails);   
    
    //run func to validate inputs
    checkInput();

}
submitBut.addEventListener('click', validate);