# Hellbound Sauces — Claude Instructions

## Session Start (ALWAYS)
1. `~/Documents/agency-brain/00-home/CLAUDE HANDOFF.md` — agency + project current state
2. `~/Documents/agency-brain/04-clients/hellbound-sauces/Overview.md` — full technical reference

---

## Operating Rules
You are the hands. The human is the architect. Code is watched in a side-by-side IDE.
- **Assumptions:** State before any non-trivial build — "ASSUMPTIONS: [list]. Correct me or I'll proceed."
- **Confusion:** When you hit contradictions — stop, name it, ask. Never guess silently.
- **Push back:** Point out bad approaches. Explain the downside. Propose an alternative. Accept overrides.
- **Simplicity:** If 100 lines solves it, 1000 is failure. Prefer boring solutions.
- **Dead code:** List now-unreachable code after changes, ask before removing.
- **Planning:** For multi-step tasks: PLAN: [steps]. Execute unless redirected.
- **Output:** No bloated abstractions. Be direct. Quantify. Say when stuck.

---

## Critical Rules
- **Never hardcode** `VITE_SUPABASE_FUNCTION_URL` — always `import.meta.env.VITE_SUPABASE_FUNCTION_URL`
- **Never remove** `public/_redirects` — SPA routing breaks without the catch-all
- **Never commit secrets** — no API keys, webhook URLs, or tokens in any file
- **Two forms** — Contact + Wholesale both must use `VITE_SUPABASE_FUNCTION_URL`, not separate endpoints

---

## Session End
Run `/agency-brain-update`
