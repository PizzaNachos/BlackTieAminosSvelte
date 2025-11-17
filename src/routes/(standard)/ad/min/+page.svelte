<script lang="ts">
  // throw new Error("@migratio task: Add data prop (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292707)");

  import { browser } from "$app/environment";
  import { goto } from "$app/navigation";
  import { app_config } from "$lib/config";
  if (browser) {
    check_logged_in();
    get_viewers();
  }
  let viewers = ". . .";
  function get_viewers() {
    fetch(`${app_config.api_base}/api/current_viewers`)
      .then((res) => res.text())
      .then((res) => (viewers = res));
  }

  let logged_in = false;
  function check_logged_in() {
    fetch(`${app_config.api_base}/api/admin`).then((res) => {
      if (res.status == 200) {
        logged_in = true;
      }
    });
  }

  let username = "";
  let password = "";
  function login() {
    fetch(`${app_config.api_base}/api/admin/auth)`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password }),
    }).then((res) => {
      if (res.status == 200) {
        logged_in = true;
      } else {
        goto("/");
      }
    });
  }

  let result = [];
  function get_reviews() {
    table_format = "review";

    fetch(`${app_config.api_base}/api/reviews/admin`)
      .then((res) => res.json())
      .then((res) => (result = res))
      .catch((err) => (logged_in = false));
  }
  function get_interactions() {
    table_format = "interaction";

    fetch(`${app_config.api_base}/api/interactions_http/admin`)
      .then((res) => res.json())
      .then((res) => (result = res))
      .catch((err) => (logged_in = false));
  }

  let table_format = "review";
</script>

{#if !logged_in}
  <div class="auth_area">
    You shouldnt be here U<input bind:value={username} />
    P<input type="password" bind:value={password} />
    <button on:click={login}>L</button>
  </div>
{:else}
  <div>
    <div on:click={get_viewers}>{viewers} People on site (refresh)</div>
    <br />
    <button on:click={() => get_reviews()}>Get Reviews</button>
    <button on:click={() => get_interactions()}>Get Interactions</button>

    {#if result.length > 0}
      <div class="result_table">
        <div>
          {#each Object.keys(result[0]) as key}
            <span>{key}</span>
          {/each}
        </div>

        {#each result as r, i}
          <div class={i % 2 == 0 ? `odd ${table_format}` : table_format}>
            {#each Object.values(r) as val}
              <span>{JSON.stringify(val)}</span>
            {/each}
          </div>
        {/each}
      </div>
    {/if}
  </div>
{/if}

<style>
  .auth_area {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 2em;
  }
  .result_table {
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    align-items: stretch;
    gap: 5px;
  }
  .result_table div {
  }
  .result_table div.review {
    display: grid;
    gap: 0.5em;
    padding: 5px 0;
    grid-template-columns: 2ch 15ch 10ch 28ch 1fr;
  }

  .result_table div.interaction {
    display: grid;
    gap: 0.5em;
    padding: 5px 0;
    grid-template-columns: 38ch 24ch 28ch 1fr;
  }

  .odd {
    background-color: var(--accent-800);
  }
  .result_table div span {
  }
</style>
