const mainForm = document.querySelector('#main-form');
const nameField = document.querySelector('#name');
const emailField = document.querySelector('#email');
const titleField = document.querySelector('#title');
const titleFieldDescription = document.querySelector('#other-job-role')
const shirtFieldDesign = document.querySelector('#design');
const shirtFieldColor = document.querySelector('#color');
const activities = document.querySelector('#activities');
const activitiesTotal = document.querySelector('#activities-cost');
const paymentOptions = document.querySelector('#payment')
const cardNumberField = document.querySelector('#cc-num')
const zipCodeField = document.querySelector('#zip')
const cvvField = document.querySelector('#cvv')
const creditCard = document.querySelector('#credit-card')
const payPal = document.querySelector('#paypal')
const bitcoin = document.querySelector('#bitcoin')
const submit = document.querySelector('#main-form [type="submit"]')

let currentSum = 0;


// On load controls
nameField.focus();
titleFieldDescription.style.display = 'none';
shirtFieldColor.disabled = true;
paymentOptions.selectedIndex = 1;
payPal.style.display = 'none';
bitcoin.style.display = 'none';


// Job field controls
titleField.addEventListener ( 'change', e => e.target.value === 'other' ? titleFieldDescription.style.display = 'block' : titleFieldDescription.style.display = 'none' );


// Shirt field controls
function shirtColorSelector() {
    for ( let i = 0; i < shirtFieldColor.children.length; i++) {
        const currentTarget = shirtFieldColor.children[i]
        currentTarget.getAttribute('data-theme') === shirtFieldDesign.value ? currentTarget.style.display = 'initial' : currentTarget.style.display = 'none';
    }
    shirtFieldColor.selectedIndex = 0;
}

shirtFieldDesign.addEventListener ( 'change', e => {
    shirtFieldColor.disabled = false;
    shirtFieldColor.children[0].innerHTML = 'Choose your color';
    shirtColorSelector()
})


// Register controls
activities.addEventListener('change', e => {
    // Pricing controls
    const price = +e.target.getAttribute('data-cost');
    e.target.checked ? currentSum += price : currentSum -= price;
    activitiesTotal.innerHTML = `Total: $${currentSum}`

    // Activity checkbox controls
    for (let i = 0; i < e.target.parentNode.parentNode.children.length; i++) {
        const currentTarget = e.target.parentNode.parentNode.children[i].children[0]
        if ( e.target.checked && ( currentTarget.getAttribute('data-day-and-time') === e.target.getAttribute('data-day-and-time') && currentTarget !== e.target ) ){
            currentTarget.disabled = true;
        } else if ( e.target.checked === false && currentTarget.getAttribute('data-day-and-time') === e.target.getAttribute('data-day-and-time') ) {
            currentTarget.disabled = false;
        }
    }
})


// Payment info controls
paymentOptions.addEventListener ('change', e => {
    switch ( paymentOptions.value ) {
        case 'credit-card' :
            creditCard.style.display = 'block'
            paypal.style.display = 'none';
            bitcoin.style.display = 'none';
            break;
        case 'paypal' :
            paypal.style.display = 'block'
            creditCard.style.display = 'none';
            bitcoin.style.display = 'none';
            break;
        case 'bitcoin' :
            bitcoin.style.display = 'block'
            creditCard.style.display = 'none';
            paypal.style.display = 'none';
            break;
    }
})


// Form validation controls
mainForm.addEventListener('click', event => {
    if (event.target === submit) {
        const nameRegEx = /^[A-Za-z]+ [A-Za-z-]+$/;
        const emailRegEx = /^\w+@[A-Za-z]+\.(com|net|org|edu)$/;
        const creditCardRegEx = /^\d{4}[ -]\d{4}[ -]\d{4}[ -]\d{4}$/;
        if( nameRegEx.test( nameField.value ) || emailRegEx.test( emailField.value ) ) {
            event.preventDefault;
            console.log('hi')
        }
    }
})