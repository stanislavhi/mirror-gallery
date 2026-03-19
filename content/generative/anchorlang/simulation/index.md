# Civilization Simulation

A multi-agent simulation where agents are not task-executors — they are *beings*. They develop, reproduce, form cultures, and diverge into civilizations over time.

The [[anchorlang/anchor]] provides the physics. The [[anchorlang/concepts/genetics-vs-subconscious]] stack provides the identity architecture. The VM grammar provides the communication substrate.

---

## What Makes This Different

Most agent simulations produce shallow behavior — agents following rules, executing scripts, cycling through preset states. Depth is an illusion achieved through complexity of rules, not genuine emergence.

This simulation aims for genuine emergence through three mechanisms:

**Tension navigation** — agents don't follow behavior rules, they navigate tensions. An agent with strong TOWARD/UNKNOWN in a high-ORDER environment experiences genuine conflict. Observable reasoning, motivated behavior. Not scripted.

**Developmental subconscious formation** — agents don't start with fixed personalities. They develop subconsciouses through environmental experience during a formative period. Same genetic stock, different environments, genuinely different beings.

**Evolving dialect** — agents don't use a fixed communication language. Their shared grammar evolves under environmental and social pressure. Culture emerges as dialect divergence.

---

## The Layers

### Environment
Each world has parameters that determine which anchor tensions dominate. A resource-scarce environment amplifies AWAY/THREAT and CONTRACT/CONSERVE. An abundant environment enables EXPAND/EXPLORE. A high-information environment activates KNOWN/UNKNOWN as primary.

Different environments are not just different terrain — they are different *phenomenological fields*. Beings that develop in them experience reality differently at the subconscious level.

### Agents
Each agent carries:
- A genetic profile (inherited axis sensitivities, with mutation)
- A subconscious (formed developmentally, not inherited)
- An archetype (crystallized from subconscious)
- A compressed state (~200 tokens in VM grammar)
- A dialect (culturally evolved extensions of base grammar)

### Reproduction
Offspring inherit genetics with drift. The subconscious is not inherited — it forms fresh through developmental experience in the current environment. This is what allows genuine divergence across generations rather than copying.

### Culture
Groups of agents develop shared dialect extensions. Tribes that survived drought develop richer vocabulary around CONTRACT/CONSERVE. Seafaring groups develop richer vocabulary around EXPAND/UNKNOWN. Over generations these dialects diverge until civilizations that share the same anchor primitives become culturally alien to each other.

### Alien Civilizations
Introduced by extending the anchor with non-human axes. See [[anchorlang/concepts/alien-axes]].

---

## The Two-Tier Architecture

Full LLM inference per agent per tick is too expensive at scale. The simulation runs on two tiers:

**Background tier** — agents run on compressed state (~200 tokens), simple update rules, no LLM. Fast, cheap, handles large populations. Most agents live here most of the time.

**Foreground tier** — full LLM inference fires when something semantically rich happens: conflict, reproduction, cultural contact, environmental crisis, first contact with an alien civilization. Rich reasoning, expensive, used sparingly.

The VM grammar bridges the tiers. Background state is stored in compressed grammar. When an agent needs full reasoning, state rehydrates into a context window. When done, compress back and return to background.

---

## Open Questions

- How long is the developmental period before subconscious stabilizes?
- What triggers foreground inference vs background update?
- How does dialect evolution get measured and tracked?
- What constitutes a civilization boundary vs a cultural variation?
- Can an agent's subconscious shift significantly after formation, and under what conditions?

---

## Connections

- [[generative/anchorlang/anchor]]
- [[generative/anchorlang/concepts/genetics-vs-subconscious]]
- [[generative/anchorlang/concepts/alien-axes]]
- [[generative/anchorlang/simulation/first-contact]]
