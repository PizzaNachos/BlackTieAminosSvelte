<div class="wrapper">
    <div class="content">
        <slot/>
    </div>
</div>

<style>
    .wrapper{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
    }

    .content{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        padding: 25px;
    }
    @media (max-width: 35rem) {
        .content {
            padding: 0;
        }
    }
    @media (min-width: 35rem) {
        .content {
            padding: 25px;
        }
    }
</style>