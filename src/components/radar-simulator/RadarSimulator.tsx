import React, { useState, useEffect, useRef } from 'react';

const RADAR_TYPES = {
  Missile: 80000,
  Basic: 240000,
  Phalanx: 400000,
  Dish: 800000,
  AWACS: 2000000,
};

const SWEEP_MODES = ['Static', 'Clockwise', 'Anticlockwise', 'Sweep', 'Manual'];

const RadarSimulator = () => {
  // Radar Properties
  const [radarType, setRadarType] = useState('Basic');
  const [fovX, setFovX] = useState(0.01);
  const [fovY, setFovY] = useState(0.01);
  const [sweepMode, setSweepMode] = useState('Clockwise');
  const [sweepSpeed, setSweepSpeed] = useState(1); // turns per second? Or just a multiplier
  const [sweepLimit, setSweepLimit] = useState(0.5);
  const [pitchAngle, setPitchAngle] = useState(0);

  // Target Properties
  const [targetMass, setTargetMass] = useState(500);
  const [targetDistance, setTargetDistance] = useState(10000);
  const [targetAzimuth, setTargetAzimuth] = useState(0); // turns
  const [targetElevation, setTargetElevation] = useState(0); // turns

  // Simulation State
  const [scanTick, setScanTick] = useState(0);
  interface DetectedTarget { id: number; distance: number; azimuth: number; elevation: number; time: number; }
  const [detectedTargets, setDetectedTargets] = useState<DetectedTarget[]>([]);
  const [currentRotation, setCurrentRotation] = useState(0);

  const requestRef = useRef<number | null>(null);

  // Calculations
  const baseRange = RADAR_TYPES[radarType as keyof typeof RADAR_TYPES];
  const effectiveRange = baseRange / (fovX * fovY * 10000);
  const scanInterval = Math.floor(Math.max((effectiveRange / 2000) + 0.5, 1));
  const maxDetectionDistance = Math.min(targetMass / 250, 1) * effectiveRange;

  // Animation loop
  const animate = (time: number) => {
    setCurrentRotation((prev) => {
      let next = prev;
      if (sweepMode === 'Clockwise') {
        next = (prev + sweepSpeed * 0.01) % 1;
      } else if (sweepMode === 'Anticlockwise') {
        next = (prev - sweepSpeed * 0.01 + 1) % 1;
      } else if (sweepMode === 'Sweep') {
        // Simple sweep back and forth
        // This is a bit more complex, let's just use a simple sine wave for now to simulate sweeping
        next = (prev + Math.sin(time / 1000) * 0.01) % 1;
      }
      return next;
    });

    setScanTick((prev) => {
      const next = prev + 1;
      if (next % scanInterval === 0) {
        checkDetection();
      }
      return next;
    });

    requestRef.current = requestAnimationFrame(animate);
  };

  const checkDetection = () => {
    // Check if target is within effective range AND within the current radar beam
    // For simplicity in this simulator, we'll check if the target distance is <= maxDetectionDistance
    // And if the azimuth is close to the current rotation (within some tolerance)
    
    // In a real radar, it scans an area. Here we simplify:
    // If target is within detection distance, it "appears" on the radar.
    
    if (targetDistance <= maxDetectionDistance) {
      // Add noise to the detected position
      const noiseAzimuth = targetAzimuth + (Math.random() * 0.002 - 0.001);
      const noiseElevation = targetElevation + (Math.random() * 0.002 - 0.001);
      const noiseDistance = targetDistance * (1 + (Math.random() * 0.02 - 0.01));

      setDetectedTargets([{
        id: Date.now(),
        distance: noiseDistance,
        azimuth: noiseAzimuth,
        elevation: noiseElevation,
        time: scanTick // simplified elapsed time
      }]);
    } else {
      setDetectedTargets([]);
    }
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current !== null) { cancelAnimationFrame(requestRef.current); }
    };
  }, [sweepMode, sweepSpeed, targetMass, targetDistance, targetAzimuth, targetElevation, effectiveRange, scanInterval]);

  // Visualization constants
  const VIEW_SIZE = 400;
  const CENTER = VIEW_SIZE / 2;
  const SCALE = 0.1; // Scale distance for visualization (e.g., 1km = 1 unit)
  // Actually, let's use a logarithmic scale or just cap it for better visibility
  const getVisualScale = (dist: number) => Math.min(dist / 5000, 1) * (VIEW_SIZE / 2);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px', backgroundColor: '#1a1a1a', color: '#eee', borderRadius: '8px' }}>
      <h2>Radar Simulator</h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', borderRight: '1px solid #444', paddingRight: '20px' }}>
          <h3>Radar Settings</h3>
          <div>
            <label>Radar Type: </label>
            <select value={radarType} onChange={(e) => setRadarType(e.target.value)}>
              {Object.keys(RADAR_TYPES).map(type => <option key={type} value={type}>{type}</option>)}
            </select>
          </div>
          <div>
            <label>FOV X (turns): </label>
            <input type="number" step="0.001" value={fovX} onChange={(e) => setFovX(parseFloat(e.target.value))} />
          </div>
          <div>
            <label>FOV Y (turns): </label>
            <input type="number" step="0.001" value={fovY} onChange={(e) => setFovY(parseFloat(e.target.value))} />
          </div>
          <div>
            <label>Sweep Mode: </label>
            <select value={sweepMode} onChange={(e) => setSweepMode(e.target.value)}>
              {SWEEP_MODES.map(mode => <option key={mode} value={mode}>{mode}</option>)}
            </select>
          </div>
          <div>
            <label>Sweep Speed: </label>
            <input type="range" min="0.1" max="5" step="0.1" value={sweepSpeed} onChange={(e) => setSweepSpeed(parseFloat(e.target.value))} />
          </div>

          <h3>Target Settings</h3>
          <div>
            <label>Target Mass: </label>
            <input type="number" value={targetMass} onChange={(e) => setTargetMass(parseFloat(e.target.value))} />
          </div>
          <div>
            <label>Target Distance (m): </label>
            <input type="number" value={targetDistance} onChange={(e) => setTargetDistance(parseFloat(e.target.value))} />
          </div>
          <div>
            <label>Target Azimuth (turns): </label>
            <input type="number" step="0.001" value={targetAzimuth} onChange={(e) => setTargetAzimuth(parseFloat(e.target.value))} />
          </div>
        </div>

        {/* Visualization */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h3>Radar View (Top Down)</h3>
          <svg width={VIEW_SIZE} height={VIEW_SIZE} viewBox={`0 0 ${VIEW_SIZE} ${VIEW_SIZE}`} style={{ backgroundColor: '#000', border: '2px solid #333', borderRadius: '50%' }}>
            {/* Grid lines */}
            {[0.25, 0.5, 0.75].map(r => (
              <circle key={r} cx={CENTER} cy={CENTER} r={r * (VIEW_SIZE / 2)} fill="none" stroke="#222" strokeWidth="1" />
            ))}
            
            {/* Radar Sweep Beam */}
            <line
              x1={CENTER}
              y1={CENTER}
              x2={CENTER + Math.cos(currentRotation * 2 * Math.PI - Math.PI/2) * (VIEW_SIZE/2)}
              y2={CENTER + Math.sin(currentRotation * 2 * Math.PI - Math.PI/2) * (VIEW_SIZE/2)}
              stroke="rgba(0, 255, 0, 0.5)"
              strokeWidth="2"
            />

            {/* Detected Targets */}
            {detectedTargets.map((target) => (
              <circle
                key={target.id}
                cx={CENTER + Math.cos(target.azimuth * 2 * Math.PI - Math.PI/2) * getVisualScale(target.distance)}
                cy={CENTER + Math.sin(target.azimuth * 2 * Math.PI - Math.PI/2) * getVisualScale(target.distance)}
                r="4"
                fill="#f00"
              />
            ))}
          </svg>

          <div style={{ marginTop: '10px', fontSize: '0.9em' }}>
            <div>Effective Range: {effectiveRange.toFixed(0)} m</div>
            <div>Max Detection Distance: {maxDetectionDistance.toFixed(0)} m</div>
            <div>Scan Interval: {scanInterval} ticks</div>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div style={{ marginTop: '20px' }}>
        <h3>Detected Target Data</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #444' }}>
              <th>Distance (m)</th>
              <th>Azimuth (turns)</th>
              <th>Elevation (turns)</th>
              <th>Time (ticks)</th>
            </tr>
          </thead>
          <tbody>
            {detectedTargets.length > 0 ? detectedTargets.map((t) => (
              <tr key={t.id}>
                <td>{t.distance.toFixed(1)}</td>
                <td>{t.azimuth.toFixed(4)}</td>
                <td>{t.elevation.toFixed(4)}</td>
                <td>{t.time}</td>
              </tr>
            )) : (
              <tr>
                <td colSpan={4} style={{ color: '#666', textAlign: 'center' }}>No targets detected</td >
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RadarSimulator;











