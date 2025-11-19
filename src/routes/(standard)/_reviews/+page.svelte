

<script lang="ts">
  // throw new Error("@migratio task: Add data prop (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292707)");
  import type { filter_definition, review } from "$lib/interfaces";
  import ReviewWrapper from "$lib/ReviewWrapper.svelte";
  import { reviews_store } from "$lib/stores/reviews";
  import { get } from "svelte/store";

  let reviews = get(reviews_store)
  let filtered : filter_definition = {};
</script>

<div class="review_page">
  <div class="section_heading">
    All Reviews 
  </div>
      
  <div class="review_filters">
    <div class="start_filters">
      <span>      
        <label for="all_stars">All Reviews</label>
        <input type="radio" id="all_stars" name="stars" value="" bind:group={filtered.stars}>
      </span>
      <span> 
        <label for="five_stars">
          <span class="rating">
            {#each Array.from("0".repeat(5)) as r}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" class="star" viewBox="0 0 16 16" >
              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
            </svg>
          {/each}
        </span>
        ({reviews.filter(r=>r.rating == 5).length})
        </label>
        <input type="radio" id="five_stars" name="stars" value="5" bind:group={filtered.stars}>
      </span>
      <span> 
        <label for="four_stars">            
          <span class="rating">
          {#each Array.from("0".repeat(4)) as r}
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" class="star" viewBox="0 0 16 16" >
            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
          </svg>
          {/each}
          </span> 
          ({reviews.filter(r=>r.rating == 4).length})
        </label>
        <input type="radio" id="four_stars" name="stars" value="4" bind:group={filtered.stars}>
      </span>
      <span> 
        <label for="three_stars">
          <span class="rating">
            {#each Array.from("0".repeat(3)) as r}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" class="star" viewBox="0 0 16 16" >
              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
            </svg>
          {/each}
          </span>
          ({reviews.filter(r=>r.rating == 3).length})
        </label>
        <input type="radio" id="three_stars" name="stars" value="3" bind:group={filtered.stars}>
      </span>
      <span>
        <label for="two_stars">
          <span class="rating">
            {#each Array.from("0".repeat(2)) as r}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" class="star" viewBox="0 0 16 16" >
              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
            </svg>
          {/each}
          </span>
          ({reviews.filter(r=>r.rating == 2).length})
        </label>
        <input type="radio" id="two_stars" name="stars" value="2" bind:group={filtered.stars}>
      </span>
      <span>
        <label for="one_stars">
          <span class="rating">
            {#each Array.from("0".repeat(1)) as r}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" class="star" viewBox="0 0 16 16" >
              <path
                d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
              />
            </svg>
          {/each}
          </span>
          ({reviews.filter(r=>r.rating == 1).length})
        </label>
        <input type="radio" id="one_stars" name="stars" value="1" bind:group={filtered.stars}>
      </span>
    </div>
  </div>



</div>
<div class="all_reviews">  
  <ReviewWrapper reviews={reviews} filtered_params={filtered}/>
</div>

<style>
  .review_page{
    margin: 0 1rem;
  }
  .section_heading {
    padding: 2rem 1rem 2rem 1rem;
    font-weight: bold;
    font-size: xx-large;
  }
  .review_filters{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }
  .start_filters{
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }
  .start_filters *{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: stretch;
  }
  .start_filters span label{
    order: 2;
  }
  .all_reviews{
    padding: 1em 5%;
  }
</style>
