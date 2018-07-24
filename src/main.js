/* Declaro los botones */
const btn = document.getElementById('access');
const btnSearch = document.getElementById('btnSearch');
const searchInput = document.getElementById('searchInput');

/* Declaro las variables Globales */

let users = null;
let progress = null;
let courses = null;
let nameInfo = document.getElementById('nombre');
let generalPercentInfo = document.getElementById('porcentajeGeneral');
let lecturesInfo = document.getElementById('lecturas');
let lecturesCompletedInfo = document.getElementById('lecturasCompletadas');
let lecturesPercentInfo = document.getElementById('porcentajeLecturas');
let quizzesInfo = document.getElementById('quizzes');
let quizzesCompletedInfo = document.getElementById('quizzesCompletados');
let quizzesPercentInfo = document.getElementById('porcentajeQuizzes');
let exercisesInfo = document.getElementById('ejercicios');
let exercisesCompletedInfo = document.getElementById('ejerciciosCompletados');
let exercisesPercentTable = document.getElementById('porcentajeEjercicios');

btn.addEventListener('click', () => {
  const boxTwo = document.getElementById('caja-2');
  const boxOne = document.getElementById('caja-1');
  const boxThree = document.getElementById('caja-3');
  boxTwo.style.display = 'block';
  boxOne.style.display = 'none';
  boxThree.style.display = 'block';
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
      nameInfo.innerHTML += `<tr>
    <td>${user.name.toUpperCase()}</td>
    <td>Porcentaje General${JSON.stringify(user.stats.percentTotal)}%</td>
    <td>Ejercicios${JSON.stringify(user.stats.exercises.total)}</td>
    <td>Ejercicios Completados${JSON.stringify(user.stats.exercises.completed)}</td>
    <td>Porcentaje Completitud${JSON.stringify(user.stats.exercises.percent)}%</td>
    <td>Quizzes${JSON.stringify(user.stats.quizzes.total)}%</td>
    <td>Quizzes Completados${JSON.stringify(user.stats.quizzes.completed)}</td>
    <td>Porcentaje Completitud${JSON.stringify(user.stats.quizzes.total)}%</td>
    <td>Info Lecturas${JSON.stringify(user.stats.reads.total)}</td>
    <td>Lecturas Completadas${JSON.stringify(user.stats.reads.completed)}</td>
    <td>Porcentaje Completitud${JSON.stringify(user.stats.reads.completed)}</td>
    </tr>`;
    }
  });
});

function searchingStudents() {
  const search = searchInput.value;
  const filterUserReady = window.filterUsers(users, search);
  nameInfo.innerHTML = '';
  filterUserReady.forEach(user => {
    nameInfo.innerHTML += `<tr>
      <td>${user.name.toUpperCase()}</td>
    <td>Porcentaje General${JSON.stringify(user.stats.percentTotal)}%</td>
    <td>Ejercicios${JSON.stringify(user.stats.exercises.total)}</td>
    <td>Ejercicios Completados${JSON.stringify(user.stats.exercises.completed)}</td>
    <td>Porcentaje Completitud${JSON.stringify(user.stats.exercises.percent)}%</td>
    <td>Quizzes${JSON.stringify(user.stats.quizzes.total)}%</td>
    <td>Quizzes Completados${JSON.stringify(user.stats.quizzes.completed)}</td>
    <td>Porcentaje Completitud${JSON.stringify(user.stats.quizzes.total)}%</td>
    <td>Info Lecturas${JSON.stringify(user.stats.reads.total)}</td>
    <td>Lecturas Completadas${JSON.stringify(user.stats.reads.completed)}</td>
    <td>Porcentaje Completitud${JSON.stringify(user.stats.reads.completed)}</td>
    </tr>`;
  });
};