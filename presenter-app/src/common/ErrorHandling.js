import unhandled from "electron-unhandled";
import {openNewGitHubIssue, debugInfo} from "electron-util";

unhandled({
  reportButton: error => {
    openNewGitHubIssue({
      user: "larsbaunwall",
      repo: "plodo",
      body: `\`\`\`\n${error.stack}\n\`\`\`\n\n---\n\n${debugInfo()}`,
    });
  },
});
