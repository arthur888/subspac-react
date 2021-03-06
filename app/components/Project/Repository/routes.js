export const codeRoute = [
  { path: '/:userName/:projectName/:branchHead/commit/:commitId', name: 'Commit' },
  { path: '/:userName/:projectName/:branchHead/tree/*', name: 'TreeContainer' },
  { path: '/:userName/:projectName/:branchHead/blob/*', name: 'BlobContainer' },
  { path: '/:userName/:projectName/:branchHead/commits', name: 'Commits' },
  { path: '/:userName/:projectName/:branchHead/commits/*', name: 'Commits' },
  { path: '/:userName/:projectName/:branchHead/stashes', name: 'Stashes' },
  { path: '/:userName/:projectName/:branchHead/stash/:stashNum', name: 'Stash' },
  { path: '/:userName/:projectName/branches', name: 'Branches' },
  { path: '/:userName/:projectName/:branchHead', name: 'MainContainer' },
  { path: '/:userName/:projectName', name: 'MainContainer' },
];
