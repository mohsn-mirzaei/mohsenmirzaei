/**
 * Technical notes rendered at /notes/[slug].
 *
 * DRAFTS — written from the architecture described in the resume. Review the
 * prose, adjust code samples to match the real implementations, and update
 * dates before publishing.
 */

export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "code"; lang: string; code: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string };

export type Article = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO
  readingTime: string;
  tags: string[];
  blocks: ArticleBlock[];
};

export const articles: Article[] = [
  {
    slug: "ref-counted-websocket-layer",
    title: "A ref-counted WebSocket layer for real-time market data",
    description:
      "How to feed an order book that updates dozens of times per second without melting React: shared subscriptions, throttled cache patching, and reconnect that replays state.",
    date: "2026-05-14",
    readingTime: "8 min",
    tags: ["WebSocket", "React", "Real-time", "Architecture"],
    blocks: [
      {
        type: "p",
        text: "An order book updates tens of times per second. A React component tree re-rendering at that rate is unusable — and the naive architecture, where each component opens its own socket subscription, is worse: mount the same symbol in a chart, a ticker, and an order form, and you're paying for three copies of the same stream.",
      },
      {
        type: "p",
        text: "Building the trading frontend for a crypto exchange, I ended up with a design I'd now reach for in any real-time UI: a centralized WebSocket layer with ref-counted subscriptions and throttled cache patching. No component ever touches a socket.",
      },
      { type: "h2", text: "The interface: subscribe, and nothing else" },
      {
        type: "p",
        text: "The entire public surface is one function. Components declare what data they need; the layer decides what that means for the wire.",
      },
      {
        type: "code",
        lang: "ts",
        code: `type Topic = \`orderbook:\${string}\` | \`trades:\${string}\` | \`ticker:\${string}\`;

function subscribe(topic: Topic): () => void {
  const entry = registry.get(topic) ?? createEntry(topic);
  entry.refCount += 1;

  if (entry.refCount === 1) {
    // First consumer: actually subscribe upstream.
    socket.send({ op: "subscribe", topic });
  }

  return function unsubscribe() {
    entry.refCount -= 1;
    if (entry.refCount === 0) {
      socket.send({ op: "unsubscribe", topic });
      registry.delete(topic);
    }
  };
}`,
      },
      {
        type: "p",
        text: "The ref-count is the whole trick. The first subscriber to a topic opens the upstream subscription; every later subscriber is free; the last unsubscribe tears it down. Components mount and unmount as violently as React wants — the wire only sees the transitions that matter.",
      },
      { type: "h2", text: "Ticks patch a cache, not components" },
      {
        type: "p",
        text: "Incoming messages never call setState. They patch a normalized cache keyed by topic, and the cache notifies subscribers on a throttled cadence — 200–300ms worked well for market data. The order book renders at a fixed, predictable rate regardless of how fast ticks arrive.",
      },
      {
        type: "code",
        lang: "ts",
        code: `socket.onMessage((msg) => {
  // Hot path: mutate the cache entry, don't render.
  applyPatch(cache.get(msg.topic), msg);
  scheduleFlush(msg.topic); // throttled, one flush per topic per window
});

function scheduleFlush(topic: Topic) {
  if (pending.has(topic)) return;
  pending.add(topic);
  setTimeout(() => {
    pending.delete(topic);
    notifySubscribers(topic); // now React renders — once
  }, FLUSH_MS);
}`,
      },
      {
        type: "ul",
        items: [
          "Bursts collapse: 40 ticks in a window become one render.",
          "Backpressure is explicit: FLUSH_MS is a product decision (how live should it feel?), not an accident of load.",
          "The hot path allocates nothing and renders nothing — profiling stays boring, which is the goal.",
        ],
      },
      { type: "h2", text: "Reconnect replays the ref-count table" },
      {
        type: "p",
        text: "The registry doubles as the source of truth for recovery. When the socket drops and reconnects (exponential backoff), the layer walks the registry and re-subscribes every topic with a non-zero ref-count. Components don't know the connection died; they just see the next cache flush.",
      },
      {
        type: "quote",
        text: "A network blip should be an implementation detail. If a component has to handle reconnection, the abstraction is leaking.",
      },
      { type: "h2", text: "What I'd keep, what I'd change" },
      {
        type: "p",
        text: "Keep: the single subscribe() surface, ref-counting, and the throttled cache — that trio removed an entire class of performance bugs. Change: I'd add sequence numbers per topic from day one, so the client can detect gaps after reconnect and request a snapshot instead of trusting replay. We added it later; it should have been in the first version.",
      },
    ],
  },
  {
    slug: "transactional-slot-locking",
    title: "Preventing double-bookings with transactional slot locking",
    description:
      "Two customers race for the last table at 2 a.m. Why check-then-write always loses, and how row locks plus a state machine make double-booking unrepresentable.",
    date: "2026-06-20",
    readingTime: "7 min",
    tags: ["PostgreSQL", "Concurrency", "System Design", "Fastify"],
    blocks: [
      {
        type: "p",
        text: "Every booking system has the same nightmare: two customers, one remaining slot, two requests arriving in the same hundred milliseconds. Building a reservation platform for a US restaurant group — event halls, catering, and tables sharing the same physical spaces — I got to solve it properly, because the previous 'system' (phone calls and memory) double-booked regularly.",
      },
      { type: "h2", text: "Check-then-write always loses" },
      {
        type: "p",
        text: "The instinctive implementation reads availability, then writes a reservation. Between the read and the write, another transaction can do the same thing — both see 'available', both write, and you have two deposits for one hall. Adding an application-level mutex just moves the race to the next app instance.",
      },
      {
        type: "code",
        lang: "sql",
        code: `-- The race, in two lines:
SELECT capacity_left FROM slots WHERE id = $1;  -- both requests see 1
INSERT INTO reservations (slot_id, ...) VALUES ($1, ...);  -- both insert`,
      },
      {
        type: "p",
        text: "The fix is to make the database serialize the contenders: lock the slot row before checking, inside one transaction.",
      },
      {
        type: "code",
        lang: "sql",
        code: `BEGIN;
SELECT * FROM slots WHERE id = $1 FOR UPDATE;   -- second request blocks here
-- re-check availability under the lock
-- insert reservation, decrement capacity
COMMIT;`,
      },
      {
        type: "p",
        text: "FOR UPDATE turns the race into a queue. The second transaction blocks until the first commits, then re-reads — and sees the slot taken. The invariant lives where the data lives; no application-level cleverness can bypass it, including the admin panel and any future service that talks to the same database.",
      },
      { type: "h2", text: "The state machine makes bad states unrepresentable" },
      {
        type: "p",
        text: "Locking prevents duplicate writes, but a reservation's life is longer than its creation: confirmation, payment, fulfillment, cancellation, no-shows. I modeled it as an explicit 8-state machine where every legal transition is enumerated and everything else is rejected at the API boundary.",
      },
      {
        type: "code",
        lang: "ts",
        code: `const transitions: Record<State, readonly State[]> = {
  draft:      ["pending", "cancelled"],
  pending:    ["confirmed", "expired", "cancelled"],
  confirmed:  ["fulfilled", "no_show", "cancelled"],
  // ... every state lists its legal successors; nothing else compiles past review
};

function transition(current: State, next: State) {
  if (!transitions[current].includes(next)) {
    return err({ code: "INVALID_TRANSITION", from: current, to: next });
  }
  return ok(next);
}`,
      },
      {
        type: "ul",
        items: [
          "Cancelling a fulfilled reservation isn't a bug you catch in QA — it's a request the API cannot express.",
          "The transition table is also documentation: product conversations happen by pointing at it.",
          "State transitions and slot mutations commit in the same transaction, so the calendar and the lifecycle can never disagree.",
        ],
      },
      { type: "h2", text: "Proving it: concurrency tests" },
      {
        type: "p",
        text: "The test suite includes tests that open parallel connections and hammer the same slot. The assertion is simple: exactly one succeeds, the rest get a typed SLOT_TAKEN error, and the slot's capacity never goes negative. Under load, double-bookings measured: zero. Which is the only interesting property of the design — not that the count is low, but that the architecture makes any other count impossible.",
      },
      {
        type: "quote",
        text: "Concurrency bugs don't get fixed by care. They get fixed by making the database the referee and the invalid states unrepresentable.",
      },
    ],
  },
];

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}
