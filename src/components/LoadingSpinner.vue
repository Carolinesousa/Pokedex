<template>
  <div v-if="isLoading" class="spinner" :aria-label="texts.loadingAriaLabel">
    <div class="spinner-border" role="status">
      <span class="sr-only"></span>
    </div>
  </div>
</template>

<script>
import texts from "@/utils/internationalization";

export default {
  props: {
    isLoading: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      texts,
    };
  },
};
</script>

<style>
.spinner {
  display: flex;
  justify-content: center;
  align-items: center;
}

.spinner-border {
  width: 2rem;
  height: 2rem;
  border: 0.25em solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: spinner-border 0.75s linear infinite;
}

@keyframes spinner-border {
  to {
    transform: rotate(360deg);
  }
}
</style>
