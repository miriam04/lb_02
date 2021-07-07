/* Formulartypen ID
*/

const form = document.getElementById('form');
const nachname = document.getElementById('nachname');
const email = document.getElementById('email');
const personenAnzahl = document.getElementById('personenanzahl')
const passwort = document.getElementById('passwort');
const datum = document.getElementById('datum');

// Fehlermeldung 
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

// Rahmen grün
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

// E-Mailadresse Gültigkeit überprüfen
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
    return true
  } else {
    showError(input, 'Email ist ungültig');
  }
}


function checkIsNummer(input) {
    if(!isNaN(input.value)) {
      showSuccess(input);
      return true
    } else {
      showError(input, 'Bitte eine Zahl eingeben');
    }
}

// notwendige Felder überprüfen
function checkRequired(inputArr) {
  let isRequired = false;
  inputArr.forEach(function(input) {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} ist erforderlich`);
      isRequired = true;
    } else {
      showSuccess(input);
    }
  });

  return isRequired;
}

// Zeichenlänge überprüfen
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
        input,
        `${getFieldName(input)} muss mindestens ${min} Zeichen haben`
    );
  } else if (input.value.length > max) {
    showError(
        input,
        `${getFieldName(input)} muss weniger als ${max} Zeichen haben`
    );
  } else {
    showSuccess(input);
    return true;
  }
}

// Funktion Feldnamen automatisch übernehmen
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function handleSuccess() {
    form.innerHTML = '<h1>Vielen Dank für Ihre Tischreservation!</h1>'
}

function validateForm(){
  if(!checkRequired([nachname, email, passwort, datum, personenAnzahl])){
      let statusList = []
    //Validierung Zeichenlänge
    statusList.push(checkLength(nachname, 3, 15));
    statusList.push(checkLength(passwort, 6, 25));
    statusList.push(checkEmail(email));
    console.log(personenAnzahl.value)
    statusList.push(checkIsNummer(personenAnzahl))

  //Erfolgsmeldung
      statusList = statusList.filter(x => x !== true)

      if(statusList.length == 0) {
          handleSuccess()
      }
  }
}

form.addEventListener('submit', function(e) {
  //https://www.w3schools.com/jsref/event_preventdefault.asp
  e.preventDefault();
  //First validate form
  validateForm();
});