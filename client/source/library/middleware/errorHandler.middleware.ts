import chalk from 'chalk';
import { NextApiResponse } from 'next';

// errorHandler.ts
const handleError = (
  res: NextApiResponse,
  status: number,
  message = 'Internal Server Error',
): void => {
  res.status(status).json({ error: message, status: status });

  if (status >= 400) {
    console.log(chalk.redBright.bold(message));
  } else {
    console.log(chalk.greenBright.bold(message));
  }
};

export default handleError;
