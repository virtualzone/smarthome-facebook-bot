# Smart Home Bot for the Facebook Messenger Platform
This is a bot for the Facebook Messenger Platform written in TypeScript which allows you to control your smart home system. You can use it to send commands to your smart home using the Facebook Messenger. For example, you can switch on/off lights and open/close blinds.

Here are some examples of commands the bot understands right now (and various variants of them):
* Hello Bot!
* Please help me.
* Switch on the light in the kitchen.
* Turn off the light in the living room.
* Close the bathroom blinds.

The following home automation systems are supported:
* [FHEM](http://fhem.de/)

## Requirements
To get the bot up and running, you'll need:
* A Facebook Page and an App for the Facbeook Messenger Platform. Please follow Facebook's [Quick Start Guide](https://developers.facebook.com/docs/messenger-platform/guides/quick-start) for information on how to do that. You'll need a Page Access Token and a Verify Token.
* A [MongoDB](https://www.mongodb.com) instance.
* [NodeJS](https://nodejs.org) with NPM (tested with version 7).

## Installation
1. Clone the code from the repository:
   ```git clone https://github.com/weweave/smarthome-facebook-bot.git```
2. Edit: etc/config.json
3. Run: ```npm install```
3. Run: ```npm run start```

## License
The Smart Home Facebook Bot is licensed under the terms of the GPLv3.

## Disclaimer
There is no association with Facebook, Inc.
Facebook is a registered trademark of Facebook, Inc.