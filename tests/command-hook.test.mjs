import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { test } from "node:test";

const hook = fileURLToPath(new URL("../.github/hooks/block-dangerous-commands.mjs", import.meta.url));

function review(command) {
  const result = spawnSync(process.execPath, [hook], {
    input: JSON.stringify({ toolArgs: { command } }),
    encoding: "utf8",
  });
  assert.equal(result.status, 0, result.stderr);
  return result.stdout ? JSON.parse(result.stdout).permissionDecision : "allow";
}

test("denies recursive forced deletion with equivalent option spellings", () => {
  for (const command of [
    "rm -rf scratch", "rm -Rf scratch", "rm -fR scratch",
    "rm --recursive --force scratch", "rm -r -f scratch",
    '"/usr/bin/rm" -Rf scratch',
  ]) assert.equal(review(command), "deny", command);
});

test("denies force push options including lease values and short bundles", () => {
  for (const command of [
    "git push --force", "git push -f", "git push --force-with-lease",
    "git push --force-with-lease=refs/heads/main:abc", "git push -vf",
    "git -C checkout push --force", "git -c alias.test=push push --force",
  ]) assert.equal(review(command), "deny", command);
});

test("checks each executed command in a command list", () => {
  for (const separator of [";", "&&", "||", "|", "\n"]) {
    assert.equal(review(`echo ok ${separator} git push --force`), "deny");
    assert.equal(review(`echo ok ${separator} rm -Rf scratch`), "deny");
  }
  assert.equal(review('& "C:\\Program Files\\Git\\bin\\git.exe" push --force'), "deny");
});

test("preserves blocking through command wrappers and environment assignments", () => {
  for (const command of [
    "sudo rm -rf scratch", "sudo -u root rm -Rf scratch",
    "env MODE=test git push --force", "MODE=test rm -rf scratch",
    "command rm -rf scratch", "exec git push --force", "nohup rm -rf scratch",
    "xargs -I item rm -rf item",
  ]) assert.equal(review(command), "deny", command);
  assert.equal(review("env MODE=test echo rm -rf scratch"), "allow");
});

test("allows harmless arguments, quoted separators, and non-destructive operations", () => {
  for (const command of [
    "echo rm -rf scratch", "echo git push --force",
    'echo "ok; rm -rf scratch"', "git log --grep push --force",
    "git push", "git status", "rm -r scratch", "rm -f file",
    "rm -- -rf", "git push -- --force",
  ]) assert.equal(review(command), "allow", command);
});
