import {AppConfig, showConnect, UserSession} from '@stacks/connect'

function connectWallet() {
  const appConfig = new AppConfig(['store_write', 'publish_data'])
  const userSession = new UserSession({appConfig})

  const handleWalletConnect = function() {
    showConnect({
        appDetails: {
            name: 'Verdger',
            icon: window.location.origin + '/src/assets/verger-icon.svg'
        },
        onFinish: function() {
            const userData = userSession.loadUserData()
            console.log(userData)
        },
        userSession
    })
  }

  return handleWalletConnect
}

export default connectWallet;