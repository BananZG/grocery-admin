
export default class ProductService {

    static myInstance = null;
    static getInstance() {
        if (ProductService.myInstance == null) {
            ProductService.myInstance = new ProductService();
        }
        return this.myInstance;
    }

    getAllProducts() {
        return fetch("/products")
            .then(res => res.json())
    }

    getSingleProduct(id) {
        return fetch("/products/?id="+id)
        .then(res => res.json())
    }

}