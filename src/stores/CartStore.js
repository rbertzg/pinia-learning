import { useLocalStorage } from '@vueuse/core'
import { groupBy } from 'lodash'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { computed } from 'vue'
import { useAuthStore } from './AuthStore'

export const useCartStore = defineStore(
  'CartStore',
  () => {
    // state
    const items = useLocalStorage('CartStore:items', [])
    // const items = ref([])

    // getters
    const count = computed(() => items.value.length)
    const isEmpty = computed(() => count.value === 0)
    const groupedItems = computed(() => {
      const grouped = groupBy(items.value, (item) => item.name)
      const sortedKeys = Object.keys(grouped).sort()
      const inOrder = {}
      sortedKeys.forEach((key) => (inOrder[key] = grouped[key]))
      return inOrder
    })
    const totalPrice = computed(() =>
      items.value.reduce((sum, item) => sum + item.price, 0)
    )

    // actions
    function addItems(count, item) {
      count = parseInt(count)
      for (let i = 0; i < count; i++) {
        items.value.push({ ...item })
      }
    }
    function clearItems(itemName) {
      items.value = items.value.filter((item) => item.name !== itemName)
    }
    function setItemCount(count, item) {
      clearItems(item.name)
      addItems(count, item)
    }
    function reset() {
      items.value = []
    }
    function checkout() {
      const authStore = useAuthStore()
      alert(
        `${authStore.username} bought ${count.value} items at a total of ${totalPrice.value}$`
      )
    }

    return {
      items,
      count,
      isEmpty,
      groupedItems,
      totalPrice,
      addItems,
      setItemCount,
      clearItems,
      reset,
      checkout,
    }
  },
  {
    historyEnabled: true,
  }
)

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot))
}
