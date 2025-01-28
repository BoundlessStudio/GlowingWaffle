import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useAuth0 } from '@auth0/auth0-vue'

export const useUserStore = defineStore('user', () => {
  const { user, isLoading, isAuthenticated, loginWithRedirect, logout } = useAuth0()
  
  function loginHandler() {
    loginWithRedirect()
  }

  function logoutHandler() {
    logout({ logoutParams: { returnTo: window.location.origin } })
  }

  return {
    isLoading,
    isAuthenticated,
    login: logoutHandler,
    logout: logoutHandler
  }
})