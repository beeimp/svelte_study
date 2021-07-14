# Introduction

## Basics

SVELTE의 공식 사이트의 튜토리얼에서는 사이트 방문과 함께 **작고 빠른 웹 애플리케이션을 구축**하기 위한 모든 것을 배울 수 있다고 합니다.

또한, [API docs](https://svelte.dev/docs)와 [예제](https://svelte.dev/examples)를 모아둔 링크, [60초 빠른 시작](https://svelte.dev/blog/the-easiest-way-to-get-started)을 참고할 수 있습니다.

### 그래서 SVELTE이란?

SVELTE은 빠른 웹 애플리케이션을 구축하기 위한 Tool 입니다. 이는 Reactjs나 Vuejs 프레임워크와 유사하게 `원할한 Interactive User Interface를 구축하기 쉽다는 목표`를 가집니다.

하지만 SVELTE은 애플리케이션 코드를 런타임에서 해석하지 않고 `Build 시 JS로 앱을 변환`합니다. 즉, 프레임워크의 추상화에 대한 성능 비용을 지불하지 않으며, 애플리케이션을 처음 로드할 때 어떤 패널티도 갖지 않습니다.

그래서 `전체 앱을 SVELTE로 구축`하거나 `기존 코드베이스에 추가`할 수 있습니다. 또한, 기존 프레임워크에 `종속되지 않고` 어디서나 작동하는 `독립 실행형 패키지로 구성 요소`를 제공할 수 있습니다.

### 튜토리얼 진행은 어떻게?

먼저, React나 Vuejs와 마찬가지로 SVELTE을 이해하기 위해서는 HTML, CSS, Javacript에 대한 기본 지식이 필요합니다. (만약, 기본 지식이 없으시면 빠르게 습득하고 돌아오시기 바랍니다.😉)

튜토리얼은 새로운 기능을 설명하기 위해 미니 연습장을 제공합니다. 그리고 다음 장에서는 이전 장의 지식이 필요하므로 처음부터 끝까지 학습하셔야 합니다. 필요한 경우 위의 메뉴를 통해 탐색할 수도 있습니다.

각 튜토리얼 장에는 정답이 나와있는 'Show me' 버튼이 존재합니다. 하지만 무분별한 버튼 클릭을 하지 않길 바랍니다.😁 각 코드 블록을 어디에 어떻게 넣을지 파악하여 직접 생각한 코드를 편집기에 입력하면 더 빨리 배울 수 있습니다.

### 컴포넌트의 이해

SVELTE에서는 애플리케이션이 하나 이상의 요소로 구성됩니다. <u>컴포넌트는 `.SVELTE` 파일에 기록되는 HTML, CSS 및 JavaScript를 캡슐화하는 재사용 가능한 자체 포함 코드 블록</u>입니다.

## Adding Data

정적 마크업을 렌더링하는 구성 요소는 그다지 흥미있진 않습니다. 한번 데이터를 추가 해보세요.

1. 컴포넌트에 `<script>` 태그를 추가하고 변수를 선언합니다.
1. 마크업에서 변수를 참조할 수 있습니다.
1. 다음 예시처럼 `.toUpperCase()` 메소드를 통해 값을 변경할 수 있습니다.

```js
<script>
	let name = 'world';
</script>

<h1>Hello {name.toUpperCase()}</h1>
```

## Dynamic Attributes

중괄호`{}`를 사용하여 텍스트를 제어뿐만 아니라, 요소<sub>element</sub> 특성<sub>attribute</sub>을 제어할 수 있습니다.

```html
<img src="{src}" />
```

그러나 Svelte는 다음과 같은 경고를 표시합니다.

```
A11y: <img> element should have an alt attribute
```

웹 애플리케이션을 구축할 때, 시력이나 움직임이 손상된 사람처럼 강력한 하드웨어나 인터넷 연결이 없는 경우 등을 고려하여 광범위한 `사용자 기반 액세스가 중요`합니다. 접근성(a11y로 줄인 것)이 항상 정확하지는 않지만, 액세스가 불가능한 마크업을 쓰면 Svelte가 경고해줍니다.

위와 같은 경우 스크린리더를 사용하는 사람이나 이미지를 다운로드할 수 없거나 느리거나 잘못된 인터넷을 연결한 사람들을 위한 이미지를 설명하는 `alt` 속성이 누락되어 있기 때문에 경고를 표시했습니다. 따라서 다름과 같이 `alt`를 추가하게 되면 경고가 사라집니다.

```html
<img src="{src}" alt="A man dances." />
```

### Shorthand attributes

`src={src}`처럼 이름과 값이 동일한 특성인 경우가 많습니다. Svelte는 다음과 같은 경우에 편리하게 작성할 수 있습니다.

```html
<img {src} alt="A man dances." />
```

## Styling

HTML과 마찬가지로 `<style>` 태그를 추가할 수 있습니다. `<p>`요소에 몇 가지 스타일을 추가해 보겠습니다.

```html
<p>This is a paragraph.</p>

<style>
  p {
    color: purple;
    font-family: "Comic Sans MS", cursive;
    font-size: 2em;
  }
</style>
```

중요한 것은 이러한 `규칙의 범위가 해당 컴포넌트로 한정된다는 것`입니다. 다음 단계에서 확인하겠지만, 앱의 다른 곳에서 `<p>` 요소의 스타일을 실수로 변경하지 않습니다.

## Nested Components

전체 앱의 코드를 실제 앱에서 단일 컴포넌트에 넣는 것은 매우 비현실적입니다. 대신 다른 파일의 컴포넌트를 요소로 포함하는 것처럼 가져와 포함할 수 있습니다. 다음과 같이 중첩을 가져오는 태그를 추가합니다.

```html
<script>
  import Nested from "./Nested.svelte";
</script>
```

그 다음, 마크업에 추가합니다.

```html
<p>This is a paragraph.</p>
<Nested />
```

중첩된 경우도 마찬가지로, Svelte는 `<p>` 요소를 가지고 있고, `App.svelte`의 스타일은 `Nested.svelte`에 적용되지 않습니다.

또한, `컴포넌트 네임의 Nested는 대문자로 표시`됩니다. 이 규약은 Svelte에서 사용자 정의 컴포넌트와 일반 HTML 태그를 구분할 수 있도록 채택되었습니다.

## HTML tags

일반적으로 문자열은 텍스트로 삽입되는데, `<and>`와 같은 문자는 특별한 의미가 없음을 의미합니다.

그러나 HTML을 컴포넌트로 직접 렌더링해야하는 경우가 존재할 수 있습니다. 예를 들어, HTML의 `blob`으로 포함된 마크다운 파일이 존재할때, Svelte는 조금 특별한 `{@html ...}` 태그를 사용합니다.

```html
<script>
  <!- 다음과 같은 마크다운 문자열인 경우->
  let string = `this string contains some <strong>HTML!!!</strong>`;
</script>

<p>{@html string}</p>
```

```
Svelte은 DOM에 삽입되기 전에 {@html ...} 내부의 표현식을 올바르게 실행하지 않습니다. 즉, 이 기능을 사용하는 경우 신뢰할 수 없는 소스에서 가져온 HTML을 사용하지 않는 것이 중요합니다. 그렇지 않으면, XSS 공격에 사용자가 노출될 수 있는 위험이 있습니다.
```

## Marking on App

본 튜토리얼은 컴포넌트를 작성하는 프로세스에 익숙해지도록 고안되었습니다. 그리고 이후에 텍스트 에디터를 이용하여 컴포넌트를 작성하는 것이 좋습니다.

먼저, Svelte를 빌드 툴과 통합해야 합니다. 공식적으로 유지 관리되는 [Vite](https://vitejs.dev/), [Rollup](https://rollupjs.org/), [Webpack](https://webpack.js.org/) 등 여러가지 플러그인이 있습니다.

- [vite-plugin-svelte](https://github.com/sveltejs/vite-plugin-svelte)
- [rollup-plugin-svelte](https://github.com/sveltejs/rollup-plugin-svelte)
- [svelte-loader](https://github.com/sveltejs/svelte-loader)

그리고 다양한 [유지 관리 커뮤니티](https://github.com/sveltejs/integrations#bundler-plugins)도 있습니다.

웹 개발에 비교적 익숙하지 않고 툴을 사용해 본 적 없어도 걱정하지 마세요. [새로운 개발자들을 위한 간단한 단계별 가이드인 Svelte](https://svelte.dev/blog/svelte-for-new-developers)를 준비하여 그 과정을 안내합니다.

텍스트 에디터도 구성할 수 있습니다. `VS Code`를 사용하는 경우 [Svelte extension](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode)를 설치하거나, [이 안내](https://svelte.dev/blog/setting-up-your-editor)에 따라 텍스트 에디터를 구성할 수 있습니다. Svelte 파일은 구문 강조 표시를 위해 `.html`파일과 동일하게 표현합니다.

프로젝트 설정이 끝나면 Svelte 컴포넌트를 쉽게 사용할 수 있습니다. 컴파일러는 각 컴포넌트를 일반 Javacaript 클래스로 변환하고 가져와 새 컴포넌트로 인스턴스화합니다.

```js
import App from "./App.svelte";

const app = new App({
  target: document.body,
  props: {
    // 이 부분은 나중에 배웁니다.
    answer: 42,
  },
});
```

그런 다음, 필요한 경우 [컴포넌트 API](https://svelte.dev/docs#Client-side_component_API)를 사용하여 앱과 상호 작용할 수 있습니다.

## 참조

- [https://svelte.dev/tutorial/basics](https://svelte.dev/tutorial/basics)
