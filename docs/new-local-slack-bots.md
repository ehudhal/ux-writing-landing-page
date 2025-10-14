# Setting up a new Slack bot for local development
## Initial setup
1. Copy the manifest from one of the apps in Slack (https://api.slack.com/apps)
2. Create a new app from manifest and paste in the old one
3. Set up a local tunnel using ngrok
4. In the manifest change the bot name, bot display name, and all redirect URLs (to match the local tunnel domain)
5. Create the app
6. Under "Basic Information", copy all the required keys and set up the local environment:

```
SLACK_CLIENT_ID="..."
SLACK_CLIENT_SECRET="..."
SLACK_SIGNING_SECRET="..."
SLACK_APP_ID="..."
```

7. After setting up the env variables, under "Event subscriptions", verify the events URL works and the tunnel is set up correctly

## Installing to the workspace
8. Using the *tunnel domain*, go to `/api/slack/install` and complete the oauth flow
9. Delete any pre-existing bindings in that db for that slack user and complete the binding process in http://localhost:3000/verify-binding. OR if you already have a binding, you can skip that part and simply manually set the organizationId in the installations table.


Congrats! The bot should now answer messages.
