import { defineStore } from 'pinia';

export const authStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: false,
    user: null,
    token: "",
  }),

  actions: {
    login(user, token) {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
      this.isLoggedIn = true;
      this.user = user;
      this.token = token;
    },
    logout() {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      this.isLoggedIn = false;
      this.user = null;
      this.token = null;
    },
    onInit() {
      const user = localStorage.getItem('user');
      const token = localStorage.getItem('token');
      if (user && token) {
        this.isLoggedIn = true;
        this.user = JSON.parse(user);
        this.token = token;
      }
    }
  },

  getters: {
    isAuthenticated(state) {
      return state.isLoggedIn;
    },
  },
});