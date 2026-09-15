# Agent skills for this repository

Skills an agent loads when working in this repo. Pi discovers
`.agents/skills/<name>/SKILL.md` in the working directory and its ancestors up to
the git root (see the Skills section of the Pi docs), as do other harnesses that
follow the Agent Skills standard.

| Skill | When it applies |
| --- | --- |
| [`landing-copy`](skills/landing-copy/SKILL.md) | Any task that produces or revises the landing page's **written content** — slogan, value proposition, business thesis, how it works, CTA, social proof. It carries the two non-negotiables: never frame value around price, and never let a claim through that is not measurable |

## These are location-independent

The `SKILL.md` files contain **no local (relative) links**. Repository files are
named in code spans instead, which an agent resolves against the repository it is
working in. That means the skill can be copied **unchanged** into the global
skill directory:

```bash
cp -r .agents/skills/* ~/.agents/skills/
```

and it will read the same in both places. Keep it that way — a relative link
resolves inside this repo and breaks the moment the file is copied out.

## Why the copy rules have a skill

Landing-page copy drifts toward adjectives: *revolutionary*, *seamless*,
*cheaper than the alternative*. Each of those is easy to write and impossible to
check, and a reviewer cannot catch them consistently under time pressure in a
one-day hackathon. Encoding the rules as a skill means they are applied while the
content is being written — as questions asked of the team, not as edits made
afterwards.

The short version, for humans reading this: **a claim without a number, a
mechanism, a comparison or a verifiable fact does not go on the page, and no
sentence may compare our price to anyone's.**
