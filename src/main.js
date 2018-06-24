/* Declaro el botón para el primer evento que nos pasará a la segunda pantalla */
const btn = document.getElementById('access');
const btnSearch = document.getElementById('btnSearch');
let users = [];
let progress = [];
let courses = [];
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
    container.innerHTML += `<p>${user.name + JSON.stringify(user.stats.exercises) + JSON.stringify(user.stats.quizzes) + JSON.stringify(user.stats.reads) }</p>`;
  });
});