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
    categoryDetails.forEach(category => {
        console.log(category);
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('card', 'my-3');
        newsDiv.innerHTML = `
        <div class="row g-0">
            <div class="col-md-4">
                <img src="${category.image_url}" class="img-fluid rounded-start p-2" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body mt-2">
                    <div>
                        <h5 class="card-title">${category.title}</h5>
                        <p class="card-text">${category.details.slice(0, 250)}...</p>
                    </div>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="d-flex m-2">
                            <div class="mx-2">
                                <img src="${category.author.img}" class="rounded-circle" style="width: 50px; height: 50px;" alt="Author Image">
                            </div>
                            <div class="d-flex flex-column justify-content-center">
                                <h6>${category.author.name}</h6>
                                <small>${category.author.published_date ? category.author.published_date.split(' ')[0] : ''}</small>
                            </div>
                        </div>
                        <div>
                            <span><i class="far fa-eye"></i></span> ${category.total_view}
                        </div>
                        <div>
                            <span>${generateStarRating(category.rating.number)}</span>
                        </div>
                        <div>
                            <a onclick="loadNewsDetails('${category._id}')" href="#"><span><i class="fas fa-arrow-right"></i></span></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
        newsContainer.appendChild(newsDiv);
        function generateStarRating(ratingNumber) {
            // Calculate the number of full stars and half stars
            const fullStars = Math.floor(ratingNumber);
            const hasHalfStar = ratingNumber % 1 !== 0;
            // Generate full star icons
            const filledStars = '<i class="fas fa-star text-warning"></i>'.repeat(fullStars);
            // Generate half star icon
            const halfStar = hasHalfStar ? '<i class="fas fa-star-half-alt text-warning"></i>' : '';
            // Generate unfilled stars for the remaining space
            const unfilledStars = '<i class="far fa-star"></i>'.repeat(5 - fullStars - (hasHalfStar ? 1 : 0));

            return filledStars + halfStar + unfilledStars;
        }
    })
}
loadCategories();
