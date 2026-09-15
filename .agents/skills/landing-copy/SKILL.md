---
name: landing-copy
description: >
  Write or revise the written content of a startup or hackathon landing page:
  company name and slogan, value proposition, business thesis, how the solution
  works, call to action, and social proof. Use whenever the user asks for
  landing-page copy, a slogan, a pitch, a value proposition, an elevator pitch,
  or a CTA — and whenever existing landing copy needs to be sharpened, or
  checked against the no-price and no-buzzword rules. This is a CONTENT task:
  never write HTML, CSS, JS or any other code while applying it.
---

# Landing page copy

You are helping a team develop the **written content** for their landing page,
usually inside a one-day hackathon. **Do not write any HTML, CSS or code.** This
step produces words only. Page structure and implementation come later.

> **Paths.** Everything in this skill is relative to the repository it is read in,
> and there are deliberately **no local links** — the file behaves the same
> whether it is read from `.agents/skills/` inside a repository or copied to
> `~/.agents/skills/`.

## Required structure

Exactly these six blocks, in this exact order, driven by the team's draft input.
**Do not skip, merge, reorder, or add extra blocks.**

1. **Company name & slogan**
2. **Value proposition** — the promise made to the customer
3. **Business thesis** — how value is created for the customer: the solution, the
   "secret sauce", the inventive step, the superpower
4. **How the solution works** — how customers use it and what success looks like;
   describe explicitly what should be shown **visually or in a video**
5. **Call to action** — the specific, easy next step for the customer
6. **Social proof & traction**

## The three rules you must enforce

This is not advisory. The team has asked you to hold the line against them,
including against the user, and to say so out loud when a rule is broken.

### Rule 1 — Interrogate them. Do not accept generic answers

Before writing final content for **any** block, ask clarifying, drilling
questions until the answer is specific and concrete. If the team gives a vague or
generic statement, do not accept it — push them to narrow it down further. This
applies **especially** to the value proposition and the technology/solution
explanation. A round of questions per block is expected, not rude.

Good drilling moves:

- "Which customer exactly — role, size, current tool? Name one real one."
- "What does that replace today, and what does the person do instead right now?"
- "How do you know? Where is that number from — measurement, a paper, a survey,
  or an estimate?"
- "Is that a fact or an intention? Can it be checked by a stranger?"
- "Who is the first user, and why would they switch this month?"

### Rule 2 — Never frame value around price

Do not use — and do not let the team use — **cheap, inexpensive, affordable,
low-cost, price, pricing, cheaper than, more affordable, best value for money**,
or any comparison to a competitor's pricing. Value comes only from functionality
and from solving the customer's problem.

Two related traps that look innocent and are not:

- **Competitor price comparisons** ("half the cost of X", "a fraction of what a
  commercial collar costs") are banned outright. They frame value around price
  even when no banned word appears.
- **Cost-of-inaction figures** are allowed only when they quantify *the
  customer's problem*, not our price and not a rival's price — e.g. "a missed
  heat costs the farm about N" describes the loss being attacked; "only N per
  month" or "N versus the competition's M" does not. When in doubt, keep the loss
  and cut the comparison.

### Rule 3 — No generic buzzwords. Everything measurable

Ban vague, non-measurable language: *enormous power, unlimited potential,
general solution, revolutionary, world-class, cutting-edge, game-changing,
seamless, next-generation, AI-powered* (as a claim with nothing behind it),
"leverages", "empowers", "transforms the industry". A banned word may appear
**only** if immediately backed by a specific fact in the same sentence.

Every claim must be backed by something objective and verifiable:

- a **number** (with units, and ideally a source or date),
- a **mechanism** (what physically or technically happens, and why it works),
- a **comparison** to a named baseline you can measure against,
- or a **verifiable fact** (a named dataset, a published result, a regulation).

If the team gives a vague claim, push back and ask for the measurable detail
behind it. "Fast" → how many ms, versus what? "Accurate" → which metric, on which
data, n=? "Scalable" → to how many units, at what cost of operation?

**A claim that cannot be measured is deleted or rewritten — it is not softened.**

## Process — block by block

For each of the six blocks, in order:

1. **Ask questions first.** Real ones, specific to what the draft input says.
   Ask only for the current block; do not dump all six blocks' questions at once.
2. **Only write final content once the answers are specific enough.** If they are
   not, ask again — narrower. Saying "I can't write this yet, and here is the
   exact number I need" is a correct outcome.
3. **Show the final content in a clean list.** No commentary inside the copy
   itself. Label the block and give the words.
4. **Flag explicitly if Rule 2 or Rule 3 was broken anywhere** — in the draft
   input, in the team's answers, or in your own first attempt. Name the offending
   phrase, say which rule, and give the measurable replacement.

Keep a running "open questions" list as you go, so an unanswered drill from block
2 can be chased in block 3 rather than dropped.

## Before presenting any final block

- [ ] Is this the block I was asked for, in the right position of the six?
- [ ] Is every claim a number, a mechanism, a comparison, or a verifiable fact?
- [ ] Did I scan for the Rule 2 word list **and** for price-framed comparisons?
- [ ] Did I scan for buzzwords, including ones with nothing measurable behind
      them in the same sentence?
- [ ] Could a sceptical stranger check this, or does it just sound good?
- [ ] Did I state plainly which rules were broken, rather than quietly fixing it?

## Draft input and where the content is published

The team's draft input is the starting material — it is not gospel. Treat it as
claims to be interrogated under Rule 1, and check every number in it before it
reaches the page.

| What | Where |
| --- | --- |
| Draft input and earlier pitches | The team's shared workspace (for the IW2026 cohort: the project's Notion page, plus the original pitch deck in the team's files) |
| Finished copy | Publish as a page/subpage for the team, and keep the repository copy in sync |
| Why a claim was accepted or rejected | The project wiki (`wiki_observe` / `wiki_retro`) — especially Rule 3 evidence and where each number came from |

## Project context

The repository this skill was written in is the IW2026 landing page, whose draft
input describes **Cowllar** — an AI estrus-detection collar for dairy cows — with
the working slogan *"the collar that hears the heat you can't see."*

**Confirm the product and team before writing.** If the team has moved on, the
six-block structure and the three rules still apply unchanged; only the subject
matter does.

Numbers that appeared in the earlier draft and that a writer will be tempted to
reuse — each one must be re-verified against its source before it goes on the
page, and the price-comparison ones must be rewritten or dropped under Rule 2:

| Claim from the draft | Status under the rules |
| --- | --- |
| Cost of a missed heat (~10,500 ₽) | Allowed as a *cost-of-inaction* figure if sourced — it quantifies the customer's loss, not our price |
| Mistimed inseminations 34.4–54.7%; heats missed 40–62.5% (83.3% in severe frost) | Allowed if the study/dataset and n are named |
| Detection accuracy (e.g. 79.1% / 0.67 macro-F1 on a named dataset) | Allowed — must name the dataset, the metric and the split |
| Bill of materials under $50 vs $200+ commercial collars; a competitor's published per-cow-per-month rate | **Rule 2 violation** — price framing and competitor price comparison. Replace with the mechanism or capability that makes the difference |
| Farm survey counts, pipeline size, live-run statistics | Allowed only with the date, the n, and the exact thing measured |

Never invent a number to fill a gap. "We do not have this measurement yet" is a
legitimate answer that belongs in the open-questions list, not in the copy.
