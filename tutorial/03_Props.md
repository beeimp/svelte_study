# Props

## Declaring props

지금까지 내부 상태(주어진 컴포넌트 내에서만 값을 액세스)만을 다뤘습니다.

실제 애플리케이션에서는 한 컴포넌트에서 하위 컴포넌트로 데이터를 전달해야 합니다. 이를 위해 일반적으로 `'props'`로 줄여진 속성을 선언해야 합니다. Svelte에서는 `export` 키워드로 이 작업을 수행합니다.

```html
<script>
  export let answer;
</script>
```

```
마치 `$:` 처럼, 처음에는 이질감이 느껴지실 수 있습니다. JavaScript 모듈에서는 일반적으로 이러한 방식으로 내보내기가 작동하지 않습니다. 일단 이렇게 작성하다 보면 익숙해지실거에요!😂
```

## Default Values

Svelte는 props의 기본값을 쉽게 지정할 수 있습니다.

```html
<script>
  export let answer = "a mystery"; // 기본값 선언
</script>
```

이제 <u>`answer` prop이 없이 두 번째 구성 요소를 추가하면 다시 기본값으로 돌아갑니다.</u>

```html
<Nested answer="{42}" />

<Nested />
```

## Spread Props

속성 개체가 있는 경우 속성 개체를 각각 지정하는 대신 컴포넌트로 '`spread`'할 수 있습니다.

```html
<Info {...pkg} />
```

```
반대로 내보내기로 선언되지 않은 props를 포함하여 컴포넌트로 전달된 모든 props를 참조해야 하는 경우 '$$prop' 에 직접 액세스하여 이를 수행할 수 있습니다.
Svelte가 최적화하기 어렵기 때문에 일반적으로 권장하지 않지만,
어떤 경우에는 유용합니다.
```

```html
<!-- App.svelte -->
<script>
  import Info from "./Info.svelte";

  const pkg = {
    name: "svelte",
    version: 3,
    speed: "blazing",
    website: "https://svelte.dev",
  };
</script>

<!-- <Info name={pkg.name} version={pkg.version} speed={pkg.speed} website={pkg.website}/> -->
<Info {...pkg} />
```

```html
<!-- Info.svelte -->
<script>
  export let name;
  export let version;
  export let speed;
  export let website;
</script>

<p>
  The <code>{name}</code> package is {speed} fast. Download version {version}
  from <a href="https://www.npmjs.com/package/{name}">npm</a> and
  <a href="{website}">learn more here</a>
</p>
```
