<script lang="ts">
    import { user_profile, login, logout} from "$lib/stores/users.storage";

    let user_name;
    let user_password;

</script>

<div class="cart_page_wrapper">
    {#if $user_profile.user != undefined}
        You're already logged in:
        {JSON.stringify($user_profile)}
        <button on:click={logout}>
            Logout
        </button>
    {:else}
        <div>
            Username: <input bind:value={user_name} type="text" name="username" id="login_username"/>
            Password: <input bind:value={user_password} type="text" name="password" id="login_password"/>
            <button on:click={() => alert("this is a test environment, what are you trying to do you naughty")}>
                Signup
            </button>
        </div>
        or <a sveltekit:prefetch href="/users/login/">Login</a>    
    {/if}



</div>





<div id="result">
    
</div>

<style>
    .cart_page_wrapper{
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;

        padding: 3rem 0;
        font-size: 1.75rem;
        text-align: center;
        position: relative;
    }
</style>