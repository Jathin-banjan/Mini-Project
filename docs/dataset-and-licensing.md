# Dataset Sourcing & Licensing Guidelines

## Dataset Sourcing Policy

HeritageAI enforces ethical AI guidelines for cultural heritage preservation:
1. **Respect Cultural Heritage**: Cultural artifacts are preserved with appropriate regional provenance and creator attributions.
2. **No Unverified Claims**: Historical facts, regional provenance, or symbolic meanings are never fabricated.
3. **Open Access & CC Licensing**: Demonstration datasets provided with the source code are generated legally under Creative Commons CC-BY-4.0 licensing.
4. **Research vs Production Mode**:
   - **Research Mode**: Allows researchers to load original custom research datasets when legally acquired.
   - **Demonstration Mode**: Ships with synthetic geometric motif samples for clean setup and reproducible testing without downloading copyrighted images without authorization.

---

## Dataset Manifest Schema

Every registered dataset record includes:
- Dataset ID & Name.
- Version string (e.g., `v1.0`).
- Sample image counts per split (`train`, `validation`, `test`).
- License information (e.g., `CC-BY-4.0`, `Public Domain`).
- Source reference or institution URL.
