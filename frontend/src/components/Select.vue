<template>
    <div>
      <label for="select-card-number">Select Number of Cards: </label>
      <select name="select-card-number" id="select-card-number" v-model="selected" @change="$emit('select', selected)">
        <option disabled value="">Please select one</option>        
        <option v-for="(option, idx) in options" :key="idx" :value="option">{{option}}</option>
      </select>
    </div>
</template>

<script>
export default {
 name: 'Select',
 data() {
     return {
         selected: 0,
     }
 },
 props: {
     options: {
         type: Array,
         default: () => []
     },
 }
}
</script>

<style scoped>
label {
  margin-right: 10px;
}
</style>