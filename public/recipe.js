window.addEventListener('DOMContentLoaded', async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const slug = urlParams.get('slug');

  if (!slug) {
    document.getElementById('recipe-content').innerHTML = '<p>Recipe not found.</p>';
    return;
  }

  try {
    const response = await fetch(`/api/recipe/${slug}`);
    const recipe = await response.json();

    document.getElementById('recipe-title').textContent = recipe.title || 'Untitled';
    document.getElementById('recipe-description').textContent = recipe.description || 'No description.';

    const ingredientsList = document.getElementById('ingredients-list');
    recipe.ingredient.forEach(ing => {
      const li = document.createElement('li');
      li.innerHTML = `<input type="checkbox"> ${ing}`;
      ingredientsList.appendChild(li);
    });

    const instructionsList = document.getElementById('instructions-list');
    recipe.instructions.forEach(step => {
      const li = document.createElement('li');
      li.textContent = step;
      instructionsList.appendChild(li);
    });

    document.getElementById('favorite-button').addEventListener('click', () => {
      alert('Favorited!');
    });

  } catch (err) {
    document.getElementById('recipe-content').innerHTML = '<p>Failed to load recipe.</p>';
    console.error(err);
  }
});
