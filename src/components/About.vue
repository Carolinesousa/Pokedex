<template>
  <div class="about-container">
    <div>
      <p>
        {{ texts.weight }} <span>{{ pokeAbout.weight }}</span>
      </p>
      <p>
        {{ texts.height }} <span>{{ pokeAbout.height }}</span>
      </p>
    </div>
    <div>
      <p>{{ texts.abilities }}</p>
      <span
        v-for="ability in pokeAbout.abilities"
        :key="ability.ability.name"
        class="badge nb-badge m-1"
        :style="imageBackgroundColor"
      >
        {{ ability.ability.name }}
      </span>
    </div>
  </div>
</template>
<script>
import texts from "@/utils/internationalization";
export default {
  name: "About",
  data() {
    return { texts };
  },
  props: {
    pokeAbout: Array,
    imageBackgroundColor: {
      type: String,
      default: "blue;",
    },
  },
};
</script>

<style scoped>
.about-tab p {
  color: #646464;
  font-weight: 600;
}
.about-tab span {
  color: black;
  font-weight: 900;
}
.about-tab .ability-item {
  color: black;
  font-weight: 900;
}
.about-container {
  display: flex;
  border: 1px solid #c4c4c4;
  border-radius: 10px;
  padding: 20px;
}
.about-container > div {
  flex-basis: 50%;
}
</style>
