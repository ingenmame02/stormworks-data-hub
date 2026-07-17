import React, { useState } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

type LogicNode = {
  label: string;
  labelJa: string;
  mode: 'input' | 'output';
  type: string;
  description: string;
  descriptionJa: string;
};

type Property = {
  name: string;
  nameJa: string;
  description: string;
  descriptionJa: string;
};

export type PartData = {
  id: string;
  name: string;
  nameJa: string;
  category: string;
  dlc: string;
  description: string;
  descriptionJa: string;
  shortDescription: string;
  shortDescriptionJa: string;
  value: number;
  mass: number;
  logicNodes: LogicNode[];
  properties: Property[];
};

type PartCardProps = {
  part: PartData;
};

const typeLabels: Record<string, string> = {
  onoff: 'On/Off',
  number: 'Number',
  torque: 'Torque',
  electric: 'Electric',
  fluid: 'Fluid',
  composite: 'Composite',
  video: 'Video',
  audio: 'Audio',
  rope: 'Rope',
};

const typeColors: Record<string, string> = {
  onoff: '#d81d1d',
  number: '#1ed84d',
  torque: '#ff9900',
  electric: '#fbff00',
  fluid: '#00bfff',
  composite: '#8a19d4',
  video: '#13dfce',
  audio: '#96bb85',
  rope: '#cd853f',
};

const cardStyle: React.CSSProperties = {
  borderRadius: '0.9rem',
  padding: '1rem',
  marginBottom: '1rem',
  background: 'var(--block-card-bg)',
  boxShadow: 'var(--block-card-shadow)',
};

const nameRowStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '1rem',
  alignItems: 'flex-start',
  marginBottom: '0.75rem',
};

const imageWrapStyle: React.CSSProperties = {
  flex: '0 0 90px',
  width: '90px',
  height: '90px',
};

const nameAreaStyle: React.CSSProperties = {
  flex: '1 1 220px',
  minWidth: '220px',
};

const titleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: '1.15rem',
};

const dlcStyle: React.CSSProperties = {
  margin: '0.15rem 0 0 0',
  fontSize: '0.85rem',
  color: 'var(--block-description-text)',
};

const metaRowStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '1rem',
  fontSize: '0.85rem',
  color: 'var(--block-description-text)',
  marginBottom: '0.3rem',
};

const descriptionStyle: React.CSSProperties = {
  margin: '0 0 0.75rem 0',
  whiteSpace: 'pre-wrap',
  color: 'var(--block-description-text)',
  lineHeight: '1.6',
};

const sectionHeaderStyle: React.CSSProperties = {
  fontWeight: 700,
  marginBottom: '0.5rem',
  marginTop: '1rem',
};

const logicTableStyle: React.CSSProperties = {
  display: 'table',
  width: '100%',
  minWidth: '100%',
  maxWidth: '100%',
  borderCollapse: 'collapse',
  tableLayout: 'fixed',
};

const logicHeaderStyle: React.CSSProperties = {
  border: '1px solid var(--block-detail-border)',
  background: 'var(--block-detail-header-bg)',
  padding: '0.4rem',
  fontWeight: 700,
  textAlign: 'left',
};

const logicCellStyle: React.CSSProperties = {
  border: '1px solid var(--block-detail-border)',
  padding: '0.4rem',
  verticalAlign: 'top',
  width: 'auto',
  wordBreak: 'break-word',
};

const descriptionHeaderStyle: React.CSSProperties = {
  ...logicHeaderStyle,
  width: 'auto',
};

const descriptionCellStyle: React.CSSProperties = {
  ...logicCellStyle,
  width: 'auto',
};

const typeColStyle: React.CSSProperties = {
  ...logicCellStyle,
  width: '90px',
};

const labelColStyle: React.CSSProperties = {
  ...logicCellStyle,
  width: '140px',
};

const typeHeaderStyle: React.CSSProperties = {
  ...logicHeaderStyle,
  width: '90px',
};

const labelHeaderStyle: React.CSSProperties = {
  ...logicHeaderStyle,
  width: '140px',
};

const propNameHeaderStyle: React.CSSProperties = {
  ...logicHeaderStyle,
  width: '140px',
};

const propNameCellStyle: React.CSSProperties = {
  ...logicCellStyle,
  width: '140px',
};

function typeBadgeStyle(type: string): React.CSSProperties {
  const bg = typeColors[type] ?? '#888';
  return {
    display: 'inline-block',
    padding: '0.15rem 0.5rem',
    borderRadius: '0.4rem',
    background: bg,
    color: '#111',
    fontSize: '0.8rem',
    fontWeight: 600,
    whiteSpace: 'nowrap',
  };
}

export default function PartCard({ part }: PartCardProps) {
  const imgPath = `/img/Block_data/${part.category}/${part.name}.png`;
  const resolvedSrc = useBaseUrl(imgPath);
  const fallbackSrc = useBaseUrl('/img/stormworks_data_hub_logo.svg');
  const [imgSrc, setImgSrc] = useState(resolvedSrc);

  const inputNodes = part.logicNodes.filter((node) => node.mode === 'input');
  const outputNodes = part.logicNodes.filter((node) => node.mode === 'output');

  const displayName = part.nameJa || part.name;
  const displayShortDesc = part.shortDescriptionJa || part.shortDescription;
  const displayDesc = part.descriptionJa || part.description;
  const displayDlc = part.dlc || 'なし';

  const renderLogicTable = (title: string, nodes: LogicNode[]) => {
    if (nodes.length === 0) return null;

    return (
      <>
        <div style={sectionHeaderStyle}>{title}</div>
        <table style={logicTableStyle}>
          <colgroup>
            <col style={{ width: '90px' }} />
            <col style={{ width: '140px' }} />
            <col style={{ width: 'auto' }} />
          </colgroup>
          <thead>
            <tr>
              <th style={typeHeaderStyle}>種別</th>
              <th style={labelHeaderStyle}>ラベル</th>
              <th style={descriptionHeaderStyle}>説明</th>
            </tr>
          </thead>
          <tbody>
            {nodes.map((node, index) => (
              <tr key={`${node.mode}-${node.type}-${node.label}-${index}`}>
                <td style={typeColStyle}>
                  <span style={typeBadgeStyle(node.type)}>{typeLabels[node.type] ?? node.type}</span>
                </td>
                <td style={labelColStyle}>{node.labelJa || node.label}</td>
                <td style={descriptionCellStyle}>{node.descriptionJa || node.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  };

  return (
    <article style={cardStyle}>
      <div style={nameRowStyle}>
        <div style={imageWrapStyle}>
          <img
            src={imgSrc}
            alt={part.name}
            width="90"
            height="90"
            style={{ objectFit: 'contain', width: '100%', height: '100%' }}
            onError={() => {
              if (imgSrc !== fallbackSrc) setImgSrc(fallbackSrc);
            }}
          />
        </div>
        <div style={nameAreaStyle}>
          <h3 style={titleStyle}>{displayName}</h3>
          <div style={metaRowStyle}>
            <span>DLC依存: {displayDlc}</span>
            <span>コスト: ${part.value}</span>
            <span>重量: {part.mass} mass</span>
          </div>
          {displayShortDesc && (
            <p style={dlcStyle}>{displayShortDesc}</p>
          )}
        </div>
      </div>

      {displayDesc && (
        <p style={descriptionStyle}>{displayDesc}</p>
      )}

      {renderLogicTable('入力', inputNodes)}
      {renderLogicTable('出力', outputNodes)}

      {part.properties.length > 0 && (
        <>
          <div style={sectionHeaderStyle}>プロパティ</div>
          <table style={logicTableStyle}>
            <colgroup>
              <col style={{ width: '140px' }} />
              <col style={{ width: 'auto' }} />
            </colgroup>
            <thead>
              <tr>
                <th style={propNameHeaderStyle}>名前</th>
                <th style={descriptionHeaderStyle}>説明</th>
              </tr>
            </thead>
            <tbody>
              {part.properties.map((prop, i) => (
                <tr key={i}>
                  <td style={propNameCellStyle}>{prop.nameJa || prop.name}</td>
                  <td style={descriptionCellStyle}>{prop.descriptionJa || prop.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </article>
  );
}
