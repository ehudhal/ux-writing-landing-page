# How to Merge Migrations

When working with database migrations, merging changes from multiple branches can sometimes lead to conflicts. To ensure a smooth merging process, follow the steps below:

### Step 1: Delete Your Local Migration Files

Identify and delete your local migration files. For example, if you have a file named `0082_early_the_watchers.sql`, delete it from the `drizzle/` directory. From the `drizzle/meta` folder, also delete the snapshot files associated with the migration number. For example, `drizzle/meta/0082_snapshot.json`.

### Step 2: Pull from Origin

First, ensure that you have the latest changes from the main branch (or your source of choice).

```bash
git pull origin main
```

Replace `main` with the name of your branch if it's different.


### Step 3: Accept Incoming Migrations and Snapshot files

During the merge conflict resolution, accept the incoming migrations and snapshot files. Do not use your current snapshot JSON file. This ensures that you are working with the latest changes from the main branch.

### Step 4: Resolve Conflicts in `db.ts` and Related Files

Conflicts might occur in `db.ts` and other database schema-related files. Manually resolve these conflicts to ensure the schema reflects the intended structure.

### Step 5: Re-run the Migration Generation

After resolving conflicts, regenerate the migration files to incorporate the latest changes.

```bash
pnpm drizzle-kit generate
```

### Step 6: Migrate the Database

Finally, ensure you are connected to the correct database and run the migrations.
You may need to reset it from main in NeonDB - it might be in an inconsistent state (because non-existing migrations ran on it).

```bash
pnpm db:migrate
```


### Verification

After completing the steps, verify that the migrations have been applied correctly and the database schema is as expected.
