const axios = require("axios");
const { writeFile } = require("node:fs/promises");

const getProducts = async () => {
  try {
    const { data } = await axios.get("https://dummyjson.com/products");
    return data;
  } catch (error) {
    console.log(error);
  }
};

const writeProducts = async () => {
  try {
    const response = await getProducts();
    // console.log(response);
    const mappedProducts = response.products.map((data) => {
      const { title, description, price, stock, brand, category, thumbnail } =
        data;
      return {
        title,
        description,
        price,
        stock,
        brand,
        category,
        thumbnail,
      };
    });

    await writeFile(
      __dirname + "/../data_dummy/products.json",
      JSON.stringify(mappedProducts, null, 2),
    );
  } catch (error) {
    console.log(error);
  }
};

writeProducts();
