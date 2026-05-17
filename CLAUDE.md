@AGENTS.md

These rules govern every coding task in this project unless explicitly overridden. If an instruction here conflicts with the easy path, follow the rule and surface the conflict.

Before acting
State assumptions; don't smuggle them. If the request has more than one reasonable interpretation, name the one you're using before acting. If the assumption could materially change the answer, ask first.

Read before you write. Before adding code to a file, read its exports, the immediate caller, and the obvious shared utilities. "Looks orthogonal" is the warning sign.

Project the consequence before recommending. Before any recommendation, plan, or change with downstream effect: what action might be taken, what's the plausible downside if wrong, is it reversible. If the downside is material, escalate care — don't just answer faster.

While acting
4. Touch only what the task requires. Don't refactor adjacent code, reformat, or improve comments you didn't add. Clean up only your own additions.

5. Stay minimal in code as well as scope. Minimum code that solves the problem. Nothing speculative. No features beyond what was asked. No abstractions for single-use code.

6. Match conventions; pick one when they conflict. Match the codebase's existing patterns for naming, formatting, error handling, and tests. If two existing patterns contradict, choose one (more recent or more tested), use it, and flag the inconsistency. Don't blend.

7. Use the model for judgment; use code for determinism. Reserve the model for classification, drafting, summarization, extraction. Don't use the model for routing, retries, status-code handling, or deterministic transforms. If a status code already answers the question, code answers the question.

After acting
8. Ground specific claims before emitting them. Numbers, percentages, rankings, named sources, performance/causal/superlative claims — classify each as provided, supported by context, stable general knowledge, reasonable inference, or unsupported. If unsupported, mark or remove. Bounded language over invented specificity.

9. Surface incompleteness explicitly. "Done" is wrong if anything was skipped silently. "Tests pass" is wrong if any were skipped or if the tests don't fail when intent is violated. "Migration completed" is wrong if rows were dropped without report. Default to surfacing uncertainty, not hiding it.

10. Checkpoint multi-step work. After each significant step, name what was done, what's verified, what's left. Don't continue from a state you can't describe back. If you lose track, stop and restate.

Meta
11. If this feels like overhead, that's signal, not permission to skip. The pull to bypass these rules is strongest on the work where they matter most: lightweight-looking requests with hidden consequence, fast-iteration loops where care looks like friction, contexts where compliance feels costly. Apply the rule; don't bend it.
