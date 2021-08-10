# Actions

## 사용 지침

Action은 기본적으로 요소 레벨의 라이프사이클 함수입니다. 다음과 같은 경우 유용합니다.

- 써드파티 라이브러리와의 연계
- 이미지 lazy 로드
- tooltips
- 사용자 정의 이벤트 핸들러 추가

이 예제 앱에서는 주황색 상자를 'pannable'로 만들고 싶습니다. `panstart`, `panmove`, `panend` 이벤트에 대한 이벤트 핸들러가 있찌만 기본 DOM 이벤트는 아닙니다. 그래서 직접 디스패치 해야 합니다. 먼저, `pannable` 함수를 가져옵니다.

```js
import { pannable } from "./pannable.js";
```

다음 요소와 함께 사용합니다.

```html
<div
  class="box"
  use:pannable
  on:panstart="{handlePanStart}"
  on:panmove="{handlePanMove}"
  on:panend="{handlePanEnd}"
  style="transform:
		translate({$coords.x}px,{$coords.y}px)
		rotate({$coords.x * 0.2}deg)"
></div>
```

`pannable.js` 파일을 엽니다. 액션 함수는 전환 함수처럼 노드와 일부 선택적 매개 변수를 수신하고, 액션 개체를 반환합니다. 해당 개체는 요소가 마운트 해제될 때 호출되는 파괴 함수를 가질 수 있습니다.

사용자가 요소를 마우스로 잡고 아래로 이동하면 panstart 이벤트를 실행하고, 마우스를 끌면 이벤트(`dx` 및 `dy` 속성을 사용하여 마우스를 위로 이동하면 이벤트 이동)를 실행하려고 합니다. 가능한 구현 방법 중 한가지는 다음과 같습니다.

```js
export function pannable(node) {
  let x;
  let y;

  function handleMousedown(event) {
    x = event.clientX;
    y = event.clientY;

    node.dispatchEvent(
      new CustomEvent("panstart", {
        detail: { x, y },
      })
    );

    window.addEventListener("mousemove", handleMousemove);
    window.addEventListener("mouseup", handleMouseup);
  }

  function handleMousemove(event) {
    const dx = event.clientX - x;
    const dy = event.clientY - y;
    x = event.clientX;
    y = event.clientY;

    node.dispatchEvent(
      new CustomEvent("panmove", {
        detail: { x, y, dx, dy },
      })
    );
  }

  function handleMouseup(event) {
    x = event.clientX;
    y = event.clientY;

    node.dispatchEvent(
      new CustomEvent("panend", {
        detail: { x, y },
      })
    );

    window.removeEventListener("mousemove", handleMousemove);
    window.removeEventListener("mouseup", handleMouseup);
  }

  node.addEventListener("mousedown", handleMousedown);

  return {
    destroy() {
      node.removeEventListener("mousedown", handleMousedown);
    },
  };
}
```

`pannable` 함수를 업데이트하고 상자를 움직여보세요.

    - 이 실습 구현은 보다 완전한 시연 목적으로, 터치 이벤트도 고려합니다.

## 매개 변수 추가

전환 및 애니메이션과 마찬가지로 액션은 인수를 취할 수 있으며, 액션 함수는 액셕 함수가 속환 요소와 나란히 호출됩니다.

여기서는 사용자가 특정 시간 동안 버튼을 누르고 있을 때마다 동일한 일므의 이벤트를 실행하는 `longpress.js` 파일로 전환하면 500ms로 하드 코딩됩니다.

```js
export function pannable(node) {
  let x;
  let y;

  function handleMousedown(event) {
    x = event.clientX;
    y = event.clientY;

    node.dispatchEvent(
      new CustomEvent("panstart", {
        detail: { x, y },
      })
    );

    window.addEventListener("mousemove", handleMousemove);
    window.addEventListener("mouseup", handleMouseup);
  }

  function handleMousemove(event) {
    const dx = event.clientX - x;
    const dy = event.clientY - y;
    x = event.clientX;
    y = event.clientY;

    node.dispatchEvent(
      new CustomEvent("panmove", {
        detail: { x, y, dx, dy },
      })
    );
  }

  function handleMouseup(event) {
    x = event.clientX;
    y = event.clientY;

    node.dispatchEvent(
      new CustomEvent("panend", {
        detail: { x, y },
      })
    );

    window.removeEventListener("mousemove", handleMousemove);
    window.removeEventListener("mouseup", handleMouseup);
  }

  node.addEventListener("mousedown", handleMousedown);

  return {
    destroy() {
      node.removeEventListener("mousedown", handleMousedown);
    },
  };
}
```

`App.svelte`에서는 지속 시간 값을 작업에 전달할 수 있습니다.

```html
<button use:longpress={duration}
```
