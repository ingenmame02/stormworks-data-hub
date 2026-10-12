---
sidebar_position: 4
title: Engine Data Collection
---
Co-authored by: rikkun2X

# Engine Data Collection

Here, we organize measured values into coefficients that are easy to use for calculations and comparisons. Unless otherwise specified, numerical units are normalized values based on Stormworks Torque (ST) and `dRPS / tick`.

## Legend

| Symbol | Meaning |
| --- | --- |
| ST | Value from Torque Meter. Measured value including rotational inertia |
| RPS | Revolutions per second |
| dRPS | Difference in RPS per tick |
| Resistance Coefficient | `dRPS × ST / RPS`. A negative value dampens rotation |
| Power Coefficient | `dRPS × ST / Throttle`. Power generated per unit of throttle |

## Commonly Used Main Coefficients

| Component/Configuration | ST | Equilibrium Coefficient (RPS / Throttle) | Resistance Coefficient | Power Coefficient |
| --- | ---: | ---: | ---: | ---: |
| Small Motor (Single) | 3 | 398.0007 | -0.00511166 | 2.03446 |
| Medium Motor (Single) | 3 | 398.0027 | -0.15334993 | 61.03369 |
| Pre-made Small Engine | 10 | — | -0.0511166 | — |


## Modular Engine Resistance

### Medium Size

| Component | ST | Resistance Coefficient |
| --- | ---: | ---: |
| Base Value | — | -0.00511163 |
| Crankshaft | 15 | -0.07667497 |
| Drive Belt | 5 | -0.02555844 |
| Cylinder | 12 | -0.06133983 |

### Small Size

| Component | ST | Resistance Coefficient |
| --- | ---: | ---: |
| Base Value | — | -0.00511156 |
| Drive Belt | 0.6 | -0.00306711 |
| Cylinder | 0.6 | -0.00306701 |
| Crankshaft | 0.7 | -0.00357819 |

If the resistance coefficient is `c` and RPS is `x`, the normalized power due to resistance is approximately `c × x`. When connecting multiple components, add each component's coefficient to the base value.

## Load Resistance Curves

| Load | Resistance Approximation Formula (RPS = x) |
| --- | --- |
| Ore Drill (Idling) | `0.9037x² + 5.1116x` |
| Ore Drill (Mining) | `0.9037x² + 10.172x` |
| Small Generator | `0.0009128x²` |
