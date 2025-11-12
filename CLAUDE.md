# Claude Code Configuration

## Git Workflow
- **Development branch**: `dev`
- **Main branch**: `master`
- Always create feature branches from `dev`
- Merge completed features back to `master`
- Create PRs from feature branches to `master`

## Branch Strategy
1. Switch to or create `dev` branch for all development work
2. Create feature branches from `dev` when needed
3. Merge completed work to `master` branch
4. Keep `master` as the stable main branch
5. Before any git editing action (e.g. push), do a proper git fetch and rebase onto remote and resolve conflicts
6. Git is configured to prefer rebasing over merging for cleaner history

## Commit Messages
- Do not include Claude Code attribution or co-authorship
- Write clear, concise commit messages without AI attribution

## Code Documentation
- When creating new files or making massive edits, add short comment explanations above each critical distinct section
- Attribute comments to Claude-AI for clarity
- Example: `// Handle user authentication and session management - Claude-AI`