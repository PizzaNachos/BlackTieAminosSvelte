
<script lang="ts">
    import { onMount } from "svelte";
  
    export let items = [];
    export let activeTabValue;
  
    onMount(() => {
      // Set default tab value
      if (Array.isArray(items) && items.length && items[0].value) {
        activeTabValue = items[0].value;
      }
    });
  
    const handleClick = tabValue => () => (activeTabValue = tabValue);
  </script>
  
  <ul>
    {#if Array.isArray(items)}
      {#each items as item}
        <li class={activeTabValue === item.value ? 'active' : ''}>
          <span on:click={handleClick(item.value)}>{item.label}</span>
        </li>
      {/each}
    {/if}
  </ul>
  
  <style>
    ul {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
      flex-wrap: wrap;
      padding-left: 0;
      margin-bottom: 0;
      list-style: none;
      font-size: 1.1em;
      border-bottom: 2px solid var(--accent-500);
    }
  
    span {
      border-bottom: 2px solid transparent;
      display: block;
      padding: 0.5rem 1rem;
      cursor: pointer;
    }
  
    span:hover {
      border-color: var(--accent-500)
    }
  
    li.active > span {
      border-radius: 5px 5px 0 0;
      border-color: var(--accent-500);
    }
  </style>