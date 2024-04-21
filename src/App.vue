<template>
  <Header />
  <PokeList />
</template>

<script>
import Header from './components/Header.vue'
import PokeList from './components/PokeList.vue'
export default {
  name: 'App',
  components: {
    Header,
    PokeList
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
