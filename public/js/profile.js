// Handle the event to add a new user to database
const signupFormHandler = async (event) => {
  event.preventDefault();

  const firstName = document.querySelector("#first-name-signup").value.trim();
  const lastName = document.querySelector("#last-name-signup").value.trim();
  const email = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();
  const height = document.querySelector("#height-signup").value.trim();
  const weight = document.querySelector("#weight-signup").value.trim();

  console.log(firstName, lastName, email, password, height, weight)

  if (firstName && lastName && email && password && height && weight) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ firstName, lastName, email, password, height, weight }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  } else {
    alert('Please complete all required filed.');
  }
};

// handle event to display edit current user profile info form
const editBtnHandler = async (event) => {
  event.preventDefault();

  const id = event.target.getAttribute('data-id');

  document.location.replace(`/dashboard/edit/${id}`);
};

// Handle the event to edit a user's profile info
const editFormHandler = async (event) => {
  event.preventDefault();

  const id = event.target.getAttribute('data-id');

  const firstName = document.querySelector("#first-name-signup").value.trim();
  const lastName = document.querySelector("#last-name-signup").value.trim();
  const email = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();
  const height = document.querySelector("#height-signup").value.trim();
  const weight = document.querySelector("#weight-signup").value.trim();

  console.log(firstName, lastName, email, password, height, weight)

  if (firstName && lastName && email && password && height && weight) {
    const response = await fetch(`/api/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ firstName, lastName, email, password, height, weight }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  } else {
    alert('Please complete all required filed.');
  }
};

const signUpForm = document.querySelector(".signup-form");
const editBtn = document.querySelector(".edit-btn");
const editProfileForm = document.querySelector(".edit-profile-form");

if (signUpForm) {
  signUpForm.addEventListener("submit", signupFormHandler);
};

if (editBtn) {
  editBtn.addEventListener("click", editBtnHandler);
};

if (editProfileForm) {
  editProfileForm.addEventListener("submit", editFormHandler);
};