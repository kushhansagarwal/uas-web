<script lang="ts">
    export let user: any;
    export let token: string;
    let updateStatus: 'idle' | 'success' | 'error' = 'idle';

    async function updateUser() {
        try {
            const response = await fetch('/api/account/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(user)
            });

            if (response.ok) {
                updateStatus = 'success';
            } else {
                updateStatus = 'error';
            }
        } catch (error) {
            updateStatus = 'error';
        }
    }
</script>



<div class="rounded-xl bg-gray-800 p-5">
    <p class="text-gray-400">Email: <input type="text" bind:value={user.email} class="base-color text-gray-400 p-1 rounded" /></p>
    <p class="text-gray-400">Name: <input type="text" bind:value={user.given_name} class="base-color text-gray-400 p-1 rounded" /> <input type="text" bind:value={user.family_name} class="base-color text-gray-400 p-1 rounded" /></p>
    <p class="text-gray-400">Level: <input type="text" bind:value={user.level} class="base-color text-gray-400 p-1 rounded" /></p>
    <p class="text-gray-400">Privileges: <input type="text" bind:value={user.privileges} class="base-color text-gray-400 p-1 rounded" /></p>
    <!-- <p class="text-gray-400">Created At: <input type="text" bind:value={allUsers[index].createdAt.$date.$numberLong} class="base-color text-gray-400 p-1 rounded" /></p> -->
    <!-- <p class="text-gray-400">Files: <input type="text" bind:value={allUsers[index].files.join(', ')} class="base-color text-gray-400 p-1 rounded" /></p> -->
    <button on:click={updateUser} class="mt-2 p-2 bg-blue-500 text-white rounded">Update User</button>
    {#if updateStatus === 'error'}
        <p class="text-red-400 mt-2">Error updating user.</p>
    {/if}
    {#if updateStatus === 'success'}
        <p class="text-green-400 mt-2">User updated successfully!</p>
    {/if}
</div>