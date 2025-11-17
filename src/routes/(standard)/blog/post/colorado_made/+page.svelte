<article>
    <h1>Colorado Made</h1>
    <p>
        Every single one of our products is carefully hand made in Colorful Colorado, 
        but why does that matter? Doesn't elevation make baking more difficult?
    </p>
    <h3 class="image_thing">
        <span>
            The Elevation
        </span>
        <img src="https://imagedelivery.net/9cMe9d4LFXgI4nPSeZlAjw/0a9df2dc-e8d6-4b6e-fe2c-25c5473eb200/public" alt="mountain"/>
    </h3>
    <p>
        The elevation where we make our toffee is ~6600 feet. 
        Due to this, water boils about 12 degrees cooler than at sea level (~200 degrees Fahrenheit in Colorado compared to 212 degrees Fahrenheit at sea level). 
        This is important because as toffee is cooked you are carefully balancing the hardness of the candy, 
        the caramelization of the sugar, 
        and the browning of the butter.
    </p>
    <p>
        The boiling point of water being 12 degrees lower in Colorado 
        means that when your candy is perfectly 
        caramelized and toasted 
        (which happens around 310°-350°) 
        the texture will be less chewy and more hard set (due to more water having boiled off) .
        When compared to candy that is cooked closer to sea level, 
        candy cooked in Colorado can achieve a better texture without sacrificing flavor.
    </p>

    <h3 class="image_thing">
        <img src="https://imagedelivery.net/9cMe9d4LFXgI4nPSeZlAjw/f67d4825-ee02-472f-b7f1-a4d2f81cca00/public" alt="desert"/>
        <span>
            The dry climate
        </span>
    </h3>
    <p>
        The dry climate of Colorado (humidity average of under 50) allows the candy to dry out as it cools. 
        This means the total moisture content of the candy is lower than if it 
        were to be made in a more humid climate 
        (where the humidity in the air is pulled into the toffee due to sugar being extremely hygroscopic)
        which means the candy is less chewy, and gives and much cleaner snap when it breaks.
    </p>
</article>

<style>
    @import "$lib/styles/blog.css";
    @media (max-width: 35rem) {
        .image_thing{
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            line-height: 150%;
            font-size: 1.25em;
        }
    }
    @media (min-width: 35rem) {
        .image_thing{
            display: grid;
            grid-template-columns: 1fr 1fr;
            align-items: center;
            line-height: 150%;
            font-size: 1.5em;
        }
    }

    .image_thing > span{
        padding: 1em;
    }
    .image_thing > img{
        width: 100%;
    }
</style>
    