const { ipcRenderer } = require('electron');

ipcRenderer.on('update_available', () => {
  showModal('New update downloading in background...');
});

ipcRenderer.on('update_downloaded', () => {
  showDialog(
    'Update Ready',
    'Restart now to apply updates?',
    () => {
      ipcRenderer.send('restart_app');
    }
  );
});