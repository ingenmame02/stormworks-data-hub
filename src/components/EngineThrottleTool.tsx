import React, {useMemo, useState} from 'react';

type Size = 'small' | 'medium' | 'large';

const data = {
  small: {
    motorPower: 2.034461343,
    baseResistance: -0.005111661,
    crankResistance: -0.00357819,
    cylinderResistance: -0.00306701,
  },
  medium: {
    motorPower: 61.0336937,
    baseResistance: -0.00511163,
    crankResistance: -0.07667497,
    cylinderResistance: -0.06133983,
  },
  // 大サイズは未測定。入力欄だけ先に用意し、未測定値は計算に使わない。
  large: null,
} as const;

const v10Model = {
  cylinders: 10,
  cylinderSize: 'small' as Size,
  cranks: 5,
  crankSize: 'small' as Size,
  a: -0.00962,
  b: 0.8885,
  c: -0.1547,
  resistance: 0.05674,
};


const numberValue = (value: string) => Number.isFinite(Number(value)) ? Number(value) : 0;
const clamp = (value: number) => Math.max(0, Math.min(1, value));

export default function EngineThrottleTool(): React.ReactElement {
  const [motorSize, setMotorSize] = useState<Size>('small');
  const [cylinderSize, setCylinderSize] = useState<Size>('small');
  const [crankSize, setCrankSize] = useState<Size>('small');
  const [cylinders, setCylinders] = useState(10);
  const [cranks, setCranks] = useState(5);
  const [rps, setRps] = useState(20);
  const [target, setTarget] = useState(30);
  const [pressure, setPressure] = useState(0);
  const [fuelRatio, setFuelRatio] = useState(0.5);

  const model = useMemo(() => {
    const motor = data[motorSize];
    const cylinder = data[cylinderSize];
    const crank = data[crankSize];
    const isV10 = cylinders === v10Model.cylinders && cylinderSize === v10Model.cylinderSize
      && cranks === v10Model.cranks && crankSize === v10Model.crankSize;

    if (!motor || !cylinder || !crank) {
      return {available: false as const, isV10: false, isV8: false, a: 0, b: 0, c: 0, resistance: 0, power: 0};
    }

    const resistance = Math.abs(
      motor.baseResistance + cylinders * cylinder.cylinderResistance + cranks * crank.crankResistance,
    );

    // V10の2次式も、固定プリセットではなく、提供された測定モデルとして扱う。
    if (isV10) {
      return {available: true as const, isV10, isV8: false, a: v10Model.a, b: v10Model.b, c: v10Model.c, resistance: v10Model.resistance, power: motor.motorPower};
    }

    // その他の構成は、提供データから得られる動力係数を定数項にしたモデル。
    return {available: true as const, isV10: false, isV8: false, a: 0, b: 0, c: motor.motorPower, resistance, power: motor.motorPower};
  }, [motorSize, cylinderSize, crankSize, cylinders, cranks]);

  const result = useMemo(() => {
    if (!model.available) return {air: 0, fuel: 0, demand: 0, denominator: 0, rawAir: 0, rawFuel: 0};
    const x = Math.max(0, rps);
    const demand = target / 60 + model.resistance * x;
    const denominator = model.a * x * x + model.b * x + model.c;
    const rawAir = demand / Math.max(denominator, 0.001);
    const air = clamp(rawAir);
    const rawFuel = air * (1 + pressure * 0.01) * fuelRatio;
    return {air, fuel: clamp(rawFuel), demand, denominator, rawAir, rawFuel};
  }, [model, rps, target, pressure, fuelRatio]);

  const sizeOptions = (value: Size, setter: (value: Size) => void) => (
    <select value={value} onChange={(e) => setter(e.target.value as Size)} style={{display: 'block', width: '100%'}}>
      <option value="small">小</option>
      <option value="medium">中</option>
      <option value="large">大（未測定）</option>
    </select>
  );

  const polynomial = model.available
    ? `${model.a.toFixed(5)}x² ${model.b >= 0 ? '+' : '-'} ${Math.abs(model.b).toFixed(5)}x ${model.c >= 0 ? '+' : '-'} ${Math.abs(model.c).toFixed(5)}`
    : 'データ不足';

  return (
    <div className="engine-tool" style={{border: '1px solid var(--ifm-color-emphasis-300)', borderRadius: 8, padding: '1rem'}}>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '0.8rem'}}>
        <label>動力源<select value={motorSize} onChange={(e) => setMotorSize(e.target.value as Size)} style={{display: 'block', width: '100%'}}><option value="small">小モーター</option><option value="medium">中モーター</option><option value="large">大モーター（未測定）</option></select></label>
        <label>シリンダーサイズ{sizeOptions(cylinderSize, setCylinderSize)}</label>
        <label>シリンダー数<input type="number" min="0" step="1" value={cylinders} onChange={(e) => setCylinders(numberValue(e.target.value))} style={{display: 'block', width: '100%'}} /></label>
        <label>クランクシャフトサイズ{sizeOptions(crankSize, setCrankSize)}</label>
        <label>クランクシャフト数<input type="number" min="0" step="1" value={cranks} onChange={(e) => setCranks(numberValue(e.target.value))} style={{display: 'block', width: '100%'}} /></label>
        <label>RPS<input type="number" min="0" step="0.1" value={rps} onChange={(e) => setRps(numberValue(e.target.value))} style={{display: 'block', width: '100%'}} /></label>
        <label>目標出力<input type="number" min="0" step="0.1" value={target} onChange={(e) => setTarget(numberValue(e.target.value))} style={{display: 'block', width: '100%'}} /></label>
        <label>過給圧力 z<input type="number" step="0.1" value={pressure} onChange={(e) => setPressure(numberValue(e.target.value))} style={{display: 'block', width: '100%'}} /></label>
        <label>燃料比<input type="number" min="0" step="0.01" value={fuelRatio} onChange={(e) => setFuelRatio(numberValue(e.target.value))} style={{display: 'block', width: '100%'}} /></label>
      </div>
      {!model.available && <p style={{color: 'var(--ifm-color-danger)'}}>このサイズの測定データがまだありません。大サイズを使用する場合は、先にデータ集へ係数を追加してください。</p>}
      <div style={{display: 'flex', gap: '2rem', flexWrap: 'wrap', margin: '1.2rem 0', fontSize: '1.1rem'}}>
        <div><strong>空気</strong><br /><code>{result.air.toFixed(4)}</code></div>
        <div><strong>燃料</strong><br /><code>{result.fuel.toFixed(4)}</code></div>
        <div><strong>必要動力</strong><br /><code>{result.demand.toFixed(4)}</code></div>
      </div>
      <p><strong>生成された出力式:</strong> <code>power(x) = {polynomial}</code></p>
      <p><strong>空気:</strong> <code>clamp((target/60 + {model.resistance.toFixed(5)}*x) / power(x), 0, 1)</code></p>
      <p><strong>燃料:</strong> <code>clamp(air * (1 + 0.01*z) * {fuelRatio.toFixed(2)}, 0, 1)</code></p>
      <p style={{fontSize: '0.9em'}}>抵抗係数: {model.resistance.toFixed(8)} ／ 分母: {result.denominator.toFixed(4)} ／ クランプ前の空気: {result.rawAir.toFixed(4)} ／ クランプ前の燃料: {result.rawFuel.toFixed(4)}</p>
      {model.isV10 && <p style={{fontSize: '0.9em'}}>提示されたV10測定モデル（小シリンダー10個・小クランクシャフト5本）を使用中です。</p>}
    </div>
  );
}
