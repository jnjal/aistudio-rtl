chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get(['isEnabled', 'enableDynamicDir'], (result) => {
    if (result.isEnabled === undefined) {
      chrome.storage.local.set({ isEnabled: true });
    }
    if (result.enableDynamicDir === undefined) {
      chrome.storage.local.set({ enableDynamicDir: true });
    }
  });
});
