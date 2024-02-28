const loadCategories = async () => {
    const apiUrl = `https://openapi.programming-hero.com/api/news/categories`;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch categories');
        }
        const responseData = await response.json();
        displayCategories(responseData.data.news_category);
    } catch (error) {
        console.error('Error loading categories:', error);
    }
}
const displayCategories = categories => {
    const categoriesContainer = document.getElementById('categories-container');
    categories.forEach(category => {
        //  console.log(category);
        const categoryLi = document.createElement('li');
        categoryLi.classList.add('nav-item');
        categoryLi.innerHTML = `
        <a class="nav-link fs-6 fw-semibold text-dark" aria-current="page" onclick="loadCategoryDetails('${category.category_id}', '${category.category_name}')" href="#">${category.category_name}</a>
        `;
        categoriesContainer.appendChild(categoryLi);
    });
}

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById("spinner");
    if (isLoading) {
        loaderSection.classList.remove("d-none");
    }
    else {
        loaderSection.classList.add("d-none");
    }
}

const loadCategoryDetails = async (category_id, category_name) => {
    try {
        // Show loader
        toggleSpinner(true);

        const apiUrl = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error('Failed to fetch category details');
        }
        const responseData = await response.json();
        displayCategoryDetails(category_name, responseData.data);
    } catch (error) {
        console.error('Error loading category details:', error);
    } finally {
        // Hide loader regardless of success or failure
        toggleSpinner(false);
    }
}

const displayCategoryDetails = (category_name, categoryDetails) => {
    console.log(category_name, categoryDetails);
    const totalItemFound = document.getElementById('totalItemFound');
    //totalItemFound.innerHTML = '';
    const totalItemDiv = document.createElement('div');
    totalItemDiv.classList.add('card-body');
    totalItemFound.innerHTML = `
        <span class="p-2">${categoryDetails.length > 0 ? categoryDetails.length : 'No'} news found in ${category_name} category</span>
    `;
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '';
}
loadCategories();