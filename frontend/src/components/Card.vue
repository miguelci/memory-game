<template>
  <div class="card-container">
  <div class="card" @click="clicked" :class="{ flipped: flipped }">
    <div class="card-face card-face-front" :class="{ won: finish }">{{ number }}</div>
    <div class="card-face card-face-back"></div>
  </div>
</div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    idx: {
      type: Number,
      default: 1
    },
    number: {
      type: Number,
      default: 1
    },
    disable: {
      type: Boolean,
      default: false
    },
    flipped: {
      type: Boolean,
      default: true,
    },
    finish: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    clicked() { !this.disable && this.$emit('clicked') }
  }
}
</script>

<style scoped>
  .card-container {
  width: 250px;
  height: 200px;
  margin: 20px;
  perspective: 600px;
}

.card {
  width: 100%;
  height: 100%;
  transition: transform 1s;
  transform-style: preserve-3d;
  border-radius: 10px;
  cursor: pointer;
  position: relative;
}

.card.flipped {
  transform: rotateY(180deg);
}

.card-face {
  position: absolute;
  width: 100%;
  height: 100%;
  line-height: 200px;
  text-align: center;
  font-weight: bold;
  font-size: 40px;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  border-radius: 10px;
}

.card-face-front {
  color: #2c3e50;
  background: white;
  border: 1px solid;
  transform: rotateY(180deg);
}

.won {
  border: 3px solid red;
}

.card-face-back {
  background: #2c3e50;
}

</style>
