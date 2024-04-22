<template>
  <div class="nb-container">
    <table>
      <thead>
        <tr :style="'border-bottom: 1px solid ' + color">
          <th>{{ texts.gameVersion }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in gamesPaginated" :key="index">
          <td>{{ item.version.name }}</td>
        </tr>
      </tbody>
    </table>

    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">
        {{ texts.previousButton }}
      </button>
      <button @click="nextPage" :disabled="currentPage === totalPages">
        {{ texts.nextButton }}
      </button>
    </div>
  </div>
</template>

<script>
import texts from "@/utils/internationalization";
export default {
  name: "Games",
  props: {
    pokeGame: Array,
    color: {
      type: String,
      default: "blue",
    },
  },
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 5,
      texts,
    };
  },
  computed: {
    gamesPaginated() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.pokeGame.game_indices.slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.pokeGame.game_indices.length / this.itemsPerPage);
    },
  },
  methods: {
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
  },
};
</script>

<style scoped>
/* Estilos opcionais para a tabela e a paginação */
table {
  width: 100%;
  border: none;
}

th,
td {
  padding: 8px;
}

th {
  text-align: left;
}

.pagination {
  margin-top: 20px;
}

.pagination button {
  margin-right: 5px;
}
.nb-container {
  border: 1px solid #c4c4c4;
  border-radius: 10px;
  padding: 20px;
}
</style>
