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
