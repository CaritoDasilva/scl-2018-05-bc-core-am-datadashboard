window.computeUsersStats = (users, progress, courses) => {

  users.forEach((estudiante) => {

    const progresoEstudiante = progress.find(progre => progre[0] === estudiante.id)[1];

    let lectures = 0;
    let lecturesCompleted = 0;
    let lecturesPercent;
    let quizzes = 0;
    let quizzesCompleted = 0;
    let quizzesPercent;
    let exercises = 0;
    let exercisesCompleted = 0;
    let exercisesPercent;

    let i;
    for (i in progresoEstudiante) {
      let element = progresoEstudiante[i];
      let unit;

      for (unit of Object.values(element.units)) {
        for (let part of Object.values(unit.parts)) {
          if (part.type === 'read') {
            lectures++;
          }
          if (part.type === 'read' &&
            part.completed === 1) {
            lecturesCompleted++;
          }
          lecturesPercent = (lecturesCompleted * 100) / lectures;
          if (part.type === 'quiz') {
            quizzes++;
          }
          if (part.type === 'quiz' &&
            part.completed === 1) {
            quizzesCompleted++;
          }
          quizzesPercent = (quizzesCompleted * 100) / quizzes;
          if (part.type === 'practice') {
            exercises++;
          }
          if (part.type === 'practice' &&
            part.completed === 1) {
            exercisesCompleted++;
          }
          exercisesPercent = (exercisesCompleted * 100) / exercises;
        }
      }
      // Se crea el atributo stats en el user y se le asigna un objeto con las estadisticas
      estudiante.stats = {
        /* percent: , */
        exercises: {
          total: exercises,
          completed: exercisesCompleted
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
    }

    return users;
  });
};
window.sortUsers = (users, orderB, orderDirection) => {

};

window.filterUsers = (users, search) => {

};

window.processCohortData = (options) => {

};