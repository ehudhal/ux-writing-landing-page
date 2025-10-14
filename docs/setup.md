## Run local environment:
in your `wire` project
1. `pnpm i`
2. `pnpm vercel:pull-env`
    you might need to run `npx vercel link` if you get not linked error. Choose "Chordio" in the process.
3. `pnpm inngest`
4. `pnpm dev`
5. (optional) `pnpm stripe`

## Required installations

1. NVM https://github.com/nvm-sh/nvm
2. `npm install -g pnpm`
3. `nvm install node` or `nvm install [specific node version]` 
4. Stripe - https://docs.stripe.com/stripe-cli (+login)

## Test Account Details

Use the following test account details for testing purposes:

- Test email: your_email+clerk_test@example.com
  - Any email with the `+clerk_test` subaddress is a test email address.
- Test verification code: 424242
  - No verification emails or SMS will be sent from test emails or test phone numbers. They can be verified with this code.
