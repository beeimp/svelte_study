# Debugging

## The @debug tag

가끔 데이터 흐름을 앱을 통해 검사할 필요가 있습니다.

한 가지 방법은 마크업 내부에 `console.log(...)`을 사용하는 것입니다. 실행을 일시 중지하려면 검사할 쉼표로 구분된 값의 목록과 함께 `{@debug}` 태그를 사용할 수 있습니다.

```html
{@debug user}

<h1>Hello {user.firstname}!</h1>
```

이제 개발 도구를 열고 `<input>` 요소와 상호 작용하기 시작하면 사용자 값이 변경됨에 따라 디버거가 트리거 됩니다.

## 마무리

이제 Svelte의 튜토리얼을 마쳤습니다. [API Reference](https://svelte.dev/docs), [Examples](https://svelte.dev/examples), [Blog](https://svelte.dev/blog)을 통해 계속 학습할 수 있습니다. Twitter 사용자인 경우 [@sveltejs](https://twitter.com/sveltejs)를 통해 업데이트를 받을 수 있습니다.

로컬 개발 환경에서 설정하려면 [빠른 시작 가이드](https://svelte.dev/blog/the-easiest-way-to-get-started)를 참조하세요.

라우팅, 서버 사이드 렌더링 및 기타 모든 기능을 포함하는 보다 광범위한 프레임워크를 찾고 있으시다면 [SvelteKit](https://kit.svelte.dev/)를 참조하세요.

가장 중요한 것은 이제 Svelte 커뮤니티의 일원이기 때문에, [Discord 채팅방](https://svelte.dev/chat)에 가입하여 동료를 찾으시거나 프레임워크의 미래를 게획할 수 있습니다.
