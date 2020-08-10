"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Product = /** @class */ (function () {
    function Product(id, title, price, rating, desc, categories) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.rating = rating;
        this.desc = desc;
        this.categories = categories;
    }
    return Product;
}());
exports.products = [
    new Product(1, 'First Product', 45.78, 3.5, 'my first product desc', ['computer', 'hardware']),
    new Product(2, 'Second Product', 42.78, 2.5, 'my second product desc', ['mobile']),
    new Product(3, 'Third Product', 37.78, 4.5, 'my third product desc', ['computer', 'software']),
    new Product(4, 'Fourth Product', 57.78, 5, 'my fourth product desc', ['mobile']),
    new Product(5, 'Five Product', 67.78, 3, 'my five product desc', ['computer', 'software']),
    new Product(6, 'Six Product', 75.78, 4.5, 'my sex product desc', ['computer', 'mobile']),
    new Product(7, 'Serve Product', 25.78, 4, 'my seven product desc', ['software']),
    new Product(8, 'Eight Product', 37.78, 3, 'my eight product desc', ['mobile']),
    new Product(9, 'Night Product', 55.78, 2, 'my night product desc', ['software']),
    new Product(10, 'Night Product', 55.78, 2, 'my night product desc', ['ipad']),
];
//# sourceMappingURL=product.js.map