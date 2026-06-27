# Graphify Query Templates

Use these templates to orient quickly before opening source files. Replace the
feature name when needed.

## Common Queries

```bash
swgaudit-graph-query "What files/functions handle Data Theft?"
swgaudit-graph-query "What files/functions handle HTTP path tunneling?"
swgaudit-graph-query "What files/functions handle DNS tunneling?"
swgaudit-graph-query "What files/functions handle test access gating?"
swgaudit-graph-query "What files/functions handle catalog card expansion?"
swgaudit-graph-query "What CSS classes style test cards and test results?"
```

## Explainers

```bash
swgaudit-graph-explain "data-theft/index.php"
swgaudit-graph-explain "assets/js/data-theft-path-tunnel.js"
swgaudit-graph-explain "data-theft/path-tunnel.php"
swgaudit-graph-explain "assets/js/site.js"
swgaudit-graph-explain "assets/css/site.css"
```

## Path Tracing

```bash
swgaudit-graph-path "assets/js/data-theft-path-tunnel.js" "data-theft/path-tunnel.php"
swgaudit-graph-path "data-theft/index.php" "assets/js/site.js"
```

After querying, read the exact source ranges needed before editing. Do not treat
the graph output as a substitute for the code.
