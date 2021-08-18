<script lang="ts">
  export let name: string;
</script>

<svelte:head>
  <title>BeeImp Blog</title>
</svelte:head>
<main>
  <h1>
    Hello {name}!
    <p>a</p>
  </h1>
  <p>
    Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn
    how to build Svelte apps.
  </p>
</main>

<style lang="scss">
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;

    & > p {
      color: yellow;
      background-color: green;
    }
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
