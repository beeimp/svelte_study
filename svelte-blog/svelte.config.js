/** @type {import('@sveltejs/kit').Config} */
const config = {
  // options passed to svelte.compile (https://svelte.dev/docs#svelte_compile)
  compilerOptions: null,

  // an array of file extensions that should be treated as Svelte components
  extensions: [".svelte"],

  kit: {
    adapter: null, // Svelte Kit build의 출력이 변환되는 방식을 결정.
    amp: false, // Accelerated Mobile Pages - 모바일전용 빠른 웹페이지 사용 유무
    appDir: "_app", // 빌드된 JS 및 CSS가 서비스되는 paths.assets에 관련된 디렉토리
    files: {
      assets: "static", // favicon.ico 또는 manifest.json과 같이 URL이 있어야 하고, 처리되지 않는 정적 파일을 넣는 위치
      hooks: "src/hooks", // Hook 모듈 위치
      lib: "src/lib", // $lib 로 코드베이스 전체에서 액세스할 수 있는 앱 내부 라이브러리
      routes: "src/routes", // 앱의 구조를 정의하는 파일
      serviceWorker: "src/service-worker", // 서비스 작업자(앱 내에서 네트워크 요청을 처리하는 프록시 서버 역할)의 진입 지점 위치
      template: "src/app.html", // HTML responses 응답을 위한 템플릿 위치
    },
    floc: false, // Federated Learning of Cohorts - 크롬에서만 사용가능(개인 정보 보호를 개선한 구글의 트래킹 시스템)
    host: null, // page.host를 채울 때 호스트 헤더를 재정의하는 값
    hostHeader: null, // X-Forwarded-Host 헤더를 통해 기본 호스트가 노출되며 page.host에 액세스해야 하는 경우 구성
    hydrate: true, // 서버에서 렌더링한 HTML을 클라이언트 사이드 앱으로 hydrate할지 여부
    package: {
      dir: "package", // 출력 디렉토리
      emitTypes: true, // d.ts 형식의 svelte-kit 패키치에 대한 유형을 자동으로 생성할지 (보통 true)
      exports: {
        // package.json의 exports 필드에서 내보낸 것으로 표시할 파일을 지정하는 include 및 exclude 배열이 포함
        include: ["**"],
        exclude: ["_*", "**/_*"],
      },
      files: {
        // include 및 exclude 배열이 포함되어 있으며, 이 배열은 패키징 시 처리하고 복사할 파일을 지정
        include: ["**"],
        exclude: [],
      },
    },
    paths: {
      assets: "", // 앱 파일이 제공되는 절대 경로
      base: "", // /로 시작해야 하지만 /base-path로 끝나서는 안되는 루트 경로
    },
    prerender: {
      crawl: true, // seed 페이지의 링크를 따라 SvelteKit가 렌더링할 페이지를 찾아야 하는지 여부
      enabled: true, // preferendering을 모두 비활성화하려면 false로 설정
      onError: "fail",
      // 'fail' - 오류가 발생할 때 빌드에 실패(기본값)
      // 'continue' - 라우팅 오류에도 빌드를 계속함
      // function - 사용자 지정 오류 처리기 함수로 설정 가능
      pages: ["*"], // 미리 표시하거나 탐색하기 시작할 페이지의 배열
    },
    router: true, // 클라이언트 사이드 라우터 앱 전체를 활성화하거나 비활성화
    serviceWorker: {
      exclude: [],
    },
    ssr: true, // 서버 사이드 렌더링
    target: null, // 앱을 마운트할 요소를 지정
    trailingSlash: "never", // 라우팅 URL을 확인할 때 후행 슬래시를 제거, 추가 또는 무시할지 여부
    // "never" - /x/ -> /x
    // "always" - /x -> /x/
    // "ignore" - /x/와 /x를 자동으로 변경하지 않고 동등하게 처리함.
    vite: () => ({}),
  },

  // options passed to svelte.preprocess (https://svelte.dev/docs#svelte_preprocess)
  preprocess: null, // Vite 구성 개체 또는 이를 반환하는 함수
};

export default config;
