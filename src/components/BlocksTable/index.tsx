import React, {useMemo, useState} from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {type BlockCategory, blockCategories} from '@site/src/data/blocks';

type SortKey = 'offset' | 'name' | 'mass' | 'cost';

type BlocksTableProps = {
  categoryIndex?: number;
};

export default function BlocksTable({categoryIndex}: BlocksTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>('offset');

  // categoryIndexが指定されている場合はそのカテゴリーのみ、なければすべて表示
  const categoriesToShow = categoryIndex !== undefined 
    ? [blockCategories[categoryIndex]]
    : blockCategories;

  return (
    <>
      {categoryIndex === undefined && <p>表の見出しボタンを押すと、各カテゴリー内で並び替えできます。</p>}

      {categoriesToShow.map((category) => (
        <BlockCategoryTable
          key={category.name}
          category={category}
          sortKey={sortKey}
          onSortChange={setSortKey}
        />
      ))}
    </>
  );
}

type BlockCategoryTableProps = {
  category: BlockCategory;
  sortKey: SortKey;
  onSortChange: (sortKey: SortKey) => void;
};

function BlockCategoryTable({
  category,
  sortKey,
  onSortChange,
}: BlockCategoryTableProps) {
  const sortedBlocks = useMemo(() => {
    if (sortKey === 'offset') {
      return [...category.blocks];
    }

    return [...category.blocks].sort((a, b) => {
      if (sortKey === 'mass' || sortKey === 'cost') {
        return b[sortKey] - a[sortKey];
      }

      return a.name.localeCompare(b.name);
    });
  }, [category.blocks, sortKey]);

  const sectionStyle = {
    marginBottom: '2rem',
  };

  const controlsStyle = {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '0.5rem',
    marginBottom: '1rem',
    alignItems: 'center',
  };

  const sortButtonStyle = (active: boolean) => ({
    border: '1px solid #999',
    background: active ? '#f0f0f0' : 'transparent',
    color: '#111',
    cursor: 'pointer',
    padding: '0.45rem 0.75rem',
    borderRadius: '0.35rem',
    fontSize: '0.95rem',
  });

  const cardStyle = {
    border: '1px solid #ddd',
    borderRadius: '0.9rem',
    padding: '1rem',
    marginBottom: '1rem',
    background: '#fff',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
  };

  const cardHeaderStyle = {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '1rem',
    alignItems: 'flex-start',
    marginBottom: '1rem',
  };

  const imageWrapperStyle = {
    flex: '0 0 120px',
    width: '120px',
    height: '120px',
  };

  const cardTitleStyle = {
    margin: 0,
    fontSize: '1.15rem',
  };

  const blockInfoStyle = {
    flex: '1 1 220px',
    minWidth: '220px',
  };

  const descriptionStyle = {
    margin: '0',
    whiteSpace: 'pre-wrap' as const,
    color: '#333',
    lineHeight: '1.6',
  };

  const detailTableStyle = {
    width: '100%',
    borderCollapse: 'collapse' as const,
    marginTop: '0.75rem',
  };

  const detailCellStyle = {
    border: '1px solid #ddd',
    padding: '0.65rem',
    verticalAlign: 'top' as const,
  };

  const detailHeaderStyle = {
    ...detailCellStyle,
    width: '120px',
    background: '#fafafa',
    fontWeight: 600,
  };

  const logicTypeColors: Record<string, string> = {
    音声: '#96bb85',
    映像: '#13c7df',
    'オン/オフ': '#d81d1d',
    数値: '#1ed84d',
    複合信号: '#8a19d4',
  };

  const logicTextStyle = {
    margin: 0,
    whiteSpace: 'pre-wrap' as const,
    wordBreak: 'break-word' as const,
    lineHeight: '1.6',
  };

  const logicTableStyle = {
    width: '100%',
    minWidth: '100%',
    maxWidth: '100%',
    tableLayout: 'fixed' as const,
    borderCollapse: 'collapse' as const,
  };

  const logicTableHeaderStyle = {
    border: '1px solid #ddd',
    background: '#fafafa',
    padding: '0.5rem',
    fontWeight: 700,
    textAlign: 'left' as const,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap' as const,
  };

  const logicTableCellStyle = {
    border: '1px solid #ddd',
    padding: '0.5rem',
    verticalAlign: 'top' as const,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    wordBreak: 'break-word' as const,
    whiteSpace: 'pre-wrap' as const,
    minWidth: 0,
  };

  const logicTypeStyle = (type: string) => ({
    display: 'inline-flex',
    alignItems: 'center',
    padding: '0.3rem 0.55rem',
    borderRadius: '0.55rem',
    background: logicTypeColors[type] ?? '#f0f0f0',
    color: '#111',
    fontSize: '0.85rem',
    fontWeight: 600,
  });

  const renderSignalRows = (signals?: { type: string; name?: string; description: string }[]) =>
    signals?.map((signal, index) => (
      <tr key={`${signal.type}-${index}`}>
        <td style={logicTableCellStyle}>
          <span style={logicTypeStyle(signal.type)}>{signal.type}</span>
        </td>
        <td style={logicTableCellStyle}>{signal.name ?? '—'}</td>
        <td style={logicTableCellStyle}>{signal.description}</td>
      </tr>
    ));

  const renderLogicSection = (logic: string | { input?: { type: string; name?: string; description: string }[]; output?: { type: string; name?: string; description: string }[] } | undefined) => {
    if (!logic || logic === 'なし') {
      return <p style={logicTextStyle}>なし</p>;
    }

    if (typeof logic === 'string') {
      return <p style={logicTextStyle}>{logic}</p>;
    }

    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', width: '100%', gap: '1rem' }}>
        {logic.input && logic.input.length > 0 && (
          <div>
            <div style={{ fontWeight: 700, marginBottom: '0.5rem' }}>ロジック入力</div>
            <table style={logicTableStyle}>
              <thead>
                <tr>
                  <th style={{...logicTableHeaderStyle, width: '15%'}}>タイプ</th>
                  <th style={{...logicTableHeaderStyle, width: '30%'}}>名前</th>
                  <th style={{...logicTableHeaderStyle, width: '55%'}}>説明</th>
                </tr>
              </thead>
              <tbody>{renderSignalRows(logic.input)}</tbody>
            </table>
          </div>
        )}

        {logic.output && logic.output.length > 0 && (
          <div>
            <div style={{ fontWeight: 700, marginBottom: '0.5rem' }}>ロジック出力</div>
            <table style={logicTableStyle}>
              <thead>
                <tr>
                  <th style={{...logicTableHeaderStyle, width: '15%'}}>タイプ</th>
                  <th style={{...logicTableHeaderStyle, width: '30%'}}>名前</th>
                  <th style={{...logicTableHeaderStyle, width: '55%'}}>説明</th>
                </tr>
              </thead>
              <tbody>{renderSignalRows(logic.output)}</tbody>
            </table>
          </div>
        )}
      </div>
    );
  };

  return (
    <section style={sectionStyle}>
      {category.description && <p>{category.description}</p>}
      <div style={controlsStyle}>
        <span>並び替え:</span>
        <button
          type="button"
          style={sortButtonStyle(sortKey === 'offset')}
          onClick={() => onSortChange('offset')}
        >
          ゲーム内順序
        </button>
        <button
          type="button"
          style={sortButtonStyle(sortKey === 'name')}
          onClick={() => onSortChange('name')}
        >
          名前
        </button>
        <button
          type="button"
          style={sortButtonStyle(sortKey === 'mass')}
          onClick={() => onSortChange('mass')}
        >
          重量
        </button>
        <button
          type="button"
          style={sortButtonStyle(sortKey === 'cost')}
          onClick={() => onSortChange('cost')}
        >
          コスト
        </button>
      </div>

      {sortedBlocks.map((block) => (
        <article key={block.name} style={cardStyle}>
          <div style={cardHeaderStyle}>
            <div style={blockInfoStyle}>
              <h3 style={cardTitleStyle}>{block.name}</h3>
              <p style={descriptionStyle}>{block.description}</p>
            </div>
            <div style={imageWrapperStyle}>
              <BlockImage src={block.image} alt={block.name} />
            </div>
          </div>

          <table style={detailTableStyle}>
            <tbody>
              <tr>
                <th style={detailHeaderStyle}>コスト</th>
                <td style={detailCellStyle}>{block.cost}</td>
              </tr>
              <tr>
                <th style={detailHeaderStyle}>重量</th>
                <td style={detailCellStyle}>{block.mass}</td>
              </tr>
                  <tr>
                <th style={detailHeaderStyle}>ロジック</th>
                <td style={detailCellStyle}>{renderLogicSection(block.logic)}</td>
              </tr>
            </tbody>
          </table>
        </article>
      ))}
    </section>
  );
}

function BlockImage({src, alt}: {src: string; alt: string}) {
  const fallbackSrc = useBaseUrl('/img/stormworks_data_hub_logo.svg');
  const resolvedSrc = useBaseUrl(src || '/img/stormworks_data_hub_logo.svg');
  const [currentSrc, setCurrentSrc] = useState(resolvedSrc);

  return (
    <img
      src={currentSrc}
      alt={alt}
      width="120"
      height="120"
      style={{objectFit: 'contain', width: '100%', height: '100%'}}
      onError={() => {
        if (currentSrc !== fallbackSrc) {
          setCurrentSrc(fallbackSrc);
        }
      }}
    />
  );
}
