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

그러나 컴포넌트가 여러 Store에서 재사용하는 경우,
