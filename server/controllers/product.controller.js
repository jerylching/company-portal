import Product from '../models/product.model.js';

const getProducts = async (request, response) => {
    try {
        const products = await Product.find()

        // Handle the route '/api/inventory' (all products)
        if (request.baseUrl === '/api/inventory') {
            response.status(200).send({
                message: 'List of Products',
                data: products,
            });
        } 
        // Handle other cases or invalid routes
        else {
            response.status(404).send({
                message: 'Route not found',
            });
        }
    } catch (error) {
        console.error('Error getting the inventory data:', error);
        response.status(500).send({
            message: 'Internal server error',
            error: error.message,
        });
    }
};

const getProductsByCategory = async (request, response) => {
    try {
        const searchedCategory = request.query.category;
        const products = await Product.find()
        let searchedResults = products;

        if (searchedCategory) {
            // Filter by category
            searchedResults = searchedResults.filter(product =>
                product.category.toLowerCase() === searchedCategory.toLowerCase());
        }
        if (products.length === 0) {
            response.status(404).send({
                message: 'No products for the searched category.',
            });
        } else {
            response.status(200).send({
                message: `Searched results for product category ${searchedCategory}`,
                data: searchedResults,
            });
        }
    } catch (error) {
        console.error('Error searching for products:', error);
        response.status(500).send({
            message: 'Internal server error',
            error: error.message,
        });
    }
};

const addProduct = async (request, response) => {
    try {
        const { itemcode, brand, description, size, category, subcategory, cost, price, quantity } = request.body;

        // Check if a product with the same itemcode already exists
        const existingProduct = await Product.findOne({ itemcode });

        if (existingProduct) {
            return response.status(409).send({
                message: `Product with item code ${itemcode} already exists.`,
            });
        }

        // If no existing product, create and save the new product
        const newProduct = new Product ({
            itemcode,
            brand,
            description,
            size,
            category,
            subcategory,
            cost,
            price,
            quantity
        });

        await newProduct.save();

        response.status(201).send({
            message: 'New product has been added',
            data: newProduct,
        });
    } catch (error) {
        console.error('Error adding product:', error);
        response.status(500).send({
            message: 'Internal server error',
            error: error.message,
        });
    }
};

const updateProduct = async (request, response) => {
    try {
        const product = await Product.find();
        const { itemcode } = request.params;
        const { brand, description, size, category, subcategory, cost, price, quantity } = request.body;
        const productToUpdate = product.find((product) => product.itemcode === itemcode);

        if (productToUpdate) {
            productToUpdate.itemcode = itemcode
            productToUpdate.brand = brand
            productToUpdate.description = description
            productToUpdate.size = size
            productToUpdate.category = category
            productToUpdate.subcategory = subcategory
            productToUpdate.cost = cost
            productToUpdate.price = price
            productToUpdate.quantity = quantity

            await productToUpdate.save();

            response.status(204).send({
                message: `Details for ${brand} ${description} has been updated`,
                success: true,
            });
        } else {
            response.status(404).send({ message: "Product not found" });
        }
    } catch (error) {
        console.error('Error getting product:', error);
            response.status(500).send({
                message: 'Internal server error',
                error: error.message,
            });
    }
};

const deleteProduct = async (request, response) => {
    try {
        const { itemcode } = request.params;
        const deletedProduct = await Product.findOneAndDelete({ itemcode });
        
        if (deletedProduct) {
            response.status(200).send({
                message: `${itemcode} has been has been deleted.`,
                success: true,
            });
        } else {
            response.status(404).send({
                message: 'Product not found.'
            })
        }
    } catch (error) {
        console.error('Error deleting product:', error);
        response.status(500).send({
            message: 'Internal server error',
            error: error.message,
        });
    }
};

export { getProducts, getProductsByCategory, addProduct, updateProduct, deleteProduct }