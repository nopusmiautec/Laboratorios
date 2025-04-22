class Product {
    constructor(id, name, price, description) {
      this.id = id;
      this.name = name;
      this.price = price;
      this.description = description;
    }
  
    static getAll() {
      return [
        new Product(1, 'Producto A', 100, 'Descripción del producto A'),
        new Product(2, 'Producto B', 200, 'Descripción del producto B'),
        new Product(3, 'Producto C', 300, 'Descripción del producto C')
      ];
    }
  
    static getById(id) {
      return this.getAll().find(product => product.id === parseInt(id));
    }
  }
  
  module.exports = Product;