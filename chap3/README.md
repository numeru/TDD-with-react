# Jest

> Javascript Testing Framework

```
npm install jest --global

jest --init

npm install --save-dev jest

npm install @types/jest

jest --watchAll

// commit 되지 않은, 작업 중인 코드만 테스트 하고 싶다면 --watchAll 이 아닌 --watch
```

## 에러 테스트

```js
add(num) {
  const sum = this.value + num;
  if (sum > 100) {
    throw new Error('Value can not be greater than 100');
  }
  this.value = sum;
}

it('add should throw an error if value is greater than 100', () => {
  expect(() => {
    cal.add(101);
  }).toThrow('Value can not be greater than 100');
});
```

---

## 비동기 테스트

```js
function fetchProduct(error) {
  if (error === 'error') {
    return Promise.reject('network error');
  }
  return Promise.resolve({ item: 'Milk', price: 200 });
}

describe('async', () => {
  it('async-done', (done) => {
    fetchProduct().then((item) => {
      expect(item).toEqual({ item: 'Milk', price: 200 });
      done();
    });
  });

  it('async-return', () => {
    return fetchProduct().then((item) => {
      expect(item).toEqual({ item: 'Milk', price: 200 });
    });
  });

  it('async-await', async () => {
    const product = await fetchProduct();
    expect(product).toEqual({ item: 'Milk', price: 200 });
  });

  it('async-resolves', async () => {
    return expect(fetchProduct()).resolves.toEqual({
      item: 'Milk',
      price: 200,
    });
  });

  it('async-reject', async () => {
    return expect(fetchProduct('error')).rejects.toBe('network error');
  });
});
```

---

## Mock

- 기본 사용

```js
function check(predicate, onSuccess, onFail) {
  if (predicate()) {
    onSuccess('yes');
  } else {
    onFail('no');
  }
}

describe('check', () => {
  let onSuccess;
  let onFail;

  beforeEach(() => {
    // mock
    onSuccess = jest.fn();
    onFail = jest.fn();
  });

  it('should call onSuccess when predicate is true', () => {
    check(() => true, onSuccess, onFail);

    expect(onSuccess).toHaveBeenCalledTimes(1);

    expect(onSuccess).toHaveBeenCalledWith('yes');

    expect(onFail).toHaveBeenCalledTimes(0);
  });
});
```

### 1. 잘못된 사례

```js
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
```

```js
const ProductService = require('../product_service_no_di.js');

// 유닛 테스트에서는 반드시 하나의 유닛만을 테스트 해야한다.
const ProductClient = require('../product_client.js');

// 의존성을 제거하기 위해 ProductService와 연결되어 있는 ProductClient는 mocking 한다.
jest.mock('../product_client');

describe('ProductService', () => {
  let productService;

  // 원하는 결과를 도출하는 메서드를 만든다.
  const fetchItems = jest.fn(async () => [
    {
      item: 'Milk',
      available: true,
    },
    {
      item: 'banana',
      available: false,
    },
  ]);

  // ProductClient의 fetchItems 메서드를 임의로 만든 메서드로 변경한다.
  ProductClient.mockImplementation(() => {
    return {
      fetchItems,
    };
  });

  beforeEach(() => {
    productService = new ProductService();
  });

  // 다른 메서드와 상관 없이, productService의 fetchAvailableItems 메서드만을 테스트 할 수 있게 된다.
  it('should filter out only available items', async () => {
    const items = await productService.fetchAvailableItems();
    expect(items).toEqual([
      {
        item: 'Milk',
        available: true,
      },
    ]);
  });
});
```

### 개선

- stub을 사용한다.

```js
class ProductService {
  // 생성자 안에서 다른 class를 생성하지 않고, 상황에 따라 원하는 class를 외부에서 주입받는다.
  constructor(productClient) {
    this.productClient = productClient;
  }

  //...
}
```

```js
// mock이 아닌 실제로 존재하는 class 이지만, 네트워크에 의존하지 않고 원하는 결과를 return 하는 메서드를 가진다.
class StubProductClient {
  async fetchItems() {
    return [
      { item: '🥛', available: true },
      { item: '🍌', available: false },
    ];
  }
}

module.exports = StubProductClient;
```

```js
const ProductService = require('../product_service.js');
const StubProductClient = require('./stub_product_client.js');

describe('ProductSerivce - Stub', () => {
  let productService;

  beforeEach(() => {
    // stub class를 주입한다.
    productService = new ProductService(new StubProductClient());
  });

  it('should filter out only available items', async () => {
    const items = await productService.fetchAvailableItems();
    expect(items.length).toBe(1);
    expect(items).toEqual([{ item: '🥛', available: true }]);
  });
});
```

### 3. 좋은 사례

- 어떤 메서드가 실행되었는지 확인할 때는 mock이 유용하다.

```js
class UserService {
  constructor(userClient) {
    this.userClient = userClient;
    this.isLogedIn = false;
  }

  login(id, password) {
    if (!this.isLogedIn) {
      return this.userClient
        .login(id, password)
        .then((data) => (this.isLogedIn = true));
    }
  }
}
```

```js
const UserService = require('../user_service');
const UserClient = require('../user_client');

// 테스트 목적이 아닌 class를 mocking 한다.
jest.mock('../user_client');

describe('UserService', () => {
  // mock 메서드를 만들어 class와 연결한다.
  const login = jest.fn(async () => 'success');

  UserClient.mockImplementation(() => {
    return {
      login,
    };
  });
  let userService;

  beforeEach(() => {
    userService = new UserService(new UserClient());
  });

  it('calls login() on UserClient when tries to login', async () => {
    await userService.login('abc', 'abc');
    expect(login.mock.calls.length).toBe(1);
  });
});
```
