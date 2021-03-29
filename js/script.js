const nameField = document.querySelector('#name');
const titleField = document.querySelector('#title');
const titleFieldDescription = document.querySelector('#other-job-role')
const shirtFieldDesign = document.querySelector('#design');
const shirtFieldColor = document.querySelector('#color');

console.log(titleField.querySelectorAll('option'));
console.log(shirtFieldColor);

// On load controls
nameField.focus();
titleFieldDescription.style.display = 'none';
shirtFieldColor.disabled = true;


// Job field controls
titleField.addEventListener ( 'change', e => e.target.value === 'other' ? titleFieldDescription.style.display = 'block' : titleFieldDescription.style.display = 'none' )


// Shirt field controls
shirtFieldDesign.addEventListener ('change', e => {
    shirtFieldColor.disabled = false;
    if (e.target.value === 'js puns') {
        shirtFieldColor.querySelector('option [data-theme = "heart js"]').style.display = 'hidden'
    }
})