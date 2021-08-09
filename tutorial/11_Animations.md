# Animations

이전 [Transitions](./10_Transitions.md)의 전환 지연 장에서 항목을 전환하면 새 위치로 부드럽게 이동합니다. 하지만 전환되지 않은 항목은 어색하게 움직입니다. 이를 위해 애니메이션 지침을 사용합니다.

먼저 "시작, 마지막, 반전, 재생'의 `Flip` 함수를 `svelte/animate`에서 가져옵니다.

```js
import { flip } from "svelte/animate";
```

그 다움 `<label>` 요소에 추가합니다.

```js
<label
	in:receive="{{key: todo.id}}"
	out:send="{{key: todo.id}}"
	animate:flip
>
```

이 경우에는 움직임이 약간 느리므로 `duration` 파라미터를 추가하여 조절할 수 있습니다.

```js
<label
	in:receive="{{key: todo.id}}"
	out:send="{{key: todo.id}}"
	animate:flip="{{duration: 200}}"
>
```

- `duration`은 또한 `d => 밀리초` 함수일 수 있습니다. 여기서 `d`는 요소가 이동해야하는 픽셀 수 입니다.

모든 전환 및 애니메이션은 JavaScript가 아닌 CSS로 적용되므로 기본 스레드를 차단(또는 가로막지)하지 않습니다.
