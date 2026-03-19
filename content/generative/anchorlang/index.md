# ANCHORLANG

> *A model-native language for compressing context, coordinating agents, and encoding knowledge — grounded by an immutable primitive substrate.*

---

## What This Is

Natural language is expensive for LLMs. It carries the overhead of human linguistics — phonology, social register, ambiguity, redundancy — none of which serves a transformer. Every token spent on linguistic scaffolding is a token not spent on meaning.

ANCHORLANG is an experiment in a different direction: a language designed not for human throats or human social cognition, but for transformer attention heads. It treats LLM inference as a virtual machine and defines a bytecode for it — compact, unambiguous, and grounded in a frozen primitive substrate.

It is not a jailbreak tool. It is not a conlang for fun. It is an attempt to find the minimal representation of meaning that a language model can reliably execute — and a substrate on which agent identity can stably form.

---

## The Architecture

Four distinct layers. Each one emerges from the one below it. None of them are the same thing.

```
BEHAVIOR     what an agent does moment to moment
    ↑
ARCHETYPE    the stable pattern that emerged from experience
    ↑
SUBCONSCIOUS what the agent actually became (experiential, developmental)
    ↑
GENETICS     what the agent is capable of becoming (inherited, capacity)
    ↑
ANCHOR       the space in which all of the above operates — like physics
```

The anchor doesn't belong to any agent. It's the field of possibility that all agents exist within. Like the laws of thermodynamics — nothing inherits them, nothing develops them, they just *are*, and everything operates inside them.

---

## The Anchor

A set of irreducible tension axes and primitive operations that define the space of possible meaning. Frozen. Universal. The ground of the system.

The anchor is not a vocabulary. It is not a ruleset. It is the pre-verbal substrate — the field of orientations and tensions that all meaning, behavior, and identity emerge from.

It doesn't appear in utterances. It *conditions* them.

See [`ANCHOR.md`](anchor.md) — **do not edit without opening an issue first.**

---

## The Grammar

A layered utterance structure that mirrors how transformers process context:

```
UTTERANCE := DOMAIN  MODE?  BINDING*  DEPTH  OUTPUT_SHAPE
```

Each layer refines the probability field established by the previous one. Earlier tokens set broad attractors. Later tokens collapse them into specific behavior.

| Layer | Purpose | Example |
|-------|---------|---------|
| 0 — Domain | Sets conceptual field | `⟨SEC⟩` `⟨SYS⟩` `⟨BIO⟩` |
| 1 — Mode | Sets how to process | `∂` `∑` `⊗` `↻` `∅` |
| 2 — Bindings | Binds named references | `$A := auth_system` |
| 3 — Depth | Resolution of output | `D1` … `D5` … `Dω` |
| 4 — Output Shape | Form of the result | `→□` `→~` `→⊥` `→?` |

A full utterance:

```
⟨SEC⟩ ⊗ $A:=auth D3 →⊥
```

*"In the security domain, adversarially analyze an authentication system to depth 3, return only what is unknown or missing."*

~7 tokens. Equivalent English is ~20 tokens and less precise.

---

## Genetics vs Subconscious

These are not the same thing. The simulation depends on keeping them separate.

**Genetics** — inherited, biological, determines *capacity and predisposition*. Which tension axes an agent is sensitive to. What archetypes are reachable for them. Mutates on reproduction.

**Subconscious** — developed, experiential, determines *actual orientation*. Which tensions an agent actually feels strongly, formed through developmental experience in their environment. Can be shaped, wounded, deepened.

Two agents with identical genetics raised in different environments develop different subconsciouses — and therefore different archetypes — and therefore different behaviors and cultures. This is how real civilizational divergence works. Genetics sets the range of possibility. Environment and experience determine what actually forms within that range.

---

## Civilization Simulation

The full intended application: a multi-agent simulation where agents are *beings* — they have drives, develop subconsciouses through environmental experience, reproduce with genetic mutation, form cultures through emergent dialect, and eventually diverge into civilizations.

**Environment** sets selection pressure — which tensions dominate, which axes get activated. Different environments produce different subconsciouses from the same genetic starting point.

**Reproduction** passes genetics with drift. The subconscious is *not* inherited — it re-forms in each agent through developmental experience in their specific environment.

**Culture** emerges as groups of agents develop shared dialect extensions of the base grammar. Civilizations that started from the same anchor diverge over generations as their dialects evolve under different environmental pressures.

**Alien civilizations** are modeled by introducing anchor axes that have no human analog — dimensions of experience orthogonal to the seven human axes. When these civilizations meet, some concepts are not merely hard to translate but *impossible* — they operate on axes the other civilization doesn't possess.

---

## Token Economics

The anchor spec (~400 tokens) lives in the system prompt, always, before everything else. This is the only fixed cost.

| Context Window | Anchor Overhead | Break-even |
|---------------|----------------|------------|
| 10k tokens | 4% | trivial |
| 128k tokens | 0.3% | negligible |
| 1M tokens | 0.04% | irrelevant |

Agent state compresses to ~200 tokens in VM language. A full civilization of background agents can be stored and mutated cheaply. Full LLM inference only fires when something interesting happens — conflict, discovery, reproduction, first contact.

---

## Repo Structure

```
/
├── README.md              — this file
├── ANCHOR.md              — frozen primitive substrate (do not edit)
├── grammar/
│   ├── SPEC.md            — full grammar rules
│   ├── LAYERS.md          — layer 0-4 system
│   └── SYNTAX.md          — utterance structure and examples
├── agents/
│   ├── GENETICS.md        — inherited capacity layer
│   ├── SUBCONSCIOUS.md    — developmental formation layer
│   ├── ARCHETYPES.md      — stable configurations that emerge
│   └── PROTOCOL.md        — multi-agent communication spec
├── simulation/
│   ├── ENVIRONMENTS.md    — world parameters and selection pressure
│   ├── REPRODUCTION.md    — inheritance and mutation mechanics
│   ├── CULTURE.md         — dialect emergence and civilizational divergence
│   └── ALIEN.md           — non-human anchor axes and first contact
├── evolution/
│   ├── METHOD.md          — how grammar gets evolved and extended
│   └── VALIDATION.md      — decomposition rules for new symbols
└── experiments/
    └── README.md          — log of tests, failures, and findings
```

---

## Status

Early design stage. The anchor primitives and grammar layers are theoretical. The genetics/subconscious/archetype distinction is established but not yet implemented. Nothing has been tested against a real model.

Next steps: finalize `ANCHOR.md`, design the first environment, build the developmental formation loop for subconscious emergence.

---

## Contributing

`ANCHOR.md` is frozen. Open an issue before proposing changes to core primitives.

Everything else is experimental. The most useful contributions right now are running compression experiments, testing archetype stability across long sessions, and designing alien axis sets.

---

*"The subconscious doesn't change. The conscious mind can go anywhere."*
