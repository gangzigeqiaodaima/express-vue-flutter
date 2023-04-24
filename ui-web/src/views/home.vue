<template>
    <div>
        首页
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    export default defineComponent({
    name: 'HomePage',
    data() {
        return {
            
        }
    }
    });
</script>

<style lang="scss" scoped>

</style>