<template>
  <div class="home">
    {{ o }}
    <HelloWorld msg="Welcome"></HelloWorld>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  inject: ['obj'],
  name: 'HomeView',
  data() {
    return {
      o: ''
    }
  },
  mounted() {
    this.o = this.obj as string;
  }
})
</script>
