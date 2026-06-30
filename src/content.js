let isEnabled = true;
let enableDynamicDir = true;

chrome.storage.local.get(['isEnabled', 'enableDynamicDir'], (result) => {
  if (result.isEnabled !== undefined) {
    isEnabled = result.isEnabled;
  }
  if (result.enableDynamicDir !== undefined) {
    enableDynamicDir = result.enableDynamicDir;
  }
  updatePatchState();
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "toggleState") {
    isEnabled = message.value;
    updatePatchState();
    sendResponse({ status: "success", isEnabled });
  } else if (message.action === "toggleDynamicDir") {
    enableDynamicDir = message.value;
    updatePatchState();
    sendResponse({ status: "success", enableDynamicDir });
  }
});

function updatePatchState() {
  if (isEnabled) {
    document.documentElement.classList.add('ai-studio-rtl-patch-active');
    applyRtlFormatting();
    startObserving();
  } else {
    document.documentElement.classList.remove('ai-studio-rtl-patch-active');
    removeRtlFormatting();
    stopObserving();
  }
}

const PERSIAN_REGEX = /[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]/;

function containsPersian(text) {
  return PERSIAN_REGEX.test(text);
}

function shouldProcessElement(el) {
  if (
    el.closest('pre') || 
    el.closest('code') || 
    el.closest('.monospace') || 
    el.closest('mat-icon') || 
    el.closest('.material-symbols-outlined') || 
    el.closest('button') ||
    el.closest('nav') ||
    el.closest('aside') ||
    el.closest('mat-drawer') ||
    el.closest('.navigation-rail') ||
    el.tagName.toLowerCase() === 'script' ||
    el.tagName.toLowerCase() === 'style'
  ) {
    return false;
  }
  
  const tagName = el.tagName.toLowerCase();
  
  if (['p', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'textarea', 'span'].includes(tagName)) {
    return true;
  }

  if (
    el.getAttribute('contenteditable') === 'true' || 
    el.classList.contains('prompt-textarea') || 
    el.classList.contains('message-text') || 
    el.classList.contains('markdown-body') ||
    el.classList.contains('text-content') ||
    tagName.startsWith('ms-') || 
    tagName.includes('chunk') ||
    Array.from(el.classList).some(cls => 
      cls.includes('text-content') || 
      cls.startsWith('ms-') || 
      cls.includes('chat') || 
      cls.includes('message')
    )
  ) {
    return true;
  }

  if (tagName === 'div') {
    for (const child of el.childNodes) {
      if (child.nodeType === Node.TEXT_NODE && child.textContent && child.textContent.trim().length > 0) {
        return true;
      }
    }
  }

  return false;
}

const TARGET_SELECTORS = 'p, li, span, h1, h2, h3, h4, textarea, [contenteditable="true"], .markdown-body, .text-content, [class*="text-content-"], [class*="ms-"], ms-text-chunk, ms-chat-chunk, [class*="chat-chunk"], [class*="chat-message"]';

function processNode(node) {
  if (node.nodeType === Node.ELEMENT_NODE) {
    if (shouldProcessElement(node)) {
      applyToElement(node);
    }
    const children = node.querySelectorAll(TARGET_SELECTORS);
    children.forEach(child => {
      if (shouldProcessElement(child)) {
        applyToElement(child);
      }
    });
  }
}

function applyToElement(el) {
  const text = el.textContent || '';
  const trimmed = text.trim();
  if (trimmed.length === 0) return;

  if (containsPersian(trimmed)) {
    el.classList.add('ai-studio-rtl-patched');
    
    if (enableDynamicDir) {
      const firstStrongMatch = trimmed.match(/[a-zA-Z0-9\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]/);
      const firstChar = firstStrongMatch ? firstStrongMatch[0] : '';
      const isRtl = /[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]/.test(firstChar);
      
      if (isRtl) {
        el.setAttribute('dir', 'rtl');
      } else {
        el.setAttribute('dir', 'ltr');
      }
    } else {
      el.setAttribute('dir', 'rtl');
    }
  } else {
    if (trimmed.length > 0) {
      el.classList.remove('ai-studio-rtl-patched');
      el.removeAttribute('dir');
    }
  }
}

function applyRtlFormatting() {
  const allElements = document.querySelectorAll(TARGET_SELECTORS);
  allElements.forEach(el => {
    if (shouldProcessElement(el)) {
      applyToElement(el);
    }
  });
}

function removeRtlFormatting() {
  const patched = document.querySelectorAll('.ai-studio-rtl-patched');
  patched.forEach(el => {
    el.classList.remove('ai-studio-rtl-patched');
    el.removeAttribute('dir');
  });
}

let observer = null;

function startObserving() {
  if (observer) return;
  
  observer = new MutationObserver((mutations) => {
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
        processNode(node);
      });
      
      // Also listen to text modifications inside contenteditable or textareas
      if (mutation.type === 'characterData' && mutation.target.parentNode) {
        const parent = mutation.target.parentNode;
        if (shouldProcessElement(parent)) {
          applyToElement(parent);
        }
      }
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true
  });
}

function stopObserving() {
  if (observer) {
    observer.disconnect();
    observer = null;
  }
}
