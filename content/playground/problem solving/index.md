---
title: Problem Solving Framework
tags: [algorithms, problem-solving, cs]
---

# Problem Solving Framework

> [!tip] How to use this
> 1. **Understand** (Phase 1–2): Define the problem, classify the structure, brute force it.
> 2. **Analyze** (Phase 3): Ask the core optimization questions to derive the right technique.
> 3. **Implement** (Phase 4): Use the checklists to avoid common bugs.
> 4. **Validate** (Phase 5): Verify correctness, complexity, and edge cases.
>
> Resist the urge to pattern-match. Let the questions guide you to the technique.

---

## Phase 1 — Understand the Problem

### 1.1 Define Input & Output

| Question | What to determine |
|---|---|
| What is the input? | Data structure, size constraints, value constraints, special properties (sorted? unique? positive?) |
| What is the output? | Single value, multiple values, modified input, new structure, boolean? |
| What are the constraints? | n up to 10^5? Integers only? No duplicates? Time limit? |

### 1.2 Map Edge Cases

Before writing any code, enumerate these:

- [ ] Empty input
- [ ] Single element
- [ ] All identical elements
- [ ] Already-sorted / reverse-sorted input
- [ ] Minimum and maximum size inputs
- [ ] Boundary / overflow values

### 1.3 Solve by Hand First

> [!important] Rule
> Work through 2–3 small examples manually. Note **exactly** what steps you take.
> The pattern in your manual steps is almost always the algorithm.

### 1.4 Classify the Underlying Structure

> [!warning] Most frameworks skip this step
> Identify the mathematical object **before** choosing a technique. The derivation paths only make sense once you know what you're working with.

```
Input signal                          → Underlying structure
─────────────────────────────────────────────────────────────
Array, string, sequence               → Sequence
Cells on a grid                       → Graph (implicit)
Connections between nodes             → Graph (explicit)
Hierarchy, subtree queries            → Tree
Overlapping subproblems               → DAG of states
Candidate answer to verify            → Ordered search space
Optimal local choices                 → Greedy structure
Combinations / subsets                → Combinatorial space
Intervals                             → Interval structure
```

| Underlying structure | Relevant techniques |
|---|---|
| Sequence | Two pointers, sliding window, binary search, DP, prefix sums |
| Graph (implicit/explicit) | BFS, DFS, Dijkstra, Union-Find, topological sort |
| Tree | DFS, BFS, DP on tree, segment tree |
| DAG of states | Dynamic programming |
| Ordered search space | Binary search on the answer |
| Greedy structure | Greedy with proof |
| Combinatorial space | Backtracking, bitmask DP |
| Interval structure | Sort + sweep, segment tree |

---

## Phase 2 — Brute Force First

> [!warning] Never skip this
> The brute force clarifies what you are optimizing *away from*. You cannot optimize what you haven't defined.

| Question | Purpose |
|---|---|
| What is the most direct solution, ignoring efficiency? | Defines the baseline — nested loops, check-everything approach |
| What is the time complexity? | O(n²)? O(n³)? O(2^n)? Sets the target for improvement |
| What computations repeat? | The repeated work is your **optimization target** |
| What decisions are made at each step? | Identifies the state space and decision points |

> [!note] Key insight
> Write the brute force, even mentally. The repeated computation you identify here is what every optimization technique is eliminating.

---

## Phase 3 — Derive the Technique

Answer these questions in order. The technique will emerge — do not guess it upfront.

### Core Optimization Questions

| Question | If YES | If NO |
|---|---|---|
| Am I computing the same subproblems repeatedly? | Cache them → DP or memoization | Caching won't help |
| Do I need info from **both** directions (before AND after position i)? | Two-pass precomputation or two pointers | Proceed |
| Can I make a correct decision with only partial information? | Greedy or two-pointer | May need DP or exhaustive search |
| Is the answer space ordered / monotonic? | Binary search on the answer | Direct search or DP |
| Does the problem involve a contiguous subarray/window? | Sliding window | Pointer-based approach |
| Do I need min/max over a range dynamically? | Monotonic stack/queue or segment tree | Simple scan |
| Do I need to try all combinations/subsets? | Backtracking with pruning | Greedy or direct |

---

## Phase 3 (continued) — Technique Derivation Paths

### Path A — Dynamic Programming

> [!abstract] Trigger
> - You are computing the same subproblems repeatedly, **AND**
> - The answer at state `i` depends on answers at previous states.

1. **Define the state**: what does `dp[i]` (or `dp[i][j]`) represent exactly?
2. **Identify base cases**: what states can you answer directly?
3. **Write the recurrence**: how does `dp[i]` depend on previous states?
4. **Choose** bottom-up (tabulation) or top-down (memoization).
5. **Check** if you only need the previous row/element → space optimize.

> [!bug] Common trap
> Jumping to implementation before the recurrence is clear.
> Always write out `dp[i] = f(dp[?])` explicitly before coding.

---

### Path B — Two Pointers

> [!abstract] Trigger
> - You need information from both ends/directions, **AND**
> - You do NOT need to store all values — a comparison suffices, **AND**
> - You can make progress by moving one pointer at a time.

1. Place pointers at both ends (or both at start for same-direction).
2. At each step: compare values at the two pointers.
3. Identify which pointer is the **limiting factor** — which side constrains the answer?
4. Process/record the answer for the limiting side.
5. Move the limiting pointer inward.
6. Continue until pointers meet.

> [!note] Key insight
> You move the **limiting** pointer because you've already extracted everything useful from that side. The non-limiting side still has potential — leave it.

---

### Path C — Binary Search

> [!abstract] Trigger
> - The search space is ordered / monotonic, **OR**
> - You can define a predicate `P(x)` that is `false` for all `x < answer` and `true` for all `x >= answer`, **AND**
> - You can verify a candidate answer faster than finding it directly.

**Two forms:**

| Form | Description |
|---|---|
| Classical (find value) | Search a sorted array for a target. `lo`/`hi` narrow to the element. |
| Search on the answer | The "array" is the space of possible answers. You binary search on the answer value, verifying feasibility at each midpoint. |

**Steps:**
1. Define `lo` and `hi` as the bounds of your search space.
2. Define the predicate: what does it mean for a candidate `mid` to be feasible?
3. Verify the predicate is **monotonic** (once true, always true going right — or vice versa).
4. Binary search: if `predicate(mid)` is true, record `mid` and move right boundary; else move left.
5. Return the boundary value.

> [!tip] Classic tell for "search on the answer"
> Problem asks for *"minimum X such that Y is possible"* or *"maximum X such that Z holds"*.
> The verification function (can we achieve X?) is much cheaper than finding X directly.

---

### Path D — Sliding Window

> [!abstract] Trigger
> - Problem involves a contiguous subarray or substring, **AND**
> - You can define a window validity condition with clear expand/contract behavior.

| Variant | When to use |
|---|---|
| Fixed size k | Window size is given. Compute first window, then slide — add right element, remove left. |
| Variable size | Window grows until invalid, shrinks until valid. Track best valid window. |

**Steps:**
1. Initialize `left = 0`, `right = 0`, and window state tracking variables.
2. Expand right: add `arr[right]` to window state.
3. While window is **invalid**: shrink left, remove `arr[left]` from state, `left++`.
4. Record answer from current valid window.
5. `right++`, repeat.

> [!bug] Common trap
> Updating the answer at the wrong point in the loop.
> Record the answer **after** the shrink loop, when the window is guaranteed valid.

---

### Path E — Greedy

> [!abstract] Trigger
> - At each step, there is a locally optimal choice that is **provably** globally optimal.
> - You can commit to a decision without ever needing to backtrack.

1. Identify the greedy choice: what is the best option at each step?
2. **Prove** the greedy choice property: why does local optimum lead to global optimum?
3. **Prove** optimal substructure: after a greedy choice, remaining subproblem has the same structure.
4. Implement: sort if needed, then make greedy choices linearly.

> [!danger] Greedy vs DP warning
> If you cannot **prove** the greedy choice property, do NOT use greedy — use DP.
> A greedy that works on examples but lacks a proof will fail on edge cases.

---

### Path F — Prefix Sums / Precomputation

> [!abstract] Trigger
> - You need range aggregate queries (sum, product, XOR, count) repeatedly, **AND**
> - The input does not change after preprocessing.

1. Build prefix array: `prefix[i] = aggregate of arr[0..i-1]`.
2. Answer range query `[l, r]`: `result = prefix[r+1] - prefix[l]`.
3. For 2D problems: build 2D prefix table and use inclusion-exclusion.

---

### Path G — Monotonic Stack / Queue

> [!abstract] Trigger
> - You need the **next greater/smaller element** for each position, **OR**
> - You need the **maximum/minimum in a sliding window** of size k.

| Variant | Structure and behavior |
|---|---|
| Next greater element | Monotonic **decreasing** stack. Pop when current element is greater than top — popped element found its answer. |
| Sliding window max/min | Monotonic **deque**. Remove from front when outside window; remove from back when current violates monotonicity. |

---

### Path H — Backtracking

> [!abstract] Trigger
> - You need to enumerate all valid combinations, subsets, or permutations, **AND**
> - You can detect invalid partial solutions early (pruning condition exists).

1. Define the state: what have you chosen so far?
2. Define the base case: when is the state a complete valid solution?
3. At each step: try each candidate choice.
4. **Prune**: skip choices that violate constraints early.
5. Recurse, then undo the choice (backtrack).

> [!note] Pruning is everything
> Without pruning, backtracking is complete enumeration (exponential).
> Every constraint you can check early is an opportunity to prune.

---

## Phase 4 — Implementation Checklists

### General Rules

- Choose a consistent interval convention **before** writing code: `[lo, hi]` closed, or `[lo, hi)` half-open. Never mix.
- Name loop variables to reflect their meaning, not just `i`, `j`.
- Write the loop termination condition first, then the body.
- Update state variables in the correct order (order matters in-place).
- Test the invariant after each iteration mentally.

---

### Two Pointers

- [ ] `lo` starts at 0, `hi` starts at `n-1`.
- [ ] Loop condition: `while (lo < hi)` — not `<=`, unless the problem requires.
- [ ] Each iteration must move **at least one** pointer (prevents infinite loop).
- [ ] Answer is recorded **before** moving pointers.
- [ ] Verify: both pointers eventually meet or cross for all inputs.

---

### Binary Search

- [ ] Define `lo` and `hi` to **include** all possible answers.
- [ ] `mid = lo + (hi - lo) / 2` — never `(lo + hi) / 2` (overflow risk).
- [ ] Decide: are you finding leftmost true, rightmost false, or exact match?
- [ ] After loop: check if `lo` (or `hi`) is actually a valid answer — don't assume.
- [ ] Verify termination: each iteration must strictly reduce the search space.

> [!tip] Binary search invariant
> At all times: **the answer lies within `[lo, hi]`**.
> Every update to `lo` or `hi` must preserve this invariant.
> When the loop ends, `lo == hi == the answer`.

---

### Sliding Window

- [ ] Initialize all window state variables before the loop.
- [ ] Decide: update answer inside or after the shrink loop?
- [ ] Ensure `left` never passes `right`.
- [ ] For string problems: use a frequency map, not a sorted structure (O(1) updates).
- [ ] After loop: check if a final window needs to be recorded.

---

### Dynamic Programming

- [ ] Write out `dp[i] = f(dp[...])` explicitly before coding.
- [ ] Initialize **all** base cases, including `dp[0]` and boundary indices.
- [ ] Ensure iteration order matches dependency direction.
- [ ] For 2D DP: fill row-by-row or column-by-column consistently.
- [ ] If space-optimizing: only update in-place if you won't overwrite values you still need.

---

### Backtracking

- [ ] Every recursive call must either reach base case or reduce problem size.
- [ ] Undo **exactly** what you did before the recursive call — nothing more, nothing less.
- [ ] Pruning conditions are checked **before** recursing, not after.
- [ ] If tracking a running total, update before recursing and restore after.

---

## Phase 5 — Validate

### Correctness

- Does it handle all edge cases from Phase 1?
- Can you trace through 2 examples and verify the output?
- Can you state the invariant your algorithm maintains at each step?

### Complexity

| Analysis target | How to compute |
|---|---|
| Time complexity | Count the loops. Count recursive calls × work per call. |
| Space complexity | Count arrays allocated. Count recursion stack depth. |
| Can you do better? | Have you answered all Phase 3 questions? Is there an unused optimization? |

### The Proof Questions

- **Greedy**: why does the locally optimal choice never need to be undone?
- **DP**: why does the recurrence correctly encode the problem?
- **Two pointers**: why is it safe to move the pointer you're moving, and not the other?
- **Binary search on answer**: why is the predicate monotonic?

---

## Quick Reference — Decision Tree

| Signal in the problem | Key question to ask | Technique |
|---|---|---|
| Repeated subproblems, overlapping structure | Can I cache subproblem results? | [[#Path A — Dynamic Programming\|DP (Path A)]] |
| Need info from both ends / directions | Can I avoid storing all values? | [[#Path B — Two Pointers\|Two Pointers (Path B)]] |
| "Minimum X such that Y" or "Maximum X such that Z" | Can I verify a candidate answer cheaply? | [[#Path C — Binary Search\|Binary Search (Path C)]] |
| Contiguous subarray or substring | Fixed window or variable? | [[#Path D — Sliding Window\|Sliding Window (Path D)]] |
| Local optimal = global optimal, provably | Can I commit without backtracking? | [[#Path E — Greedy\|Greedy (Path E)]] |
| Range aggregate queries on static data | Is input unchanged after build? | [[#Path F — Prefix Sums / Precomputation\|Prefix Sums (Path F)]] |
| Next greater/smaller, or window max/min | Need next boundary or range extrema? | [[#Path G — Monotonic Stack / Queue\|Monotonic Stack (Path G)]] |
| All valid combinations or subsets | Can I prune invalid partial states? | [[#Path H — Backtracking\|Backtracking (Path H)]] |

---

## Common Red Flags

| Red flag in your brute force | What it suggests |
|---|---|
| Nested loops scanning the same array twice | Two pointers or sliding window |
| Recursion recomputing the same arguments | Memoization / DP |
| Trying every possible answer value | Binary search on the answer |
| Trying all combinations / permutations | Backtracking with pruning, or bitmask DP |
| Repeatedly scanning a range for min/max | Monotonic structure or segment tree |
| Recomputing prefix sums inside a loop | Precompute prefix array |
| Processing both ends of array in nested loops | Two pointers from ends |
| "Greedy" solution failing on edge cases | No proof → switch to DP |

---

## The Universal Optimization Questions

When stuck, ask these in order:

> [!question] 1. What am I repeating?
> Identify the exact computation being done more than once.
> Cache it → DP / memoization.

> [!question] 2. Can I make progress with less information than I think I need?
> - Do I need exact future values, or just comparisons? → **Two pointers**
> - Do I need to try all options, or just the locally best? → **Greedy**
> - Do I need to find the answer, or just verify one? → **Binary search on answer**
> - Do I need to recompute the window, or just update it? → **Sliding window**

> [!question] 3. What is the bottleneck?
> What single value or constraint limits the answer at each step?
> Process or eliminate based on the bottleneck — not the other side.

> [!question] 4. What order should I process in?
> Can I sort first? Process in reverse? Expand from center? Process both ends?
> The right processing order often makes the algorithm obvious.

---

*The technique emerges from the questions. Never the other way around.*
