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

- **Effective range**: Depends on FOV setting value. Explained in detail in [§5](#5).
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
- The chaff lasts approximately 359 ticks (6 seconds)

## 4. Radar Types and Maximum Detectable Range (FOV 0.01 / 0.01)

| Radar | Maximum detectable range at FOV 0.01/0.01 |
|---|---|
| Missile | 80 km |
| Basic | 240 km |
| Phalanx | 400 km |
| Dish | 800 km |
| AWACS | 2000 km |

## 5. Effective Range (Maximum Detection Range) Formula

The effective range is derived from the FOV setting:

```
maxRange ≈ baseRange / (fovX × fovY × 10000)
```

- `baseRange`: maximum detectable range at FOV 0.01 / 0.01 (see table above)
- `fovX` / `fovY`: horizontal / vertical FOV setting (in turns)

## 6. Composite Output (Radar Data)

The composite output reports up to **8 targets**, each with 4 consecutive channels:

- Distance (m)
- Azimuth / X angle (turns)
- Elevation / Y angle (turns)
- Time since detection

Each target n occupies channels `(n−1)×4 + 1` through `(n−1)×4 + 4`, using **channels 1–32** (8 targets × 4 items).

| Target | Distance | Azimuth | Elevation | Time since detection |
|---|---|---|---|---|
| 1 | CH1 | CH2 | CH3 | CH4 |
| 2 | CH5 | CH6 | CH7 | CH8 |
| 3 | CH9 | CH10 | CH11 | CH12 |
| 4 | CH13 | CH14 | CH15 | CH16 |
| 5 | CH17 | CH18 | CH19 | CH20 |
| 6 | CH21 | CH22 | CH23 | CH24 |
| 7 | CH25 | CH26 | CH27 | CH28 |
| 8 | CH29 | CH30 | CH31 | CH32 |

- On/Off channels 1–8 report whether each target is found (Target Found).
## 7. What the Radar Can Detect

The radar can detect the following targets:

| Target | Notes |
|---|---|
| People | |
| NPCs | |
| Shell casings | Empty shell casings left after firing |
| Vehicles (merged) | Detectable vehicles, including merged units |
| Animals | |

## 8. Radar Properties

The radar has the following properties:

| Property | Description |
|---|---|
| Sweep Mode | Scan mode |
| Sweep Speed | Radar rotation speed |
| Sweep Limit | Fan-shaped scan range (0–0.5 rotation) |
| Pitch Angle | Vertical direction (±0.12 rotation) |
| FOVX | Horizontal (X-axis) field of view |
| FOVY | Vertical (Y-axis) field of view |

### Sweep Mode

| Mode | Scan method |
|---|---|
| Static | Scans forward only |
| Clockwise | Rotates the radar clockwise to scan |
| Anticlockwise | Rotates the radar anticlockwise to scan |
| Sweep | Scans the range set by the Sweep Limit property |
| Manual | Determines scan direction from external composite signals (±0.125 vertical, no horizontal limit). Not available on Missile radar |

