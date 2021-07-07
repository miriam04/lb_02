/* Aufgabe:
  Fügen Sie die notwendigen Selektoren für
  firstname, lastname, mobile, password2
*/

const form = document.getElementById('form');
const username = document.getElementById('nachname');
const email = document.getElementById('email');
const password = document.getElementById('passwort');
const birthday = document.getElementById('tischreservierungsdatum');

// Show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

// Show success outline
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

// Check email is valid
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
    return true
  } else {
    showError(input, 'Email ist ungültig');
  }
}

/* Aufgabe:
    Validieren Sie die Mobile-Nummer ähnlich wie bei der Email mit einer
    Regular expression (regex). Für eine geeignete regex suchen Sie
    im Internet nach "javascript regular expression for mobile number".
*/
// Check phone is valid


// Check required fields
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

// Check input length
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

/* Aufgabe:
    Validieren Sie, ob die beiden Passwörter übereinstimmen.
    Falls sie nicht übereinstimmen, geben Sie (ähnlich wie in den anderen Beispielen)
    eine Fehlermeldung dem Formular aus.
*/
// Check passwords match

// Get fieldname
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function handleSuccess() {
    form.innerHTML = '<h1>Vielen Dank fürs ausfüllen!</h1>'
}

function validateForm(){
  if(!checkRequired([username, email, password, birthday])){
      let statusList = []
    //Aufgabe: Validierung der Länge für Vorname (2 bis 20) und Nachname (2 bis 50)
    statusList.push(checkLength(username, 3, 15));
    statusList.push(checkLength(password, 6, 25));
    /* Aufgabe:
      Validierung der Telefonnumer ähnlich wie bei der Email mit einer
      Regular expression (regex). Für eine geeignete regex suchen Sie
      im Internet nach "javascript regular expression for mobile number"
    * */
      statusList.push(checkEmail(email));
    /* Aufgabe:
      Validierung Sie die beiden Passwörter, damit password
      mit password2 übereinstimmt.
    * */

      statusList = statusList.filter(x => x !== true)

      if(statusList.length == 0) {
          handleSuccess()
      }
  }
}


// Event listeners
form.addEventListener('submit', function(e) {
  //https://www.w3schools.com/jsref/event_preventdefault.asp
  e.preventDefault();
  //First validate form
  validateForm();
});