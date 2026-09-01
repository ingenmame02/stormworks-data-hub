---
sidebar_position: 4
title: Radar Specifications
---

# Stormworks Radar Specifications

| Item | Value / Formula |
|---|---|
| Maximum detectable distance | `min(mass / 250, 1) × effective range` |
| Detection interval (tick) | `floor(max((effective range / 2000) + 0.5, 1))` |
| Angular noise | ±0.001 rotation |
| Distance noise | 1% of true distance |
| Chaff mass | 100,000 |
| Chaff detection condition | mass ≥ 250 and within effective range |

## 1. Detection Distance and Scan Interval

- **Effective range**: Depends on FOV setting value.
- **Maximum detectable distance**: `min(mass / 250, 1) × effective range`
  - Objects with mass ≥ 250 can be detected up to the maximum effective range.
- **Detection interval**: `floor(max((effective range / 2000) + 0.5, 1))`

## 2. Noise

During detection, the following uniformly distributed noise continues to be added to the previous coordinates.

- Horizontal/Vertical: ±0.001 rotation
- Distance: ±1%

## 3. Chaff

- Mass: 100,000
- Satisfies mass condition (≥250), so it is **almost always detected** within effective range.
