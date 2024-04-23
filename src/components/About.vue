<template>
  <div class="about-container">
    <div class="info-container">
      <div>
        <p>
          {{ texts.weight }} <span>{{ pokeAbout.weight / 10 }} kg</span>
        </p>
        <p>
          {{ texts.height }} <span>{{ pokeAbout.height / 10 }} m</span>
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
    <div class="stat-container">
      <p>{{ texts.baseStat }}</p>
      <div v-for="stat in pokeAbout.stats" :key="stat.base_stat">
        <span class="m-1">
          {{ stat.stat.name }}
        </span>
        <div class="nb-progress-container">
          <div class="progress nb-progress m-2">
            <div
              class="progress-bar progress-bar-striped"
              role="progressbar"
              :style="`width: ${getStatPercentage(
                stat.base_stat
              )}%; background-color: ${getStatColor(stat.stat.name)}`"
              :aria-valuemax="MAX_STAT_VALUE"
            ></div>
          </div>
          <span>
            {{ stat.base_stat }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import texts from "@/utils/internationalization";
import { getStatColor } from "@/utils/pokemon/index";
const MAX_STAT_VALUE = 255;
export default {
  name: "About",
  data() {
    return { texts, MAX_STAT_VALUE };
  },
  props: {
    pokeAbout: Array,
    imageBackgroundColor: {
      type: String,
      default: "blue;",
    },
  },
  methods: {
    getStatColor,
    getStatPercentage(value) {
      return (value / MAX_STAT_VALUE) * 100;
    },
  },
};
</script>

<style scoped>
.about-tab p {
  color: #37474f;
  font-weight: 800;
  font-size: 16px;
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
  flex-direction: column;
  border: 1px solid #c4c4c4;
  border-radius: 10px;
  padding: 20px;
}
.info-container > div {
  flex-basis: 50%;
}
.info-container {
  display: flex;
  flex-direction: row;
}
.nb-progress-container {
  display: flex;
  align-items: center;
}
.nb-progress {
  flex-grow: 1;
}
.stat-container span {
  color: #000;
  font-size: 14px;
  margin: 8px;
  text-transform: capitalize;
}
</style>
