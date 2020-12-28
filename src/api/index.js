import fakeApi from "../lib/fakeApi";
const generatId = () => {
  return Math.floor(new Date() * Math.random());
};

export const fetchActivities = () => {
  return fakeApi.get("activities");
};
export const fetchCategories = () => {
  return fakeApi.get("categories");
};
export const fetchUsers = () => {
  return {
    name: "Filip Jerga",
    id: "-Aj34jknvncx98812"
  };
};

export const createNewActivity = activity => {
  activity.id = generatId();
  activity.progress = 0;
  activity.createdAt = new Date().toLocaleDateString("en-US");
  activity.updatedAt = new Date().toLocaleDateString("en-US");

  return activity;
};

export const deleteActivity = activity => {
  return fakeApi.delete("activities", activity);
};
