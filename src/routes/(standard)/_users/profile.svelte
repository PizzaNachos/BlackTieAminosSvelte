<script lang="ts">
    import { user_profile, login, logout} from "$lib/stores/users.storage";

    let user_name;
    let user_password;

</script>

<div class="user_page_wrapper">
    {#if $user_profile.error}
        {$user_profile.error}
    {/if}
    {#if $user_profile.user != undefined}
    Your Profile
    <div class="user_profile">
        <span>
            {$user_profile.user.name ?? ""}
        </span>
        <span>
            {$user_profile.user.user_email ?? ""}
        </span>    
        <span>
            {$user_profile.user.user_birthday ?? ""}
        </span>
    </div>
    <button class="trackable" id="logout_button" on:click={logout}>
        Logout
    </button>
    {:else}
        You arent logged in!
        <div>
            <a class="trackable" id="login_button" sveltekit:prefetch href="/users/login/">Login</a>
            or
            <a class="trackable" id="signup_button" sveltekit:prefetch href="/users/signup/">Sign-Up</a>
        </div>
    {/if}



</div>

<style>
    .user_page_wrapper{
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: stretch;

        padding: 3rem 0;
        font-size: 1.5rem;
        text-align: left;
        position: relative;
    }
    .user_profile{
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        gap: 1rem;
        text-align: left; 
    }
    a{
        background-color: var(--accent-500);
        color: var(--text_color);

        padding: 0.5rem;
        border-radius: 0;
        border: 2px solid rgba(0,0,0,0);

        text-decoration: none;
        cursor: pointer;
        text-align: center;
        transition: all 250ms ease-in-out, transform 150ms ease;

        touch-action: manipulation;
    }
</style>