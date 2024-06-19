document.addEventListener('DOMContentLoaded', () => {
    const reviewsContainer = document.getElementById('reviews');
    const loadReviewsBtn = document.getElementById('loadReviewsBtn');
    const reviewForm = document.getElementById('reviewForm');

    const loadReviews = async () => {

        reviewsContainer.innerHTML = '<div class="spinner"></div>';


        await new Promise(resolve => setTimeout(resolve, 1000));

        try {
            const response = await fetch('../data/reviews.json');
            const reviews = await response.json();
            displayRandomReviews(reviews);
        } catch (error) {
            console.error('Error loading reviews:', error);
        }
    };

    const displayRandomReviews = (reviews) => {
        reviewsContainer.innerHTML = '';
        const randomReviews = getRandomItems(reviews, 3);
        randomReviews.forEach(review => {
            const reviewElement = document.createElement('div');
            reviewElement.classList.add('feed', 'container');
            reviewElement.innerHTML = `
                <h2>${review.name} - ${review.watch}</h2>
                <p>${review.review}</p>
            `;
            reviewsContainer.appendChild(reviewElement);
        });
    };

    const getRandomItems = (array, numItems) => {
        const shuffled = array.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, numItems);
    };

    const submitReview = async (event) => {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const watch = document.getElementById('watch').value;
        const review = document.getElementById('review').value;

        const newReview = { name, watch, review };

        try {
            const response = await fetch('../data/reviews.json');
            const reviews = await response.json();
            reviews.push(newReview);

            await fetch('./data/reviews.json', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reviews)
            });

            alert('Review submitted successfully!');
            reviewForm.reset();
            loadReviews();
        } catch (error) {
            console.error('Error submitting review:', error);
        }
    };

    loadReviewsBtn.addEventListener('click', loadReviews);
    reviewForm.addEventListener('submit', submitReview);

    loadReviews();
});
