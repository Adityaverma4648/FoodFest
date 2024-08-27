import customerReviews from "../data/customer_review.js";

let currentReviewIndex = 0;

const reviewContainer = document.querySelector(".reviews");
const para = reviewContainer.querySelector(".para");
const rating = reviewContainer.querySelector(".rating");

function renderReview(index) {
  const review = customerReviews[index];
  para.innerHTML = `
    <p><strong>${review.name}</strong> (${review.date})</p>
    <p>${review.comment}</p>
    <p><em>Items Ordered: ${review.itemsOrdered.join(", ")}</em></p>
    <p><em>Delivery Time: ${review.deliveryTime}</em></p>
  `;
  rating.innerHTML = `<p>Rating: ${review.rating} / 5</p>`;
}

function nextReview() {
  currentReviewIndex = (currentReviewIndex + 1) % customerReviews.length;
  renderReview(currentReviewIndex);
}

function previousReview() {
  currentReviewIndex =
    (currentReviewIndex - 1 + customerReviews.length) % customerReviews.length;
  renderReview(currentReviewIndex);
}

// Initial render
renderReview(currentReviewIndex);

// Automatically move to the next review every 5 seconds
setInterval(nextReview, 5000);
