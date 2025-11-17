<script lang="ts">
  import QaModal from "$lib/QAModal/QAModal.svelte";

  export let data;

  $: index = data.my_index;
  $: all = data.all;
</script>

<div class="container">
  <div class="QAS">
    <div style="font-size:2em; text-align:center; margin: 1em 0;">
      Frequently Asked Questions:
    </div>
    <div>
      {#each all as qa, i}
        <div class="qa_peice">
          <QaModal
            header={qa.question}
            expand={qa.answer}
            open_by_default={i == index}
          />
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    gap: 1em;
    justify-content: center;
    width: 100%;
    align-items: center;
  }
  .QAS {
    max-width: 80ch;
    margin: 1em;
  }
  .QAS > div {
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 1em;
    flex-direction: column;
  }
  .qa_peice {
    background-color: var(--accent-800);
  }
</style>
