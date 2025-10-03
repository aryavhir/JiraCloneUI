// Utility functions for startup overlay

export const resetStartupOverlay = () => {
  localStorage.removeItem('jira-startup-seen');
  window.location.reload();
};

export const hasSeenStartup = () => {
  return localStorage.getItem('jira-startup-seen') === 'true';
};

// Add to window for easy access in console
if (typeof window !== 'undefined') {
  (window as any).resetStartupOverlay = resetStartupOverlay;
}
