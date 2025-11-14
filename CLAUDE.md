# Claude Code Configuration

## Git Workflow
- **Development branch**: `dev`
- **Main branch**: `master`
- Always create feature branches from `dev`
- Merge completed features back to `master`
- Create PRs from feature branches to `master`

## Branch Strategy
1. **Never work directly on master** - always work on `dev` branch
2. Switch to or create `dev` branch for all development work
3. When ready to submit changes to master, create a PR from `dev` to `master`
4. Keep `master` as the stable main branch through PRs only
5. Before any git editing action (e.g. push), do a proper git fetch and rebase onto remote and resolve conflicts
6. Git is configured to prefer rebasing over merging for cleaner history
7. Always switch back to `dev` branch when done working outside dev

## Commit Messages
- Write clear, concise commit messages

## Code Documentation
- When creating new files or making massive edits, add short comment explanations above each critical distinct section
- Example: `// Handle user authentication and session management`