<template>
  <nav class="navbar is-white">
    <div class="container">
      <div class="navbar-menu">
        <div class="navbar-start">
          <a
            :class="{ 'is-active': emitStatus === 'All' }"
            class="navbar-item"
            @click="emitFilter('All')"
            >All</a
          >
          <a
            :class="{ 'is-active': emitStatus === 'In Progress' }"
            class="navbar-item"
            @click="emitFilter('In Progress')"
          >
            In Progress</a
          >
          <a
            :class="{ 'is-active': emitStatus === 'Finished' }"
            class="navbar-item"
            @click="emitFilter('Finished')"
            >Finished</a
          >
          <a
            :class="{ 'is-active': emitStatus === 'Not started' }"
            class="navbar-item"
            @click="emitFilter('Not started')"
            >Not started</a
          >
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  data() {
    return {
      emitStatus: "All",
    };
  },
  methods: {
    emitFilter(status) {
      this.emitStatus = status;
      this.$emit("filterSelect", status);
    },
  },
};
</script>

<style></style>
