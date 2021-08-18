# Context API

## Context API

컨텍스트 API는 Props로 데이터와 기능을 전달하거나 이벤트를 많이 디스패치하지 않고도 컴포넌트가 서로 '대화(talk)'할 수 있는 메커니즘을 제공합니다. 아주 유용한 고급 기능입니다.

[Mapbox GL](https://docs.mapbox.com/mapbox-gl-js/overview/) 지도를 사용하여 이 예제 앱을 사용합니다. `<MapMarker>` 컴포넌트를 사용하여 마커를 표시하려 하지만 기본 `Mapbox` 인스턴스에 대한 참조를 각 컴포넌트의 props로 전달할 필요는 없습니다.

컨텍스트 API에는 `setCountext`와 `getContext`로 나누어져 있습니다. 컴포넌트가 `setContext(key, context)`를 호출하면, 자식 컴포넌트는 `const context = getContext(key)`로 컨택스트를 검색할 수 있습니다.

먼저 컨택스트를 설정해봅시다. `Map.svelte`안에 `svelte`로 부터 `setContext`와 `mapbox.js`의 키를 가져오고, `setContext`를 호출합니다.

```js
import { onMount, setContext } from "svelte";
import { mapbox, key } from "./mapbox.js";

setContext(key, {
  getMap: () => map,
});
```

컨텍스트 객체는 모든 것이 될 수 있습니다. [라이프사이클 함수](https://svelte.dev/tutorial/onmount)처럼 컴포넌트를 초기화하는 동안 `setContext` 및 `getContext`를 호출해야 합니다. 예를 들어, 나중에 `onMount`에서 내부로 호출하면 오류가 발생합니다. 이 예시에서는 컴포넌트가 마운트될 때까지 맵이 생성되지 않기 때문에 컨텍스트 개체에 맵 자체가 아니라 `getMap` 함수가 포함되어 있습니다.

다른 곳에 있는 `MapMarker.svelte`에서 `Mapbox` 인스턴스에 대한 참조를 얻을 수 있습니다.

```js
import { getContext } from "svelte";
import { mapbox, key } from "./mapbox.js";

const { getMap } = getContext(key);
const map = getMap();
```

이제 마커를 지도에 추가할 수 있습니다.

- `<MapMarker>`가 더 완성된 버전도 제거 및 props 변경을 처리하지만, 여기서는 컨텍스트만 보여줍니다.

## Context Keys

`mapbox.js`에는 다음 줄이 표시됩니다.

```js
const key = {};
```

예를 들어, `setContext('mapbox', ...)`를 수행 할 수 있는 키로 무엇이든 사용할 수 있습니다. 문자열을 사용할 때의 단점은 여러 컴포넌트 라이브러리가 실수로 동일한 문자열을 사용할 수 있다는 것입니다.
객체 리터럴을 사용하면 여러 컴포넌트 레이어에서 서로 다른 여러 컨텍스트가 작동하는 경우(개체 자체에는 참조 동일성만 가짐. 즉, `{} !== {}` 와 반대로 `"x" === "x"`)에도 키가 충돌하지 않습니다.

## Contexts vs. Stores

컨텍스트와 스토어는 비슷해 보입니다. 앱의 모든 부분에서 스토어를 사용할 수 있지만 컨텍스트는 컴포넌트와 해당 하위 항목에서만 사용할 수 있다는 점에서 다릅니다. 이것은 한 컴포넌트의 상태가 다른 컴포넌트의 상태를 간섭하지 않고 여러 컴포넌트 인스턴스를 사용하려는 경우에 유용합니다.

사실, 두 개를 함께 사용할 수도 있습니다. 컨텍스트는 반응적이지 않으므로 시간이 지남에 따라 변하는 값은 스토어로 구현해야 합니다.

```js
const { these, are, stores } = getContext(...);
```
