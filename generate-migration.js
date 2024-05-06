const { execSync } = require('child_process');
const name = process.env.npm_config_name;
if (!name) {
  console.error(
    'Error: Please provide a name for the migration using --name=<MigrationName>',
  );
  process.exit(1);
}
const path = `./src/migrations/${name}`;
const command = `npm run typeorm migration:generate -- -d ./src/config/typeorm.ts ${path}`;
console.log(`Executing: ${command}`);
execSync(command, { stdio: 'inherit' });
