<script setup>
  import ProductCard from '@/components/ProductCard.vue'
  import TheHeader from '@/components/TheHeader.vue'
  import { useCartStore } from './stores/CartStore'
  import { useProductStore } from './stores/ProductStore'

  const productStore = useProductStore()
  const cartStore = useCartStore()
  productStore.fill()

  // actions observe
  cartStore.$onAction(({ name, args, after }) => {
    // USE CASE examples
    // show notifications
    // send analytics data
    // send error to Sentry monitoring service
    if (name === 'addItems') {
      // after(() => console.log('added items', args[0]))
    }
  })
</script>

<template>
  <div class="container">
    <TheHeader />
    <AppButton @click="cartStore.undo()">Undo</AppButton>
    <AppButton @click="cartStore.redo()">Redo</AppButton>
    <ul class="sm:flex flex-wrap lg:flex-nowrap gap-5">
      <ProductCard
        v-for="product in productStore.products"
        :key="product.name"
        :product="product"
        @addToCart="(count) => cartStore.addItems(count, product)"
      />
    </ul>
  </div>
</template>
