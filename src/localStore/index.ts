const localStoreKey = 'andyHelper'

const getLocalStore = async () => {
  return await chrome.storage.local.get(localStoreKey)
}

const setLocalStore = async (key: string, value: string | number | boolean) => {
  const {andyHelper} = await getLocalStore()

  await chrome.storage.local.set({[localStoreKey]: {...andyHelper, [key]: value}})
}

const setLocalShowButton = (value: boolean) => {
  void setLocalStore('showButton', value)
}

const setLocalModalOpen = (value: number | string) => {
  void setLocalStore('waitModalOpen', value)
}

const setLocalModalClose = (value: number | string) => {
  void setLocalStore('waitModalClose', value)
}

const getLocalParam = async (param: string) => {
  const {andyHelper} = await getLocalStore()

  if (!andyHelper) {
    return undefined
  }

  return andyHelper[param]
}

const getLocalShowButton = async () => {
  const showButton = await getLocalParam('showButton')
  if (showButton && (showButton === 'true' || showButton === 'false')) {
    return showButton === 'true'
  }

  return true
}

const getLocalModalOpen = async () => {
  const value = await getLocalParam('waitModalOpen')
  return Number(value || 500)
}

const getLocalModalClose = async () => {
  const value = await getLocalParam('waitModalClose')
  return Number(value || 500)
}

export default {
  getLocalShowButton,
  getLocalModalOpen,
  getLocalModalClose,
  setLocalShowButton,
  setLocalModalOpen,
  setLocalModalClose,
}
