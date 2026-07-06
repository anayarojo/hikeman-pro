<script setup lang="ts">
import { computed, ref } from "vue";
import type { Product } from "../data/products";
import { formatPrice } from "../lib/format";
import { sortProducts, type SortOrder } from "../lib/sortProducts";

const props = defineProps<{ products: Product[] }>();

const order = ref<SortOrder>("featured");
const sorted = computed(() => sortProducts(props.products, order.value));
</script>

<template>
  <div>
    <div class="flex items-center justify-end border-b border-line px-4 py-3">
      <label
        for="orden"
        class="mr-3 text-xs font-bold uppercase tracking-widest"
      >
        Ordenar
      </label>
      <select
        id="orden"
        v-model="order"
        class="border border-line bg-white px-3 py-1 text-sm font-bold uppercase"
      >
        <option value="featured">Destacados</option>
        <option value="asc">Precio: menor a mayor</option>
        <option value="desc">Precio: mayor a menor</option>
      </select>
    </div>

    <ul class="grid grid-cols-1 gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
      <li
        v-for="product in sorted"
        :key="product.id"
        class="flex flex-col items-center bg-white p-8 text-center"
      >
        <img
          :src="product.image"
          :alt="product.name"
          class="h-44 w-44 object-contain"
          loading="lazy"
          width="176"
          height="176"
        />
        <h3
          class="mt-6 font-sans text-sm font-extrabold uppercase tracking-wide"
        >
          {{ product.name }}
        </h3>
        <p class="mt-1 text-xs text-steel">{{ product.detail }}</p>
        <p class="mt-4 inline-flex items-end gap-1.5 bg-brand px-5 py-2">
          <span class="font-display text-3xl leading-none">
            {{ formatPrice(product.price) }}
          </span>
          <span class="text-[10px] font-extrabold leading-none pb-0.5">
            {{ product.unit }}
          </span>
        </p>
      </li>
    </ul>
  </div>
</template>
