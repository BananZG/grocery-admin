
export default class ProductService {

    static myInstance = null;
    static getInstance() {
        if (ProductService.myInstance == null) {
            ProductService.myInstance = new ProductService();
        }
        return this.myInstance;
    }

    getAllProducts() {
        return fetch("/product")
            .then(res => res.json())
    }

    getSingleProduct(id) {
        return fetch("/product/?id="+id)
        .then(res => res.json())
    }

    deleteProduct(id) {
        return fetch('/product/?id=' + id, {
            method: 'DELETE',
        }).then(res => res.json());
    }

}