# PR

PR workflow. Creates a PR, or switches back to main and pulls and prunes.

`pr` pushes the branch to origin and creates a PR.

`pr -d/--done` checks out `main`, runs `git pull --prune`, `git branch --delete <branch the command was run on>`.

## Workflow

1. Create a personal branch
2. Make some changes
3. Commit them
4. Run `pr` to push the branch and create the PR
5. Get the PR reviewed and merged
6. Delete the remote branch
7. Run `pr -d/--done` to go back to main and pull the latest changes
