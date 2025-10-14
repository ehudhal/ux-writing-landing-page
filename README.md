## Table of Contents

- [Setup](https://github.com/chordio/wire/blob/main/docs/setup.md)
- [Migration Conflict Resolve Guide](https://github.com/chordio/wire/blob/main/docs/migrations.md)
- [Scope target analysis documentation](https://github.com/chordio/wire/blob/main/jobs/design/instructions/scope/scope-target-analysis.md)
- [Setting up new local slack bots](https://github.com/chordio/wire/blob/main/docs/new-local-slack-bots.md)


### Creating a new migration

- make the necessary in your drizzle object
- run `pnpm drizzle-kit generate`
- make sure you are on your branch db (`pnpm beacon switch [branch]`)
- run `pnpm db:migrate`
