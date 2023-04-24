<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
  <div>{{ de }}</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: String
  },
  setup () {
    const de = ref("default");
    return {de};
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
