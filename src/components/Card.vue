<template>
  <div class="nb-card">
    <div class="card-img" style="background-color: rgb(255, 245, 157);">
      <img src="../assets/pick.png" alt="">
    </div>
    <div class="nb-card-body">
      <h3>Pikachu
        <span class="id">#0293</span>
      </h3>
      <p>A strange seed was planted on its back at birth. The plant sprouts and grows with this POKéMON.</p>
    </div>
    <div class="nb-card-footer">
      <span class="badge p-2" style="background-color: rgb(168, 183, 54); font-size: 14px">bug</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'card'
}
</script>
<style>
.nb-card {
  border-radius: .375rem;
  box-shadow: 0 10px 16px -10px rgba(0, 0, 0, .1);

  cursor: pointer;

  flex-basis: calc(25% - 20px);
  min-width: 250px;

  display: flex;
  flex-direction: column;

  overflow: hidden;

  transition-property: box-shadow;
  transition-delay: 100ms;
  transition-timing-function: ease;
}

.nb-card:hover,
.nb-card-active {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  border-radius: 12px;

}

.nb-card-footer {
  background-color: #fff;
  display: flex;
  flex-direction: row;
  padding: 1rem;
}

.nb-card-body {
  background-color: #fff;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 1rem 1rem 0;
}

.card-img {
  height: 200px;
  max-width: 100%;
  padding: 1rem;
}

.card-img img {
  display: block;
  margin: 0 auto;
  max-height: 100%;
  max-width: 100%;
}

.id {
  color: #cfd8dc;
  float: right;
  font-weight: 400;
}

@media (max-width: 1080px) {
  .nb-card {
    flex-basis: calc(33% - 14px);
  }
}

@media (max-width: 920px) {
  .nb-card {
    flex-basis: calc(50% - 14px);
  }
}

@media (max-width: 560px) {
  .nb-card {
    flex-basis: 80%;
  }
}
</style>
