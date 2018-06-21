/* Declaro el botón para el primer evento que nos pasará a la segunda pantalla */

const btn = document.getElementById('access');
const btnSearch = document.getElementById('btnSearch');

btn.addEventListener('click', () => {
  const boxTwo = document.getElementById('caja-2');
  const boxOne = document.getElementById('caja-1');
  boxTwo.style.display = 'block';
  boxOne.style.display = 'none';
});

btnSearch.addEventListener('click', () => {
  computeUsersStats();
});