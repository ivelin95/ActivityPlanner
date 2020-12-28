<template>
  <div id="vueApp">
    <nav class="navbar is-white topNav">
      <div class="container">
        <div class="navbar-brand">
          <h1>{{ fullAppName }}</h1>
        </div>
      </div>
    </nav>
    <Navbar @filterSelect="filterApply"></Navbar>
    <section class="container">
      <div class="columns">
        <ActivityForm :categories="categories"></ActivityForm>
        <div class="column is-9">
          <div class="box content">
            <div v-if="load"></div>
            <div v-else>{{ status }}</div>

            <ActivityItem
              v-if="isDataLoaded"
              v-for="activity in filterActivity"
              v-bind:activity="activity"
              v-bind:key="activity.id"
              v-bind:categories="categories"
            ></ActivityItem>

            <div class="activity-length">
              Currently {{ activitiesLength }} activities
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Vue from "vue";
import store from "./store/index";
// import {
//   fetchCategories,
//   fetchUsers,
//   fetchActivities,
//   deleteActivity
// } from "./api/index";
import ActivityItem from "./components/ActivityItem";
import ActivityForm from "./components/ActivityForm";
import Navbar from "./components/Navbar";

export default {
  name: "app",
  components: {
    ActivityItem,
    ActivityForm,
    Navbar,
  },
  data() {
    const {
      state: { activities, categories },
    } = store;
    return {
      load: false,
      status: "Loading",
      appName: "Activity Planner",
      author: "Ivelin Vasilev",
      user: {},
      activities,
      categories,
      filter: "All",
    };
  },
  created() {
    store.fetchActivities().then((activities) => {
      this.load = true;
    });
    this.user = store.fetchUsers();
    store.fetchCategories().then((categories) => {});
  },
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    filterActivity() {
      let filterArray = {};
      let condition;

      if (this.filter === "All") {
        return this.activities;
      }
      if (this.filter === "In Progress") {
        condition = (value) => value > 0 && value < 100;
      } else if (this.filter === "Finished") {
        condition = (value) => (value === 100);
      } else {
        condition = (value) => (value === 0);
      }
      filterArray = Object.values(this.activities).filter((activity) => {
        return condition(activity.progress);
      });
      return filterArray;
    },
    fullAppName() {
      return this.appName + " by " + this.author;
    },
    activitiesLength() {
      return Object.keys(this.activities).length;
    },
    activitiesArrLenght() {
      return Object.keys(this.activities).length;
    },
    categoriesArrLength() {
      return Object.keys(this.categories).length;
    },
    isDataLoaded() {
      return this.activitiesArrLenght && this.categoriesArrLength;
    },
  },
  methods: {
    filterApply(filterStatus) {
      this.filter = filterStatus;
      console.log(this.filter);
    },
  },
};
</script>

<style>
#activityApp {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

html,
body {
  font-family: "Open Sans", serif;
  background: #f2f6fa;
}
footer {
  background-color: #f2f6fa !important;
}

.activity-motivation {
  float: right;
}
.activity-length {
  display: inline;
}
.topNav {
  border-top: 5px solid #3498db;
}
.topNav .container {
  border-bottom: 1px solid #e6eaee;
}
.container .columns {
  margin: 3rem 0;
}
.navbar-menu .navbar-item {
  padding: 0 2rem;
}
aside.menu {
  padding-top: 3rem;
}
aside.menu .menu-list {
  line-height: 1.5;
}
aside.menu .menu-label {
  padding-left: 10px;
  font-weight: 700;
}
.button.is-primary.is-alt {
  background: #00c6ff;
  background: -webkit-linear-gradient(to bottom, #0072ff, #00c6ff);
  background: linear-gradient(to bottom, #0072ff, #00c6ff);
  font-weight: 700;
  font-size: 14px;
  height: 3rem;
  line-height: 2.8;
}
.media-left img {
  border-radius: 50%;
}
.media-content p {
  font-size: 14px;
  line-height: 2.3;
  font-weight: 700;
  color: #8f99a3;
}
article.post {
  margin: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e6eaee;
}
article.post:last-child {
  padding-bottom: 0;
  border-bottom: none;
}
.menu-list li {
  padding: 5px;
}

.navbar-brand > h1 {
  font-size: 31px;
  padding: 20px;
}
.select {
  border: none;
  background-color: rgb(231, 230, 230);
  border-radius: 10px;
}
.select:focus {
  outline: 0;
}
</style>
