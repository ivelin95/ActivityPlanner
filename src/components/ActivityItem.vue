<template>
  <div>
    <ActivityUpdate
      :activity="activity"
      :categories="categories"
      v-if="toogleEdit"
      @toggleUpdate="cancelEdit"
    />
    <ActivityItemsDetails
      v-else
      :activity="activity"
      :categories="categories"
      @toogleUpdateActivity="changeActivityStatus"
    />
  </div>
</template>
<script>
import ActivityItemsDetails from "./ActivityItemsDetails";
import ActivityUpdate from "./ActivityUpdate";
export default {
  data() {
    return {
      toogleEdit: false
    };
  },
  components: {
    ActivityItemsDetails,
    ActivityUpdate
  },
  props: {
    activity: {
      type: Object,
      required: true
    },
    categories: {
      type: Object,
      required: true
    }
  },

  methods: {
    changeActivityStatus(status) {
      this.toogleEdit = status;
    },
    cancelEdit(status) {
      this.toogleEdit = status;
    }
  }
};
</script>
<style></style>
