/* Declaro los botones */
const btn = document.getElementById('access');
const btnSearch = document.getElementById('btnSearch');
/*Declaro las variables Globales*/
let users = [];
let progress = [];
let courses = [];
let nameTable = document.getElementById('nombre');
let generalPercentTable = document.getElementById('porcentajeGeneral');
let lecturesTable = document.getElementById('lecturas');
let lecturesCompletedTable = document.getElementById('lecturasCompletadas');
let lecturesPercentTable = document.getElementById('porcentajeLecturas');
let quizzesTable = document.getElementById('quizzes');
let quizzesCompletedTable = document.getElementById('quizzesCompletados');
let quizzesPercentTable = document.getElementById('porcentajeQuizzes');
let exercisesTable = document.getElementById('ejercicios');
let exercisesCompletedTable = document.getElementById('ejerciciosCompletados');
let exercisesPercentTable = document.getElementById('porcentajeEjercicios');

btn.addEventListener('click', () => {
  const boxTwo = document.getElementById('caja-2');
  const boxOne = document.getElementById('caja-1');
  boxTwo.style.display = 'block';
  boxOne.style.display = 'none';
});
const usersJSON = '../data/cohorts/lim-2018-03-pre-core-pw/users.json';
const progressJson = '../data/cohorts/lim-2018-03-pre-core-pw/progress.json';
const cohortJson = '../data/cohorts.json';
const container = document.getElementById('infoStudent');
Promise.all([ // Ejecuta todas las llamadas de manera paralela
  fetch(usersJSON),
  fetch(progressJson),
  fetch(cohortJson)
]).then(
  (responses) => { // Responde a todas las promesas
    return Promise.all(responses.map((response) => { // me devolvía un arreglo.json de los 3
      return response.json();
      console.log(response.json);
    }));
  }
).then((responseJsons) => { // Arreglo de respuestas en json
  users = responseJsons[0];
  progress = Object.entries(responseJsons[1]);
  courses = Object.entries(responseJsons[2]);
});

btnSearch.addEventListener('click', () => {
  computeUsersStats(users, progress, courses);
  users.forEach((user) => {
    if (user.stats.exercises.length === 0 && user.stats.quizzes.length === 0 && user.stats.reads.length === 0 && user.stats.percentTotal.length === 0) {
      user.stats.percentTotal = 0;
      user.stats.exercises = {};
      user.stats.reads = {};
      user.stats.quizzes = {};
    } else {
      container.innerHTML += `<p>${user.name.toUpperCase() + '<br>Porcentaje General: ' + user.stats.percentTotal + '%' + '<br>Info Ejercicios: ' + JSON.stringify(user.stats.exercises) + '<br>Info Quizzes: ' + JSON.stringify(user.stats.quizzes) + '<br>Info Lecturas: ' + JSON.stringify(user.stats.reads) }</p>`;
    }
  });
});