<script setup lang="ts">
import {
  computed,
  onBeforeUnmount,
  ref,
  watch,
} from 'vue';

import type { Product } from '../data/products';
import { formatPrice } from '../lib/format';
import {
  type SortOrder,
  sortProducts,
} from '../lib/sortProducts';

const props = defineProps<{ products: Product[] }>();

const order = ref<SortOrder>("featured");
const sorted = computed(() => sortProducts(props.products, order.value));

const zoomed = ref<Product | null>(null);

function openZoom(product: Product) {
  zoomed.value = product;
}

function closeZoom() {
  zoomed.value = null;
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === "Escape") closeZoom();
}

watch(zoomed, (value) => {
  document.body.style.overflow = value ? "hidden" : "";
  if (value) {
    window.addEventListener("keydown", onKeydown);
  } else {
    window.removeEventListener("keydown", onKeydown);
  }
});

onBeforeUnmount(() => {
  document.body.style.overflow = "";
  window.removeEventListener("keydown", onKeydown);
});
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

    <ul class="-mb-px -mr-px grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      <li
        v-for="product in sorted"
        :key="product.id"
        class="flex flex-col items-center border-b border-r border-line bg-white p-8 text-center"
      >
        <button
          type="button"
          class="cursor-zoom-in"
          :aria-label="`Ver ${product.name} en tamaño completo`"
          @click="openZoom(product)"
        >
          <img
            :src="product.image"
            :alt="product.name"
            class="h-44 w-44 object-contain"
            loading="lazy"
            width="176"
            height="176"
          />
        </button>
        <h3
          class="mt-6 font-sans text-sm font-extrabold uppercase tracking-wide"
        >
          {{ product.name }}
        </h3>
        <p v-if="product.detail" class="mt-1 text-xs text-steel">
          {{ product.detail }}
        </p>
        <p class="mt-4 inline-flex items-end gap-2 bg-brand px-5 py-2">
          <span
            v-if="product.promoPrice"
            class="pb-0.5 text-sm font-bold leading-none line-through opacity-60"
          >
            {{ formatPrice(product.price) }}
          </span>
          <span class="font-display text-3xl leading-none">
            {{ formatPrice(product.promoPrice ?? product.price) }}
          </span>
          <span class="text-[10px] font-extrabold leading-none pb-0.5">
            {{ product.unit }}
          </span>
        </p>
        <p
          v-if="product.promoPrice"
          class="mt-2 bg-ink px-3 py-1 text-xs font-extrabold uppercase tracking-widest text-white"
        >
          Precio especial
        </p>
        <p
          v-if="product.promo"
          class="mt-2 bg-ink px-3 py-1 text-xs font-extrabold uppercase tracking-widest text-white"
        >
          {{ product.promo }}
        </p>
      </li>
    </ul>

    <div
      v-if="zoomed"
      class="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 p-4"
      role="dialog"
      aria-modal="true"
      :aria-label="zoomed.name"
      @click.self="closeZoom"
    >
      <button
        type="button"
        class="absolute right-4 top-4 flex h-10 w-10 items-center justify-center bg-white text-xl font-extrabold text-ink"
        aria-label="Cerrar"
        @click="closeZoom"
      >
        ✕
      </button>
      <figure
        class="flex max-h-full max-w-3xl flex-col items-center gap-4"
        @click.self="closeZoom"
      >
        <img
          :src="zoomed.image"
          :alt="zoomed.name"
          class="max-h-[80vh] w-auto max-w-full bg-white object-contain p-4"
        />
        <figcaption
          class="bg-brand text-black px-4 py-2 text-center text-sm font-extrabold uppercase tracking-wide"
        >
          {{ zoomed.name }}
        </figcaption>
      </figure>
    </div>
  </div>
</template>
