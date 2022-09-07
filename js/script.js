const mainForm = document.querySelector('#main-form');
const nameField = document.querySelector('#name');
const emailField = document.querySelector('#email');
const titleField = document.querySelector('#title');
const titleFieldDescription = document.querySelector('#other-job-role');
const shirtFieldDesign = document.querySelector('#design');
const shirtFieldColor = document.querySelector('#color');
const activities = document.querySelector('#activities');
const checkboxes = document.querySelectorAll('input[type = "checkbox"]');
const activitiesTotal = document.querySelector('#activities-cost');
const paymentOptions = document.querySelector('#payment');
const cardNumberField = document.querySelector('#cc-num');
const zipCodeField = document.querySelector('#zip');
const cvvField = document.querySelector('#cvv');
const creditCard = document.querySelector('#credit-card');
const payPal = document.querySelector('#paypal');
const bitcoin = document.querySelector('#bitcoin');
const submit = document.querySelector('#main-form [type="submit"]');

// Rwegular Expressions
const nameRegEx = /^[A-Za-z]+ [A-Za-z-]+$/;
const emailRegEx = /^\w+@[A-Za-z]+\.(com|net|org|edu)$/;
const creditCardRegEx =
  /^(\d{4}[ -]?\d{4}[ -]?\d{4}[ -]?\d{4})$|^(\d{4}[ -]?\d{3}[ -]?\d{3}[ -]?\d{3})$/;
const invalidCreditCardInfo = /\D/;
const zipRegEx = /^\d{5}$/;
const cvvRegEx = /^\d{3}$/;

let currentSum = 0;

// On load controls
nameField.focus();
titleFieldDescription.style.display = 'none';
shirtFieldColor.disabled = true;
paymentOptions.selectedIndex = 1;
payPal.style.display = 'none';
bitcoin.style.display = 'none';

// Activity field target controls
for (let i = 0; i < checkboxes.length; i++) {
  checkboxes[i].addEventListener('focus', e => {
    e.target.parentNode.style.borderColor = 'blue';
  });
  checkboxes[i].addEventListener('blur', e => {
    e.target.parentNode.style.borderColor = 'rgba(36, 28, 21, 0.2)';
  });
}

// Job field controls
titleField.addEventListener('change', e =>
  e.target.value === 'other'
    ? (titleFieldDescription.style.display = 'block')
    : (titleFieldDescription.style.display = 'none')
);

// Shirt field controls
function shirtColorSelector() {
  for (let i = 0; i < shirtFieldColor.children.length; i++) {
    const currentTarget = shirtFieldColor.children[i];
    currentTarget.getAttribute('data-theme') === shirtFieldDesign.value
      ? (currentTarget.style.display = 'initial')
      : (currentTarget.style.display = 'none');
  }
  shirtFieldColor.selectedIndex = 0;
}

shirtFieldDesign.addEventListener('change', e => {
  shirtFieldColor.disabled = false;
  shirtFieldColor.children[0].innerHTML = 'Choose your color';
  shirtColorSelector();
});

// Register controls
activities.addEventListener('change', e => {
  // Pricing controls
  const price = +e.target.getAttribute('data-cost');
  if (e.target.checked) {
    currentSum += price;
    e.target.parentNode.style.borderColor = 'green';
  } else {
    currentSum -= price;
    e.target.parentNode.style.borderColor = 'rgba(36, 28, 21, 0.2)';
  }
  activitiesTotal.innerHTML = `Total: $${currentSum}`;

  // Prevents overlapping activities in checkboxes
  for (let i = 0; i < e.target.parentNode.parentNode.children.length; i++) {
    const currentTarget =
      e.target.parentNode.parentNode.children[i].children[0];
    if (
      e.target.checked &&
      currentTarget.getAttribute('data-day-and-time') ===
        e.target.getAttribute('data-day-and-time') &&
      currentTarget !== e.target
    ) {
      currentTarget.disabled = true;
    } else if (
      e.target.checked === false &&
      currentTarget.getAttribute('data-day-and-time') ===
        e.target.getAttribute('data-day-and-time')
    ) {
      currentTarget.disabled = false;
    }
  }
});

// Payment info controls
paymentOptions.addEventListener('change', e => {
  switch (paymentOptions.value) {
    case 'credit-card':
      creditCard.style.display = 'block';
      paypal.style.display = 'none';
      bitcoin.style.display = 'none';
      break;
    case 'paypal':
      paypal.style.display = 'block';
      creditCard.style.display = 'none';
      bitcoin.style.display = 'none';
      break;
    case 'bitcoin':
      bitcoin.style.display = 'block';
      creditCard.style.display = 'none';
      paypal.style.display = 'none';
      break;
  }
});

// Form validation controls
function testValueValidity(expression, testField) {
  testField.addEventListener('input', e => {
    if (e.target === testField && expression.test(testField.value) === false) {
      testField.style.borderColor = 'orange';
    } else {
      testField.style.borderColor = 'green';
    }
  });
}
testValueValidity(nameRegEx, nameField);
testValueValidity(emailRegEx, emailField);
testValueValidity(creditCardRegEx, cardNumberField);
testValueValidity(zipRegEx, zipCodeField);
testValueValidity(cvvRegEx, cvvField);

// Checks that information is valid before submitting
mainForm.addEventListener('submit', e => {
  function testValidSubmission(expression, testField, message) {
    if (expression.test(testField.value) === false) {
      e.preventDefault();
      testField.parentNode.classList.add('not-valid');
      testField.parentNode.classList.remove('valid');
      testField.style.borderColor = 'orange';
      if (testField !== cardNumberField) {
        alert(`Please make sure to enter ${message}.`);
      }
    }
    if (expression.test(testField.value)) {
      testField.parentNode.classList.add('valid');
      testField.parentNode.classList.remove('not-valid');
    }
  }

  // Basic info validation
  testValidSubmission(nameRegEx, nameField, 'your name');
  testValidSubmission(emailRegEx, emailField, 'a proper email');

  // Activity checkbox validation
  if (currentSum === 0) {
    e.preventDefault();
    alert('Please select at least one activity.');
  }

  // Credit card validation
  if (paymentOptions.value === 'credit-card') {
    testValidSubmission(
      creditCardRegEx,
      cardNumberField,
      'correct credit card info'
    );
    testValidSubmission(zipRegEx, zipCodeField, 'a valid zip code');
    testValidSubmission(cvvRegEx, cvvField, 'a proper CVV code');
  }
  if (invalidCreditCardInfo.test(cardNumberField.value)) {
    alert('Please only use digits for your card number.');
  } else if (
    cardNumberField.value.length < 13 ||
    (cardNumberField.value.length > 13 && cardNumberField.value.length < 16) ||
    cardNumberField.value.length > 16
  ) {
    alert(
      'Please make sure to enter either a 13 or 16 digit credit card number.'
    );
  }
});
