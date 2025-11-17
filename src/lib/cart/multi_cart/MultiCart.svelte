<script lang="ts">
  import LeftArrow from "$lib/icons/LeftArrow.svelte";
  import RightArrow from "$lib/icons/RightArrow.svelte";
  import XIcon from "$lib/icons/XIcon.svelte";
  import { fade, slide } from "svelte/transition";
  import {
    add_product_to_shipment,
    add_shipment,
    change_product_amount_in_shipment,
    checkout_multi_order,
    multi_order_object,
    remove_shipment,
    set_shipment_address,
    type Address,
  } from "$lib/stores/multi_order";
  import {
    all_products_store,
    get_prod_from_stripe_key,
  } from "$lib/stores/products";
  import { get } from "svelte/store";
  import { blur } from "svelte/transition";
  import Page from "../../../routes/(transparent)/+page.svelte";
  import MultiSelect from "./MultiSelect.svelte";
  import Plus from "$lib/icons/Plus.svelte";
  import ShippingBox from "$lib/icons/ShippingBox.svelte";
  import SimpleProduct from "$lib/product/SimpleProduct.svelte";
  import PlusSimple from "$lib/icons/PlusSimple.svelte";
  import { new_api_healthy } from "$lib/stores/interactions";

  let valid_addresses: any[] = [];
  let valid_products: any[] = [];
  let too_many_products: any[] = [];
  let add_open: any = [];

  let total_valid = true;
  multi_order_object.subscribe((obj) => {
    valid_addresses = [];
    valid_products = [];
    for (let i = 0; i < obj.orders.length; i++) {
      valid_addresses.push(null);
      valid_products.push(null);
    }
    add_open.length = obj.orders.length;
  });
  function do_form_validation() {
    total_valid = true;
    valid_addresses = [];
    valid_products = [];
    valid_email = false;

    let order_objs = get(multi_order_object);

    valid_email = validateEmail(order_objs.email);
    if (!valid_email) {
      total_valid = false;
    }

    for (let i = 0; i < order_objs.orders.length; i++) {
      let order_to_test = order_objs.orders[i];

      if (order_to_test?.address?.address?.country != "US") {
        valid_addresses.push(false);
        total_valid = false;
      } else {
        valid_addresses.push(true);
      }

      if (order_to_test.products.length == 0) {
        valid_products.push("You Must Have Atleast 1 Product Per Shipment");
        total_valid = false;
      } else if (
        order_to_test.products.map((a) => a.amount).reduce((a, b) => a + b) > 20
      ) {
        valid_products.push(
          "You Cannot have more than 20 Pruducts Per Shipment"
        );
        total_valid = false;
      } else {
        valid_products.push(true);
      }
    }
    valid_addresses = valid_addresses;
    valid_products = valid_products;
    return total_valid;
  }
  function do_order_validation(order_index: number, address_only: boolean) {
    let order_total_valid = true;

    let order_objs = get(multi_order_object);

    let order_to_test = order_objs.orders[order_index];

    if (order_to_test?.address?.address?.country != "US") {
      valid_addresses[order_index] = false;
      order_total_valid = false;
    } else {
      valid_addresses[order_index] = true;
    }

    if (address_only == false && order_to_test.products.length == 0) {
      valid_products[order_index] = false;
      order_total_valid = false;
    } else {
      valid_products[order_index] = true;
    }

    valid_addresses = valid_addresses;
    valid_products = valid_products;
    total_valid = order_total_valid;
    return order_total_valid;
  }
  function move_to_summary() {
    // Validate every shipment has a proper address + list of products
    if (do_form_validation()) {
      current_page = 2;
      window.scroll({ top: 0, behavior: "smooth" });
    }
  }

  let all_products = get(all_products_store);
  let list_of_all = all_products.map((p_thing) => p_thing.prods).flat();
  let select_vals: any[] = [];
  function add_order() {
    select_vals.push("");
    add_shipment();
  }

  let valid_email: any;
  let visited = false;
  let callback: any;
  function update_email() {
    if (callback != null) {
      clearTimeout(callback);
    }
    callback = setTimeout(() => {
      visited = true;
      valid_email = validateEmail($multi_order_object.email);
    }, 500);
  }

  const validateEmail = (email: string) => {
    if (email == "") {
      return false;
    }
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  function addProdToShipment(id: any, prod_key: any) {
    add_open[id] = false;
    add_product_to_shipment(id, prod_key);
  }

  let current_page = 1;

  let address_popup = false;
  let address_popup_index = 0;
  let addressElement: any;
  function add_address(order_index: number) {
    address_popup = true;
    address_popup_index = order_index;
    const stripe = Stripe(
      "pk_live_51K1fDGD3LzjANe5w2MDH7mFH0HqQphzc6LppQIOm6muiUAZKgL0vupQYyHJ6g3dBrbG8FPgDlsdghtAMEgtbo72H00Mx6Wo9AU"
    );

    const appearance = {
      /* appearance */
    };
    let options: any = {
      mode: "shipping",
      autocomplete: {
        mode: "google_maps_api",
        apiKey: "AIzaSyDwtYgq4mezafnCxw7Te1MpBe182bSZzaM",
      },
      allowedCountries: ["US"],
    };
    let this_order = get(multi_order_object).orders[order_index];
    if (this_order?.address?.address?.country == "US") {
      let address = this_order.address;
      options = {
        defaultValues: {
          name: this_order?.address?.name,
          address: {
            city: address.address.city,
            line1: address.address.line1,
            line2: address.address.line2,
            postal_code: address.address.postal_code,
            state: address.address.state,
            country: "US",
          },
        },
        ...options,
      };
    }
    const elements = stripe.elements({ appearance });
    addressElement = elements.create("address", options);
    addressElement.mount("#address-element");
  }
  function close_address() {
    addressElement.destroy();
    address_popup = false;
  }
  async function use_address(order_index: number) {
    const { complete, value } = await addressElement.getValue();
    if (complete) {
      // Extract potentially complete address
      const address = value.address;
      let this_address_obj: Address = {
        name: value?.name,
        address: {
          city: address.city,
          line1: address.line1,
          line2: address.line2,
          postal_code: address.postal_code,
          state: address.state,
          country: "US",
        },
      };
      set_shipment_address(order_index, this_address_obj);
      do_order_validation(order_index, true);
      close_address();
    }
  }

  function tabulate_data() {
    let big_map = new Map();

    let order_objs = get(multi_order_object);

    for (let i = 0; i < order_objs.orders.length; i++) {
      let order_to_test = order_objs.orders[i];
      for (let j = 0; j < order_to_test.products.length; j++) {
        let product_to_test = order_to_test.products[j];
        if (big_map.has(product_to_test.id)) {
          big_map.set(
            product_to_test.id,
            big_map.get(product_to_test.id) + product_to_test.amount
          );
        } else {
          big_map.set(product_to_test.id, product_to_test.amount);
        }
      }
    }

    let final_list = [];
    for (const [key, value] of big_map) {
      final_list.push({ id: key, amount: value });
    }
    return final_list;
  }

  async function local_checkout_multi_order() {
    let res = await checkout_multi_order();
    if (res == false) {
      alert(
        "Our Backend Appears to be down :( Go ahead and email us at info@coloradotoffee.com and we will get you sorted"
      );
    }
  }
  function open_add(i: any) {
    add_open[i] = true;
  }
  $: api_health = new_api_healthy;
</script>

<div>
  {#if !api_health}
    <div style="padding: 2em;0; font-size:1.2em">
      There is a problem with this module right now (the rest of the site is
      working properly)
    </div>
  {:else}
    {#if current_page == 1}
      <div class="page_one page">
        <div class="email_input_wrapper">
          Your Order Email
          <input
            id="email_input"
            class:visited
            class="email_input"
            type="text"
            bind:value={$multi_order_object.email}
            on:input={update_email}
          />
          {#if valid_email === false}
            <br />
            <div style="color:red">You Must Have A Valid Order Email</div>
          {/if}
        </div>
        <div class="shipments_container">
          {#each $multi_order_object.orders as multi_order, i}
            <div
              class="{valid_addresses.at(i) === false ||
              valid_products.at(i) === false
                ? 'invalid_order'
                : ''} shipment"
            >
              <span
                class="h2"
                style="display:flex; flex-direction:row; justify-content:space-between"
              >
                <span>Shipment #{i + 1} </span>
                <button
                  on:click={() => remove_shipment(i)}
                  style="background-color:rgba(0,0,0,0)"
                >
                  <XIcon />
                </button>
              </span>
              {#if multi_order?.address?.address?.country == "US"}
                <span
                  style="display:flex; flex-direction:row; justify-content:space-between"
                >
                  <span
                    >Shipping to: <span class="address_emphasis">
                      {multi_order.address?.name} <br />
                      {multi_order.address.address.line1}</span
                    ></span
                  >
                  <button
                    class="address_button edit"
                    on:click={() => add_address(i)}
                  >
                    Edit Address
                  </button>
                </span>
                {#if valid_addresses.at(i) === false}
                  <div style="color:red">You Must Have An Address</div>
                {/if}
              {:else}
                <button
                  class="address_button add"
                  on:click={() => add_address(i)}
                >
                  + Add Address
                </button>
                {#if valid_addresses.at(i) === false}
                  <div style="color:red">You Must Have An Address</div>
                {/if}
              {/if}

              <div class="items_container">
                {#each multi_order.products as pro}
                  <div in:blur|global class="cart_item">
                    <img
                      class="toffee_thumbnail"
                      src={get_prod_from_stripe_key(pro.id)
                        .product_image_url_paths[0]}
                      alt="Toffee Thumbnail"
                    />
                    <div class="center">
                      <div>{get_prod_from_stripe_key(pro.id).name}</div>
                      <div class="cart_number_picker" id="plusminuxinput">
                        <button
                          on:click={() =>
                            change_product_amount_in_shipment(
                              i,
                              pro.id,
                              pro.amount + 1
                            )}
                          class="trackable"
                          id={get_prod_from_stripe_key(pro.id).name +
                            "_multiform_plus_input_" +
                            i +
                            pro.id}>+</button
                        >
                        <span>{pro.amount}</span>
                        <button
                          on:click={() =>
                            change_product_amount_in_shipment(
                              i,
                              pro.id,
                              pro.amount - 1
                            )}
                          class="trackable"
                          id={get_prod_from_stripe_key(pro.id).name +
                            "_multiform_plus_input" +
                            i +
                            pro.id}>-</button
                        >
                      </div>
                    </div>

                    <span class="end">
                      <button
                        on:click={() =>
                          change_product_amount_in_shipment(i, pro.id, 0)}
                      >
                        <XIcon />
                      </button>
                      <div>
                        ${pro.amount *
                          Math.round(
                            get_prod_from_stripe_key(pro.id).price / 100
                          )}
                      </div>
                    </span>
                  </div>
                {/each}
              </div>

              <div style="position:relative">
                {#if add_open[i] == true}
                  <div class="add_to_shipment_container" transition:fade>
                    <div class="add_to_shipment_selector">
                      <MultiSelect
                        title={multi_order?.address?.address?.country == "US"
                          ? `Adding to ${multi_order.address.name}'s box:`
                          : `Adding to Box ${i + 1}`}
                        close_function={() => (add_open[i] = false)}
                        products={list_of_all.filter(
                          (ap) =>
                            !multi_order.products
                              .map((mp) => mp.id)
                              .includes(ap.stripe_key)
                        )}
                        select_function={(prod) => addProdToShipment(i, prod)}
                      />
                    </div>
                  </div>
                {:else}
                  <div class="select_container">
                    <button
                      class="add_shipment_button add_product_button"
                      on:click={() => open_add(i)}
                    >
                      <Plus height={"1.1em"} />
                      Add product to {multi_order?.address?.address?.country ==
                      "US"
                        ? `${multi_order.address.name}'s shipment:`
                        : `shipment #${i + 1}`}</button
                    >
                  </div>
                {/if}
              </div>

              {#if valid_products.at(i) !== true}
                <span style="color:red">{valid_products.at(i) ?? ""}</span>
              {/if}
              {#if too_many_products.at(i) === true}
                <span style="color:red"
                  >Each shipment cannot contain more than 20 products, please
                  email us at info@coloradotoffee.com for a large order.</span
                >
              {/if}
            </div>
          {/each}
        </div>

        {#if $multi_order_object.orders.length >= 10}
          <div class="select_container">
            <button class="add_shipment_button"
              >For More Orders Please Email Us info@coloradotoffee.com</button
            >
          </div>
        {:else}
          <div class="select_container">
            <button class="add_shipment_button" on:click={() => add_order()}>
              <ShippingBox height="2em" />
              Add Shipment
            </button>
          </div>
        {/if}

        <div class="select_container controls_area">
          <span></span>
          <span
            style="display:flex;flex-direction:column; align-items:flex-end;"
          >
            <button class="add_shipment_button" on:click={move_to_summary}
              >Go To Summary<RightArrow width="2ch" /></button
            >
            {#if total_valid == false}
              <span style="color:red">There are errors in your orders</span>
            {/if}
          </span>
        </div>
      </div>
    {/if}

    {#if current_page == 2}
      <div class="page_two page">
        <span class="h2">Summary:</span>
        <div class="shipments_container">
          {#each $multi_order_object.orders as multi_order, i}
            <div class="shipment">
              <span class="h2"
                >Shipment #{i + 1} {multi_order.address.name || ""}</span
              >
              <div class="address_form">
                <div class="wide">{multi_order.address.name}</div>
                <div class="wide">{multi_order.address.address.line1}</div>
                {#if multi_order.address.address.line2 != null}
                  <div class="wide">{multi_order.address.address.line2}</div>
                {/if}
                <span style="display:flex;flex-direction:row; gap:1ch">
                  <div class="narrow">{multi_order.address.address.city}</div>
                  <div class="narrow">{multi_order.address.address.state}</div>
                  <div class="narrow">
                    {multi_order.address.address.postal_code}
                  </div>
                </span>
              </div>

              Items:
              <div class="items_container">
                {#each multi_order.products as pro}
                  <div class="cart_item">
                    <img
                      class="toffee_thumbnail"
                      src={get_prod_from_stripe_key(pro.id)
                        .product_image_url_paths[0]}
                      alt="Toffee Thumbnail"
                    />
                    <div class="center">
                      <div>{get_prod_from_stripe_key(pro.id).name}</div>
                      <div class="cart_number_picker" id="plusminuxinput">
                        <span>{pro.amount}</span>
                      </div>
                    </div>

                    <span class="end">
                      <div>
                        ${pro.amount *
                          Math.round(
                            get_prod_from_stripe_key(pro.id).price / 100
                          )}
                      </div>
                    </span>
                  </div>
                {/each}
              </div>
            </div>
          {/each}

          <div class="total_products_area">
            <span class="h2"
              >Total Count Of Items : {$multi_order_object.orders.length} Shipments</span
            >
            <div class="items_container">
              {#each tabulate_data() as pro}
                <div class="cart_item">
                  <img
                    class="toffee_thumbnail"
                    src={get_prod_from_stripe_key(pro.id)
                      .product_image_url_paths[0]}
                    alt="Toffee Thumbnail"
                  />

                  <div class="center">
                    <div>{get_prod_from_stripe_key(pro.id).name}</div>
                  </div>
                  <div class="end">
                    <div class="cart_number_picker" id="plusminuxinput">
                      <span>{pro.amount}</span>
                    </div>
                  </div>
                </div>
              {/each}
            </div>
          </div>
        </div>
        <div class="select_container controls_area">
          <button
            class="add_shipment_button"
            on:click={() => (current_page = 1)}
            ><LeftArrow width="2ch" />Back to Cart</button
          >
          <button
            class="add_shipment_button payment_button"
            on:click={() => local_checkout_multi_order()}
            >Go to Payment<RightArrow width="2ch" /></button
          >
        </div>
      </div>
    {/if}

    <div
      class={address_popup == false
        ? "address_popup_hidden"
        : "address_popup_shown"}
    >
      <div class="addy_container">
        <span
          style="display:flex;flex-direction:row; justify-content:space-between"
        >
          Shipping Address For Box #{address_popup_index + 1}:
          <button
            on:click={close_address}
            style="background-color: rgba(0,0,0,0);"
          >
            <XIcon width="2ch" />
          </button>
        </span>
        <div id="address-element"></div>
        <button
          class="use_address_button"
          on:click={() => use_address(address_popup_index)}>Use Address</button
        >
      </div>
    </div>
  {/if}
</div>

<style>
  .email_input {
    border-radius: 8px;
    border: 2px solid rgba(0, 0, 0, 0);
    padding: 5px 10px;
  }
  .email_input:focus,
  .email_input:focus-visible {
    border: 2px solid var(--accent-300);
    outline: none;
  }

  .shipment {
    background-color: var(--accent-700);
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    gap: 0.5em;
  }

  .shipments_container {
    display: flex;
    flex-direction: column;
    gap: 1em;
  }

  @media (max-width: 40rem) {
    .cart_item {
      display: grid;
      gap: 7px;
      grid-template-columns: 5em 1fr 2ch;
      justify-items: start;
      align-items: stretch;
      background-color: var(--accent-800);
    }
    .center {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
      text-wrap: wrap;
      padding: 0.5em 0;
    }
    .end {
      display: flex;
      gap: 1em;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-end;
      padding: 0.25em 0.25em 1em 0;
      justify-self: end;
      font-size: 0.9em;
    }
    .end > div {
      padding-right: 0.5em;
    }
    .end > button {
      background-color: inherit;
    }
    .shipment {
      padding: 0.5em 5px;
    }
    .addy_container {
      top: 0;
    }
  }
  @media (min-width: 40rem) {
    .cart_item {
      display: grid;
      justify-items: start;
      align-items: stretch;

      gap: 1rem 1rem;
      grid-template-columns: 5em 1fr 5ch;

      background-color: var(--accent-800);
    }
    .center {
      display: flex;
      gap: 1em;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
      text-wrap: wrap;
      padding: 0.5em 0;
    }
    .end {
      display: flex;
      gap: 1em;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-end;
      padding: 0.25em 0.25em 1em 0;
      justify-self: end;
    }
    .end > div {
      padding-right: 1em;
    }
    .end > button {
      background-color: inherit;
    }
    .shipment {
      padding: 1em;
    }
    .addy_container {
      top: 25%;
    }
  }
  .items_container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 10px;
    align-items: stretch;
    text-align: left;
  }
  .toffee_thumbnail {
    height: 5em;
    width: auto;
  }
  .page {
    max-width: 85ch;
    margin: auto;
    position: relative;
    padding: 0 1ch;
    /* overflow-y: scroll; */
  }
  .cart_number_picker {
    border: 2px solid var(--accent-400);
    background-color: var(--accent-400);
    color: var(--text-color);
    display: flex;
    flex-direction: row;
    gap: 2px;
  }
  .cart_number_picker > button {
    background-color: var(--accent-700);
    padding: 0 1ch;
  }
  .cart_number_picker > button:hover {
    background-color: var(--accent-600);
    transition: all 0.5s ease;
  }
  .cart_number_picker > span {
    background-color: var(--accent-800);
    padding: 0 1ch;
  }
  .select_container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 10px 0;
  }
  .page_two .address_form {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  .add_shipment_button {
    background-color: var(--accent-600);
    color: black;
    border-radius: 5px;
    padding: 5px 10px;
    display: flex;
    flex-direction: row;
    gap: 1ch;
    border: 2px solid rgba(0, 0, 0, 0);
    transition: all 0.3s ease;
    align-items: center;
  }
  .controls_area {
    justify-content: space-between;
  }
  .add_shipment_button:hover {
    border: 2px solid var(--accent-200);
    background-color: var(--accent-700);
  }
  .h2 {
    font-size: 1.2em;
  }
  .address_emphasis {
    text-decoration: underline;
  }
  .address_popup_hidden {
    display: none;
    transition: all 0.35s ease;
  }
  .address_popup_shown {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(4px);
    z-index: 10;
    overflow-y: scroll;
  }
  .addy_container {
    position: relative;
    max-width: 80ch;
    margin: auto;
    background-color: var(--accent-600);
    padding: 1em;
    border-radius: 10px;
    box-shadow: 0 0 30px rgb(0, 0, 0, 0.3);
    text-align: center;
    font-size: 1.5em;
  }

  .address_button {
    padding: 5px 10px;
    background-color: var(--accent-800);
    border-radius: 5px;
  }
  .address_button.add {
    border: 2px solid var(--accent-200);
  }
  .invalid_order {
    border: 2px solid red;
  }

  .total_products_area {
    background-color: var(--accent-700);
    padding: 1em;
    border-radius: 10px;
    border: 2px solid var(--accent-200);
  }
  .total_products_area .toffee_thumbnail {
    height: 3em;
  }
  .payment_button {
    font-size: 1.3em;
    padding: 0.5em 1em;
  }
  .use_address_button {
    background-color: var(--accent-800);
    padding: 0.5em 1em;
    font-size: large;
    margin: 1em;
    border-radius: 10px;
    border: 2px solid rgba(0, 0, 0, 0);
    transition: all 0.3s ease;
  }
  .use_address_button:hover {
    border: 2px solid var(--accent-300);
  }

  .add_to_shipment_container {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    border: 2px solid var(--accent-200);
    text-align: center;
    font-size: 1.3m;
    overflow-y: scroll;
    z-index: 10;
  }
  .add_to_shipment_selector {
    max-width: 80ch;
    background-color: var(--accent-700);
    padding: 1em;
    margin: 1em auto;
    border-radius: 10px;
    text-align: center;
    font-size: 1.3m;
  }
  .email_input_wrapper {
    margin: 1em;
    font-size: large;
  }
  .email_input_wrapper input {
    background-color: var(--accent-700);
  }
  .add_product_button {
    border: 2px solid var(--accent-200);
  }
</style>
