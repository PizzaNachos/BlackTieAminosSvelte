<script lang="ts">
    import QaModal from "$lib/QAModal/QAModal.svelte";
    import { question_answers } from "$lib/stores/QA";
</script>

<div class="container">
    <div class="QAS">
        <div style="font-size:2em; text-align:center; margin: 1em 0;">Frequently Asked Questions: </div>
        <div>
        {#each question_answers as qa}
            <div class="qa_peice">
                <QaModal header={qa.question} expand={qa.answer}/>
            </div>
        {/each}
        </div>
    </div>
</div>

<style>
    .container{
        display: flex;
        flex-direction: column;
        gap: 1em;
        justify-content: start;
        width: 100%;
        align-items: center;
        min-height: 80vh;
    }
    .QAS{
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
    .qa_peice{
        background-color: var(--accent-800);
    }
</style>