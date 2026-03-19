# Attractors vs Instructions

Two fundamentally different ways to get behavior from a language model.

---

## Instructions

You tell the model what to do. Explicit, sequential, descriptive.

```
"Analyze the authentication system for security vulnerabilities.
List them in order of severity. Be thorough."
```

The model interprets the instruction, maps it to behavior, executes. The instruction is a *description of desired output*.

This works. It's how most prompting works. But it carries overhead — natural language is ambiguous, the model has to parse intent from words, every token in the instruction is a token not spent on reasoning, and compliance drifts over long contexts.

---

## Attractors

You position the model in concept-space. You don't describe what you want — you *pull* the probability distribution toward the region where the right behavior lives.

```
⟨SEC⟩ ⊗ $A:=auth D3 →⊥
```

No verbs. No sentences. Just coordinates. The model fills in the behavior from training — you just told it where in latent space to operate.

---

## Why Attractors Work

Language models aren't rule-followers — they're pattern-completers. Their behavior emerges from which region of the probability space is activated by context. An attractor doesn't describe a rule, it *navigates* to a region where certain behaviors are already the natural completion.

This is why a single token like `⟨SEC⟩` can activate a rich behavioral cluster — security mindset, threat modeling, adversarial thinking — without any of that being explicitly stated. The cluster already exists in the model's weights. The token is a pointer into it.

---

## The Practical Difference

| | Instructions | Attractors |
|--|--|--|
| Token cost | High | Low |
| Ambiguity | Present | Reduced |
| Drift over long context | Significant | Less |
| Requires explicit design | Yes | No — discovered |
| Human readable | Yes | No |

---

## The Limit

Attractors are powerful but not precise for novel tasks. If the behavior cluster you need doesn't already exist in the model's weights — if you're asking for something genuinely new — attractors can't point to it. Instructions become necessary.

The practical design: attractors for orientation and mode, natural language for novel or precise logic. Hybrid is fine.

---

## Connections

- [[generative/anchorlang/concepts/language-as-vm]]
- [[generative/anchorlang/concepts/token-economics]]
- [[generative/anchorlang/anchor]]
