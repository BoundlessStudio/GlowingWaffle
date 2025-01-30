import { defineStore } from 'pinia'
import { useAuth0 } from '@auth0/auth0-vue'

export const useUserStore = defineStore('user', () => {
  const { isLoading, isAuthenticated, loginWithRedirect, logout } = useAuth0() // user, 
  
  function loginHandler() {
    loginWithRedirect()
  }

  function logoutHandler() {
    logout({ logoutParams: { returnTo: window.location.origin } })
  }

  return {
    isLoading,
    isAuthenticated,
    // user
    login: loginHandler,
    logout: logoutHandler
  }
})