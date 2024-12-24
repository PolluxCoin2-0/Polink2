chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension installed and service worker started.");
  });
  
  // Example of using alarms or tabs API in background.js
  chrome.alarms.create('myAlarm', { periodInMinutes: 1 });
  
  chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === 'myAlarm') {
      console.log("Alarm triggered!");
    }
  });
  