---
title: Language as VM
tags: [language, llm, anchorlang, generative]
---
# Language as VM

The core idea: a language whose utterances don't *describe* — they *execute*. The runtime is LLM inference itself.

Traditional prompting treats language as description. You describe what you want, the model interprets, produces output. The language is a vehicle for intent.

A language VM treats language as bytecode. Utterances are instructions. The model is the processor. Execution is inference.

---

## Why This Is Different

In descriptive prompting, meaning is reconstructed by the model from natural language. There's translation overhead — human linguistic structure → model processing → output. Ambiguity lives at every step.

In a language VM, tokens are chosen not to describe concepts but to *activate* them directly in the model's probability space. The token is the concept. No translation layer.

The compression is a side effect: native model-space communication carries less overhead than translating from human linguistic structure.

---

## The Runtime

LLM inference is not a sequential processor. It doesn't execute instructions one at a time with a program counter. It processes context as a **field** — all tokens simultaneously, each attending to all others, collapsing into output probability distributions.

This means the VM metaphor requires reframing:

- **Opcodes** are not sequential commands — they are *attractors* that shape the probability field
- **Execution** is not a loop — it is a single forward pass that resolves the entire field at once
- **State** is not a register — it is the accumulated context window
- **Branching** is probabilistic, not deterministic

A language VM for LLMs is therefore closer to a **field specification language** than a traditional instruction set.

---

## The Grammar

See [[anchorlang/index]] for the full design.

The key insight driving the grammar: token *position* matters as much as token *identity*, because attention is causal — earlier tokens condition all later ones. The grammar exploits this:

```
DOMAIN → MODE → BINDINGS → DEPTH → OUTPUT_SHAPE
```

Each layer narrows the field established by the previous. By the time the model reaches the output shape token, most of the probability mass has already been directed.

---

## Connections

- [[generative/anchorlang/concepts/attractors-vs-instructions]] — the mechanism behind why this works
- [[generative/anchorlang/concepts/token-economics]] — the compression payoff
- [[generative/anchorlang/anchor]] — the frozen primitive substrate the VM operates on
