window.computeUsersStats = (users, progress, courses) => {
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
      return Promise.all(responses.map((response) => { //me devolvía un arreglo.json de los 3
        return response.json();
        console.log(response.json);
      }));
    }
  ).then((responseJsons) => { // Arreglo de respuestas en json
    responseJsons[0].forEach((estudiante) => {
      const users = Object.entries(responseJsons[0]);
      const progress = Object.entries(responseJsons[1]);
      const courses = Object.entries(responseJsons[2]);
      const progresoEstudiante = progress.find(elemento => elemento[0] === estudiante.id);

      console.log(progresoEstudiante);
      //return container.innerHTML += `<p>${estudiante.name + JSON.stringify(progresoEstudiante)}</p>`;

      let lectures = 0;
      let lecturesCompleted = 0;
      Object.entries(progresoEstudiante).forEach((progEst) => {
        if (progEst.type === 'read') {
          lectures++;
        }
        if (progEst.completed === 1) {
          lecturesCompleted++;
        }
        let lecturesPercent = lecturesCompleted / lectures;
      });


      /*let lectures = Object.entries(progresoEstudiante).filter(x => x[1].type === 'read').length;
      let lecturesCompleted = Object.entries(progresoEstudiante).filter(x => x[1].type === 'read' && x[1].completed === 1).length;
      let lecturesPercent = lecturesCompleted / lectures; */



      return container.innerHTML += `<p>${estudiante.name.toUpperCase() + lectures + lecturesCompleted}</p>`;
    });
  });

  /*
      return let stats = new Object();
      stats.name = [];
      stats.exercises = {};
      stats.reads = {};
      stats.quizzes = {};
      */

  /*
  fetch('../data/cohorts/lim-2018-03-pre-core-pw/users.json')
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Error en búsqueda');
      }
    }).then((usersJson) => {
      console.log(usersJson);
      Object.entries(usersJson).forEach((jsonElement) => {
        Object.entries(jsonElement).forEach((name) => {
          let myJSON = JSON.stringify(usersJson);
          document.getElementById('infoStudent').innerHTML = myJSON;
        });
      });
    });*/
};

window.sortUsers = (users, orderB, orderDirection) => {

};

window.filterUsers = (users, search) => {

};

window.processCohortData = (options) => {

};