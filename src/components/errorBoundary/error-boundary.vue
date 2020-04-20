<template>
  <div class="remove-all-styles">
    <slot v-if="err" name="error" v-bind:err="err" v-bind:vm="vm" v-bind:info="info"
      >Something went wrong
      <pre>Error: {{ err }}</pre>
      <pre>Info: {{ info }}</pre>
      <pre>StackTrace: {{ err.stack }}</pre>
    </slot>
    <slot class="remove-all-styles" v-else></slot>
  </div>
</template>

<script>
  export default {
    name: "error-boundary",
    props: {
      stopPropagation: Boolean,
    },
    data() {
      return {
        err: false,
        vm: null,
        info: null,
      };
    },
    errorCaptured(err, vm, info) {
      this.err = err;
      this.vm = vm;
      this.info = info;
      return !this.stopPropagation;
    },
  };
</script>

<style lang="scss" scoped>
  .remove-all-styles {
    all: revert;
  }
</style>
