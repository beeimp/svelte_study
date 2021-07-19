# Bindings

## Text Inputs

일반적으로 `Svelte의 데이터 흐름은 하향식`입니다. 상위 컴포넌트는 하위 컴포넌트에 props를 설정할 수 있고, 컴포넌트는 요소에 특성을 설정할 수 있찌만, 그 반대의 경우는 설정할 수 없습니다.

어떤 경우에는 이 규칙을 어기는 것이 유용할 수 있습니다. 이 컴포넌트의 `<input>` 요소를 예로 들어보면, name 값을 `event.target.value`로 설정하는 `on:input` 이벤트 핸들러를 추가할 수 있지만, 다소 상용적입니다.

대신, `bind:value` 지시문을 사용할 수 있습니다.

```svelte
<input bind:value={name}>
```

즉, name 값이 input 값을 업데이트할 뿐만 아니라 input 값을 변경하면 이름이 업데이트됩니다.

```svelte
<script>
	let name = 'world';
</script>

<!-- bind 추가 -->
<input bind:value={name}>

<h1>Hello {name}!</h1>
```

## Numeric Inputs

DOM에서는 모든 것이 문자열입니다. 숫자 입력에서 `type="number"` 및 `type="range"` 를 처리하는 경우 유용하지 않습니다. 이는 <u>input 값을 사용하기 전에 반드시 `input.value`를 적용해야 함을 의미합니다.</u>

`bind:value`를 통해 다음과 같은 이점을 제공합니다.

```svelte
<input type=number bind:value={a} min=0 max=10>
<input type=range bind:value={a} min=0 max=10>
```

다음과 같이 작성해야 합니다.

```svelte

<script>
	let a = 1;
	let b = 2;
</script>

<!-- 테스트를 위해 value에서 bind 부분을 제거 후 실행해보세요. -->
<label>
	<input type=number bind:value={a} min=0 max=10>
	<input type=range bind:value={a} min=0 max=10>
</label>

<label>
	<input type=number bind:value={b} min=0 max=10>
	<input type=range bind:value={b} min=0 max=10>
</label>

<p>{a} + {b} = {a + b}</p>
```

## Checkbox Inputs

체크박스는 상태 전환에 사용됩니다. `input.value`에 바인딩하지 않고 `input.checked`에 바인딩해야 합니다.

```svelte
<input type=checkbox bind:checked={yes}>
```

## Group Inputs

동일한 값과 관련된 `<input>`이 여러 개인 경우, 값 속성과 함께 `bind:group`을 사용할 수 있습니다. 동일한 그룹의 radio 입력은 상호 베타적입니다. 동일한 그 그룹의 체크박스의 input들은 선택한 값의 배열을 형성합니다.

각 input에 `bind:group`을 추가합니다.

```svelte
<input type=radio bind:group={scoops} name="scoops" value={1}>
```

이 경우, `each` 블록으로 체크박스 입력들이 이동하여 코드를 더욱 간단하게 만들 수 있습니다. 먼저, `menu` 변수를 `<script>` 블록에 추가합니다.

```svelte
let menu = [
	'Cookies and cream',
	'Mint choc chip',
	'Raspberry ripple'
];
```

그 다음 두 번째 섹션을 교체합니다.

```svelte
<h2>Flavours</h2>

{#each menu as flavour}
	<label>
		<input type=checkbox bind:group={flavours} name="flavours" value={flavour}>
		{flavour}
	</label>
{/each}
```

그러면 새롭고 흥미로운 방향으로 아이스크림 메뉴를 확장하는 것이 쉬워졌습니다.

최종 코드는 다음과 같습니다.

```svelte
<script>
	let scoops = 1;
	let flavours = ['Mint choc chip'];

    // 메뉴 추가
	let menu = [
		'Cookies and cream',
		'Mint choc chip',
		'Raspberry ripple'
	];

	function join(flavours) {
		if (flavours.length === 1) return flavours[0];
		return `${flavours.slice(0, -1).join(', ')} and ${flavours[flavours.length - 1]}`;
	}
</script>

<h2>Size</h2>

<label>
	<input type=radio bind:group={scoops} name="scoops" value={1}>
	One scoop
</label>

<label>
	<input type=radio bind:group={scoops} name="scoops" value={2}>
	Two scoops
</label>

<label>
	<input type=radio bind:group={scoops} name="scoops" value={3}>
	Three scoops
</label>

<h2>Flavours</h2>

<!-- each를 통해 반복 -->
{#each menu as flavour}
	<label>
        <!-- bind:group 추가 -->
		<input type=checkbox bind:group={flavours} name="flavours" value={flavour}>
		{flavour}
	</label>
{/each}

{#if flavours.length === 0}
	<p>Please select at least one flavour</p>
{:else if flavours.length > scoops}
	<p>Can't order more flavours than scoops!</p>
{:else}
	<p>
		You ordered {scoops} {scoops === 1 ? 'scoop' : 'scoops'}
		of {join(flavours)}
	</p>
{/if}
```

## Textarea Inputs

`<textarea>` 요소는 `bind:value`를 사용하여 Svelte의 텍스트 입력과 유사하게 동작합니다.

```svelte
<textarea bind:value={value}></textarea>
```

이와 같이 이름이 일치하는 경우, 다음과 같은 약어 형식을 사용할 수도 있습니다.

```svelte
<textarea bind:value></textarea>
```

최종 코드는 다음과 같습니다..

```svelte
<script>
	import marked from 'marked'; // 마크다운 모듈
	let value = `Some words are *italic*, some are **bold**`;
</script>

{@html marked(value)}

<textarea bind:value></textarea>

<style>
	textarea { width: 100%; height: 200px; }
</style>
```

## Select Bindings

`<select>` 요소에 `bind:value`를 사용할 수도 있습니다.

```svelte
<select bind:value={selected} on:change="{() => answer = ''}">
```

`<option>` 값은 문자열이 아니라 개체 입니다. Svelte는 신경쓰지 않습니다.

- 선택한 초기값을 설정하지 않았기 때문에 자동으로 기본값(목록의 첫번째 값)으로 설정됩니다.
- 하지만 바인딩이 초기화될 때까지 선택한 항목이 정의되지 않은 상태로 유지되므로 템플릿에서 `selected.id`와 같이 무작정 참조할 수 없음을 주의하세요!

## Select Multiple

Select는 `multiple` 특성을 가질 수 있으며, 이 경우 단일 값을 선택하는 대신 array가 채워집니다. 다음과 같이 말이죠.

```svelte
<h2>Flavours</h2>

<!-- multiple 속성 중요! -->
<select multiple bind:value={flavours}>
	{#each menu as flavour}
		<option value={flavour}>
			{flavour}
		</option>
	{/each}
</select>
```

## Contenteditable Bindings

`contenteditable="true"` 특성을 가진 요소는 `textContent` 및 `innerHTML` 바인딩을 지원합니다.

```svelte
<div
	contenteditable="true"
	bind:innerHTML={html}
></div>
```

## Each Block Bindings

`each` 블록 내부의 속성에 바인딩할 수도 있습니다.

```svelte
<script>
	let todos = [
		{ done: false, text: 'finish Svelte tutorial' },
		{ done: false, text: 'build an app' },
		{ done: false, text: 'world domination' }
	];

	function add() {
		todos = todos.concat({ done: false, text: '' });
	}

	function clear() {
		todos = todos.filter(t => !t.done);
	}

	$: remaining = todos.filter(t => !t.done).length;
</script>

<h1>Todos</h1>

{#each todos as todo}
	<div class:done={todo.done}>
        <!-- bind:checked -->
		<input
			type=checkbox
			bind:checked={todo.done}
		>
        <!-- bind:checked -->
		<input
			placeholder="What needs to be done?"
			bind:value={todo.text}
		>
	</div>
{/each}

<p>{remaining} remaining</p>

<button on:click={add}>
	Add new
</button>

<button on:click={clear}>
	Clear completed
</button>

<style>
	.done {
		opacity: 0.4;
	}
</style>
```

- 이러한 `<input>` 요소와 상호 작용하면 array가 변질될 것입니다. 불변 데이터로 작업하려면 이러한 바인딩을 피하세요!
- 대신 `이벤트 핸들러를 사용`해야 합니다.

## Media Elements

`<audio>` 및 `<video>` 요소는 바인딩 할 수 있는 몇 가지 속성이 있습니다. 밑의 예에서 살펴봅시다.

```svelte
<video
	poster="https://sveltejs.github.io/assets/caminandes-llamigos.jpg"
	src="https://sveltejs.github.io/assets/caminandes-llamigos.mp4"
	on:mousemove={handleMousemove}
	on:mousedown={handleMousedown}
	bind:currentTime={time}
	bind:duration
	bind:paused
></video>
```

- `bind:duration` = `bind:duration = {duration}`

가이드에 위의 코드를 추가하여 비디오를 클릭하면 시간, 지속 시간이 업데이트되고 적절히 일시 중지됩니다. 즉, 사용자 지정 제어 기능을 구축하는데 사용할 수 있습니다.

- 일반적으로 웹에서는 시간 업데이트 이벤트를 수신하여 `currentTime`을 추적합니다.
  - 하지만 이벤트가 너무 자주 발생하지 않아 UI가 딱딱해집니다.
- Svelte는 `requestAnimationFrame`을 사용하여 `currentTime`을 확인합니다.

`<audio>` 및 `<video>`의 전체 바인딩 set은 다음과 같습니다. [참고하면 좋을 블로그](https://ohgyun.com/467)

- 읽기전용 바인딩

  - duration (readonly)
    - 비디오의 총 지속시간(초)
  - buffered (readonly)
    - 버퍼링된 영역
    - {start, end} 개체의 array
  - seekable (readonly)
    - 탐색 가능한 영역.
    - {start, end} 개체의 array
  - played (readonly)
    - 재생된 범위
    - {start, end} 개체의 array
  - seeking (readonly)
    - 미디어의 재생 위치를 버터링 되지 않은 부분으로 건너뜀
    - 새로운 재싱 위치로 건너뛰면 변경
    - boolean
  - ended (readonly)
    - 미디어가 마지막에 도달하여 재생이 중단되면 true 설정
    - boolean

- 양뱡향 바인딩 (two-way bindings)
  - currentTime
    - 비디오의 현재 지점(초)
  - playbackRate
    - 비디오 재생속도(기본 1)
  - paused
    - 일시 중지
    - boolean
  - volume
    - 소리 크기 조절
    - 0과 1 사이의 값
  - muted
    - 음소거
    - boolean

또한, 비디오에는 읽기 전용 `videoWidth`와 `videoHeight` 바인딩이 있습니다.

## Dimentions

모든 블록 레벨 요소에는 `clientWidth`, `clientHeight`, `offsetWidth`, `offsetHeight` 바인딩이 있습니다.

```svelte
<div bind:clientWidth={w} bind:clientHeight={h}>
	<span style="font-size: {size}px">{text}</span>
</div>
```

이러한 바인딩은 읽기 전용입니다. `w` 및 `h`의 값을 변경하면 아무런 효과가 없습니다.

- 요소는 이와 [유사한 기법](http://www.backalleycoder.com/2013/03/18/cross-browser-event-based-element-resize-detection/)을 사용하여 측정합니다. 약간의 오버헤드가 수반되므로 많은 수의 요소에는 사용하지 않는 것이 좋습니다.
- display: 인라인 요소는 이 방법으로 측정할 수 없으며, 다른 요소를 포함할 수 없는 요소(예: `<canvase>`)도 측정할 수 없습니다. 이러한 경우 wrapper 요소를 측정해야 합니다.

```svelte
<script>
	let w;
	let h;
	let size = 42;
	let text = 'edit me';
</script>

<input type=range bind:value={size}>
<input bind:value={text}>

<p>size: {w}px x {h}px</p>

<div bind:clientWidth={w} bind:clientHeight={h}>
	<span style="font-size: {size}px">{text}</span>
</div>

<style>
	input { display: block; }
	div { display: inline-block; }
	span { word-break: break-all; }
</style>
```

## This

읽기 전용 `this` 바인딩은 모든 요소(및 컴포넌트)에 적용되며 렌더링된 요소에 대한 참조를 가져올 수 있습니다. 예를들어, `<canvas>` 요소에 대한 참조를 확인할 수 있습니다.

```svelte
<canvas
	bind:this={canvas}
	width={32}
	height={32}
></canvas>
```

`canvas`의 값을 컴포넌트가 마운트될때까지 정의되지 않으므로 `onMount` [라이프사이클 함수](https://svelte.dev/tutorial/onmount)를 넣습니다.

## Component bindings

DOM 요소의 속성에 바인딩할 수 있는 것처럼 컴포넌트 props에 바인딩할 수 있습니다. 예를 들어, 이 <Keypad> 컴포넌트의 `value` props을 마치 form 요소인 것처럼 바인딩할 수 있습니다.

```svelte
<Keypad bind:value={pin} on:submit={handleSubmit}/>
```

그러면 상위 컴포넌트의 핀 값이 즉시 업데이트 됩니다.

```svelte
<!-- App.svelte -->
<script>
	import Keypad from './Keypad.svelte';

	let pin;
	$: view = pin ? pin.replace(/\d(?!$)/g, '•') : 'enter your pin';

	function handleSubmit() {
		alert(`submitted ${pin}`);
	}
</script>

<h1 style="color: {pin ? '#333' : '#ccc'}">{view}</h1>

<Keypad bind:value={pin} on:submit={handleSubmit}/>

<!-- Keypad.svelte -->
<script>
	import { createEventDispatcher } from 'svelte';

	export let value = '';

	const dispatch = createEventDispatcher();

	const select = num => () => value += num;
	const clear  = () => value = '';
	const submit = () => dispatch('submit');
</script>

<div class="keypad">
	<button on:click={select(1)}>1</button>
	<button on:click={select(2)}>2</button>
	<button on:click={select(3)}>3</button>
	<button on:click={select(4)}>4</button>
	<button on:click={select(5)}>5</button>
	<button on:click={select(6)}>6</button>
	<button on:click={select(7)}>7</button>
	<button on:click={select(8)}>8</button>
	<button on:click={select(9)}>9</button>

	<button disabled={!value} on:click={clear}>clear</button>
	<button on:click={select(0)}>0</button>
	<button disabled={!value} on:click={submit}>submit</button>
</div>

<style>
	.keypad {
		display: grid;
		grid-template-columns: repeat(3, 5em);
		grid-template-rows: repeat(4, 3em);
		grid-gap: 0.5em
	}

	button {
		margin: 0
	}
</style>
```

- 컴포넌트 바인딩을 자주 사용하지 마십시오.
  - 특히, `single source of truth`가 없는 경우 애플리케이션 주변의 `데이터 흐름을 추적하기 어려울 것입니다.`

## Binding to component instances

DOM 요소에 바인딩할 수 있는 것과 마찬가지로 컴포넌트 인스턴스 자체에 바인딩할 수 있습니다. 예를 들어, DOM 요소를 바인딩할 때와 같은 방식으로 `<inputField>` 인스턴스를 `field`라는 이름의 prop에 바인딩할 수 있습니다.

```svelte
<InputField bind:this={field} />
```

이제 `field`를 사용하여 이 컴포넌트와 프로그래밍 방식으로 상호 작용할 수 있습니다.

```svelte
<button on:click="{() => field.focus()}">
	Focus field
</button>
```

- 버튼이 처음 렌더링되고 오류가 발생할 때 필드가 정의되지 않으므로 `{field.focus}`를 수행할 수 없습니다.
