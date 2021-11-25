class ProductClient {
  // client의 모든 제품을 가져오는 메서드
  fetchItems() {
    return fetch('http://example.com/login/id+password').then((response) =>
      response.json()
    );
  }
}

module.exports = ProductClient;
