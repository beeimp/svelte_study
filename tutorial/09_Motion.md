# Motion

## Tweened

값을 설정하고 DOM 업데이트를 자동으로 보는 것이 좋습니다. Svelte에는 애니메이션을 사용하여 변경 사항을 전달하는 슬릭 사용자 인터페이스를 구축하는 데 도움이 되는 도구가 포함되어 있습니다.

`progress` 스토어를 `tweened` 값으로 변경하는 것부터 시작하겠습니다.

```html
<script>
  import { tweened } from "svelte/motion";

  const progress = tweened(0);
</script>
```

버튼을 클릭하면 진행 표시줄이 새 값으로 애니메이션됩니다. 그래도 약간 로봇같고 만족스럽지 않아서 용이한 함수를 추가합니다.

```html
<script>
  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";

  const progress = tweened(0, {
    duration: 400,
    easing: cubicOut,
  });
</script>
```

- `svelte/easing` 모듈에는 [페너 완화 방정식](https://web.archive.org/web/20190805215728/http://robertpenner.com/easing/)이 포함되어 있으며, `p`와 `t` 모두 0과 1 사이의 값인 고유한 `p => t` 함수를 제공할 수 있습니다.

`tweened`에서 이용 가능한 옵션의 모든 설정은 다음과 같습니다.

- `delay` - 시작 시간(밀리초) 전

- `duration` - 시간 간격(밀리초), 또는 `(from, to) => milliseconds` 함수로 값을 더 많이 변경할 경우 더 긴 간격을 지정 가능

- `easing` - `p => t` 함수

- `interpolate` - 임의 값 사이를 보간하기 위한 사용자 정의 `(from, to) => t => value` 함수

  - 기본적으로 Svelte는 숫자, 날짜 및 동일한 모양의 배열과 객체(숫자와 날짜 또는 기타 유효한 배열과 객체만 포함하는 경우) 사이를 보간한다.
  - 만약 색상 문자열 또는 변환 행렬을 보간하려면 사용자 정의 인터폴레이터를 공급한다.

이 옵션을 `progress.set`와 `progress.update`에 두 번째 인자로 전달할 수도 있습니다. 이 경우 기본값을 무시합니다. `set` 및 `update` 메서드는 모두 트윈이 완료될 때 해결되는 `promise`를 반환합니다.

## Spring

`Spring` 함수는 자주 변화하는 값에 더 잘 작동하여 `tweened` 대신 사용됩니다.

이 실습 예제에는 원의 좌표를 나타내는 스토어와 크기를 나타내는 스토어가 있습니다. `spring`으로 변환합니다.

```html
<script>
  import { spring } from "svelte/motion";

  let coords = spring({ x: 50, y: 50 });
  let size = spring(10);
</script>
```

두 스프링 모두 스프링의 기본 `stiffness(강도)`와 `damping` 값이 있으며, 고유한 초기 값을 지정할 수 있습니다.

```js
let coords = spring(
  { x: 50, y: 50 },
  {
    stiffness: 0.1,
    damping: 0.25,
  }
);
```

마우스를 이리저리 흔들면서 슬라이더를 끌어보는 행동이 어떤 영향을 미치는지 확인해보세요. 스프링이 계속 움직이는 동안 값을 조정할 수 있습니다.
