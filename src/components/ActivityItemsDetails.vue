<template>
  <article class="post">
    <div class="activity-title-wrapper">
      <h4 class="activity-title">{{ activity.title }}</h4>
      <i class="fas fa-cog activity-settings" @click="toogleOptionBtn()"></i>
    </div>
    <p>{{ activity.notes }}</p>
    <p>{{ categories[activity.category].text }}</p>
    <div class="media">
      <div class="media-left">
        <p class="image is-32x32">
          <img src="../assets/user.png" />
        </p>
      </div>
      <div class="media-content">
        <div class="content">
          <p>
            <a href="#">Ivo</a> updated {{ activity.updatedAt | time }}
            &nbsp;
          </p>
        </div>
      </div>
      <div class="media-right">
        <span
          >Progress:
          <span :class="'color-' + activityProgress"
            >{{ activity.progress }}%</span
          ></span
        >
      </div>
    </div>
    <div class="activity-controll" v-if="toggleOptionBtn">
      <a class="button is-warning" @click="editActivity">Edit</a>
      <a class="button is-danger" @click="deleteActivity">Delete</a>
    </div>
  </article>
</template>

<script>
import store from "../store/";
export default {
  data() {
    return {
      toggleOptionBtn: false
    };
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
  computed: {
    activityProgress() {
      const currentProgress = this.activity.progress;
      if (currentProgress <= 0) {
        return "red";
      } else if (currentProgress <= 50) {
        return "orange";
      } else {
        return "green";
      }
    }
  },
  methods: {
    toogleOptionBtn() {
      this.toggleOptionBtn = !this.toggleOptionBtn;
    },
    deleteActivity() {
      store.deleteActivity(this.activity);
    },
    editActivity() {
      this.$emit("toogleUpdateActivity", true);
    }
  }
};
</script>

<style lang="scss" scoped>
.color-red {
  color: red;
}
.color-green {
  color: green;
}
.color-orange {
  color: orange;
}
.activity-title {
  margin-bottom: 5px;
  display: inline-block;
}
.activity-settings {
  float: right;
  font-size: 22px;
  &:hover {
    cursor: pointer;
  }
}
.activity-controll {
  margin: 20px 0 0 0;

  a {
    margin-right: 5px;
  }
}
</style>
