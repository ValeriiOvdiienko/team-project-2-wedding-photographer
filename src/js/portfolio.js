import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


import { getAllImages, getImagesByCategory } from "./api";
import { createGallery, clearGallery, showLoader, hideLoader, makeShowMoreButtonActive, makeShowMoreButtonDisabled } from "./render-function";

const filtersList = document.querySelector('.portfolio-img-filters-list');
const showMoreBtn = document.querySelector(".show-more");

let page = 1;
let currentCategory = "";
const limit = 3;

filtersList.addEventListener('click', async (event) => {
    event.preventDefault();

    const previosActiveButton = document.querySelector(".active");
    previosActiveButton.classList.remove("active");

    event.target.classList.add("active");
    
    page = 1;
    const categoryName = event.target.textContent.trim();
    currentCategory = categoryName;
    clearGallery();
    showLoader();

    try {
        const data = (categoryName === "All Photos")
            ? await getAllImages(page)
            : await getImagesByCategory(categoryName, page);

        createGallery(data.weddingPhotos, true);
        console.log(data);
        isEndOfGallery(data.totalItems);
        page += 1;
    } catch (error) {
        iziToast.error({
            title: "Error",
            message: error.message
        });
    } finally {
        hideLoader();
    }

})

showMoreBtn.addEventListener("click", async (event) => {
    event.preventDefault();
    showLoader();

    try {
        const data = (currentCategory === "All Photos")
            ? await getAllImages(page, limit)
            : await getImagesByCategory(currentCategory, page, limit);
        createGallery(data.weddingPhotos);
        isEndOfGallery(data.totalItems);
        page += 1;
    } catch (error) {
        iziToast.error({
            title: "Error",
            message: error.message
        });
    } finally {
        hideLoader();
    }
})

function isEndOfGallery(totalItems) {
    const imgCount = document.querySelectorAll('.gallery-item');
    if (imgCount.length >= totalItems) {
        makeShowMoreButtonDisabled();

        iziToast.info({
            message: "We're sorry, but you've reached the end of search results.",
        });
    } else {
        makeShowMoreButtonActive();
    }
}


async function initGallery() {
    page = 1;
    const data = await getAllImages(page);
    createGallery(data.weddingPhotos, true);
}

initGallery();




