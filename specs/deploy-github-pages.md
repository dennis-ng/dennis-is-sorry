# Plan: Deploy Website to GitHub Pages

## Task Description
Push the "dennis-is-sorry" website to the existing GitHub repo (`dennis-ng/dennis-is-sorry`) and configure GitHub Pages to serve the built site. No AI co-author credits should be included in any commits.

## Objective
The website will be live on GitHub Pages at `https://dennis-ng.github.io/dennis-is-sorry/` with all source code pushed to the repo.

## Solution Approach
The GitHub repo already exists and the remote `origin` is configured. The Vite config already has `base: '/dennis-is-sorry/'` set. We need to:
1. Ensure the `.gitignore` excludes `.claude/` and `.vite/` directories (they shouldn't be committed)
2. Build the production site with `npm run build`
3. Commit all source files and push to `main`
4. Deploy the `dist/` output to a `gh-pages` branch using `gh-pages` package or manual git worktree approach
5. Enable GitHub Pages on the `gh-pages` branch via `gh` CLI

## Relevant Files
Use these files to complete the task:

- `package.json` - Build scripts, may need `gh-pages` dev dependency added
- `vite.config.js` - Already configured with `base: '/dennis-is-sorry/'`
- `.gitignore` - Needs `.claude/` and `.vite/` added to prevent committing tool artifacts
- `index.html` - Entry point
- `src/App.jsx` - Main app component
- `src/main.jsx` - React entry
- `src/index.css` - Styles
- `src/assets/beg.jpg` - Image asset
- `public/vite.svg` - Public asset

## Implementation Phases
### Phase 1: Foundation
- Update `.gitignore` to exclude `.claude/` and `.vite/`
- Ensure all source files are staged

### Phase 2: Core Implementation
- Build the production site (`npm run build`)
- Commit and push source to `main` (no AI co-author)
- Deploy built `dist/` to `gh-pages` branch

### Phase 3: Integration & Polish
- Configure GitHub Pages to serve from `gh-pages` branch
- Validate the site is accessible at the GitHub Pages URL

## Team Orchestration

- You operate as the team lead and orchestrate the team to execute the plan.
- You're responsible for deploying the right team members with the right context to execute the plan.
- IMPORTANT: You NEVER operate directly on the codebase. You use `Task` and `Task*` tools to deploy team members to to the building, validating, testing, deploying, and other tasks.
  - This is critical. You're job is to act as a high level director of the team, not a builder.
  - You're role is to validate all work is going well and make sure the team is on track to complete the plan.
  - You'll orchestrate this by using the Task* Tools to manage coordination between the team members.
  - Communication is paramount. You'll use the Task* Tools to communicate with the team members and ensure they're on track to complete the plan.
- Take note of the session id of each team member. This is how you'll reference them.

### Team Members

- Builder
  - Name: builder-deploy
  - Role: Handles all git operations, builds, and GitHub Pages deployment
  - Agent Type: builder
  - Resume: true

- Validator
  - Name: validator-site
  - Role: Validates the GitHub Pages deployment is live and correct
  - Agent Type: validator
  - Resume: true

## Step by Step Tasks

- IMPORTANT: Execute every step in order, top to bottom. Each task maps directly to a `TaskCreate` call.
- Before you start, run `TaskCreate` to create the initial task list that all team members can see and execute.

### 1. Update .gitignore and Stage Files
- **Task ID**: update-gitignore
- **Depends On**: none
- **Assigned To**: builder-deploy
- **Agent Type**: builder
- **Parallel**: false
- Add `.claude/` and `.vite/` to `.gitignore`
- Stage all source files for commit (exclude `node_modules/`, `dist/`, `.claude/`, `.vite/`)
- Do NOT include any AI co-author attribution

### 2. Build Production Site
- **Task ID**: build-site
- **Depends On**: update-gitignore
- **Assigned To**: builder-deploy
- **Agent Type**: builder
- **Parallel**: false
- Run `npm run build` to generate the `dist/` folder
- Verify the build completes without errors

### 3. Commit and Push Source to Main
- **Task ID**: push-to-main
- **Depends On**: build-site
- **Assigned To**: builder-deploy
- **Agent Type**: builder
- **Parallel**: false
- Commit all source files with a descriptive message (NO AI co-author line)
- Push to `origin main`

### 4. Deploy dist to gh-pages Branch
- **Task ID**: deploy-gh-pages
- **Depends On**: push-to-main
- **Assigned To**: builder-deploy
- **Agent Type**: builder
- **Parallel**: false
- Use `npx gh-pages -d dist` (or manual git subtree/worktree) to push the `dist/` contents to the `gh-pages` branch
- This creates a clean branch with only the built assets

### 5. Configure GitHub Pages
- **Task ID**: configure-pages
- **Depends On**: deploy-gh-pages
- **Assigned To**: builder-deploy
- **Agent Type**: builder
- **Parallel**: false
- Use `gh api` to set GitHub Pages source to `gh-pages` branch root: `gh api repos/dennis-ng/dennis-is-sorry/pages -X PUT -f source.branch=gh-pages -f source.path=/` (or create if not exists: `gh api repos/dennis-ng/dennis-is-sorry/pages -X POST ...`)
- Verify Pages is enabled

### 6. Validate Deployment
- **Task ID**: validate-all
- **Depends On**: configure-pages
- **Assigned To**: validator-site
- **Agent Type**: validator
- **Parallel**: false
- Verify `gh-pages` branch exists on remote with built assets
- Verify GitHub Pages is configured via `gh api repos/dennis-ng/dennis-is-sorry/pages`
- Check that the site URL returns a 200 status (may take a few minutes to propagate)
- Confirm no AI co-author credits in any commits: `git log --format="%b" | grep -i "co-authored"` should return nothing

## Acceptance Criteria
- All source files are pushed to `main` branch on `dennis-ng/dennis-is-sorry`
- No AI co-author credits in any commits
- `gh-pages` branch contains the production build output
- GitHub Pages is enabled and configured to serve from `gh-pages` branch
- Site is accessible at `https://dennis-ng.github.io/dennis-is-sorry/`
- `.claude/` and `.vite/` directories are NOT committed

## Validation Commands
Execute these commands to validate the task is complete:

- `git log --format="%b" origin/main | grep -i "co-authored"` - Should return empty (no AI credits)
- `gh api repos/dennis-ng/dennis-is-sorry/pages --jq '.status'` - Should show "built" or similar
- `git branch -r | grep gh-pages` - Should show `origin/gh-pages`
- `curl -sL -o /dev/null -w "%{http_code}" https://dennis-ng.github.io/dennis-is-sorry/` - Should return 200 (after propagation)

## Notes
- The Vite config already has `base: '/dennis-is-sorry/'` which is required for GitHub Pages subpath hosting
- `npx gh-pages -d dist` is the simplest deployment method - it handles creating the branch and force-pushing the dist contents
- GitHub Pages may take 1-3 minutes to propagate after initial setup
