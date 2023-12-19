import Sale from '../models/sale.model.js';

const getSalesTransactions = async (request, response) => {
    try {
        const sale = await Sale.find()

        // Handle the route '/api/sales' (all products)
        if (request.baseUrl === '/api/sales') {
            response.status(200).send({
                message: 'List of Sales Transactions',
                data: sale,
            });
        } 
        // Handle other cases or invalid routes
        else {
            response.status(404).send({
                message: 'Route not found',
            });
        }
    } catch (error) {
        console.error('Error getting sales transactions:', error);
        response.status(500).send({
            message: 'Internal server error',
            error: error.message,
        });
    }
};

const addSalesTransaction = async (request, response) => {
    try {
        const { date, itemcode, brand, description, size, category, subcategory, price, quantity } = request.body;

        const newSalesTransaction = new Sale({
            date,
            itemcode,
            brand,
            description,
            size,
            category,
            subcategory,
            price,
            quantity
        });

        await newSalesTransaction.save();

        response.status(201).send({
            message: 'New sales transaction has been added',
            data: newSalesTransaction,
        });
    } catch (error) {
        console.error('Error adding sales transaction:', error);
        response.status(500).send({
            message: 'Internal server error',
            error: error.message,
        });
    }
};

export { getSalesTransactions, addSalesTransaction }