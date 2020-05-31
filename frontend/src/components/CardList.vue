<template>
    <div class="container">
      <Card 
        v-for="(card, idx) in currentList" 
        :key="idx" 
        :idx="idx"
        :number="card.number" 
        :flipped="card.flipped"
        :disable="card.disabled"
        :finish="card.finish"
        @clicked="$emit('cardFlipped', idx)"
      />
    </div>
</template>

<script>
import Card from './Card.vue'

export default {
    name: 'CardList',
    props: {
        currentList: {
            type: Array,
            default: () => []
        }
    },
    components: { Card }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  justify-content: center;
}

@media (min-width: 1275px) {
  .container {
    margin: 0 100px;
  }
}
</style>