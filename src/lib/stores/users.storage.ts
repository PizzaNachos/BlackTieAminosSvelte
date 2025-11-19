import { get, writable } from 'svelte/store';
import type { user_profile_wrapper, user_profile_object } from '$lib/interfaces';
import { app_config } from '$lib/config';
let profile: user_profile_wrapper = { error: undefined, user: undefined };
export const user_profile = writable(profile);
update_profile();

function update_profile() {
    fetch(`${app_config.api_base}/api/users`)
        .then(res => {
            if (res.status == 200)
                return res.json();
            else {
                throw new Error("No user profile found")
            }
        })
        .then((user: any) => {
            // console.log("User", user)
            user_profile.set({ user: user, error: undefined });
        })
        .catch(err => {
            user_profile.set({ error: "No user profile found", user: undefined });
        })
}


export async function login(username: string, password: string): Promise<boolean> {
    let res = fetch(`${app_config.api_base}/api/users/auth)`, {
        method: "post",
        headers: {
            'Content-Type': 'application/json'
        },

        //make sure to serialize your JSON body
        body: JSON.stringify({
            email: username,
            password: password,
        })
    })
        .then((res) => {
            if (res.status == 200) {
                update_profile();
                return true;
            } else {
                user_profile.set({ error: "No user profile found", user: undefined });
                return false;
            }
        })
        .catch(err => {
            user_profile.set({ error: "Unknown Error", user: undefined });
            return false;
        })
    return res;
}

export async function logout() {
    fetch(`${app_config.api_base}/api/users/auth)`, {
        method: "delete",
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(logged_out => {
            update_profile()
        })
        .catch(err => {
            user_profile.set({ error: "Unable to complete action", user: undefined });
        })
}