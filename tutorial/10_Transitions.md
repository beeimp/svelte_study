# Transitions

## 전환(Transition) 지침

요소를 DOM으로 우아하게 전환하여 사용자 인터페이스를 보다 매력적으로 만들 수 있습니다. Svelte는 `transition` 지침을 통해 이 작업을 매우 쉽게 수행할 수 있습니다.

먼저, `svelte/transition`에서 `fade` 함수를 가져옵니다.

```html
<script>
  import { fade } from "svelte/transition"; // 서서히 전환되게 해줌
  let visible = true;
</script>
```

그런 다음 `p` 요소에 추가합니다.

```html
<p transition:fade>Fades in and out</p>
```

## 파라미터 추가

전환(Transition) 함수는 매개변수를 허용할 수 있습니다. `fade` 전환을 `fly`로 대체합니다.

```html
<script>
  import { fly } from "svelte/transition"; // 현재 지점에서 날아가는 전환 효과
  let visible = true;
</script>
```

다음 옵션과 함께 `<p>`에 적용합니다.

```html
<p transition:fly="{{ y: 200, duration: 2000 }}">Flies in and out</p>
```

전환이 진행 중일때 확인란을 전환하면 처음이나 끝이 아니라 현재 지점에서 전환됩니다.

## In and Out

전환 지시어 대신 요소는 `in` 또는 `out` 지시어를 가질 수 있으며, 둘 다 가질 수 있습니다. `fly`와 함께 `fade`를 포함합니다.

```js
import { fade, fly } from "svelte/transition";
```

그 다음 전환 지침을 변도의 `in` 과 `out`으로 대체합니다.

```js
<p in:fly="{{ y: 200, duration: 2000 }}" out:fade>
  Flies in, fades out
</p>
```

이 경우 전환이 반전되지 않습니다.

## 사용자 지정 CSS 전환

`svelte/transition` 모듈에는 몇 가지 기본 제공 전환이 있지만, 쉽게 자신만의 전환 모듈을 만들 수 있습니다. 예를 들어, `fade` 전환의 소스 코드는 다음과 같습니다.

```js
function fade(node, { delay = 0, duration = 400 }) {
  const o = +getComputedStyle(node).opacity;

  return {
    delay,
    duration,
    css: (t) => `opacity: ${t * o}`,
  };
}
```

함수는 전환이 적용되는 노드와 전달된 매개변수라는 두 인수를 사용하고 다음 속성을 가질 수 있는 전환 개체를 반환합니다.

- `delay` - 전환이 시작되기 전 딜레이(밀리초)

- `duration` - 전환되는 속도(밀리초)

- `easing` - `p => t` 완화 기능 ([tweening 참조](https://svelte.dev/tutorial/tweened)을 참조)

- `css` - `(t, u) => css` 함수(`u === 1 - t`)

- `tick` - 노드에 일부 영향을 미치는 `(t, u) => {...}` 함수

`t` 값은 인트로 시작 또는 아웃트로(outro) 끝 부분은 0이고, 도입부 끝 또는 아웃트로 시작 부분은 1이니다.

가능하면 Jank를 방지하기 위해 대부분의 경우 CSS 애니메이션이 주 스레드에서 실행되므로 `tick` 속성이 아닌 css 파라미터를 반환해야 합니다. Svelte는 전환을 '시물레이션'하고, CSS 애니메이션을 구성한 다음 실행되도록 합니다.

예를 들어, `fade` 전환은 다음과 같은 CSS 애니메이션을 생성합니다.

```css
0% {
  opacity: 0;
}
10% {
  opacity: 0.1;
}
20% {
  opacity: 0.2;
}
/* ... */
100% {
  opacity: 1;
}
```

하지만 우리는 훨씬 더 창의적으로 될 수 있습니다. 올바른 무료 모듈을 만들어 보세요.

```html
<script>
  import { fade } from "svelte/transition";
  import { elasticOut } from "svelte/easing";

  let visible = true;

  function spin(node, { duration }) {
    return {
      duration,
      css: (t) => {
        const eased = elasticOut(t);

        return `
					transform: scale(${eased}) rotate(${eased * 1080}deg);
					color: hsl(
						${~~(t * 360)},
						${Math.min(100, 1000 - 1000 * t)}%,
						${Math.min(50, 500 - 500 * t)}%
					);`;
      },
    };
  }
</script>
```

## 사용자 지정 JS 전환

일반적으로 전환 시 가능한 많이 CSS를 사용해야 하지만, JavaScript가 없으면 다음과 같은 효과를 얻을 수 없습니다.

```js
function typewriter(node, { speed = 50 }) {
  const valid =
    node.childNodes.length === 1 &&
    node.childNodes[0].nodeType === Node.TEXT_NODE;

  if (!valid) {
    throw new Error(
      `This transition only works on elements with a single text node child`
    );
  }

  const text = node.textContent;
  const duration = text.length * speed;

  return {
    duration,
    tick: (t) => {
      const i = ~~(text.length * t);
      node.textContent = text.slice(0, i);
    },
  };
}
```

## 전환 이벤트

전환이 전에 시작되고 언제 끝나는지 아는 것이 유용할 수 있습니다. Svelte는 다른 DOM 이벤트처럼 청취할 수 있는 이벤트를 디스패치합니다.

```html
<p
  transition:fly="{{ y: 200, duration: 2000 }}"
  on:introstart="{() => status = 'intro started'}"
  on:introend="{() => status = 'intro ended'}"
  on:outrostart="{() => status = 'outro started'}"
  on:outroend="{() => status = 'outro ended'}"
>
  Flies in and out
</p>
```

## 로컬 전환

일반적으로 컨테이너 블록이 추가되거나 제거될 때 전환이 요소에서 재생됩니다. 이 예제에서 전체 리스트의 가시성을 전환아면 개별 리스트 요소에도 전환이 적용됩니다.

대신, 사용자가 슬라이더를 끌 때 개별 항목을 추가 및 제거할 때에만 전환이 재생되도록 할 것입니다.

로컬 전환을 통해 이 작업을 수행할 수 있습니다. `로컬 전환은 바로 상위 블록을 추가하거나 제거할 때만 실행됩니다.`

```svelte
<div transition:slide|local>
	{item}
</div>
```

## 전환 지연

Svelte의 전환 엔진의 강력한 기능은 전환을 연기하여 여러 요소 간에 조정할 수 있도록 하는 기능입니다.

작업관리 목록을 전환하면 작업관리 목록이 반대 목록으로 전송됩니다. 실제 환경에서는 물체가 그렇게 동작하지 않습니다. 즉, 사라졌다가 다른 장소에 자시 나타나는 대신 일련의 중간 위치를 통해 움직입니다. 모션을 사용하면 사용자가 앱에서 발생하는 상황을 이해하는 데 도움이 됩니다.

`send`와 `receive`라는 전환 쌍을 만드는 `cressfade` 함수를 사용하여 이러한 효과를 얻을 수 있습니다. 요소가 '전송' 되면 해당 요소가 '수신'되는 것을 찾고 요소를 상대방의 위치로 변환하고 페이드 아웃하는 전환을 생성합니다. 요소가 '수신'되면 그 반대가 발생합니다. 상대가 없을 경우 `fallback` 전환이 사용됩니다.

실습 코드에서 `<label>` 요소를 찾고, `send` 및 `receive` 전환을 추가합니다.

```js
<label in:receive="{{key: todo.id}}" out:send="{{key: todo.id}}" />
```

그 다음 `<label>` 요소에 대해 동일한 작업을 수행합니다.

```js
<label class="done" in:receive="{{key: todo.id}}" out:send="{{key: todo.id}}" />
```

이제 항목을 전환하면 항목이 새 위치로 부드럽게 이동합니다.

## Key Blocks

키 블록은 표현식의 값이 변경될 때 내용을 삭제하고 다시 만듭니다.

```svelte
{#key value}
	<div transition:fade>{value}</div>
{/key}
```

이 기능은 요소가 DOM에 들어가거나 나갈 때만 값이 변경될 때마다 요소 전환을 재생하려는 경우에 유용합니다.

`number`에 따라 키 블록에 `<span>` 요소를 감쌉니다. 그러면 증가 버튼을 누를 때마다 애니메이션이 재생됩니다.
