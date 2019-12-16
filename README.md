Eco Chrome
=========

Eco Chrome is the first multi-platorm screensaver which helps to save the environment using mainly black pixels.
Based on Google Chrome Apps engine works on any OS (Windows, Mac or Linux) where is installed Google Chrome.

Chrome APIs used to develop this app are:

- API Alarm
http://developer.chrome.com/apps/alarms

- API Window
http://developer.chrome.com/apps/app_window

- API Messaging
https://developer.chrome.com/extensions/messaging

- API Storage
https://developer.chrome.com/apps/storage

- API Idle
https://developer.chrome.com/apps/idle

Javascript frameworks used to build the GUI is Bootstrap:
- JQuery (http://jquery.com)
- Boostrap (http://getbootstrap.com)


Google Chrome Store
-------------------
https://chrome.google.com/webstore/detail/eco-chrome/hacinppfkhihapeelgocenkcbjdkkhnp


Release History
===============

Release v1.0.8 - 06/09/2014
---------------------------
- Fixed app.window.alwaysOnTop permission requested from Google Chrome v32 (manifest.json)
- layout showed by outerBound property (background.js)

Release v1.0.5 - 25/04/2014
---------------------------
- Fixed Windows size issue on OSX (https://groups.google.com/a/chromium.org/forum/#!mydiscussions/chromium-apps/HDAc0-FfK8M)
  This bug was related to Google Chrome versions before v35


Still to check
--------------
- [ ] Check if manifest.json can be updated with offline info to place Eco Chrome on Chrome Store "offline apps"
- [ ] Fix fullscreen screensaver not working on Ubuntu (generic *unix?) OS
