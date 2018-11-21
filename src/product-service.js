
export default class ProductService {

    constructor() {
        for (var i=1; i< 51; i ++) {
            var temp = JSON.parse(JSON.stringify(this.dummyData));
            temp.id = i.toString();
            temp.title = "item (" + temp.id + ")"
            this.data.push(temp);
        }
    }
    dummyData = 
    {
      "imageUrl": "https://www.mccain.com/SiteCollectionImages/McCainCorporate/goodfood-products/McCain-Breakfast-Potato-Pancakes.png",
      "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "price": 1002.99
    };
    data = [
    ]
    static myInstance = null;
    static getInstance() {
        if (ProductService.myInstance == null) {
            ProductService.myInstance = new ProductService();
        }
        return this.myInstance;
    }

    getAllProducts() {
        return this.data;
    }

}