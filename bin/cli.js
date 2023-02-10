#!/usr/bin/env node

import { execSync } from 'child_process';
import chalk from 'chalk';

const runCommand = command => {
    try {
        execSync(`${command}`, { stdio: 'inherit' });
    } catch (error) {
        // console.log(`Failed to execute ${command}`, error);
        console.log(chalk.red(` ❌  Failed to execute ${command}.`));
        return false;
    }
    return true;
}

const repo = process.argv[2];
if (repo) {
    const gitCheckout = `git clone --depth 1 https://github.com/aka-demy/create-ejs-app.git ${repo}`;
    const installDeps = `cd ${repo} && npm install`;
    const gitCleanup = `cd ${repo} && git remote remove origin`;

    console.log();
    console.log(chalk.cyan(` 🧬  Cloning the repository with the name ${repo}...`));
    console.log();

    const checkoutOp = runCommand(gitCheckout);
    if (!checkoutOp) process.exit(1);

    console.log();
    console.log(chalk.cyan(` ⚡  Installing dependencies for ${repo}...`));

    const installOp = runCommand(installDeps);
    if (!installOp) process.exit(1);

    const cleanupOp = runCommand(gitCleanup);
    if (!cleanupOp) process.exit(1);

    console.log();
    console.log(chalk.green(' 🥂  Congratulations! You are good to go.'));
    console.log();
    console.log(chalk.green(' 🏹  Type in the following command to start:'));
    console.log();
    console.log(chalk.white(` 🎯  cd ${repo} && npm start`));
    console.log();
} else {
    console.log();
    console.log(chalk.red(' ❌  Failed to clone the repository.'));
    console.log();
    console.log(chalk.red(' 📛  Kindly provide a folder name.'));
    console.log();
    process.exit(0);
}
