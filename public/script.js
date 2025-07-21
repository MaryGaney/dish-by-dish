window.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('recipe-container');
  const modal = document.getElementById('modal');
  const closeModal = document.getElementById('close-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-description');
  const modalIngredients = document.getElementById('modal-ingredients');
  const goToBtn = document.getElementById('go-to-recipe');

  let currentSlug = '';

  try {
    const response = await fetch('/api/recipes');
    const recipes = await response.json();

    recipes.forEach(recipe => {
      const div = document.createElement('div');
      div.className = 'recipe_box';
      div.innerHTML = `
        <h3>${recipe.title || 'Untitled Recipe'}</h3>
        <p>${recipe.description || 'No description available.'}</p>
      `;

      div.addEventListener('click', () => {
        modalTitle.textContent = recipe.title || 'Untitled Recipe';
        modalDesc.textContent = recipe.description || 'No description available.';
        modalIngredients.innerHTML = '';
        currentSlug = recipe.slug || recipe.title.toLowerCase().replace(/\s+/g, '-');

        (recipe.ingredients || []).forEach(ingredient => {
          const li = document.createElement('li');
          li.textContent = ingredient;
          modalIngredients.appendChild(li);
        });

        modal.style.display = 'flex';
      });

      container.appendChild(div);
    });
  } catch (err) {
    container.innerHTML = '<p>Error loading recipes.</p>';
    console.error(err);
  }

  closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', e => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });

  goToBtn.addEventListener('click', () => {
    window.location.href = `/recipe?slug=${currentSlug}`;
  });
});

