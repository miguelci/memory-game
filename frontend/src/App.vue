<template>
  <div id="app">
    <h1>Memory Card Game</h1>

    <Select :options="[4,8,12]" @select="selectList" />

    <div class="button">
      <button @click="play">Play!</button>
    </div>

    <div class="play-helper" :class="{hidden: hiddenHelper}">
      <Message text="Click on the cards in ascending order of the numbers" />
    </div>
    
    <CardList :currentList="currentList" @cardFlipped="cardFlipped" />

    <div class="events" :class="{hidden: !(solution.length && solution.length === selectedCards.length)}">
      <Message v-for="(text, idx) in events" :key="idx" :text="text" />
    </div>
  </div>
</template>

<script>
import CardList from './components/CardList.vue'
import Message from './components/Message.vue'
import Select from './components/Select.vue'

export default {
  name: 'App',
  data() {
    return {
      cardNumber: 0,
      lists: {
        4: [72, 33, 9, 70],
        8: [3, 83, 20, 78, 31, 8, 84, 52],
        12: [44, 55, 56, 23, 50, 25, 53, 30, 97, 48, 28, 65],
      },
      currentList: [],
      hiddenHelper: true,
      solution: [],
      selectedCards: [],
      events: [],
    }
  },
  components: { Message, Select, CardList },
  methods: {
    async selectList(cardNumber) {
      this.cardNumber = cardNumber;
      
      this.hiddenHelper = true;
      this.events = [];
      this.events.push(`Player selected to play with ${this.cardNumber} cards`);
      
      let responseList = await makeRequest(cardNumber);
      
      if (responseList === undefined) {
        responseList = this.lists[cardNumber];
      }
  
      this.currentList = responseList.map(number => ({ number, flipped: true, disabled: true}));
      this.solution = responseList.map(n => n).sort((a, b) => a - b );
    },
    play() {
      if (this.currentList.every(el => el.finish === true)) {
        this.events = [];
      }

      this.currentList = this.currentList.map(el => ({...el, flipped: false, disabled: false, finish: false}));

      if (this.currentList.length) {
        this.hiddenHelper = false;
        this.selectedCards = [];
      }
    },
    cardFlipped(elementIndex) {
      const currentElement = this.currentList[elementIndex];
      this.events.push(`Player flipped ${currentElement.number}`);

      this.currentList = this.currentList.map((el, idx) => {
        if (elementIndex !== idx) {
          return {...el, disabled: true}; 
          }
          return {...el, flipped: !el.flipped, disabled: true};
      });

      this.selectedCards.push(currentElement.number);

      if (!this.isOkForSolution()) {
        setTimeout(() => this.flipAllBack(), 1000)
        return
      }

      if (this.hasPlayerWon()) {
        return
      }

      this.currentList = this.currentList.map(el => 
        (this.selectedCards.includes(el.number) ? el : {...el, disabled: false}));

    },
    flipAllBack() {
      this.play();
      this.events.push(`Board was reset`);
    },
    isOkForSolution() {
      for (let i  = 0; i < this.selectedCards.length; i++) {
        if (this.selectedCards[i] === this.solution[i]) {
          continue;
        }
        return false;
      }
      return true;
    },
    hasPlayerWon() {
      if (this.solution.length !== this.selectedCards.length) {
        return false;
      }

      this.currentList = this.currentList.map(el => ({...el, disabled: true, finish: true}));
      this.events.push(`Player won!!`);
      return true;
    }
  }
}

async function makeRequest(cardNumber) {
  return await fetch('http://localhost:3000/cards?number=' + cardNumber)
    .then(r => r.json())
    .then(r => r.list)
    .catch(() => undefined);
}

</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  
}

.button {
  margin: 10px;
}

.hidden {
  visibility: hidden;
}

button {
  width: 200px;
  height: 30px;
}
</style>
