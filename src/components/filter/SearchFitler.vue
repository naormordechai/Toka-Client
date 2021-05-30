<template>
  <input class="search-input" type="text" v-model="inputValue" placeholder="Search..." />
</template>

<script>
export default {
    props: ['term'],
    computed: {
        inputValue: {
            get() {
                return this.term;
            },
            set(val) {
                this.$emit('input', val);
            }
        }
    }

}
</script>

<style>

</style>