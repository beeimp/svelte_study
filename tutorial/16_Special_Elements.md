# Special Elements

Svelte는 다양한 내장 요소(element)를 제공합니다.

## `<svelte:self>`

`<svelte:self>`는 컴포넌트가 재귀적으로 자신을 포함할 수 있습니다.

폴더 트리 뷰와 같은 폴더에 다른 폴더가 포함될 수 있는 경우에 유용합니다. `Folder.svelte`에서 다음을 하기를 원합니다.

```js
{#if file.files}
	<Folder {...file}/>
{:else}
	<File {...file}/>
{/if}
```

하지만 불가능합니다. 왜냐하면 모듈은 스스로 가져올 수 없기 때문입니다. 대신 `<svelte:self>`를 사용합니다.

```js
{#if file.files}
	<svelte:self {...file}/>
{:else}
	<File {...file}/>
{/if}
```

## `<svelte:component>`

컴포넌트는 <svelte:component>와 함께 카테고리를 변경할 수 있습니다.

```js
{#if selected.color === 'red'}
	<RedThing/>
{:else if selected.color === 'green'}
	<GreenThing/>
{:else if selected.color === 'blue'}
	<BlueThing/>
{/if}
```

위와 같은 `if` 블록 대신 다음과 같이 단일 동적 컴포넌트를 사용할 수 있습니다.

```js
<svelte:component this={selected.component} />
```

이 값은 모든 컴포넌트 생성자일 수 있으며, false이면 컴포넌트가 렌더링되지 않습니다.

## `<svelte:window>`

이벤트 리스너를 DOM 요소에 추가할 수 있는 것처럼, `<svelte:window>`를 사용하여 `window` 개체에 이벤트 리스너를 추가할 수 있습니다.

실습 예제 11행에서 `keydown` 리스너를 추가합니다.

```js
<svelte:window on:keydown={handleKeydown} />
```

- DOM 요소와 마찬가지로 `preventDefault`와 같은 [이벤트 수정자](https://svelte.dev/tutorial/event-modifiers)를 추가할 수 있습니다.

### `<svelte:window>` 바인딩

`scrollY`와 같은 `window` 특정 속성에 바인딩할 수도 있습니다. 실습 예제 7번째 줄을 업데이트 합니다.

```js
<svelte:window bind:scrollY={y} />
```

바인딩할 수 있는 속성 목록은 다음과 같습니다.

- innerWidth
- innerHeight
- outerWidth
- outerHeight
- scrollX
- scrollY
- online - `window.navigator.onLine`의 별칭

`scrollX`와 `scrollY`를 제외한 모든 항목은 `읽기 전용` 입니다.

## `<svelte:body>`

`<svelte:window>`와 마찬가지로 `<svelte:body>` 요소를 사용하면 `document.body`에서 발생하는 이벤트를 들을(listen) 수 있습니다. 이 기능은 `window`에서 실행되지 않는 `mouseenter`와 `mouseleave` 이벤트에 유용합니다.

`mouseenter`와 `mouseleave` 핸들러를 `<svelte:body>` 태그에 추가합니다.

```js
<svelte:body
  on:mouseenter={handleMouseenter}
  on:mouseleave={handleMouseleave}
/>
```

## `<svelte:head>`

`<svelte:head>` 요소를 사용하여 문서의 `<head>` 안에 요소를 삽입할 수 있습니다.

```js
<svelte:head>
	<link rel="stylesheet" href="tutorial/dark-theme.css">
</svelte:head>
```

- SSR(Server-side rendering) 모드에서는 HTML의 나머지 부분과 별도로 `<svelte:head>`의 내용이 반환됩니다.

## `<svelte:options>`

`<svelte:options>` 요소를 사용하면 컴파일러 옵션을 지정할 수 있습니다.

`immutable` 옵션을 예로 들어 보겠습니다. 이 예제 앱에서는 새 데이터를 수신할 때마다 `<Todo>` 컴포넌트가 깜빡(flash)입니다. 항목 중 하나를 클릭하면 업데이트된 작업관리 배열을 만들어 `done` 상태로 전환됩니다. 이로 인해 DOM을 변경하지 않더라도 다른 `<Todo>` 항목이 깜빡입니다.

`<Todo>` 컴포넌트에 불변(immutable) 데이터를 예상하도록 함으로써 이를 최적화할 수 있습니다. 즉, `todo` props를 변형하지 않고, 상황이 바뀔 때마다 새로운 `todo` 객체를 만들 것이라고 약속(promise)합니다.

`Todo.svelte` 파일의 맨 위에 다음 항목을 추가합니다.

```js
<svelte:options immutable={true} />
```

- `<svelte:options immutable/>`로 짧게 입력할 수도 있습니다.

이제 해당 항목을 클릭하여 작업을 전환하면 업데이트된 컴포넌트만 깜빡입니다.

여기서 설정할 수 있는 옵션은 다음과 같습니다.

- `immutable={true}` - 절대 가변 데이터를 사용하지 않으므로 컴파일러는 간단한 참조 동일성 검사를 수행하여 값이 변경되었는지 확인 가능
- `immutable={false}` - 디폴트. Svelte는 가변 객체의 변경 여부에 대해 더 보수적(보호적?)
- `accessors={true}` - 컴포넌트의 props에 대한 `getter`와 `setter`를 추가
- `accessors={false}` - 디폴트
- `namespace="..."` - 이 컴포넌트가 사용될 네임스페이스(가장 일반적으로 "svg")
- `tag="..."` - 이 컴포넌트를 사용자 지정 요소로 컴파일할 때 사용할 이름

이러한 옵션에 대한 자세한 내용은 [API Reference](https://svelte.dev/docs) 를 참조하세요.

## `<svelte:fragment>`

`<svelte:fragment>` 요소를 사용하면 컨테이너 DOM 요소에 래필하지 않고 지정된 슬롯에 콘텐츠를 배치할 수 있습니다. 이렇게 하면 문서의 `flow layout`이 그대로 유지됩니다.

이 실습 예제에서 박스에 `1em`의 간견을 두고 `flex layout`을 적용하는 방법에 주목해 주세요.

```js
<!-- Box.svelte -->
<div class="box">
	<slot name="header">No header was provided</slot>
	<p>Some content between header and footer</p>
	<slot name="footer"></slot>
</div>

<style>
	.box {
		display: flex;
		flex-direction: column;
		gap: 1em;
	}
</style>
```

그러나 div로 줄이면 새 `flow layout`이 작성되므로 바닥글의 내용은 이 반복적인 규칙에 따라 간격이 지정되지 않습니다.

앱 컴포넌트에서 `<div slot="footer">`를 변경하여 이 문제를 해결할 수 있습니다.

`<div>` 요소를 `<svelte:fragment>`로 교체합니다.

```js
<svelte:fragment slot="footer">
  <p>All rights reserved.</p>
  <p>Copyright (c) 2019 Svelte Industries</p>
</svelte:fragment>
```

(그래서 결과 부분은 다음과 같은 차이가 있었습니다.)

```html
<!-- 변경 전 -->
<div class="box svelte-14nxt71">
  No header was provided
  <p>Some content between header and footer</p>
  <div slot="footer">
    <p>All rights reserved.</p>
    <p>Copyright (c) 2019 Svelte Industries</p>
  </div>
</div>

<!-- 변경 후 -->
<div class="box svelte-14nxt71">
  No header was provided
  <p>Some content between header and footer</p>
  <p>All rights reserved.</p>
  <p>Copyright (c) 2019 Svelte Industries</p>
</div>
```
