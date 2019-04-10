workflow "JS Build and test commit" {
  resolves = [
    "unit",
    "lint",
    "e2e",
  ]
  on = "push"
}

action "build" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  args = "install"
}

action "unit" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  needs = ["build"]
  args = "run test:unit"
}

action "lint" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  needs = ["build"]
  args = "run lint"
}

action "e2e" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  needs = ["build"]
  args = "run test:e2e -- --headless"
}

workflow "JS Build and test PR" {
  resolves = [
    "unit",
    "lint",
    "e2e",
  ]
  on = "pull_request"
}
