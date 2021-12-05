// Handle the event to add a new user to database
const signupFormHandler = async (event) => {
  event.preventDefault();

  const firstName = document.querySelector("#first-name-signup").value.trim();
  const lastName = document.querySelector("#last-name-signup").value.trim();
  const email = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();
  const passwordConfirmation = document.querySelector("#password-signup-confirm").value.trim();
  const age = document.querySelector("#age-signup").value.trim();
  const weight = document.querySelector("#weight-signup").value.trim();

  console.log(firstName, lastName, email, password, weight, age);

  if (password !== passwordConfirmation) {
    alert('Input password did not match!');
    document.location.replace(`/signup`);
  }

  if (firstName && lastName && email && password && age && weight) {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ firstName, lastName, email, password, weight, age}),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // const user_id = req.session.user_id;
        document.location.replace(`/dashboard`);
      } else {
        alert(response.statusText);
      }
    } catch (err) {
      console.log(err);
    };
  } else {
    alert('Please complete all required filed.');
  }
};

// Handle the event to edit a user's profile info
const editFormHandler = async (event) => {
  event.preventDefault();

  // Get the current logged in user id
  const id = event.target.getAttribute('data-id');
  // console.log("ID from attribute target: " + id);

  const first_name = document.querySelector("#first-name-edit").value.trim();
  const last_name = document.querySelector("#last-name-edit").value.trim();
  const weight = document.querySelector("#weight-edit").value.trim();
  const age = document.querySelector("#age-edit").value.trim();

  // console.log(first_name, last_name, weight, age)

  // Calling the user put route to update user record.
  if (first_name && last_name && age && weight) {
    const response = await fetch('/api/users', {
      method: 'PUT',
      body: JSON.stringify({ first_name, last_name, age, weight }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace(`/dashboard`);
    } else {
      alert(response.statusText);
    }
  } else {
    alert('Please complete all required filed.');
  }
};

// Select the element on the form
const signUpForm = document.querySelector(".signup-form");
const editProfileForm = document.querySelector(".edit-profile-form");

// Add event listener to the elements
if (signUpForm) {
  signUpForm.addEventListener("submit", signupFormHandler);
};

if (editProfileForm) {
  editProfileForm.addEventListener("submit", editFormHandler);
};
