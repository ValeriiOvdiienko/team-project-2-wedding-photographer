import axios from "axios";

const BASE_URL = "https://wedding-photographer.b.goit.study/api/";

export async function getAllImages(page, limit = 9) {
    const response = await axios.get(`${BASE_URL}wedding-photos`, {
        params: {
            page: page,
            limit: limit,
        },
    });
    return response.data;
}

async function getCategories() {
    const response = await axios.get(`${BASE_URL}categories`);
    return response.data;
}

export async function getImagesByCategory(categoryName, page, limit = 9) {
    const categoties = await getCategories();
    const categoryId = categoties.find(item => item.category === categoryName)._id;

    const response = await axios.get(`${BASE_URL}wedding-photos`, {
        params: {
            page: page,
            limit: limit,
            categoryId: categoryId,
        },
    });
    return response.data;
}