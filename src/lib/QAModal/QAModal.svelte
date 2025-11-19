<script lang="ts">
    import DownChevron from "$lib/icons/DownChevron.svelte";
    import RightChevron from "$lib/icons/RightChevron.svelte";
    import { slide } from "svelte/transition";

    // let {header, expand} = $props();

    export let header = ""
    export let expand = ""
    export let open_by_default = false;
    let open = open_by_default;

    export let expand_styles = "";
    export let header_styles = "";
</script>

<a class="container"  class:open href="/FAQ/{header}" on:click={(e) => {e.preventDefault(); open = !open}}>
    <h2 style="{header_styles};" class="header_container">
        <div class="chevron">
            {#if open}
                <DownChevron/>
            {:else}
                <RightChevron/>
            {/if}
        </div>
        <div class="header">{header}</div>
    </h2>
    <div class:open class="cont_2">
        <div class="line {open == true ? 'shown' : 'hidden'}" ></div>
        <div class:open style="{expand_styles}" class="expad">
            {expand}
        </div>
    </div>
</a>
<style>
    .container{
        background-color: inherit;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        transition: all .35s ease;
        text-decoration: none;
    }
    .container.open{
        gap: .5em;
    }
    .chevron{
        fill:var(--alt-color)
    }
    .header_container{
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
        gap: 2rem;
        padding: .55em .5rem .5rem 1.5rem;
        font-size: 1.25rem;
        margin: 0;
    }
    .cont_2{
        background-color: inherit;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        transition: all .35s;
        gap: -1px;
    }
    .cont_2.open{
        gap: .5em;
    }
    .line{
        transition: all .35s;
    }
    .line.shown{
        border-top: 1px solid var(--accent-500);
        width: 80%;
    }
    .line.hidden{
        border-top: 1px solid rgba(0,0,0,0);
        width: 0;
    }
    .expad{
        text-align: left;
        letter-spacing: -0.01px;
        line-height: 1.6em;
        margin: 0;
        text-indent: 1em;
        overflow: hidden;
        transition: all .35s;
        max-height: 0;
        padding: 0 1.5em;
    }
    .expad.open{
        padding: 1em 1.5em;
    }
    .open{
        max-height: 100vh;
    }

</style>