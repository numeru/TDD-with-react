# 좋은 Test

1. 내부 구현 사항은 테스트 하지 않는다.
2. 재사용성을 높인다.
3. 배포용 코드와 반드시 분리한다.

## 테스트의 구조

- 테스트가 수행 되기 이전

  - beforeEach
  - beforeAll

- 테스트가 수행 된 이후

  - afterEach
  - afterAll

- 테스트 수행

  - 준비 (arrange / Given)
  - 실행 (act / When)
  - 검증 (assert / Then)

## 테스트 원칙

1. Fast

- 느린것에 대한 의존성 낮추기
- 파일, DB, 네트워크에 의존하지 않도록 한다. -> mock, stub

2. Isolated

- 최소한의 유닛으로 검증하기
- 독립적이고 집중적으로 유지

3. Repeatable

- 실행할 때마다 동일한 결과를 유지하도록 한다.

4. Self-Validating

- 스스로 결과를 검증하기
- 테스트 코드 안에서 성공 / 실패 여부를 확인할 수 있어야 한다. -> Jest + CI/CD

5. Timely

- 시기적절하게 테스트 코드 작성
- 사용자에게 배포되기 이전에 테스트 코드를 작성한다.
