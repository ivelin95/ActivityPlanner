<template>
  <div class="column is-3">
    <a
      class="button is-primary is-block is-alt is-large"
      href="#"
      v-if="isBtnDispayed"
      @click="toggleText()"
      >New Activity</a
    >
    <div class="create-form" v-if="isFormDispayed">
      <h2>Create Activity</h2>
      <form>
        <div class="field">
          <label class="label">Title</label>
          <div class="control">
            <input
              v-model="newActivity.title"
              class="input"
              type="text"
              placeholder="Read a Book"
            />
          </div>
        </div>
        <div class="field">
          <label class="label">Notes</label>
          <div class="control">
            <textarea
              v-model="newActivity.notes"
              class="textarea"
              placeholder="Notes"
            ></textarea>
          </div>
        </div>
        <div class="field">
          <label class="label">Categories</label>
          <div class="control">
            <select v-model="newActivity.category" class="select">
              <option disabled value="">Please select one</option>
              <option
                v-for="category in categories"
                :key="category.id"
                :value="category.id"
              >
                {{ category.text }}
              </option>
            </select>
          </div>
        </div>
        <div class="field is-grouped">
          <div class="control">
            <button
              class="button is-link"
              v-bind:disabled="!isFormValid"
              @click.prevent="createActivity()"
            >
              Create activity
            </button>
          </div>
          <div class="control">
            <button class="button is-text" @click="toggleBtn()">Cancel</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { createNewActivity } from "../api/index.js";
import store from '../store'
export default {
  props: {
    categories: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isBtnDispayed: true,
      isFormDispayed: false,

      newActivity: {
        title: "",
        notes: "",
        category: ""
      }
    };
  },

  methods: {
    toggleText() {
      this.isBtnDispayed = false;
      this.isFormDispayed = !this.isFormDispayed;
    },
    toggleBtn() {
      this.isFormDispayed = false;
      this.isBtnDispayed = true;
    },
    resetForm() {
      this.newActivity.title = "";
      this.newActivity.notes = "";
      this.newActivity.category = "";
      this.toggleBtn();
    },
    createActivity() {
      store.createNewActivity({...this.newActivity})
        .then(activity =>{
          this.resetForm();
        })
      // const activity = createNewActivity(this.newActivity);
      // console.log(activity);
      // this.$emit("activityCreated", { ...activity });
      // this.resetForm();
    }
  },
  computed: {
    isFormValid() {
      return (
        this.newActivity.title &&
        this.newActivity.notes &&
        this.newActivity.category
      );
    }
  }
};
</script>
<style></style>
