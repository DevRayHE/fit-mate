const signupFormHandler = async (event) => {
  event.preventDefault();

  const firstName = document.querySelector("#first-name-signup").value.trim();
  const lastName = document.querySelector("#last-name-signup").value.trim();
  const weight = document.querySelector("#weight-signup").value.trim();
  const age = document.querySelector("#age-signup").value.trim();
  const email = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();

  if (username && email && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ firstName, lastName, weight, age, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);