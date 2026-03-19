---
title: Token Economics
tags: [llm, compression, anchorlang, generative]
---

# Token Economics

Context windows are finite. Every token has a cost. Token economics is the discipline of spending them deliberately.

---

## The Basic Accounting

A token is the atomic unit of LLM processing. Roughly 0.75 words in English. Every token in context consumes memory, compute, and attention capacity. The model's ability to reason degrades as context fills — not linearly, but it degrades.

Most prompts are inefficient. Natural language carries significant overhead — articles, prepositions, social hedging, redundant restatement — that consumes tokens without adding meaning. A well-structured prompt can often convey the same intent in 30-50% fewer tokens.

---

## The Anchor Investment

The [[anchorlang/anchor]] spec costs ~400 tokens upfront, loaded into the system prompt before everything else.

This is an investment, not just overhead. The anchor enables a compressed grammar that pays back the investment across the session:

| Context Window | Anchor Cost | Break-even compression |
|---------------|-------------|----------------------|
| 10k tokens | 4% | ~4% compression of remaining content |
| 128k tokens | 0.3% | trivial |
| 1M tokens | 0.04% | irrelevant |

For any session with substantial domain content, the anchor pays for itself quickly.

---

## The Compression Mechanics

Natural language instruction:
```
"Analyze the authentication system for security vulnerabilities,
focusing on what might be missing or unknown. Go into depth,
consider edge cases, and structure your output clearly."
~30 tokens
```

VM grammar equivalent:
```
⟨SEC⟩ ⊗ $A:=auth D3 →⊥
~7 tokens
```

Same intent. ~75% reduction. The savings compound across a long session with many instructions.

---

## Agent State Compression

In multi-agent systems, agents need to pass state to each other. In natural language this is expensive — verbose summaries, context reconstruction, repeated definitions.

In VM grammar, an agent's full operational state compresses to ~200 tokens. Passing state between agents becomes cheap. An entire civilization of background agents can be stored and mutated without burning significant context budget.

Full LLM inference only fires when something semantically rich needs to happen — conflict, discovery, reproduction, first contact. Everything else runs on compressed state.

---

## The Real Constraint

Token count matters less than *position*. Transformers weight earlier tokens more heavily for establishing persistent context. The anchor must always be first — before persona, before domain, before task.

A 400-token anchor at position 0 has more influence on model behavior than a 4000-token instruction block at position 50k. Position is the real scarce resource.

---

## Connections

- [[generative/anchorlang/concepts/language-as-vm]]
- [[generative/anchorlang/concepts/attractors-vs-instructions]]
- [[generative/anchorlang/anchor]]
