# Module Context

## Sharing Code

지금까지 살펴본 모든 예에서, `<script>` 블록에는 각 컴포넌트 인스턴스가 초기화될 때 실행되는 코드가 포함되어 있습니다. 대부분의 컴포넌트에 필요한 것은 그것뿐입니다.

개별 컴포넌트 인스턴스 외부에서 일부 코드를 실행해야 하는 경우가 있습니다. 예를 들어, 실습 예제와 같은 오디오 플레이어 5개를 모두 동시에 재생할 수 있습니다. 하나를 재생하면 다른 오디오 플레이어가 모두 중지되는 것이 좋습니다.

`<script context="module">` 블럭을 선언하면 됩니다. `컴포넌트를 인스턴스화할 때가 아니라 모듈이 처음 평가할 때 포함된 코드가 한 번 실행`됩니다. `AudioPlayer.svelte`의 맨 위에 놓습니다.

```html
<script context="module">
	let current;
</script>
```

이제 상태 관리 없이 컴포넌트간 간에 '대화(talk)'가 가능합니다.

```js
function stopOthers() {
	if (current && current !== audio) current.pause();
	current = audio;
}
```

## Exports

`context="module"` 스크립트 블록에서 내보낸 모든 항목은 모듈 자체에서 내보내기가 됩니다. `AudioPlayer.svelte`에서 `stopAll` 함수를 내보내면 다음과 같습니다.

```html
<script context="module">
	const elements = new Set();

	export function stopAll() {
		elements.forEach(element => {
			element.pause();
		});
	}
</script>
```

그러면 `App.svelte`에서 다음을 가져올 수 있습니다.

```html
<script>
	import AudioPlayer, { stopAll } from './AudioPlayer.svelte';
</script>
```

그리고 이벤트 핸들러를 사용합니다.

```html
<button on:click={stopAll}>
	stop all audio
</button>
```

- 컴포넌트가 `default export`이므로 `default export`를 사용할 수 없습니다.