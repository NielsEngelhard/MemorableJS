## Drizzle (database) Migration
Added to package.json
```
    "db:generate" | generate a migration file
    "db:migrate" | apply migration to database
    "db:studio" | open drizzle studio for inspecting data (can also use pgadmin)
    "db:seed" | seed the database with (initial) data
```

## Debugging

### Debug jest tests
Debugging jests in VS Code should be simple. 
- Open a "Javascript Debug Terminal" in VS Code (not just a regular terminal);
- Set a debugger somewhere;
- Run the jest tests (npm run test should do the trick);
- Debugger statement/break point should be triggered.