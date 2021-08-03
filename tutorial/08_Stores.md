# Stores

애플리케이션 상태가 애플리케이션의 컴포넌트 계층 내에 모두 속하지 않습니다. 관련 없는 여러 컴포넌트 또는 일반 JavaScript 모듈에서 액세스해야 하는 값이 있을 수 있습니다.

## Writable stores

Svete에서는 Store가 있습니다. Store는 단순히 Store 값이 변경될 때마다 이해 관계가 있는 파트에게 알릴 수 있는 `subscribe` 메소드를 가진 객체입니다. `App.svelte`에서 `count`는 저장소이며, `count.subscribe` 콜백에서 `count_value`를 설정합니다.

`stores.js` 탭을 클릭하여 `count`의 정의를 확인합니다. 쓰기 가능한 저장소이며, `subscribe` 외에도 메서드를 `set` 및 `update` 메서드가 있습니다.

이제 `Incrementer.svelte` 탭으로 이동하여 `+` 버튼을 연결할 수 있습니다.

```js
function increment() {
  count.update((n) => n + 1);
}
```

또, `Decrementer.svelte`에서 `-`버튼으로 반대 기능을 수행합니다.

마지막으로, `Resetter.svelte`에서 재설정을 실행합니다.

## Auto-subscriptions

이전 예제에서 앱은 잘 작동합니다. 그런데 Store는 구독되어 있지만 구독을 취소한 적은 없는 미묘한 버그가 있습니다. 컴포넌트를 여러 번 인스턴스화하고 파괴할 경우 메모리 누수가 발생합니다.

`App.svelte`에서 `unsubscribe`를 선언하는 것부터 시작합니다.

```js
const unsubscribe = count.subscribe((value) => {
  count_value = value;
});
```

이제 `unsubscribe`를 선언했지만, `onDestroy` [라이프사이클 hook](https://svelte.dev/tutorial/ondestroy)을 통해 계속 호출해야 합니다.

```js
<script>
	import { onDestroy } from 'svelte';
	import { count } from './stores.js';
	import Incrementer from './Incrementer.svelte';
	import Decrementer from './Decrementer.svelte';
	import Resetter from './Resetter.svelte';

	let count_value;

	const unsubscribe = count.subscribe(value => {
		count_value = value;
	});

	onDestroy(unsubscribe);
</script>

<h1>The count is {count_value}</h1>
```

그러나 특히 컴포넌트가 여러 스토어를 구독(subscribe)하는 경우 재사용 되기 시작합니다. 대신, Svelte는 스토어 네임 앞에 `$`를 붙이면 스토어 값을 참조할 수 있습니다.

    ```html
    <script>
    	import { count } from './stores.js';
    	import Incrementer from './Incrementer.svelte';
    	import Decrementer from './Decrementer.svelte';
    	import Resetter from './Resetter.svelte';
    </script>

    <h1>The count is {$count}</h1>
    ```

- Auto-subscription은 컴포넌트의 최상위 범위에서 선언되거나 가져온 스토어 변수에서만 작동합니다.

마크업 내에서 `$count`를 사용하는 것만으로 제한되지 않으며, 이벤트 핸들러나 reactive 선언과 같이 `script`의 어디에서나 사용할 수 있습니다.

- `$`로 시작하는 모든 이름은 스토어 값을 참조하는 것으로 가정합니다. 사실상 예약된 문자입니다. 그래서 Svelte는 `$` 접두사를 사용하여 변수를 선언할 수 없도록 합니다.

## Readable Stores

참조가 있는 사용자가 모든 스토어를 쓸 수 있는 것은 아닙니다. 예를 들어 마우스 위치 또는 사용자의 위치를 나타내는 스토어가 있을 수 있으며 '외부'에서 해당 값을 설정할 수 없습니다. 그런 경우에 `readble` 스토어가 있습니다.

실습에서 `stores.js` 탭으로 이동합니다. `readable`의 첫 번재 인수는 초기 값이며, 아직 값이 없다면 `null` 또는 `undefined`일 수 있습니다.
두 번째 인수는 `set` 콜백을 사용하고 `stop` 함수를 반환하는 `start` 함수 입니다. 스토어가 첫 번째 구독자를 얻으면 `start` 함수가 호출되고, 마지막 구독자가 구독을 취소하면 `stop` 함수가 호출됩니다.

```js
export const time = readable(new Date(), function start(set) {
  const interval = setInterval(() => {
    set(new Date());
  }, 1000);

  return function stop() {
    clearInterval(interval);
  };
});
```

## Derived Stores

하나 이상의 다른 스토의 값을 기반으로 `derived(파생된)` 스토어를 만들 수 있습니다. 이전의 실습 예제에서 페이지가 열린 시간을 나타내는 스토어를 만들 수 있습니다.

```js
export const elapsed = derived(time, ($time) =>
  Math.round(($time - start) / 1000)
);
```

- 여러 입력에서 스토어를 추출하고 값을 반환하는 대신, 값을 명시적으로 설정할 수 있습니다.
- (비동기적으로 값을 파생하는 데 유용함)
- 자세한 내용은 [API 참조](https://svelte.dev/docs#derived)

## Custom Stores

객체가 `subscribe` 메서드를 올바르게 구현하기만 하면 스토어가 됩니다. 따라서, 도메인별 논리로 사용자 지정 스토어를 쉽게 만들 수 있습니다.

예를 들어, 이전 실습 예제의 `count` 스토어에는 `increment`, `decrement`, `reset` 메소드가 포함될 수 있으며, `set` 및 `update`가 노출되지 않도록 할 수 있습니다.

## Store Bindings

스토어가 쓰기 가능한 경우(즉, `set` 메소드를 가지고 있는 경우) 로컬 컴포넌트 상태에 바인딩할 수 있는 것처럼 해당 값에 바인딩할 수 있습니다.

이 예제에는 쓰기 가능한 스토어 `name`과 파생된 스토어 `greeting`이 있습니다. `<input>` 요소를 업데이트 합니다.

```html
<input bind:value="{$name}" />
```

input 값을 변경하면 이제 이름과 모든 종속 항목이 업데이트 됩니다.

컴포넌트 내의 값을 저장하는 데 직정 할당할 수도 있습니다. 이해를 위해 `<button>` 요소를 추가합니다.

```svelte
<button on:click="{() => $name += '!'}">
	Add exclamation mark!
</button>
```

- `$name += '!'`은 할당은 `name.set($name + '!')`과 같습니다.
