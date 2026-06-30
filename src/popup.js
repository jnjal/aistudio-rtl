document.addEventListener('DOMContentLoaded', () => {
  const togglePatch = document.getElementById('togglePatch');
  const toggleDynamicDir = document.getElementById('toggleDynamicDir');
  const statusBadge = document.getElementById('statusBadge');

  // Load saved state
  chrome.storage.local.get(['isEnabled', 'enableDynamicDir'], (result) => {
    const isEnabled = result.isEnabled !== undefined ? result.isEnabled : true;
    const enableDynamicDir = result.enableDynamicDir !== undefined ? result.enableDynamicDir : true;

    togglePatch.checked = isEnabled;
    toggleDynamicDir.checked = enableDynamicDir;
    updateBadge(isEnabled);
  });

  togglePatch.addEventListener('change', () => {
    const val = togglePatch.checked;
    chrome.storage.local.set({ isEnabled: val }, () => {
      updateBadge(val);
      sendMessageToActiveTabs({ action: "toggleState", value: val });
    });
  });

  toggleDynamicDir.addEventListener('change', () => {
    const val = toggleDynamicDir.checked;
    chrome.storage.local.set({ enableDynamicDir: val }, () => {
      sendMessageToActiveTabs({ action: "toggleDynamicDir", value: val });
    });
  });

  function updateBadge(active) {
    if (active) {
      statusBadge.textContent = "فعال";
      statusBadge.className = "status-badge";
    } else {
      statusBadge.textContent = "غیرفعال";
      statusBadge.className = "status-badge disabled";
    }
  }

  function sendMessageToActiveTabs(message) {
    chrome.tabs.query({ url: ["https://aistudio.google.com/*", "https://makersuite.google.com/*"] }, (tabs) => {
      tabs.forEach(tab => {
        chrome.tabs.sendMessage(tab.id, message, (response) => {
          if (chrome.runtime.lastError) {
          }
        });
      });
    });
  }
});
