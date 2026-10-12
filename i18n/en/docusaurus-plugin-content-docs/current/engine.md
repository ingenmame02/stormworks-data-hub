---
sidebar_position: 3
title: Engine Creation Tutorial
---
Co-authored by: rikkun2X

# Engine Creation Tutorial

This page explains the steps to bring a Stormworks modular engine closer to control that "maintains required output without wasting air or fuel." The coefficients used for measurements and calculations are summarized in [Engine Data](/engine-data).

## 1. First, Fix the Measurement Environment

When measuring engines, fix the following conditions:

- Read RPS and Stormworks Torque (hereafter ST)
- Do not connect components outside the measurement scope, such as flywheels, gears, or generators
- Set the throttle to a constant value and allow it to stabilize sufficiently
- Perform both increasing and decreasing throttle measurements and take the average
- If using differences per tick, define `dRPS = RPS(tick) - RPS(tick-1)`

Differences between rising and falling values occur not only due to floating-point errors but also due to physics engine sleep, rounding, and sampling timing. Instead of single values, adopt the average under the same conditions.

## 2. Decide on the Engine Configuration

Initially, think about the power source, crankshaft, cylinder, belt, and load separately.

1. Connect only the power source and measure the relationship between throttle and RPS.
2. Without changing the size of the power source, add crankshafts or belts and measure the incremental resistance.
3. Add loads such as drills or generators and measure the resistance curve relative to RPS.
4. Finally, re-measure with the actual configuration intended for use to validate the approximation formula.

## 3. Basics of Air/Fuel Control

The required throttle for an engine is determined by the following logic:

```text
Required Power = Target Output + Internal Engine Resistance + Connected Component Resistance + External Load
Air Throttle = Required Power / Engine Output at current RPS
Fuel Throttle = Air Throttle × Fuel Correction
```

In implementation, always clamp the value within the range of `0` to `1`. At low RPS, the denominator becomes small, so it is more stable to set a minimum value for the denominator or switch to a fixed starting value when RPS falls below a certain threshold.

### Example: V10

As reference data, the approximation formula for a V10 can be written as follows. `x` is RPS, `y` is target output, and `z` is boost pressure.

```lua
local x = rps
local y = targetOutput
local z = pressure

local power = -0.00962*x*x + 0.8885*x - 0.1547
local demand = y/60 + 0.05674*x

local air = math.min(demand / power, 1)
local fuel = math.min(demand / power * (1 + 0.01*z), 1) / 2
```

`-0.00962*x^2 + 0.8885*x - 0.1547` is a quadratic equation that approximates the output per RPS. `0.05674*x` is a term to compensate for internal engine resistance, and `(1 + 0.01*z)` is the fuel correction due to boost pressure. If the load changes in an actual configuration, replace the resistance term with measured data.

## 4. Integration into Microcontrollers

Inputs should include at least RPS, ST, target output, and boost pressure. Outputs are air throttle and fuel throttle.

```lua
function clamp(x, low, high)
    return math.max(low, math.min(high, x))
end

function onTick()
    local rps = input.getNumber(1)
    local target = input.getNumber(2)
    local pressure = input.getNumber(3)

    local power = -0.00962*rps*rps + 0.8885*rps - 0.1547
    local demand = target/60 + 0.05674*rps
    local ratio = demand / math.max(power, 0.001)

    output.setNumber(1, clamp(ratio, 0, 1))
    output.setNumber(2, clamp(ratio * (1 + pressure*0.01) / 2, 0, 1))
end
```

This code is an example for a V10. For any arbitrary configuration, you can generate a formula of the same form by entering RPS, ST, engine output coefficient, and resistance coefficient into the [Engine Tuning Tool](/engine-tool).

## 5. Tuning Checkpoints

- Read values after RPS has stabilized, not immediately after changing the throttle
- Increase measurement points near maximum RPS as errors in the output formula increase
- If RPS drops even when increasing target output, add the external load's resistance to the formula
- In regions where increasing only fuel does not increase output, the air side has reached its limit
- Always include the formula coefficients and measurement conditions (parts, clutch, gears, game version)

If measurement methods or coefficients are updated, please also update the "Measurement Conditions" and "Data Reliability" sections in the data collection.

