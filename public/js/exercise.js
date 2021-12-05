// haconst newBtnHandler = async (event) => {
const newExerciseFormHandler = async (event) => {
    document.location.replace('/api/exercise/new');
};

// handle event to submit new exercise data
const newExerciseSubmitHandler = async (event) => {
  event.preventDefault();

  const date = document.querySelector("#date").value.trim();
  const exerciseDetail = document.querySelector("#exercise-detail").value.trim().split(' ');
  const weight = document.querySelector("#weight").value.trim();
  const duration = document.querySelector("#duration").value.trim();

  const exercise_type = exerciseDetail[0];
  const exercise_name = exerciseDetail[1];

  // console.log(date);
  // console.log(exercise_type);
  // console.log(exercise_name);
  // console.log(duration);

  try {
    const resExercise = await fetch(`/api/exercise/MET/${exercise_name}/${exercise_type}`, {
      method: 'GET',
    });

    const user_id = event.target.getAttribute('data-id');
    console.log(user_id);

    const resUserJson = await fetch(`/api/users`, {
      method: 'GET',
    });

    const resData  = await resExercise.json();
    // console.log(resData);
    const resUser = await resUserJson.json();
    let total_calories_burnt = resUser.totalCalories;

    console.log("res json user data: " + resUser);

    console.log("total Calories: " + total_calories_burnt);

    const MET = resData.MET;

    const exercise_id = resData.ID;
    //logic to calculate calories_burnt:
    //formular: MET*weight in kg=calories/hour
    // Calculate the new exercises calories burnt based on Met and weight and duration
    const calories_burnt = MET * weight * (duration /60);
    // console.log(calories_burnt);

    total_calories_burnt += calories_burnt;

    if (total_calories_burnt) {
      const updateUserCalories = await fetch('/api/users/', {
        method: 'PUT',
        body: JSON.stringify({ total_calories_burnt }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (updateUserCalories.ok) {
        // return to dashboard
        console.log("User total calories updated succesfully!");
      } else {
        alert("User total calories failed to update!");
      }
    }

    // POST to update exercise record data
    if (date && exercise_name && exercise_type && duration && calories_burnt) {
      const response = await fetch('/api/exercise/new', {
        method: 'POST',
        body: JSON.stringify({ date, exercise_name, exercise_type, duration, calories_burnt, exercise_id }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // return to dashboard
        document.location.replace('/dashboard');
      } else {
        alert("New exercise failed to create!");
      }
    };

  } catch (err) {
    console.log(err);
  };
  

  
};

const newExerciseForm = document.querySelector('.new-exercise-btn');

const newExerciseSubmit = document.querySelector('.new-exercise-form');

if (newExerciseForm) {
  newExerciseForm.addEventListener('click', newExerciseFormHandler)
}

if (newExerciseSubmit) {
  newExerciseSubmit.addEventListener('submit', newExerciseSubmitHandler);
};

// Feature to be implemented
// handle event to display edit current exercise record form
// const editExerciseHandler = async (event) => {
//   event.preventDefault();

//   const id = event.target.getAttribute('data-id');

//   document.location.replace(`/api/exercise/edit/${id}`);
// };

// Feature to be implemented
// handle event to update the Exercise record
// const updateExerciseSubmitHandler = async (event) => {

//   const id = event.target.getAttribute('data-id');
//   const name = document.querySelector("#name").value.trim();
//   const duration = document.querySelector("#content").value.trim();

//   const response = await fetch(`/api/exercise/update/${id}`, {
//     method: 'POST',
//     body: JSON.stringify({ name, duration }),
//     headers: { 'Content-Type': 'application/json' },
//   });

//   if (response.ok) {
//     // Refresh page to display updated blog
//     document.location.replace(`/blog/${id}`);
//   } else {
//     alert("Exercise not found!")
//   }
// };

// Feature to be implemented
// handle event to delete current blog
// Feature to be implemented

// Listen to new exericse form submit event

// Feature to be implemented
// const editExercise = document.querySelectorAll('.edit-exercise-btn');
// Feature to be implemented
// const updateExerciseSubmit = document.querySelector('.udpate-exercise-form');
// Feature to be implemented
// const delExercise = document.querySelectorAll('.del-exercise-btn');

// Feature to be implemented
// if (editExercise) {
//   editExercise.forEach(btn => {
//     btn.addEventListener("click", editExerciseHandler);
//   });
// };

// Feature to be implemented
// if (updateExerciseSubmit) {
//   updateExerciseSubmit.addEventListener('submit', updateExerciseSubmitHandler);
// };

// Feature to be implemented
// if (delExercise) {
//   delExercise.forEach(btn => {
//     btn.addEventListener("click", delExerciseHandler);
//   });
// };