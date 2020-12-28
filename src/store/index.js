import fakeApi from "../lib/fakeApi";
import Vue from "vue";
const store = {
  state: {
    activities: {},
    categories: {}
  },
  generatId() {
    return Math.floor(new Date() * Math.random());
  },

  fetchActivities() {
    return fakeApi.get("activities").then(activities => {
      Object.keys(activities).forEach(key => {
        Vue.set(this.state.activities, key, activities[key]);
      });
      return activities;
    });
  },
  fetchCategories() {
    return fakeApi.get("categories").then(categories => {
      Object.keys(categories).forEach(key => {
        Vue.set(this.state.categories, key, categories[key]);
      });
      return categories;
    });
  },
  fetchUsers() {
    return {
      name: "Filip Jerga",
      id: "-Aj34jknvncx98812"
    };
  },

  createNewActivity(activity) {
    activity.id = this.generatId();
    activity.progress = 0;
    activity.createdAt = new Date().toLocaleDateString("en-US");
    activity.updatedAt = new Date().toLocaleDateString("en-US");

    return fakeApi.post("activities", activity).then(createdActivity => {
      Vue.set(this.state.activities, createdActivity.id, createdActivity);
      return createdActivity;
    });
    //return activity;
  },

  deleteActivity(activity) {
    return fakeApi.delete("activities", activity).then(deletedActivity => {
      Vue.delete(this.state.activities, activity.id);
      //return deletedActivity;
    });
  },
  updateActivity(activity) {
    activity.updatedAt = new Date().toLocaleDateString("en-US");
    return fakeApi.post("activities", activity).then(updatedActivity => {
      Vue.set(this.state.activities, updatedActivity.id, updatedActivity);
      //return updatedActivity;
    });
  }
};

export default store;
