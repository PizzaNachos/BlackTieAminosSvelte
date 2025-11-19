<script lang="ts">
    import { user_profile, login, logout} from "$lib/stores/users.storage";
    import Forgot from "./_forgot.svelte";
    import { goto } from '$app/navigation';
    let user_name;
    let user_password;

    let forgot = false
    async function log(){
        let succeed = await login(user_name, user_password);
        if(succeed){
            goto('/users/profile')
        }
    }   
</script>

<div>
    {#if !forgot}
        Username: <input bind:value={user_name} type="text" name="username" id="login_username"/>
        Password: <input bind:value={user_password} type="password" name="password" id="login_password"/>
        <button on:click={() => log()}>
            Login
        </button>
        <span on:click={() => {forgot = true}}>I forgot my password</span>
    {:else}
        <Forgot />
    {/if}
</div>    