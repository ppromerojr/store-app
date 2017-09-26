export class ProductService {
    getProducts() {
        return PRODUCTS
    }
}

const PRODUCTS = [
    {
        id: 1,
        name: 'Product 1',
        categoryId: 2,
        price: 5,
        stocks: 25,
        imageUrl: 'ccc.jpg'
    },
    {
        id: 2,
        name: 'Product 2',
        categoryId: 2,
        price: 52,
        stocks: 5,
        imageUrl: 'ccc.jpg'
    },
    {
        id: 3,
        name: 'Product 3',
        categoryId: 1,
        price: 50,
        stocks: 250,
        imageUrl: 'ccc.jpg'
    },
    {
        id: 4,
        name: 'Product 4',
        categoryId: 2,
        price: 51,
        stocks: 100,
        imageUrl: 'ccc.jpg'
    },
]