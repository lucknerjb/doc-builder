import Config from '../config.js'
import store from '../store.js'

export default {
    getCurrentUser () {
        // return Lockr.get('sp-user')
    },

    getAccountId () {
        let session = this.getCurrentSession()
        return session.account.id
    },

    getCurrentSession () {
        // return Lockr.get('sp-session')
    },

    isAuthenticated () {
        // return Lockr.get('sp-user', false)
    },

    validateAccountDomain () {
        let accountName = window.location.href.split('/')[2].split('.')[0]

        // @TODO: Clean this up
        let url = Config.apiUrl + '/accounts/validate/' + accountName

        let request = $.get(url)
        request.then(function(data, statusText, xhr) {
            if (xhr.status === 200) {
                store.dispatch('SET_ACCOUNT', data)
            } else {
                console.log(xhr, statusText);
                // @TODO: Get a proper page setup here or something
                window.location = 'http://app.restlab.local/register?error=invalid_account'
            }
        })
    },

    // @TODO: REMOVE
    validateSession () {
        return true;

        let accountName = window.location.href.split('/')[2].split('.')[0]

        // Check if we have an authenticated user
        if (!this.isAuthenticated()) {
            return false
        }

        // Check if the session token is valid
        let userSession = this.getCurrentSession()
        console.log(userSession)
        let url = Config.apiUrl + '/sessions/validate?token=' + userSession.token + '&session_key=' + userSession.session.session_key
        // let url = 'http://' + accountName + '.restlab.local/api/v1/session?user_id=' + session.user.id + '&token=' + session.token

        let request = $.get(url)
        request.then(function(data, statusText, xhr) {
            if (xhr.status !== 200) {
                return false
            }

            // Reset the session
            store.dispatch('SET_SESSION', data.data)

            return true
        })

        return true
    },

    logout () {
        // Lockr.rm('sp-session');
        // Lockr.rm('sp-user');
        window.location.href = Config.home_url;
    }
}
