export const loginViewModel = (sessionModel, authStore) => {
  return {
    async login(username, password) {
      const { request_token } = await sessionModel.getRequestToken()
      await sessionModel.login(username, password, request_token)
      const { session_id } = await sessionModel.createSession(request_token)
      
      // Simpan ke store
      authStore.setSession(session_id)

      // Simpan ke localStorage
      localStorage.setItem('session_id', session_id)
    }
  }
}
