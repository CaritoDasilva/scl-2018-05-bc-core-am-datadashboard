window.computeUsersStats = (users, progress, courses) => {
  users.forEach((estudiante) => {

    const progresoEstudiante = progress.find(progre => progre[0] === estudiante.id)[1];

    let percentGral = 0;
    let lectures = 0;
    let lecturesCompleted = 0;
    let lecturesPercent = 0;
    let quizzes = 0;
    let quizzesCompleted = 0;
    let quizzesPercent = 0;
    let exercises = 0;
    let exercisesCompleted = 0;
    let exercisesPercent = 0;

    let i;
    for (i in progresoEstudiante) {
      let element = progresoEstudiante[i];
      let unit;

      for (unit of Object.values(element.units)) {
        for (let part of Object.values(unit.parts)) {
          if (part.type === 'read') {
            lectures++;
          }
          if (part.length === 0) {
            lectures = 0;
            percentGral = 0;
          }
          if (part.type === 'read' &&
            part.completed === 1) {
            lecturesCompleted++;
          }

          lecturesPercent = Math.round((lecturesCompleted * 100) / lectures);
          if (part.type === 'quiz') {
            quizzes++;
          }
          if (part.length === 0) {
            quizzes = 0;
            percentGral = 0;
          }
          if (part.type === 'quiz' &&
            part.completed === 1) {
            quizzesCompleted++;
          }
          quizzesPercent = Math.round((quizzesCompleted * 100) / quizzes);
          if (part.type === 'practice') {
            exercises++;
          }
          if (part.length === 0) {
            exercises = 0;
            percentGral = 0;
          }
          if (part.type === 'practice' &&
            part.completed === 1) {
            exercisesCompleted++;
          }
          exercisesPercent = Math.round((exercisesCompleted * 100) / exercises || 1);
          percentGral = Math.round((lecturesPercent + quizzesPercent + exercisesPercent) / 3);
        }
      }
      // Se crea stats en el user y se le asigna un objeto con los resultados de cada alumna
    }

    estudiante.stats = {
      percentTotal: percentGral,
      exercises: {
        total: exercises,
        completed: exercisesCompleted,
        percent: lecturesPercent
      },
      quizzes: {
        total: quizzes,
        completed: quizzesCompleted,
        percent: quizzesPercent
      },
      reads: {
        total: lectures,
        completed: lecturesCompleted,
        percent: lecturesPercent
      },
    };
    console.log(estudiante);
    return users;
  });
};
window.sortUsers = (users, orderB, orderDirection) => {

};

window.filterUsers = (users, search) => {

};

window.processCohortData = (options) => {

};