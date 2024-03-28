import { defineStore } from 'pinia';

export const authStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: false,
    user: null,
    token: "",
  }),

  actions: {
    login(user, token ) {
      this.isLoggedIn = true;
      this.user = user;
      this.token = token;
    },
    logout({ state }) {
      this.isLoggedIn = false;
      this.user = null;
      this.token = null;
    },
  },

  getters: {
    isAuthenticated(state) {
      return this.isLoggedIn && this.token;
    },
  },
});