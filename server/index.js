import app from './server';
import chalk from 'chalk';

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log(
    chalk.green.bold('Server listening on port: ')
    + chalk.cyan.bold(PORT)
  )
});