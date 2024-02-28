const loadCategories = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        displayCategories(data.data.news_category);
    } catch (error) {
        console.error('Error loading categories:', error);
    }
}
const displayCategories = categories => {
    const categoriesContainer = document.getElementById('categories-container');
    categories.forEach(category => {
        const categoryLi = document.createElement('li');
        categoryLi.classList.add('nav-item');
        categoryLi.innerHTML = `
        <a class="nav-link fs-6 fw-semibold text-dark" aria-current="page" onclick="loadCategoryDetails(${category.category_id})" href="#">${category.category_name}</a>
        `;
        categoriesContainer.appendChild(categoryLi);
    });
}
loadCategories();