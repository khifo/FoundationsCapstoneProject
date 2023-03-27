
var dropdownMenus = document.getElementsByClassName("dropdown-menu");

for (var i = 0; i < dropdownMenus.length; i++) {
  var dropdown = dropdownMenus[i].parentNode;
  dropdown.addEventListener("mouseenter", function() {
    this.querySelector(".dropdown-menu").style.display = "block";
  });
  dropdown.addEventListener("mouseleave", function() {
    this.querySelector(".dropdown-menu").style.display = "none";
  });
}

const payButton = document.getElementById("pay-button");

payButton.addEventListener("click", () => {
  alert("Payment successful!");
});

const registrationList = document.querySelector('#registration-list');
const registrationForm = document.querySelector('#registration-form');
const registrationIdInput = document.querySelector('#registration-id');
const registrationNameInput = document.querySelector('#registration-name');
const registrationEmailInput = document.querySelector('#registration-email');
const registrationPhoneInput = document.querySelector('#registration-phone');

function createRegistration(data) {
  fetch('/registrations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(newRegistration => {
      getRegistrations();
      registrationForm.reset();
    });
}

registrationForm.addEventListener('submit', event => {
  event.preventDefault();
  const id = registrationIdInput.value;
  const name = registrationNameInput.value;
  const email = registrationEmailInput.value;
  const phone = registrationPhoneInput.value;

  const data = { id, name, email, phone };
  createRegistration(data);
});

function getRegistrations() {
  fetch('/registrations')
    .then(response => response.json())
    .then(registrations => {
      registrationList.innerHTML = '';
      registrations.forEach(registration => {
        const listItem = document.createElement('li');
        listItem.textContent = `${registration.name} (${registration.email})`;
        registrationList.appendChild(listItem);
      });
    });
}

function getRegistrationById(id) {
  fetch(`/registrations/${id}`)
    .then(response => response.json())
    .then(registration => {
      registrationIdInput.value = registration.id;
      registrationNameInput.value = registration.name;
      registrationEmailInput.value = registration.email;
      registrationPhoneInput.value = registration.phone;
    });
}

function updateRegistrationById(id, data) {
  fetch(`/registrations/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(updatedRegistration => {
      getRegistrations();
      registrationForm.reset();
    });
}

function deleteRegistrationById(id) {
  fetch(`/registrations/${id}`, {
    method: 'DELETE'
  })
    .then(response => response.json())
    .then(deletedRegistration => {
      getRegistrations();
      registrationForm.reset();
    });
}

getRegistrations();

registrationForm.addEventListener('submit', event => {
  event.preventDefault(); 
  const id = registrationIdInput.value;
  const name = registrationNameInput.value;
  const email = registrationEmailInput.value;
  const phone = registrationPhoneInput.value;
})