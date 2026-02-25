# ANCHORLANG

> *A model-native language for compressing context, coordinating agents, and encoding knowledge — grounded by an immutable primitive core.*

---

## What This Is

Natural language is expensive for LLMs. It carries the overhead of human linguistics — phonology, social register, ambiguity, redundancy — none of which serves a transformer. Every token spent on linguistic scaffolding is a token not spent on meaning.

ANCHORLANG is an experiment in a different direction: a language designed not for human throats or human social cognition, but for transformer attention heads. It treats LLM inference as a virtual machine and defines a bytecode for it — compact, unambiguous, and grounded in a frozen set of semantic primitives.

It is not a jailbreak tool. It is not a conlang for fun. It is an attempt to find the minimal representation of meaning that a language model can reliably execute.

---

## Core Concepts

### The Anchor

A set of ~50 immutable primitives that form the irreducible foundation of the language. Every extension, dialect, and evolved symbol must decompose back into anchor primitives to be valid. The anchor never changes. It is the subconscious of the system — invisible during operation, present in everything.

See [`ANCHOR.md`](./ANCHOR.md) — **do not edit without opening an issue first.**

### The Grammar

A layered utterance structure that mirrors how transformers process context:

```
UTTERANCE := ANCHOR_DOMAIN  MODE?  BINDING*  DEPTH  OUTPUT_SHAPE
```

Each layer refines the probability field established by the previous one. Earlier tokens set broad attractors. Later tokens collapse them into specific behavior.

| Layer | Purpose | Example |
|-------|---------|---------|
| 0 — Domain Anchor | Sets conceptual field | `⟨SEC⟩` `⟨SYS⟩` `⟨BIO⟩` |
| 1 — Mode Operator | Sets how to process | `∂` `∑` `⊗` `↻` `∅` |
| 2 — State Bindings | Binds named references | `$A := auth_system` |
| 3 — Depth | Resolution of output | `D1` … `D5` … `Dω` |
| 4 — Output Shape | Form of the result | `→□` `→~` `→⊥` `→?` |

A full utterance:

```
⟨SEC⟩ ⊗ $A:=auth D3 →⊥
```

*"In the security domain, adversarially analyze an authentication system to depth 3, return only what is unknown or missing."*

~7 tokens. Equivalent English is ~20 tokens and less precise.

### Evolution

The grammar above the anchor layer is not designed — it is *evolved*. A sender/receiver loop under token budget pressure discovers which encodings reliably survive compression. Symbols that generalize become vocabulary. Patterns that generalize become grammar rules.

Domain-specific dialects emerge naturally from this process. A security agent and a code agent share the anchor and core grammar but develop richer vocabularies in their own domains.

### Multi-Agent Protocol

Agents communicate in this language instead of verbose English summaries. Compressed state passes between agents at a fraction of the token cost. Coordination primitives (`⟨SYNC⟩`, `⟨FORK⟩`, `⟨HALT⟩`) emerge from the evolution process rather than being hand-designed.

### Knowledge Compression

Codebases and knowledge bases are encoded as semantic graphs in the grammar — not summarized in English, but represented as compressed relational structures that preserve the meaning and dependencies that matter for reasoning.

```
⟨SYS⟩ $AUTH:=auth.py
  ∂[$AUTH] → {$LOGIN fn, $TOKEN fn, $GUARD middleware}
  $LOGIN ⊗ $GUARD → ⊥{rate_limit, session_expiry}
  $TOKEN →□ {JWT, exp:24h, sig:RS256}
```

---

## Token Economics

The anchor spec (~700 tokens) lives in the system prompt, always, before everything else. This is the only fixed cost.

| Context Window | Anchor Overhead | Break-even compression ratio |
|---------------|----------------|------------------------------|
| 10k tokens | 7% | ~12% compression of remaining content |
| 128k tokens | 0.55% | trivial |
| 1M tokens | 0.07% | negligible |

For sessions with substantial domain content, the anchor pays for itself quickly. The longer and more complex the session, the better the return.

---

## Design Principles

**The anchor is the constitution.** It can be interpreted but not amended casually. All meaning traces back to it.

**Order is execution.** Token position determines processing order. Earlier tokens condition all later ones. The grammar exploits this — it is not arbitrary syntax.

**Symbols are attractors, not labels.** A good symbol doesn't describe a concept, it *activates* the probability cluster around it. Discovery matters more than design.

**Evolution over specification.** The grammar above anchor level should be found, not invented. Resist the urge to design vocabulary from first principles.

**Hybrid is fine.** Natural language islands inside compressed frames are valid. The goal is token efficiency and reasoning precision, not purity.

---

## Repo Structure

```
/
├── README.md              — this file
├── ANCHOR.md              — frozen core primitives (do not edit)
├── grammar/
│   ├── SPEC.md            — full grammar rules
│   ├── LAYERS.md          — layer 0-4 system
│   └── SYNTAX.md          — utterance structure and examples
├── evolution/
│   ├── METHOD.md          — how grammar gets evolved and extended
│   ├── VALIDATION.md      — decomposition rules for new symbols
│   └── DIALECTS.md        — domain-specific extensions
├── agents/
│   ├── PROTOCOL.md        — multi-agent communication spec
│   ├── COORDINATION.md    — fork, sync, halt patterns
│   └── DRIFT.md           — detecting and correcting grammar drift
├── compression/
│   ├── CODEBASE.md        — encoding knowledge graphs
│   └── EXAMPLES.md        — real compression examples with token counts
└── experiments/
    └── README.md          — log of tests, failures, and findings
```

---

## Status

Early design stage. The anchor primitives and grammar layers are theoretical. Nothing has been tested against a real model yet.

The next step is defining `ANCHOR.md` and running the first compression experiments to see whether the attractor hypothesis holds in practice.

---

## Contributing

`ANCHOR.md` is frozen. Open an issue before proposing any change to core primitives — changes require justification in terms of what decomposition becomes impossible without them.

Everything else is experimental. Break things. Log what you find in `experiments/`.

---

*"The subconscious doesn't change. The conscious mind can go anywhere."*