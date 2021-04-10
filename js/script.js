const nameField = document.querySelector('#name');
const titleField = document.querySelector('#title');
const titleFieldDescription = document.querySelector('#other-job-role')
const shirtFieldDesign = document.querySelector('#design');
const shirtFieldColor = document.querySelector('#color');
const activities = document.querySelector('#activities');
const activitiesTotal = document.querySelector('#activities-cost');

let currentSum = 0;

console.log(activitiesTotal);

// On load controls
nameField.focus();
titleFieldDescription.style.display = 'none';
shirtFieldColor.disabled = true;


// Job field controls
titleField.addEventListener ( 'change', e => e.target.value === 'other' ? titleFieldDescription.style.display = 'block' : titleFieldDescription.style.display = 'none' )


// Shirt field controls
function shirtColorSelector(shirtType) {
    for ( let i = 0; i < shirtFieldColor.children.length; i++) {
        if ( shirtFieldColor.children[i].innerHTML.includes(shirtType) ) {
            shirtFieldColor.children[i].style.display = 'initial'
        } else {
            shirtFieldColor.children[i].style.display = 'none'
        }
    }
}

shirtFieldDesign.addEventListener ( 'change', e => {
    shirtFieldColor.disabled = false;
    shirtFieldColor.children[0].innerHTML = 'Choose your color';
    if ( e.target.value === 'js puns' ) {
        shirtColorSelector('JS Puns')
    }
    if ( e.target.value === 'heart js' ) {
        shirtColorSelector('I')
    }
})


// Register controls
activities.addEventListener('change', e => {
    // Pricing controls
    const price = +e.target.getAttribute('data-cost');
    e.target.checked === true ? currentSum += price : currentSum -= price;
    activitiesTotal.innerHTML = `Total: $${currentSum}`

    // Activity time controls
    for (let i = 0; i < e.target.parentNode.parentNode.children.length; i++) {
        if ( e.target.checked && ( e.target.parentNode.parentNode.children[i].children[0].getAttribute('data-day-and-time') === e.target.getAttribute('data-day-and-time') && e.target.parentNode.parentNode.children[i].children[0] !== e.target ) ){
            e.target.parentNode.parentNode.children[i].children[0].disabled = true;
        } else if ( e.target.checked === false && ( e.target.parentNode.parentNode.children[i].children[0].getAttribute('data-day-and-time') === e.target.getAttribute('data-day-and-time') && e.target.parentNode.parentNode.children[i].children[0] !== e.target )) {
            e.target.parentNode.parentNode.children[i].children[0].disabled = false;
        }
    }
})