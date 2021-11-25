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
