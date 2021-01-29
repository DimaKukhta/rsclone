export default async function updateData(login) {
  const expense = JSON.parse(localStorage.getItem('expense'));
  const income = JSON.parse(localStorage.getItem('income'));
  // eslint-disable-next-line no-unused-vars
  const response = await fetch(`https://rs-clone-be1.herokuapp.com/${login}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      history: [expense, income],
    }),
  });
}
