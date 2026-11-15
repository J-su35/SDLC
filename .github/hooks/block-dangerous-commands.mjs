#!/usr/bin/env node

const input = await readStdin();
let payload;

try {
  payload = JSON.parse(input);
} catch {
  console.error("Could not parse PreToolUse hook input.");
  process.exit(1);
}

const command = getCommand(payload?.toolArgs);
if (command === null) {
  console.error("Could not read the tool command from PreToolUse hook input.");
  process.exit(1);
}

const reason = getBlockReason(command);
if (reason) {
  process.stdout.write(
    JSON.stringify({
      permissionDecision: "deny",
      permissionDecisionReason: reason,
    }),
  );
}

async function readStdin() {
  let data = "";
  for await (const chunk of process.stdin) data += chunk;
  return data;
}

function getCommand(args) {
  if (typeof args === "string") {
    try {
      return getCommand(JSON.parse(args));
    } catch {
      return args;
    }
  }

  if (typeof args === "object" && args !== null) {
    for (const key of ["command", "script", "cmd", "commandLine", "command_line"]) {
      if (typeof args[key] === "string") return args[key];
    }
  }

  return null;
}

function getBlockReason(command) {
  const words = command.match(/"(?:\\.|[^"])*"|'(?:\\.|[^'])*'|&&|\|\||[;&|]|[^\s;&|]+/g) ?? [];
  const isSeparator = (word) => [";", "&&", "||", "&", "|"].includes(word);
  const basename = (word) => word.replace(/^["']|["']$/g, "").split(/[\\/]/).at(-1).toLowerCase();

  for (let index = 0; index < words.length; index += 1) {
    if (isSeparator(words[index])) continue;

    const executable = basename(words[index]).replace(/\.exe$/, "");
    if (executable === "rm") {
      let recursive = false;
      let force = false;
      for (let next = index + 1; next < words.length && !isSeparator(words[next]); next += 1) {
        const option = words[next].replace(/^["']|["']$/g, "");
        if (option === "--") break;
        if (option === "--recursive") recursive = true;
        if (option === "--force") force = true;
        if (/^-[^-]/.test(option)) {
          recursive ||= option.slice(1).includes("r");
          force ||= option.slice(1).includes("f");
        }
      }
      if (recursive && force) return "Blocked recursive forced deletion (rm -rf).";
    }

    if (executable === "git") {
      let pushIndex = -1;
      for (let next = index + 1; next < words.length && !isSeparator(words[next]); next += 1) {
        if (words[next].replace(/^["']|["']$/g, "") === "push") {
          pushIndex = next;
          break;
        }
      }
      if (pushIndex !== -1) {
        for (let next = pushIndex + 1; next < words.length && !isSeparator(words[next]); next += 1) {
          const option = words[next].replace(/^["']|["']$/g, "");
          if (option === "--force" || option === "--force-with-lease" || option === "-f") {
            return "Blocked forced git push.";
          }
        }
      }
    }
  }

  return null;
}
