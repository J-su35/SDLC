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
  // Keep quoted arguments intact; only command boundaries start a new executable.
  const tokens = command.match(/"(?:\\.|[^"])*"|'(?:\\.|[^'])*'|&&|\|\||[;&|\r\n]|[^\s;&|]+/g) ?? [];
  let words = [];
  for (const token of [...tokens, ";"]) {
    if (![";", "&&", "||", "&", "|", "\r", "\n"].includes(token)) {
      words.push(token.replace(/^["']|["']$/g, ""));
      continue;
    }

    const reason = getCommandBlockReason(words);
    if (reason) return reason;
    words = [];
  }
  return null;
}

function getCommandBlockReason(words) {
  // Leading environment assignments are not the executable in a shell command.
  while (/^[A-Za-z_][A-Za-z0-9_]*=/.test(words[0] ?? "")) words = words.slice(1);
  const executable = (words[0] ?? "").split(/[\\/]/).at(-1).toLowerCase().replace(/\.exe$/, "");
  const args = words.slice(1);
  if (["sudo", "env", "command", "exec", "nohup", "xargs"].includes(executable)) {
    let index = 0;
    while (index < args.length && args[index].startsWith("-")) {
      const option = args[index++];
      if (option === "--") break;
      if (
        (executable === "sudo" && ["-u", "--user", "-g", "--group", "-h", "--host", "-p", "--prompt", "-C", "--close-from", "-T", "--command-timeout"].includes(option)) ||
        (executable === "env" && ["-u", "--unset", "-C", "--chdir"].includes(option)) ||
        (executable === "exec" && option === "-a") ||
        (executable === "xargs" && ["-I", "-n", "--max-args", "-P", "--max-procs", "-L", "--max-lines", "-s", "--max-chars", "-E", "-d", "--delimiter", "-a", "--arg-file"].includes(option))
      ) index += 1;
    }
    return getCommandBlockReason(args.slice(index));
  }
  if (executable === "rm") {
    let recursive = false;
    let force = false;
    for (const option of args) {
      if (option === "--") break;
      recursive ||= option === "--recursive" || /^-[^-]*[rR]/.test(option);
      force ||= option === "--force" || /^-[^-]*f/.test(option);
    }
    if (recursive && force) return "Blocked recursive forced deletion (rm -rf).";
  }

  if (executable === "git") {
    // Skip Git's global options, including options that consume the next word.
    let index = 0;
    while (index < args.length && args[index].startsWith("-")) {
      if (["-C", "-c", "--git-dir", "--work-tree", "--namespace", "--config-env"].includes(args[index])) {
        index += 2;
      } else {
        index += 1;
      }
    }
    if (args[index] === "push") {
      for (const option of args.slice(index + 1)) {
        if (option === "--") break;
        if (option === "--force" || /^--force-with-lease(?:=|$)/.test(option) || /^-[^-]*f/.test(option)) {
          return "Blocked forced git push.";
        }
      }
    }
  }

  return null;
}
