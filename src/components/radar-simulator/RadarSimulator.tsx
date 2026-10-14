import React, { useRef, useCallback, useState, useEffect } from 'react';

const RADAR_TYPES = {
  Missile: 80000,
  Basic: 240000,
  Phalanx: 400000,
  Dish: 800000,
  AWACS: 2000000,
};

const SWEEP_MODES = ['Static', 'Clockwise', 'Anticlockwise', 'Sweep'];

interface Target {
  id: number;
  x: number; // meters
  y: number; // meters
  vx: number; // m/s
  vy: number; // m/s
  mass: number;
  angle: number; // current heading in radians
  turnRate?: number; // rad/s
  turnEndTime?: number; // timestamp when turning ends
}

interface DetectedTarget {
  id: number;
  distance: number;
  azimuth: number; // turns [0, 1)
  elevation: number;
  time: number;
  mass: number;
}

const RadarSimulator = () => {
  // Responsive state - Simple boolean based on window width (no batching)
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 1024);
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Radar Properties
  const [radarType, setRadarType] = useState('Basic');
  const [fovX, setFovX] = useState(0.05); // Beam width in turns (Horizontal)
  const [fovY, setFovY] = useState(0.05); // Beam width in turns (Vertical)
  const [sweepMode, setSweepMode] = useState('Clockwise');
  const [sweepSpeed, setSweepSpeed] = useState(0.5); // turns per second
  const [sweepLimit, setSweepLimit] = useState(0.25); // turns [-0.5, 0.5] for Sweep mode
  const [mapMaxDistance, setMapMaxDistance] = useState(50000);

  // Simulation State
  const [targets, setTargets] = useState<Target[]>([]);
  const [detectedTargets, setDetectedTargets] = useState<DetectedTarget[]>([]);
  const [currentRotation, setCurrentRotation] = useState(0); // turns [0, 1)
  const [scanTick, setScanTick] = useState(0);
  const [targetMass, setTargetMass] = useState(1000);
  const [targetVelocity, setTargetVelocity] = useState(30);

  // Unit Selection States
  const [timeUnit, setTimeUnit] = useState<'seconds' | 'ticks'>('seconds');
  const [angleUnit, setAngleUnit] = useState<'degrees' | 'turns'>('degrees');

  const requestRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  // Calculations
  const baseRange = RADAR_TYPES[radarType as keyof typeof RADAR_TYPES];
  // maxRange ≈ baseRange / (fovX × fovY × 10000)
  const effectiveRange = baseRange / (fovX * fovY * 10000); 

  // Target Spawning
  const [minDist, setMinDist] = useState(1000);
  const [maxDist, setMaxDist] = useState(5000);
  const [minAzimuth, setMinAzimuth] = useState(0); // degrees
  const [maxAzimuth, setMaxAzimuth] = useState(360); // degrees

  // Expansion States for Collapsible Sections
  const [isRadarSettingsExpanded, setIsRadarSettingsExpanded] = useState(true);
  const [isTargetManagementExpanded, setIsTargetManagementExpanded] = useState(true);
  const [isSpawnRangesExpanded, setIsSpawnRangesExpanded] = useState(true);
  const [isTableSettingsExpanded, setIsTableSettingsExpanded] = useState(false);

  const spawnTarget = useCallback(() => {
    if (targets.length >= 16) return;
    const id = Date.now() + Math.random();
    
    const dist = minDist + Math.random() * (maxDist - minDist);
    
    const azimuthDeg = minAzimuth + Math.random() * (maxAzimuth - minAzimuth);
    const targetAngle = (azimuthDeg * Math.PI / 180) - Math.PI / 2; 

    const speed = targetVelocity;
    
    setTargets(prev => [...prev, {
      id,
      x: Math.cos(targetAngle) * dist,
      y: Math.sin(targetAngle) * dist,
      vx: Math.cos(targetAngle) * speed,
      vy: Math.sin(targetAngle) * speed,
      mass: targetMass,
      angle: targetAngle
    }]);
  }, [targets.length, minDist, maxDist, minAzimuth, maxAzimuth, targetVelocity, targetMass]);

  const spawnRandomTarget = useCallback(() => {
    if (targets.length >= 16) return;
    const id = Date.now() + Math.random();
    
    const dist = minDist + Math.random() * (maxDist - minDist);
    const azimuthDeg = minAzimuth + Math.random() * (maxAzimuth - minAzimuth);
    const targetAngle = (azimuthDeg * Math.PI / 180) - Math.PI / 2;

    const speed = Math.random() * 100; // Random velocity up to 100
    const mass = Math.random() * 50000; // Random mass up to 50000
    
    setTargets(prev => [...prev, {
      id,
      x: Math.cos(targetAngle) * dist,
      y: Math.sin(targetAngle) * dist,
      vx: Math.cos(targetAngle) * speed,
      vy: Math.sin(targetAngle) * speed,
      mass: mass,
      angle: targetAngle
    }]);
  }, [targets.length, minDist, maxDist, minAzimuth, maxAzimuth]);

  const clearTargets = useCallback(() => setTargets([]), []);

  // Animation loop
  const animate = useCallback((time: number) => {
    if (lastTimeRef.current !== null) {
      const deltaTime = (time - lastTimeRef.current) / 1000; // seconds

      // 1. Update Targets
      setTargets(prev => prev.map(t => {
        let newAngle = t.angle;
        const now = time / 1000;

        if (t.turnEndTime && now > t.turnEndTime) {
          t.turnRate = undefined;
          t.turnEndTime = undefined;
        } else if (t.turnRate) {
          newAngle += t.turnRate * deltaTime;
        } else if (Math.random() < 0.005) {
          const turnDuration = 2 + Math.random() * 8;
          const turnRate = (Math.random() - 0.5) * 0.5;
          t.turnRate = turnRate;
          t.turnEndTime = now + turnDuration;
          newAngle += turnRate * deltaTime;
        }

        const newVx = Math.cos(newAngle) * targetVelocity;
        const newVy = Math.sin(newAngle) * targetVelocity;

        return {
          ...t,
          x: t.x + newVx * deltaTime,
          y: t.y + newVy * deltaTime,
          vx: newVx,
          vy: newVy,
          angle: newAngle,
          turnRate: t.turnRate,
          turnEndTime: t.turnEndTime
        };
      }));

      // 2. Update Radar Rotation
      setCurrentRotation(prev => {
        if (sweepMode === 'Clockwise') {
          return (prev + sweepSpeed * deltaTime) % 1;
        } else if (sweepMode === 'Anticlockwise') {
          return (prev - sweepSpeed * deltaTime + 1) % 1;
        } else if (sweepMode === 'Sweep') {
          const period = (4 * sweepLimit) / Math.max(0.01, sweepSpeed);
          const phase = (time / 1000) % period;
          let offset;
          if (phase < period / 2) {
            offset = -sweepLimit + (phase / (period / 2)) * (2 * sweepLimit);
          } else {
            offset = sweepLimit - ((phase - period / 2) / (period / 2)) * (2 * sweepLimit);
          }
          return (offset + 1) % 1;
        } else {
          return prev;
        }
      });

      // 3. Check Detection
      setDetectedTargets(prev => {
        const newDetections: DetectedTarget[] = [];
        targets.forEach(t => {
          const dist = Math.sqrt(t.x * t.x + t.y * t.y);
          const detectionRange = Math.min(t.mass / 250, 1) * effectiveRange;

          if (dist <= detectionRange) {
            let azimuthRad = Math.atan2(t.y, t.x);
            let azimuthTurns = (azimuthRad / (2 * Math.PI) + 0.5) % 1;
            
            const radarAngleRad = (currentRotation * 2 * Math.PI) - Math.PI / 2;
            const normalizedDiff = Math.abs(Math.atan2(Math.sin(azimuthRad - radarAngleRad), Math.cos(azimuthRad - radarAngleRad)));
            const beamWidthRad = fovX * 2 * Math.PI;

            if (normalizedDiff < beamWidthRad / 2 && dist <= detectionRange) {
              const azimuthNoise = (Math.random() - 0.5) * 0.002;
              const distanceNoise = 1 + (Math.random() - 0.5) * 0.02;
              const elevationNoise = (Math.random() - 0.5) * 0.002;

              newDetections.push({
                id: t.id,
                distance: dist * distanceNoise,
                azimuth: (azimuthTurns + azimuthNoise + 1) % 1,
                elevation: elevationNoise,
                time: scanTick,
                mass: t.mass
              });
            }
          }
        });
        return newDetections.sort((a, b) => (b.mass / b.distance) - (a.mass / a.distance));
      });

      setScanTick(prev => prev + 1);
    }
    lastTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  }, [sweepMode, sweepSpeed, sweepLimit, targets, currentRotation, fovX, fovY, effectiveRange, mapMaxDistance, targetVelocity, scanTick]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current !== null) cancelAnimationFrame(requestRef.current);
    };
  }, [animate]);

  const handleSvgClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (sweepMode === 'Static' && svgRef.current) {
      const rect = svgRef.current.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const clickX = e.clientX - rect.left - centerX;
      const clickY = e.clientY - rect.top - centerY;
      
      let angleRad = Math.atan2(clickY, clickX);
      let angleTurns = ((angleRad + Math.PI / 2) / (2 * Math.PI) + 1) % 1;
      setCurrentRotation(angleTurns);
    }
  };

  // Visualization constants
  const VIEW_SIZE = 400;
  const CENTER = VIEW_SIZE / 2;
  const getVisualScale = (dist: number) => (dist / mapMaxDistance) * (VIEW_SIZE / 2);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px', backgroundColor: '#1a1a1a', color: '#eee', borderRadius: '8px' }}>
      <h2>Radar Simulator</h2>

      <div style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        {/* Controls */}
        <div style={{ 
          flex: isMobile ? '1 1 100%' : '1 1 450px',
          minWidth: isMobile ? 'auto' : '380px'
        }}>
        {/* Controls Section - Contains all control inputs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          
          {/* Radar Settings Section */}
          <div>
            <div 
              onClick={() => setIsRadarSettingsExpanded(!isRadarSettingsExpanded)}
              style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}
            >
              <h3 style={{ margin: 0 }}>Radar Settings</h3>
              <span>{isRadarSettingsExpanded ? '▼' : '▶'}</span>
            </div>
            {isRadarSettingsExpanded && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label>Radar Type:</label>
                  <select value={radarType} onChange={(e) => setRadarType(e.target.value)}>
                    {Object.keys(RADAR_TYPES).map(type => <option key={type} value={type}>{type}</option>)}
                  </select>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label>Beam FOV X (turns): </label>
                  <input type="number" step="0.01" value={fovX} onChange={(e) => setFovX(parseFloat(e.target.value))} style={{ width: '80px' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label>Beam FOV Y (turns): </label>
                  <input type="number" step="0.01" value={fovY} onChange={(e) => setFovY(parseFloat(e.target.value))} style={{ width: '80px' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label>Sweep Mode: </label>
                  <select value={sweepMode} onChange={(e) => setSweepMode(e.target.value)}>
                    {SWEEP_MODES.map(mode => <option key={mode} value={mode}>{mode}</option>)}
                  </select>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  <label>Sweep Speed (max 1 rps): </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <input 
                      type="range" 
                      min="0" 
                      max="1" 
                      step="0.01" 
                      value={sweepSpeed} 
                      onChange={(e) => setSweepSpeed(parseFloat(e.target.value))} 
                      style={{ flexGrow: 1 }}
                    />
                    <span style={{ minWidth: '60px' }}>{sweepSpeed.toFixed(2)} rps</span>
                  </div>
                </div>
                {sweepMode === 'Sweep' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <label>Sweep Range (±deg): </label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <input 
                        type="range" 
                        min="0" 
                        max="90" 
                        step="1" 
                        value={sweepLimit * 360} 
                        onChange={(e) => setSweepLimit((parseFloat(e.target.value) / 360))} 
                        style={{ flexGrow: 1 }}
                      />
                      <span style={{ minWidth: '40px' }}>{Math.round(sweepLimit * 360)}°</span>
                    </div>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label>Map Max Distance (m): </label>
                  <input type="number" value={mapMaxDistance} onChange={(e) => setMapMaxDistance(parseFloat(e.target.value))} style={{ width: '100px' }} />
                </div>
              </div>
            )}
          </div>

          {/* Target Management Section */}
          <div>
            <div 
              onClick={() => setIsTargetManagementExpanded(!isTargetManagementExpanded)}
              style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}
            >
              <h3 style={{ margin: 0 }}>Target Management</h3>
              <span>{isTargetManagementExpanded ? '▼' : '▶'}</span>
            </div>
            {isTargetManagementExpanded && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button onClick={spawnTarget}>Spawn Target ({targets.length}/16)</button>
                  <button onClick={clearTargets}>Clear All</button>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button onClick={spawnRandomTarget} style={{ backgroundColor: '#444', color: '#fff' }}>Random Mass/Vel</button>
                </div>
                <div style={{ fontSize: '0.9em', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label>Mass: </label>
                    <input type="number" step="100" value={targetMass} onChange={(e) => setTargetMass(parseFloat(e.target.value))} style={{ width: '80px' }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label>Velocity (m/s): </label>
                    <input type="number" step="1" value={targetVelocity} onChange={(e) => setTargetVelocity(parseFloat(e.target.value))} style={{ width: '80px' }} />
                  </div>
                </div>
                <p style={{ fontSize: '0.8em', color: '#aaa', marginTop: '5px' }}>* In Static mode, click the radar to aim.</p>
              </div>
            )}
          </div>

          {/* Spawn Ranges Section */}
          <div>
            <div 
              onClick={() => setIsSpawnRangesExpanded(!isSpawnRangesExpanded)}
              style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}
            >
              <h3 style={{ margin: 0 }}>Spawn Ranges</h3>
              <span>{isSpawnRangesExpanded ? '▼' : '▶'}</span>
            </div>
            {isSpawnRangesExpanded && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.9em' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label>Min Dist (m): </label>
                  <input type="number" value={minDist} onChange={(e) => setMinDist(parseFloat(e.target.value))} style={{ width: '80px' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label>Max Dist (m): </label>
                  <input type="number" value={maxDist} onChange={(e) => setMaxDist(parseFloat(e.target.value))} style={{ width: '80px' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label>Min Azimuth (°): </label>
                  <input type="number" value={minAzimuth} onChange={(e) => setMinAzimuth(parseFloat(e.target.value))} style={{ width: '80px' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label>Max Azimuth (°): </label>
                  <input type="number" value={maxAzimuth} onChange={(e) => setMaxAzimuth(parseFloat(e.target.value))} style={{ width: '80px' }} />
                </div>
              </div>
            )}
          </div>

          {/* Detected Targets Section */}
          <div>
            <div 
              onClick={() => setIsTableSettingsExpanded(!isTableSettingsExpanded)}
              style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}
            >
              <h3 style={{ margin: 0 }}>Detected Targets</h3>
              <span>{isTableSettingsExpanded ? '▼' : '▶'}</span>
            </div >
            {isTableSettingsExpanded && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.9em', marginBottom: '10px', padding: '8px', border: '1px solid #444', borderRadius: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label>Time Unit: </label>
                  <select value={timeUnit} onChange={(e) => setTimeUnit(e.target.value as 'seconds' | 'ticks')}>
                    <option value="seconds">Seconds</option>
                    <option value="ticks">Ticks</option>
                  </select>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label>Angle Unit: </label>
                  <select value={angleUnit} onChange={(e) => setAngleUnit(e.target.value as 'degrees' | 'turns')}>
                    <option value="degrees">Degrees (°)</option>
                    <option value="turns">Turns (±0.5)</option>
                  </select>
                </div>
              </div>
            )}
            <div style={{ height: '200px', overflowY: 'auto', border: '1px solid #444', borderRadius: '4px' }}>
              <table style={{ width: '100%', fontSize: '0.8em', textAlign: 'left', borderCollapse: 'collapse', minHeight: '200px' }}>
                <thead style={{ position: 'sticky', top: 0, backgroundColor: '#1a1a1a', zIndex: 1 }}>
                  <tr style={{ height: '25px' }}>
                    <th style={{ borderBottom: '1px solid #444', padding: '4px', width: '40px' }}>ID</th>
                    <th style={{ borderBottom: '1px solid #444', padding: '4px', width: '70px' }}>Dist</th>
                    <th style={{ borderBottom: '1px solid #444', padding: '4px', width: '75px' }}>Azimuth</th>
                    <th style={{ borderBottom: '1px solid #444', padding: '4px', width: '75px' }}>Elev</th>
                    <th style={{ borderBottom: '1px solid #444', padding: '4px', width: '65px' }}>Time</th>
                    <th style={{ borderBottom: '1px solid #444', padding: '4px', width: '50px' }}>Mass</th>
                  </tr>
                </thead>
                <tbody>
                  {[...Array(8)].map((_, i) => {
                    const t = detectedTargets[i];
                    return (
                      <tr key={i}>
                        <td style={{ padding: '4px', borderBottom: '1px solid #333', width: '40px' }}>{(i + 1).toString().padStart(4, '0')}</td>
                        <td style={{ padding: '4px', borderBottom: '1px solid #333', width: '70px' }}>{t ? `${t.distance.toFixed(1)}m` : 'NO DATA'}</td>
                        <td style={{ padding: '4px', borderBottom: '1px solid #333', width: '75px' }}>
                          {t ? (angleUnit === 'degrees' ? `${(t.azimuth * 360).toFixed(1)}°` : t.azimuth.toFixed(3)) : 'NO DATA'}
                        </td>
                        <td style={{ padding: '4px', borderBottom: '1px solid #333', width: '75px' }}>
                          {t ? (angleUnit === 'degrees' ? `${(t.elevation * 360).toFixed(1)}°` : t.elevation.toFixed(3)) : 'NO DATA'}
                        </td>
                        <td style={{ padding: '4px', borderBottom: '1px solid #333', width: '65px' }}>
                          {t ? (timeUnit === 'seconds' ? (t.time / 60).toFixed(2) + 's' : t.time.toString()) : '0'}
                        </td>
                        <td style={{ padding: '4px', borderBottom: '1px solid #333', width: '50px' }}>{t ? t.mass.toFixed(0) : '0'}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

        {/* Visualization Section */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
          flex: isMobile ? '1 1 100%' : '1 1 420px',
          minWidth: `${VIEW_SIZE}px`
        }}>
          <h3 style={{ margin: 0 }}>Radar View</h3>
          <div style={{ marginTop: '10px', width: VIEW_SIZE, height: VIEW_SIZE, position: 'relative' }}>
            <svg
              ref={svgRef}
              width={VIEW_SIZE}
              height={VIEW_SIZE}
              viewBox={`0 0 ${VIEW_SIZE} ${VIEW_SIZE}`}
              onClick={handleSvgClick}
              style={{ backgroundColor: '#000', border: '2px solid #333', borderRadius: '50%', cursor: sweepMode === 'Static' ? 'crosshair' : 'default', display: 'block' }}
            >
              {[0.25, 0.5, 0.75, 1].map(r => (
                <circle key={r} cx={CENTER} cy={CENTER} r={r * (VIEW_SIZE / 2)} fill="none" stroke="#222" strokeWidth="1" />
              ))}
              
              <path
                d={`
                  M ${CENTER} ${CENTER}
                  L ${CENTER + Math.cos((currentRotation * 2 * Math.PI) - Math.PI/2 - fovX * Math.PI) * getVisualScale(effectiveRange)} ${CENTER + Math.sin((currentRotation * 2 * Math.PI) - Math.PI/2 - fovX * Math.PI) * getVisualScale(effectiveRange)}
                  A ${getVisualScale(effectiveRange)} ${getVisualScale(effectiveRange)} 0 0 1 ${CENTER + Math.cos((currentRotation * 2 * Math.PI) - Math.PI/2 + fovX * Math.PI) * getVisualScale(effectiveRange)} ${CENTER + Math.sin((currentRotation * 2 * Math.PI) - Math.PI/2 + fovX * Math.PI) * getVisualScale(effectiveRange)}
                  Z
                `}
                fill="rgba(0, 255, 0, 0.2)"
                stroke="rgba(0, 255, 0, 0.5)"
                strokeWidth="1"
              />

              {targets.map(t => (
                <circle
                  key={t.id}
                  cx={CENTER + (t.x / mapMaxDistance) * (VIEW_SIZE / 2)}
                  cy={CENTER + (t.y / mapMaxDistance) * (VIEW_SIZE / 2)}
                  r="3"
                  fill="#fff"
                />
              ))}

              {detectedTargets.map((t, i) => {
                const correctedAngleRad = (t.azimuth - 0.5) * 2 * Math.PI;
                return (
                  <circle
                    key={`${t.id}-${i}`}
                    cx={CENTER + Math.cos(correctedAngleRad) * getVisualScale(t.distance)}
                    cy={CENTER + Math.sin(correctedAngleRad) * getVisualScale(t.distance)}
                    r="4"
                    fill="#f00"
                  />
                );
              })}
            </svg>
          </div>

          <div style={{ marginTop: '10px', fontSize: '0.9em' }}>
            <div>Effective Range: {effectiveRange.toLocaleString()} m</div>
            <div>Map Scale: 1 unit = {(VIEW_SIZE / 2 / (mapMaxDistance / 1000)).toFixed(1)} km</div>
            <div style={{ color: '#aaa', fontSize: '0.8em' }}>Elevation Noise applied</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RadarSimulator;
