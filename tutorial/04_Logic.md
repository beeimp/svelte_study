# Logic

HTML에는 조건이나 루프와 같은 논리를 표현할 수 있는 방법이 없습니다. Svelte는 다음과 같은 마크업을 제공합니다.

## If Blocks

Svelte에서는 조건부로 마크업을 렌더링하기 위해 `if` 블록으로 래핑합니다.

```html
{#if user.loggedIn}
<button on:click="{toggle}">Log out</button>
{/if} {#if !user.loggedIn}
<button on:click="{toggle}">Log in</button>
{/if}
```

## Else Blocks

상호 배타적인 두 조건에는 다른 블록을 사용하여 이 컴포넌트를 약간 간소화 할 수 있습니다.

```svelte
{#if user.loggedIn}
    <button on:click="{toggle}">Log out</button>
{:else}
    <button on:click="{toggle}">Log in</button>
{/if}
```

## Else-if Blocks

`else if`와 함께 여러 조건을 `'chained'`할 수 있습니다.

```svelte
{#if x > 10}
    <p>{x} is greater than 10</p>
{:else if 5 > x}
    <p>{x} is less than 5</p>
{:else}
    <p>{x} is between 5 and 10</p>
{/if}
```

## Eeach Blocks

데이터 목록을 반복해야 하는 경우 `each`를 사용할 수 있습니다.

```svelte
<ul>
  {#each cats as cat}
    <li>
        <a target="_blank" href="https://www.youtube.com/watch?v={cat.id}">
        {cat.name}
        </a>
    </li>
  {/each}
</ul>
```

다음과 같이 `현재 인덱스를 보조 인수로 가져올 수 있습니다.`

```svelte
{#each cats as cat, i}
	<li><a target="_blank" href="https://www.youtube.com/watch?v={cat.id}">
		{i + 1}: {cat.name}
	</a></li>
{/each}
```

원한다면 `cat.id`와 `cat.name`을 `each cats as {id, name}` 과 같이 사용할 수 있습니다.

## Keyed each Blocks

기본적으로 각 블록의 값을 수정하면 블록 끝의 항목이 추가 및 제거되고 변경된 값이 업데이트 됩니다. 그러나 그건 원하는 것이 아닐 수 있습니다.

예제에서 출력된 결과의 `'Remove first thing' 버튼`을 클릭해보면 이상한 점을 찾을 수 있습니다. 첫 번째 <Thing> 컴포넌트는 제거되지만 마지막 DOM 노드도 제거됩니다. 그런 다음 나머지 DOM 노드에서 이릅 값을 업데이트하지만 이모지는 업데이트되지 않습니다.

요구하는 것은 첫 번째 <Thing> 컴포넌트와 해당 DOM 노드만 제거하고 나머지 구성요소에는 영향을 주지 않고 그대로 주려고 합니다.

이를 위해 각 블록에 대해 고유한 식별자(또는 Key)를 지정합니다.

```svelte
{#each things as thing (thing.id)}
	<Thing name={thing.name}/>
{/each}
```

여기서 `(thing.id)`이 핵심입니다. <u>이 키는 컴포넌트가 업데이트될 때 변경할 DOM 노드를 파악하는 방법을 알려줍니다.</u>

Svelte가 내부적으로 맵을 사용하는 것처럼, `(thing.id)` 대신` 어떤 객체도 키로 사용할 수 있습니다.` 그러나 일반적으로 문자열이나 숫자를 사용하는 것이 안전합니다. 예를 들어 API 서버로부터 새로운 데이터로 업데이트할 때 `참조 동일성 없이 ID가 유지된다는 것을 의미`하기 때문입니다.

## Await Blocks

대부분의 웹 애플리케이션은` 비동기 데이터를 처리해야하는 경우`가 많습니다. Svelte를 사용하면 마크업에서 약속된 값을 직접 기다릴 수 있습니다.

```svelte
{#await promise}
	<p>...waiting</p>
{:then number}
	<p>The number is {number}</p>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}
```

- 가장 최근 `promise`만 고려되는데, 이것은 경쟁 상태(race condition)에 대해 걱정할 필요가 없음을 의미합니다.

promise를 거부할 수 없다는 것을 안다면, `catch` 블록은 생략할 수 있습니다. promise가 해결될 때까지 아무것도 표지하지 않으려는 경우에도 첫 번째 블록을 생략할 수 있습니다.

## 참조

- [https://svelte.dev/tutorial/if-blocks](https://svelte.dev/tutorial/if-blocks)
