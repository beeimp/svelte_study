# Component Composition

## Slots(슬롯)

요소(element)가 자식(children)을 가질수 있는 것처럼 컴포넌트도 가질 수 있습니다. 하지만 컴포넌트가 자식을 받아들이기 전에 어디에 두어야 하는지 알아야합니다. 이 작업은 `<slot>` 요소로 수행합니다. 이를 실습 예제에서 `Box.svelte`에 넣습니다.

```html
<div class="box">
  <slot></slot>
</div>
```

이제 다음 항목을 `<Box>` 안에 자식으로 넣을 수 있습니다.

```html
<Box>
  <h2>Hello!</h2>
  <p>This is a box. It can contain anything.</p>
</Box>
```

## Slot Fallbacks(슬롯 대비책)

컴포넌트는 내용을 `<slot>` 요소 내부에 넣어 비어 있는 슬롯에 대해 fallback을 지정할 수 있습니다.

```html
<div class="box">
  <slot>
    <em>no content was provided</em>
  </slot>
</div>
```

이제 하위 항목 없이 다음과 같은 `<Box>` 인스턴스를 만들 수 있습니다.

```html
<Box>
  <h2>Hello!</h2>
  <p>This is a box. It can contain anything.</p>
</Box>

<Box />
```

## Named Slots

이전 실습 예제에는 컴포넌트의 직계 자식을 렌더링하는 기본 슬롯이 포함되어 있습니다. 때로는 이 `<ContractCard>`와 같이 배치를 보다 세부적으로 제어해야 할 수도 있습니다. 그런 경우, 우리는 네임드 슬롯을 사용할 수 있습니다.

```html
<article class="contact-card">
  <h2>
    <slot name="name">
      <span class="missing">Unknown name</span>
    </slot>
  </h2>

  <div class="address">
    <slot name="address">
      <span class="missing">Unknown address</span>
    </slot>
  </div>

  <div class="email">
    <slot name="email">
      <span class="missing">Unknown email</span>
    </slot>
  </div>
</article>
```

그 다음, `<ContractCard>` 컴포넌트 내부에 해당 `slot="..."` 속성을 가진 요소를 추가합니다.

```html
<ContactCard>
  <span slot="name"> P. Sherman </span>

  <span slot="address">
    42 Wallaby Way<br />
    Sydney
  </span>
</ContactCard>
```

## Checking for slot content

경우에 따라서 부모(parent)가 특정 슬롯에 대한 콘텐츠를 전달하는 여부에 따라 컴포넌트의 일부를 제어할 수 있습니다. 아마 슬롯을 감싸는 포장지(wrapper)가 있을 것이고, 슬롯이 비어 있으면 렌더링을 하지 않을 것입니다. 아니면 슬롯이 있는 경우에만 클래스를 신청하고 싶을수도 있습니다. 이 작업은 특수 `$$slots` 변수의 속성을 확인하여 수행할 수 있습니다.

`$$slots`는 부모 컴포넌트가 전달한 슬롯의 이름을 키로 나타내는 개체입니다. 부모가 슬롯을 비워 두면 ``$$slots`에 해당 슬롯에 대한 항목이 없습니다.

이 예제의 두 `<Project>` 인스턴스는 모두 주석과 알림 점을 위한 컨테이너를 렌더링합니다. 주석만 있는 경우에도 마찬가지입니다. `$$slot`을 사용하여 부모 `<app>`이 주석 슬롯에 대한 콘텐츠를 전달할 때만 이러한 요소를 렌더링합니다.

`Project.svelte`에서 `class:has-discussion` 지시문을 업데이트해봅니다.

```html
<article class:has-discussion="{$$slots.comments}"></article>
```

그 다음, `$$slots`를 확인하는 `if` 블록에 주석 슬롯과 해당 래핑 `<div>`를 래핑합니다.

```js
{#if $$slots.comments}
	<div class="discussion">
		<h3>Comments</h3>
		<slot name="comments"></slot>
	</div>
{/if}
```

이제 `<app>`에서 주석 슬롯을 비워 두면, 주석 컨테이너와 알림 점이 렌더링되지 않습니다.

## Slot Props

이 예제 앱에는 마우스가 현재 위에 있는지 여부를 추적하는 `<Hoverable>` 컴포넌트가 있습니다.

이때 슬롯 Props를 사용합니다. `Hoverable.svelte`에서 `hovering` 값을 슬롯에 전달합니다.

```html
<div on:mouseenter="{enter}" on:mouseleave="{leave}">
  <slot hovering="{hovering}"></slot>
</div>
```

- 원하는 경우 `{hovering}` shorthand도 사용할 수 있습니다.

다음, `hovering`를 `<Hoverable>` 컴포넌트의 콘텐츠에 노출하기 위해 `let` 지시어를 사용합니다.

```js
<Hoverable let:hovering={hovering}>
	<div class:active={hovering}>
		{#if hovering}
			<p>I am being hovered upon.</p>
		{:else}
			<p>Hover over me!</p>
		{/if}
	</div>
</Hoverable>
```

부모 컴포넌트에서 `active`로 호출하려면 변수 이름을 변경할 수 있습니다.

```js
<Hoverable let:hovering={active}>
	<div class:active>
		{#if active}
			<p>I am being hovered upon.</p>
		{:else}
			<p>Hover over me!</p>
		{/if}
	</div>
</Hoverable>
```

이러한 컴포넌트를 원하는 수만큼 가질 수 있습니다. 또, 슬롯된 Props는 선언된 컴포넌트의 로컬 상태를 유지합니다.

- 네임드 슬롯에도 Props가 있을 수 있습니다. 컴포넌트 자체 대신 `slot="..."` 속성을 가진 요소에 `let` 지시문을 사용하세요.
