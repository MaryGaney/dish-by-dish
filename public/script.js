window.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('recipe-container');

  try {
    const response = await fetch('/api/recipes');
    const recipes = await response.json();

    recipes.forEach(recipe => {
      const div = document.createElement('div');
      const slug = recipe.slug || recipe.title.toLowerCase().replace(/\s+/g, '-');
      div.innerHTML = `
        <h3><a href="/recipe?slug=${slug}">${recipe.title || 'Untitled Recipe'}</a></h3>
        <p>${recipe.description || 'No description available.'}</p>
        <hr>
      `;
      container.appendChild(div);
    });
  } catch (err) {
    container.innerHTML = '<p>Error loading recipes.</p>';
    console.error(err);
  }
});
