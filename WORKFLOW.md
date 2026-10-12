# AI-Assisted Development Workflow Comparison

Week 2 | FlyRank AI capstone

## 1. Experiment setup

Two branches were used to compare Copilot workflows for the FlyRank settings panel: `drill/settings-vague` and `drill/settings-specified`. The first started from a broad request to build a settings panel. The second used a more constrained prompt describing project context, expected controls, accessibility, validation, and verification. Both branches are available on `origin`.

## 2. Round 1: Vague prompt

The initial prompt was: “Build a settings panel for my FlyRank AI app.” Copilot replaced the Vite starter screen with a responsive workspace and Profile, Workspace, Notifications, Security, and Integrations sections. It added editable fields, switches, and confirmation feedback. These interactions are client-side only; there is no settings API or server persistence, so the interface must not be described as saving settings remotely.

Review caught two implementation problems: a delete-and-add patch left an imported file missing, and the workspace default selects were not connected to state. Production builds exposed the missing file, and a follow-up review found the uncontrolled behavior. Both were corrected and revalidated. As a retrospective estimate, Round 1 took about 30 minutes to implement and 15 minutes to review and fix. No timer was running, so these are approximate rather than measured values.

## 3. Round 2: Precise prompt

The second experiment made the expected scope and quality criteria explicit. It emphasized inspecting existing files, preserving unrelated changes, meaningful labels and keyboard access, input validation with clear feedback, and accurate wording about client-side persistence. The implementation added focused settings tests and project checks. Round 2 verification passed seven tests, lint, and the production build. Its implementation and review durations were not separately timed in the available notes and should not be inferred from Round 1.

## 4. Comparison and review

The vague prompt produced a broad, polished first pass quickly, but left important behavior and review expectations implicit. The precise prompt better specified validation, accessibility, persistence claims, and test expectations. In both rounds, review mattered: generated code needed to be checked against actual behavior, not just appearance. Branch comparison showed the specified round included additional test and configuration files.

## 5. Key takeaways

- State scope, validation, accessibility, and success/error feedback explicitly in prompts.
- Inspect diffs and run focused checks; builds and tests caught issues that visual review alone would miss.
- Keep unrelated user changes intact and report unverified work plainly.
- The dependency audit reported three high-severity findings: `brace-expansion`, `nanoid`, and `source-map-js`. Fixes are available, but the findings have not been resolved or re-audited.
