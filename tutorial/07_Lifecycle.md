# Lifecycle

모든 컴포넌트는 생성될 때 시작되고, 삭제될 때 종료되는 라이프사이클이 있습니다. 해당 라이프사이클 동안 중요한 순간에 코드가 실행할 수 있는 몇 가지 기능이 있습니다.

## onMount

가장 자주 사용하는 항목은 `onMount` 이며, 컴포넌트가 DOM에 처음 렌더링된 후에 실행됩니다. 앞서 `<canvas>` 요소를 렌더링한 후 상호 적용해야 할 때 잠시 접했을 것입니다.

네트워크를 통해 일부 데이터를 로드하는 `onMount` 핸들러를 추가합니다.

```js
<script>
	import { onMount } from 'svelte';

	let photos = [];

	onMount(async () => {
		const res = await fetch(`https://jsonplaceholder.typicode.com/photos?_limit=20`);
		photos = await res.json();
	});
</script>
```

- `SSR(Server-side Rendering)`으로 인해 `<script>`의 최상위 수준이 아닌 `onMount`에서 `patch`를 넣는 것이 좋습니다.
- `onDestroy`를 제외하고, 서버 사이드 렌더링 동안 라이프사이클 함수가 실행되지 않으므로, 컴포넌트가 DOM에 마운트되면 로드해야 하는 데이터를 가져올 필요가 없습니다.

컴포넌트가 초기화되는 동안 콜백이 `setTimeout`이 아닌 컴포넌트 인스턴스에 바인딩되도록 라이프사이클 함수를 호출해야 합니다.

`onMount` 콜백이 함수를 반환하는 경우, 컴포넌트가 제거될 때 해당 함수가 호출됩니다.

## onDestroy

컴포넌트가 소멸될 때 코드를 실행하려면, `onDestroy`를 사용합니다.

예를 들어, 컴포넌트가 초기화될 때 `setInterval` 함수를 추가하고 더 이상 관련 없을 때 정리할 수 있습니다. 이렇게 하면 메모리 누출을 방지할 수 있습니다.

```svelte
<script>
	import { onDestroy } from 'svelte';

	let counter = 0;
	const interval = setInterval(() => counter += 1, 1000);

	onDestroy(() => clearInterval(interval));
</script>
```

컴포넌트를 초기화하는 동안 라이프사이클 기능을 호출하는 것도 중요하지만, 어디에서 호출하는지는 중요하지 않습니다. 그래서 만약 우리가 원한다면, `utils.js`에서 interval 로직을 헬퍼 함수로 추상화할 수 있습니다.

```js
import { onDestroy } from "svelte";

export function onInterval(callback, milliseconds) {
  const interval = setInterval(callback, milliseconds);

  onDestroy(() => {
    clearInterval(interval);
  });
}
```

그리고 컴포넌트로 포함합니다.

```svelte
<script>
	import { onInterval } from './utils.js';

	let counter = 0;
	onInterval(() => counter += 1, 1000);
</script>
```

타이머를 몇 번 열었다가 닫고 카운터가 계속 똑딱거리고, CPU 부하가 증가하는지 확인합니다. 이는 이전 타이머가 삭제되지 않아 메모리 누수가 발생했기 때문입니다. 가이드의 예제를 풀기 전에 페이지를 새로 고쳐야 합니다.

## beforeUpdate and afterUpdate

`beforeUpdate` 함수는 DOM 업데이트 직전에 수행되도록 예약합니다.

`afterUpdate`는 DOM이 데이터와 동기화되면 코드를 실행하는 데 사용됩니다.

함께 사용하면 요소의 스크롤 위치를 업데이트하는 것과 같은 순전히 상태 중심적인 방법으로 달성하기 어려운 필수 작업을 수행할 때 유용합니다.

예제에 나와있는 [Eliza](https://en.wikipedia.org/wiki/ELIZA) 챗봇은 계속 채팅창을 스크롤해야 해서 사용하기 귀찮습니다. 고쳐보세요.

```js
<script>
	import Eliza from 'elizabot';
	import { beforeUpdate, afterUpdate } from 'svelte';

	let div;
	let autoscroll;

    // DOM 업데이트 직전 수행
	beforeUpdate(() => {
		autoscroll = div && (div.offsetHeight + div.scrollTop) > (div.scrollHeight - 20);
	});

    // DOM이 데이터와 동기화 되면 수행
	afterUpdate(() => {
		if (autoscroll) div.scrollTo(0, div.scrollHeight);
	});

	const eliza = new Eliza();

	let comments = [
		{ author: 'eliza', text: eliza.getInitial() }
	];

	function handleKeydown(event) {
		if (event.key === 'Enter') {
			const text = event.target.value;
			if (!text) return;

			comments = comments.concat({
				author: 'user',
				text
			});

			event.target.value = '';

			const reply = eliza.transform(text);

			setTimeout(() => {
				comments = comments.concat({
					author: 'eliza',
					text: '...',
					placeholder: true
				});

				setTimeout(() => {
					comments = comments.filter(comment => !comment.placeholder).concat({
						author: 'eliza',
						text: reply
					});
				}, 500 + Math.random() * 500);
			}, 200 + Math.random() * 200);
		}
	}
</script>

<style>
	.chat {
		display: flex;
		flex-direction: column;
		height: 100%;
		max-width: 320px;
	}

	.scrollable {
		flex: 1 1 auto;
		border-top: 1px solid #eee;
		margin: 0 0 0.5em 0;
		overflow-y: auto;
	}

	article {
		margin: 0.5em 0;
	}

	.user {
		text-align: right;
	}

	span {
		padding: 0.5em 1em;
		display: inline-block;
	}

	.eliza span {
		background-color: #eee;
		border-radius: 1em 1em 1em 0;
	}

	.user span {
		background-color: #0074D9;
		color: white;
		border-radius: 1em 1em 0 1em;
		word-break: break-all;
	}
</style>

<div class="chat">
	<h1>Eliza</h1>

    <!-- 이 div와 바인딩 -->
	<div class="scrollable" bind:this={div}>
		{#each comments as comment}
			<article class={comment.author}>
				<span>{comment.text}</span>
			</article>
		{/each}
	</div>

	<input on:keydown={handleKeydown}>
</div>
```

## Tick

`tick` 함수는 컴포넌트가 처음 초기화될때 뿐만 아니라 언제든지 호출할 수 있다는 점에서 다른 라이프사이클 함수와 다릅니다. 보류 중인 상태 변경이 DOM에 적용되는 즉시(또는 보류 중인 상태 변경이 없는 경우 즉시) 해결되는 `promise`를 반환합니다.

Svelte에서 컴포넌트 상태를 업데이트하면 DOM이 즉시 업데이트되지 않습니다. 대신, 다른 컴포넌트를 포함하여 적용해야 하는 다른 변경 사항이 있는지 확인하기 위해 다음 [microtask](https://ko.javascript.info/microtask-queue)까지 기다립니다. 이렇게 하면, 불필요한 작업을 방지하고 브라우저에서 작업을 보다 효과적으로 일괄 처리할 수 있습니다.

다음 예시에서 확인할 수 있습니다. 텍스트 범위를 선택하고 탭 키를 누릅니다. `<textarea>` 값이 변경되기 때문에 현재 선택 항목이 지워지고 커서가 끝까지 점프합니다. `tick`을 포함하면 해결할 수 있습니다.

```js
import { tick } from "svelte";
```

그리고 `handleKeydown`의 끝에 `this.selectionStart`와 `this.selectionEnd`를 설정하기 직전에 실행합니다.

```js
await tick();
this.selectionStart = selectionStart;
this.selectionEnd = selectionEnd;
```

```svelte
<script>
	// 	tick 포함하기
	import { tick } from 'svelte';

	let text = `Select some text and hit the tab key to toggle uppercase`;

	async function handleKeydown(event) {
		if (event.key !== 'Tab') return;

		event.preventDefault();

		const { selectionStart, selectionEnd, value } = this;
		const selection = value.slice(selectionStart, selectionEnd);

		const replacement = /[a-z]/.test(selection)
			? selection.toUpperCase()
			: selection.toLowerCase();

		text = (
			value.slice(0, selectionStart) +
			replacement +
			value.slice(selectionEnd)
		);

		// tick 선언
		// 상태가 변경이 DOM에 적용되는 즉시 실행
		await tick();
		this.selectionStart = selectionStart;
		this.selectionEnd = selectionEnd;
	}
</script>

<style>
	textarea {
		width: 100%;
		height: 200px;
	}
</style>

<textarea value={text} on:keydown={handleKeydown}></textarea>
```
