---
sidebar_position: 5
title: Projectile Specifications
---

# Stormworks Projectile Specifications Summary

---

## 1. Physics Model (Common to All Projectiles)

### 1-1 Drag (Air Resistance) {#1-1}

In-game, drag is **linear and proportional to velocity**; the following formula is applied every tick.

```
v_new = v_old × (1 − k)
```

- `k` … Deceleration rate (self-drag). Unit: **[/tick]**. The higher the value, the faster the deceleration (does not change with altitude).

Percentage of velocity remaining after 1 second:

```
(1 − k)^60
```

### 1-2 Gravity {#1-2}

The gravitational force acting on a projectile **is not constant; it decreases as altitude h increases**.

```
g(h) = 30 × exp(−1/60 × h/1000)    [m/s²]
```

- `h` … Altitude [m] (ground level = 0)
- At ground level (h = 0), it is **30 m/s²**, but decreases exponentially as altitude increases.

### 1-3 Wind

Acceleration due to wind `a_wind` [m/tick²]:

```
a_wind = W × p(h) × (WindInf / 60)
```

- `W` [m/tick²]
- Altitude-dependent pressure/density coefficient `p(h)`

```
p(h) = (((44.33 − h/1000) / 11.89)^5.256) / 1013
```

- `W` … Wind speed (in-game value) [m/s]
- `p(h)` … Coefficient representing changes in air density based on altitude. The higher the altitude, the smaller the value (as shown in the formula above)
- `WindInf` … Wind influence factor for each gun (see table in [§2-1](#2-1)). The smaller the value, the smaller the effect of wind
- `/60` … Conversion from m/s to m/tick

The deceleration rate `k` does not vary with altitude. Altitude-related factors affecting projectiles are reflected in this wind term and in gravity ([§1-2](#1-2)).

### 1-4 Disappearance Conditions

- Projectiles disappear once they exceed their lifespan (lifeSpan).
- Small-caliber shells tend to dissipate even at speeds of approximately **less than 50 m/s**.
- Rocket, Battle, Artillery, and Bertha shells will remain until the end of their lifespan even at speeds below 50 m/s, except when underwater.

---

## 2. Gun List (Standard Table)

The “guideline” range is an estimate for horizontal to 45° indirect fire. Effective range varies depending on altitude, wind, and decay conditions.

### 2-1 Basic Parameters {#2-1}

| Type | Gun | Muzzle Velocity v [m/s] (m/tick) | Decay Rate k [/tick] | Lifespan [tick] (s) | WindInf | Estimated Range |
|---| ---|---|---|---|---|---|
| 1 | Machine Gun | 800 (13.333) | 0.025 | 120 (2.00) | 0.15 | Approx. 500 m |
| 2 | Light AC | 1000 (16.667) | 0.02 | 150 (2.50) | 0.135 | Approx. 750 m |
| 3 | Rotary AC | 1000 (16.667) | 0.01 | 300 (5.00) | 0.13 | Approx. 1.5 km |
| 4 | Heavy AC | 900 (15.000) | 0.005 | 600 (10.00) | 0.125 | Approx. 2.5 km |
| 5 | Battle | 800 (13.333) | 0.002 | 1500 (25.00) | 0.12 | Approx. 4.5 km (45° indirect) |
| 6 | Artillery | 700 (11.667) | 0.001 | 2,400 (40.00) | 0.11  | Approx. 6.5 km (45° indirect) |
| 7 | Bertha | 600 (10.000) | 0.0005 | 2400 (40.00) | 0.105 | Approx. 7.5 km (45° indirect) |
| 8 | Rocket Launcher | Approx. 50 (initial launch velocity) | 0.003 | 3600 (60) | 0.125 | Approx. 2.5 km |

Since the Rocket undergoes an **acceleration phase (approx. 600 m/s² × 1 second)** after launch, the “constant initial velocity + drag” formula ([§5](#5)) cannot be applied. Please separate the acceleration and integrate it (see [§2-2](#2-2)).

### 2-2 Rate of Fire, Ammunition, and Disappearance {#2-2}

| Type | Weapon | Rate of Fire / Notes | Ammunition | Disappearance |
|---|---|---|---|---|
| 1 | Machine Gun | Burst 900 rpm (4 ticks/shot) | Kinetic / AP / Incendiary | Prone to disintegration at speeds below approximately 50 m/s |
| 2 | Light AC | Burst 450 rpm / Sustained approx. 319 rpm | Kinetic / HE / Frag / AP / Incendiary | Prone to disintegration at speeds below approximately 50 m/s |
| 3 | Rotary AC | Burst: 1,800 rpm / Sustained: Approx. 814 rpm, Spin-up: Approx. 0.5 s | Kinetic / HE / Frag / AP / Incendiary | Prone to dissipation at speeds below approx. 50 m/s |
| 4 | Heavy AC | Burst: Approx. 112.5 rpm / Sustained: Approx. 99 rpm | Kinetic / HE / Frag / AP / Incendiary | Prone to disintegration at speeds below approx. 50 m/s |
| 5 | Battle | Approx. 20 rounds/minute | Kinetic / HE / Frag / AP / Incendiary | Remains until the end of its lifespan even at low speeds, except underwater |
| 6 | Artillery | Approx. 7.7 rounds/min | HE / Frag / AP | Remains until the end of its lifespan even at low speeds, except underwater |
| 7 | Bertha | Approx. 3.1 rounds/min | HE / Frag | Remains until the end of its lifespan even at low speeds, except underwater |
| 8 | Rocket Launcher | 1 round per second per launcher / Initial velocity approx. 50 m/s + acceleration approx. 600 m/s² × 1 second / Damage radius approx. 2.25 m (9 blocks) | Equivalent to HE | Remains active until expiration even at low speeds, except underwater |

Since rockets follow an acceleration model, the “constant initial velocity + drag” formula in [§5](#5) does not apply.

---

## 3. Ammunition Types (Same Ballistics, Different Impact Effects)

Ballistics (initial velocity, drag, and flight time) are determined by the gun and do not vary by ammunition type.

### 3-1 Effects by Ammunition Type

| Ammunition Type | Key Effects |
|---|---|
| Kinetic | Direct damage centered on the impact point. No penetration (or weak penetration) |
| High Explosive (HE) | Wide-area damage |
| Fragmentation | Area damage + scatters submunitions. Easily penetrates gaps |
| Armor Piercing (AP) | Penetrates blocks based on velocity |
| Incendiary | Area damage + ignition check |

### 3-2 Available Ammo Types by Weapon

| Weapon | HE | Frag | Kinetic | AP | Incendiary |
|---|---|---|---|---|---|
| Machine Gun | × | × | ○ | ○ | ○ |
| Autocannons | ✓ | ✓ | ✓ | ✓ | ✓ |
| Battle | ✓ | ✓ | ✓ | ✓ | ✓ |
| Artillery | ✓ | ✓ | × | ✓ | × |
| Bertha | ✓ | ✓ | × | × | × |
| Rocket | HE-equivalent | — | — | — | — |

### 3-3 Hit Detection

Shell hit detection is based on **points**.

### 3-4 HE (High-Explosive) Damage Radius

| Gun | Damage Radius (Radius) | Damage Radius (m) |
|---|---|---|
| Light AC | 3 blocks | 0.75 m |
| Rotary AC | 3 blocks | 0.75 m |
| Heavy AC | 7 blocks | 1.75 m |
| Battle | 11 blocks | 2.75 m |
| Artillery | 16 blocks | 4.00 m |
| Bertha | 16 blocks | 4.00 m |

(The Rocket Launcher has a separate damage radius of approximately 2.25 m = 9 blocks; see [§2-2](#2-2))

### 3-5 AP (Armor-Piercing) Penetration Conditions

AP rounds **penetrate physics objects (viewable by pressing the F2 key)**.

### Decay Upon Penetration

- Each time a projectile penetrates a block, **its penetration power (velocity) decays**.
- **The magnitude of the decay increases with the “density”** of the block penetrated.

Additionally, **giant microcomputer blocks** are **calculated as having a significantly higher density than they actually have**, making them particularly effective (they act as “walls” that are much stronger than they appear).

---

## 4. Handheld Weapons (Reference)

The deceleration rate `k` for handheld weapons is not as well-documented or publicly available as it is for vehicle cannons. It is safer not to use the vehicle cannon table for these weapons.

| Weapon | Initial Velocity [m/s] | Lifespan [ticks] | Notes |
|---|---|---|---|
| Pistol / SMG / Rifle | (Slower than vehicle cannons) | 300 | Same gravity as vehicle cannons: 30 m/s² |
| Speargun | 80 | — | For underwater use |

---

## 5. Formula Cheat Sheet {#5}

Drag only (horizontal, no gravity):

```
v(t) = v0 × (1 − k)^t                 -- t is a tick
x(t) = v0 × (1 − (1 − k)^t) / k       -- k ≠ 0, displacement is in m
```

With Gravity · Continuous Approximation:

In the continuous approximation, the discrete decay at each tick, `v_new = v_old × (1 − k)`, is treated as continuous exponential decay. The continuous decay coefficient in this case is denoted as **`k_base`** (units: [/s]).

```
k_base = −ln(1 − k)
```

(When `k` is small, it can be approximated as `k_base ≈ k × 60`. *Note: Since the deceleration rate k represents the rate of decrease per tick, k_base is calculated as the decay rate per second, not per tick.)

```
dv/dt = a − k_base × v
v(t)  = v0 × e^{−k_base t} + (a / k_base) × (1 − e^{−k_base t})
```

`a` represents the combined effects of gravity and wind. Time `t` is in ticks.

Common conversions:

```
v[m/tick]      = v[m/s] ÷ 60
g[m/tick²]     = 30 ÷ 3600
lifespan[s]        = lifeSpan ÷ 60
residual velocity ratio (1 second)    = (1 − k)^60
```

---

## 6. Note (When Adjusting Cannons via XML)

If you change the cannon’s length via XML, **the muzzle velocity changes in proportion to the length**.

- If the cannon length is **doubled**, the initial velocity is **doubled**
- If the cannon length is **tripled**, the initial velocity is **tripled**

Damage may also change accordingly. In that case, please replace the initial velocity values in the table with the actual measured values. The deceleration rate `k` usually remains unchanged.