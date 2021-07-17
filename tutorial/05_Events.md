# Events

## DOM Events

앞서 살펴본 바와 같이, 요소에 대한 모든 이벤트를 `on:` 지시문을 사용하여 작성할 수 있습니다.

```svelte
<div on:mousemove={handleMousemove}>
	The mouse position is {m.x} x {m.y}
</div>
```

## Inline Handlers

이벤트 핸들러는 인라인으로 선언할 수 있습니다.

```svelte
<div on:mousemove="{e => m = { x: e.clientX, y: e.clientY }}">
	The mouse position is {m.x} x {m.y}
</div>
```

여기서 따옴표는 선택 사항이지만 일부 환경에서는 구문 강조 표시에 매우 유용합니다.

- 일부 프레임워크에서는 성능상의 이유로, 특히 루프 내부에서 인라인 이벤트 핸들러를 사용하지 않는것이 좋습니다.` 하지만 Svelte에서는 적용되지 않습니다.` 컴파일러는 당신이 어떤 형태를 선택하든 항상 옳은 일을 할 것입니다.

## Event Modifiers

DOM 이벤트 핸들러는 동작을 변경하는 `modifier`를 가질 수 있습니다. 예를 들어, 다음과 같이 `onec` modifier가 있는 핸들러는 한번만 실행됩니다.

```svelte
<script>
	function handleClick() {
		alert('no more alerts')
	}
</script>

<button on:click|once={handleClick}>
	Click me
</button>
```

전체 modifier 목록은 다음과 같습니다.

- `preventDefault` - Calls
  - `event.preventDefault()` 는 핸들러를 실행하기 전에 실행
  - 클러이언트단의 핸들링에 유용
- `stopPropagation` - Calls
  - `event.stopPropagation()`로 인해 이벤트가 다음 요소에 도달하지 않도롬 함
- `passive`
  - 이 기능은 터치 및 휠 이벤트에서 스크롤 성능을 개선
  - Svelte는 자동으로 안전한 곳에 추가
- `nonpassive`
  - 명시적으로 패시브 설정(False)
- `capture`
  - 버블링 단계([MDN docs](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#Event_bubbling_and_capture)) 대신 `캡처 단계 중 핸들러를 실행`
- `once`
  - 핸들러를 처음 실행한 후 제거
- `self`
  - `event.target`이 요소 자체인 경우에만 트리거 핸들러 실행

다음과 같이 modifier를 서로 연결할 수 있습니다.

```
on:click|once|capture={...}
```

## Component Events

컴포넌트는 이벤트를 dispatch할 수도 있습니다. 이렇게 하려면 이벤트 dispatcher를 생성해야 합니다.

```svelte
<script>
	import { createEventDispatcher } from 'svelte'; // 디스패처

	const dispatch = createEventDispatcher(); // 디스패처 생성

	function sayHello() {
		dispatch('message', {
			text: 'Hello!'
		});
	}
</script>
```

- `createEventDispatcher`는 컴포넌트가 처음 인스턴스화 되었을 때 호출되어야 합니다. `setTimeout` 콜백과 같은 내부에서는 나중에 호출할 수 없습니다. 이 링크는 컴포넌트 인스턴스에 디스패치됩니다.

앱 컴포넌트가 `on:message` 지시로 인해 `Inner` 컴포넌트가 디스패치한 메시지를 리스닝하고 있습니다. 이 지시어는 `on:` 접두사가 붙은 특성 뒤에 우리가 디스패칭하는 이벤트 이름(이 경우 메시지)가 붙습니다.

이 특성이 없으면 메시지가 계속 디스패치 되지만, 앱은 응답하지 않습니다.
`on:message` 특성을 제거하고 버튼을 다시 눌러 볼 수 있습니다.

- 이벤트 이름을 다른 이름으로 변경해 볼 수도 있습니다. 예를 들어, `Inner.svelte`에서 `dispatch('message')`를 `dispatch('myevent')`로 변경한 후 `App.svelte` 컴포넌트에서 특성 이름을 `on:message`에서 `on:myevent`로 변경할 수 있습니다.

## Event Forwarding

<u>DOM 이벤트와 달리 컴포넌트 이벤트는 버블이 발생하지 않습니다.</u> 일부 깊게 중첩된 컴포넌트에서 이벤트를 수신하려면 중간 컴포넌트가 이벤트를 전달해야 합니다.

이 문제를 해결하기 위한 방법 중 한가지로, 새로운 파일에 `createEventDispatcher`를 추가하고, 메시지 이벤트를 수신하기 위한 핸들러를 만들 수 있습니다.

```svelte
<script>
	import Inner from './Inner.svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function forward(event) {
		dispatch('message', event.detail);
	}
</script>

<Inner on:message={forward}/>
```

하지만 위 코드는 중복되는 부분이 생겨 코드가 길어집니다. 따라서 Svelte에서 값이 없는 `on:message` 이벤트 지시문과 동일한 약칭을 제공합니다. 이는 `모든 메시지 이벤트 전달`을 의미합니다.

```svelte
<script>
	import Inner from './Inner.svelte';
</script>

<Inner on:message/>
```

## DOM Event Forwarding

DOM 이벤트에 대해서도 이벤트 포워딩이 작동합니다.

이를 위해, `<CustomButton>` 클릭 알림을 받고자 합니다. 그러려면 `CustomButton.svelte`의 `<button>` 요소에 대한 클릭 이벤트만 전달하면 됩니다.

```svelte
<!-- CustomButton.svelte -->
<!-- 외부 컴포넌트의 <button>에 on:click 추가 -->
<button on:click>
	Click me
</button>
```
