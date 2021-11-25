const ProductClient = require('./product_client');
class ProductService {
  constructor() {
    this.productClient = new ProductClient();
  }

  // 가져온 제품 중 이용가능한 것만 필터링
  fetchAvailableItems() {
    return this.productClient
      .fetchItems()
      .then((items) => items.filter((item) => item.available));
  }
}

module.exports = ProductService;
