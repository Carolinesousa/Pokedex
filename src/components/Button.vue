<template>
  <button :type="type" :class="btnClass" @click="handleClick">
    <slot></slot>
  </button>
</template>
<script>
export default {
  name: "Button",
  data() {
    return {
      btnClass: this.isIcon
        ? `${this.class} nb-button nb-icon-button`
        : `${this.class} nb-button nb-normal-button`,
    };
  },
  props: {
    isIcon: Boolean,
    onClick: Function,
    type: {
      type: String,
      default: "button",
    },
    class: String,
  },
  methods: {
    handleClick() {
      if (this.onclick) this.onclick();
    },
  },
};
</script>

<style scoped>
.nb-button {
  width: 100%;
  height: 40px;

  padding: 8px;

  font-size: 1rem;
  color: #000;
  text-align: center;

  cursor: pointer;
  flex-shrink: 0;

  outline: none;
  border: 0;
}

.nb-button:hover {
  filter: brightness(0.9);
}

.nb-icon-button {
  border-radius: 50%;
  height: 48px;
  width: 48px;
}

.nb-normal-button {
  border-radius: 8px;
}
</style>
