# Classes

## 클래스 지침

다른 속성과 마찬가지로 다음과 같이 JavaScript 속성으로 클래스를 지정할 수 있습니다.

```html
<button
  class="{ current === 'foo' ? 'selected' : '' }"
  on:click="{ () => current = 'foo' }"
>
  foo
</button>
```

이는 UI 개발에서 매우 일반적인 패턴으로, Svelte에는 이를 단순화하기 위한 특별 지침이 포함되어 있습니다.

```html
<button
  class:selected="{ current === 'foo' }"
  on:click="{ () => current = 'foo' }"
>
  foo
</button>
```

`selected` 클래스는 표현식의 값이 `true`일 때마다 요소에 추가되고, `false`일 때는 제거됩니다.

## Shorthand 클래스 지침

종종 클래스의 이름은 종속된 값의 이름과 같습니다.

```html
<div class:big="{big}">
  <!-- ... -->
</div>
```

이러한 경우, 다음과 같은 간단한 양식을 사용할 수 있습니다.

```html
<div class:big>
  <!-- ... -->
</div>
```
