# Reactivity

## Assignments

Svelte의 중심에는 `DOM을 애플리케이션 상태와 동기화(예: 이벤트에 대한 응답)할 수 있는 강력한 반응 시스템`이 있습니다.

강력한 반응 시스템이 있다는 것을 증명하려면 이벤트 핸들러를 연결해야 합니다. 그리고 함수 안에서 값을 변경할 수 있는 코드를 추가합니다.

```html
<script>
  let count = 0;

  function incrementCount() {
    count += 1;
  }
</script>

<button on:click="{incrementCount}">
  Clicked {count} {count === 1 ? 'time' : 'times'}
</button>
```

## Declarations

Svelte는 `컴포넌트의 상태가 변경되면 DOM을 자동으로 업데이트`합니다. 컴포넌트 상태의 일부분은 다른 부분(예: firstname 및 lastname에서 파생된 전체 이름)에서 계산한 후 변경될 때마다 다시 계산해야 하는 경우가 많습니다.

이 경우를 위해 `리엑티브한 선언`을 합니다.

```js
let count = 0;
$: doubled = count * 2; // 이 부분
```

```
이상하게 보여도 걱정하지 마세요.
유효한 JavaScript 입니다.
이 JavaScript는 '참조된 값이 변경될 때마다,
이 코드를 다시 실행'한다는 의미로 해석됩니다.
익숙해지면 다시 돌아가실 수 없을거에요.
```

그리고 예제 코드는 다음과 같습니다.

```html
<script>
  let count = 0;
  $: doubled = count * 2;

  function handleClick() {
    count += 1;
  }
</script>

<button on:click="{handleClick}">
  Clicked {count} {count === 1 ? 'time' : 'times'}
</button>

<p>{count} doubled is {doubled}</p>
```

물론, 여기서 리엑티브 값을 사용할 필요가 없습니다. 하지만 리엑티브한 값은 `여러 번 참조해야 하거나 다른 리엑티브 값에 따라 달라지는 값이 있을 때` 이것에 대한 가치는 매우 커집니다.

## Statements

리엑티브 값을 선언하는데 그치지 않고, `임의의 명령문을 반응적으로 실행할 수도 있습니다.` 예를 들어, 다음과 같이 값이 변경될 때마다 카운트 값을 기록할 수 있습니다.

```js
$: console.log(`the count is ${count}`); // 카운트가 변경될 때마다 출력
```

다음과 같이 `문구를 블록으로 쉽게 그룹화`할 수 있습니다.

```js
$: {
  console.log(`the count is ${count}`);
  alert(`I SAID THE COUNT IS ${count}`);
}
```

블록 앞에 다음과 같은 `$:`를 넣을 수도 있습니다.

```js
$: if (count >= 10) {
  alert(`count is dangerously high!`);
  count = 9;
}
```

## Updating arrays and objects

Svelte의 반응성은 할당에 의해 트리거 되기 때문에 push 및 splice와 같은 array 메소드를 사용해도 업데이트가 자동으로 발생하지 않습니다.

이 문제를 해결하기 위한 하나의 방법으로 중복될 수 있는 할당을 추가하는 것입니다.

```js
function addNumber() {
  numbers.push(numbers.length + 1);
  numbers = numbers;
}
```

`더 관용적인 솔루션`은 다음과 같습니다.

```js
function addNumber() {
  numbers = [...numbers, numbers.length + 1];
}
```

위와 같은 유사한 패턴으로 `pop`, `shift`, `unshift`, `slice`를 교체할 수 있습니다.

`array 및 object의 속성에 대한 할당`은 값 자체에 대한 할당과 동일한 방식으로 작동합니다.

```js
function addNumber() {
  numbers[numbers.length] = numbers.length + 1;
}
```

간단한 경험적 규칙: 업데이트된 변수의 이름이 할당 왼쪽에 표시되어야 합니다. 예시는 다음과 같습니다.

```js
const foo = obj.foo;
foo.bar = "baz";
```

`obj = obj`를 따르지 않는다면, `obj.foo.bar`으로 참조를 업데이트하지 않습니다.

## 참조

[https://svelte.dev/tutorial/reactive-assignments](https://svelte.dev/tutorial/reactive-assignments)
