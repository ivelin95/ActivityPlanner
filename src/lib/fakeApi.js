const data = {
  activities: {
    "1546968934": {
      id: 1546968934,
      title: "Learn Vue.js",
      notes: "I started today and it was not good.",
      progress: 78,
      category: "1546969049",
      createdAt: 1546969144391,
      updatedAt: 1546969144391
    },
    "1546969212": {
      id: 1546969212,
      title: "Read Witcher Books",
      notes: "These books are super nice",
      progress: 0,
      category: "1546969049",
      createdAt: 1546969144391,
      updatedAt: 1546969144391
    }
  },
  categories: {
    "1546969049": { text: "books", id: "1546969049" },
    "1546969225": { text: "movies", id: "1546969225" }
  }
};
class FakeApi {
  get(resource) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(data[resource]);
      }, 2000);
    });
  }
  post(resource, item) {
    return new Promise((resolve, reject) => {
      delete data[resource][item.id];
      resolve(item);
    });
  }
  delete(resource, item) {
    return new Promise((resolve, reject) => {
      delete data[resource][item.id];
      resolve(item);
    });
  }
}

export default new FakeApi();
