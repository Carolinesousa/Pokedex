<template>
  <main class="nb-content">
    <div class="nb-card-container">
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
    </div>
  </main>
</template>
<script>
import Card from './Card.vue';
export default {
  name: 'poke-list',
  components: {
    Card,
  }
}
</script>
<style scoped>
.nb-content {
  background-color: #f5f2f2;

}

.nb-card-container {
  padding: 20px;
  margin: 0 auto;

  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 24px;


  max-width: 1400px;
}

@media (max-width: 560px) {
  .nb-card-container {
    justify-content: center;
  }
}
</style>
