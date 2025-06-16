window.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('recipe-container');

  try {
    const response = await fetch('/api/recipes');
    const recipes = await response.json();
    console.log(recipes);

    recipes.forEach(recipe => {
      const div = document.createElement('div');
      div.innerHTML = `
        <h3>${recipe.title || 'Untitled Recipe'}</h3>
        <p>Ingredients: ${Array.isArray(recipe.ingredient) ? recipe.ingredient.join(', ') : 'No ingredients listed'}</p>
        ${recipe.quantity ? `<p>Quantity: ${recipe.quantity}</p>` : ''}
        ${recipe.type ? `<p>Type: ${recipe.type}</p>` : ''}
        <hr>
      `;
      container.appendChild(div);
    });
  } catch (err) {
    container.innerHTML = '<p>Error loading recipes.</p>';
    console.error(err);
  }
});
