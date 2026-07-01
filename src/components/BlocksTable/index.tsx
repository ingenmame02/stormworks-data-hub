import React, {useMemo, useState} from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {type BlockCategory, type BlockSettings, blockCategories} from '../../data/blocks';

// useBaseUrl: Docusaurusの静的アセットのパスを正しく解決するために使用
// blockCategories: JSON/データ定義から読み込んだブロックカテゴリ一覧

// ソートの基準として使うキー
type SortKey = 'offset' | 'name' | 'mass' | 'cost';

type BlocksTableProps = {
  // categoryIndex が与えられたときはそのカテゴリだけを表示する
  categoryIndex?: number;
};

// メインコンポーネント: カテゴリごとのブロック一覧を表示する
export default function BlocksTable({categoryIndex}: BlocksTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>('offset');

  // categoryIndex が指定されていれば、そのカテゴリだけを表示
  // 未指定なら全カテゴリを表示する
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

// カテゴリごとのカード一覧をレンダリングするコンポーネント
function BlockCategoryTable({
  category,
  sortKey,
  onSortChange,
}: BlockCategoryTableProps) {
  const sortedBlocks = useMemo(() => {
    // ソートキーに応じたブロックの順序を決める
    if (sortKey === 'offset') {
      // ゲーム内表示順（元の順序）のまま
      return [...category.blocks];
    }

    return [...category.blocks].sort((a, b) => {
      if (sortKey === 'mass' || sortKey === 'cost') {
        // 数値フィールドは降順で表示
        return b[sortKey] - a[sortKey];
      }

      // 名前はアルファベット順にソート
      return a.name.localeCompare(b.name);
    });
  }, [category.blocks, sortKey]);

  // カード全体のレイアウト用スタイル定義
  const sectionStyle = {
    marginBottom: '2rem',
  };

  // ソートボタンなどのコントロール領域のスタイル
  // ソートボタンと説明文を並べるコントロール領域のスタイル
  const controlsStyle = {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '0.5rem',
    marginBottom: '1rem',
    alignItems: 'center',
  };

  // ソートボタンの共通スタイル。現在選択中のボタンを強調表示する
  const sortButtonStyle = (active: boolean) => ({
    background: active ? 'var(--block-sort-button-active-bg)' : 'var(--block-sort-button-bg)',
    color: 'var(--block-sort-button-text)',
  });

  // ブロックごとのカード全体の外枠スタイル
  const cardStyle = {
    borderRadius: '0.9rem',
    padding: '1rem',
    marginBottom: '1rem',
    background: 'var(--block-card-bg)',
    boxShadow: 'var(--block-card-shadow)',
  };

  // カード上部の見出しエリア: ブロック情報と画像を横並びにする
  const cardHeaderStyle = {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '1rem',
    alignItems: 'flex-start',
    marginBottom: '1rem',
  };

  // 画像エリアの固定サイズボックス
  const imageWrapperStyle = {
    flex: '0 0 120px',
    width: '120px',
    height: '120px',
  };

  // ブロック名タイトルの装飾
  const cardTitleStyle = {
    margin: 0,
    fontSize: '1.15rem',
  };

  // ブロック名/説明文エリアの横幅調整
  const blockInfoStyle = {
    flex: '1 1 220px',
    minWidth: '220px',
  };

  const descriptionStyle = {
    margin: '0',
    whiteSpace: 'pre-wrap' as const,
    color: 'var(--block-description-text)',
    lineHeight: '1.6',
  };

  // テーブル列の幅を定義して、テーブル内の表示崩れを防ぐ
  const detailLabelWidth = '100px';
  const logicTypeColumnWidth = '90px';
  const logicNameColumnWidth = '140px';
  const settingNameColumnWidth = '140px';

  // ブロック詳細テーブル全体のスタイル
  const detailTableStyle = {
    width: '100%',
    borderCollapse: 'collapse' as const,
    marginTop: '0.75rem',
    tableLayout: 'fixed' as const,
    boxSizing: 'border-box' as const,
  };

  const detailCellStyle = {
    border: '1px solid var(--block-detail-border)',
    padding: '0.65rem',
    verticalAlign: 'top' as const,
    width: 'auto',
    minWidth: 0,
    overflow: 'hidden' as const,
    overflowWrap: 'break-word' as const,
    wordBreak: 'break-word' as const,
    boxSizing: 'border-box' as const,
  };

  const detailHeaderStyle = {
    ...detailCellStyle,
    width: detailLabelWidth,
    minWidth: detailLabelWidth,
    background: 'var(--block-detail-header-bg)',
    fontWeight: 600,
  };

  const logicTypeColors: Record<string, string> = {
    音声: '#96bb85',
    映像: '#13dfce',
    'オン/オフ': '#d81d1d',
    数値: '#1ed84d',
    複合信号: '#8a19d4',
    '電力': '#fbff00',
    動力: '#ff9900',
    '流体': '#00bfff',
  };

  const logicTextStyle = {
    margin: 0,
    whiteSpace: 'pre-wrap' as const,
    wordBreak: 'break-word' as const,
    lineHeight: '1.6',
  };

  const logicTableStyle = {
    width: '100%',
    tableLayout: 'fixed' as const,
    borderCollapse: 'collapse' as const,
    boxSizing: 'border-box' as const,
  };

  const logicTableHeaderStyle = {
    border: '1px solid var(--block-detail-border)',
    background: 'var(--block-detail-header-bg)',
    padding: '0.5rem',
    fontWeight: 700,
    textAlign: 'left' as const,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap' as const,
    boxSizing: 'border-box' as const,
  };

  const logicTableCellStyle = {
    border: '1px solid var(--block-detail-border)',
    padding: '0.5rem',
    verticalAlign: 'top' as const,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    wordBreak: 'break-word' as const,
    whiteSpace: 'pre-wrap' as const,
    minWidth: 0,
    width: 'auto',
    maxWidth: '100%',
    boxSizing: 'border-box' as const,
  };

  const logicTableTypeCellStyle = {
    ...logicTableCellStyle,
    width: logicTypeColumnWidth,
    minWidth: logicTypeColumnWidth,
    maxWidth: logicTypeColumnWidth,
    whiteSpace: 'normal' as const,
    overflowWrap: 'break-word' as const,
  };

  const logicTableNameCellStyle = {
    ...logicTableCellStyle,
    width: logicNameColumnWidth,
    minWidth: logicNameColumnWidth,
    maxWidth: logicNameColumnWidth,
    whiteSpace: 'normal' as const,
    overflowWrap: 'break-word' as const,
  };

  const settingsNameCellStyle = {
    ...logicTableCellStyle,
    width: settingNameColumnWidth,
    minWidth: settingNameColumnWidth,
    maxWidth: settingNameColumnWidth,
    whiteSpace: 'normal' as const,
    overflowWrap: 'break-word' as const,
  };

  // ロジック信号タイプをラベル化するスタイル関数
  const logicTypeStyle = (type: string) => ({
    display: 'inline-flex',
    alignItems: 'center',
    padding: '0.3rem 0.55rem',
    borderRadius: '0.55rem',
    background: logicTypeColors[type] ?? '#f0f0f0',
    color: '#111',
    fontSize: '0.85rem',
    fontWeight: 600,
    whiteSpace: 'normal' as const,
    overflowWrap: 'break-word' as const,
  });

  // ロジック入力/出力の行を生成する共通関数
  // signal.type をラベルとして表示し、name/descriptionをそれぞれの列に配置
  const renderSignalRows = (signals?: { type: string; name?: string; description: string }[]) =>
    signals?.map((signal, index) => (
      <tr key={`${signal.type}-${index}`}>
        <td style={logicTableTypeCellStyle}>
          <span style={logicTypeStyle(signal.type)}>{signal.type}</span>
        </td>
        <td style={logicTableNameCellStyle}>{signal.name ?? '—'}</td>
        <td style={logicTableCellStyle}>{signal.description}</td>
      </tr>
    ));

  // 設定項目のテーブル行を生成するサブレンダラー
  const renderSettingsRows = (settings?: BlockSettings[]) =>
    settings?.map((setting, index) => (
      <tr key={`${setting.name ?? 'setting'}-${index}`}>
        <td style={settingsNameCellStyle}>{setting.name ?? '—'}</td>
        <td style={logicTableCellStyle}>{setting.description}</td>
      </tr>
    ));

  // ブロックのロジック情報をレンダリングする関数
  // 文字列、なし、または入出力テーブル形式に対応する
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
              <colgroup>
                <col style={{ width: logicTypeColumnWidth }} />
                <col style={{ width: logicNameColumnWidth }} />
                <col style={{ width: 'auto' }} />
              </colgroup>
              <thead>
                <tr>
                  <th style={{...logicTableHeaderStyle}}>タイプ</th>
                  <th style={{...logicTableHeaderStyle}}>名前</th>
                  <th style={{...logicTableHeaderStyle}}>説明</th>
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
              <colgroup>
                <col style={{ width: logicTypeColumnWidth }} />
                <col style={{ width: logicNameColumnWidth }} />
                <col style={{ width: 'auto' }} />
              </colgroup>
              <thead>
                <tr>
                  <th style={{...logicTableHeaderStyle}}>タイプ</th>
                  <th style={{...logicTableHeaderStyle}}>名前</th>
                  <th style={{...logicTableHeaderStyle}}>説明</th>
                </tr>
              </thead>
              <tbody>{renderSignalRows(logic.output)}</tbody>
            </table>
          </div>
        )}
      </div>
    );
  };

  // 設定項目をレンダリングする関数
  // 設定が文字列、なし、または配列形式で表現される場合に対応する
  // 設定項目セクションをレンダリングする関数
  // settings が文字列の場合はそのまま表示し、配列の場合はテーブルに展開する
  const renderSettingsSection = (settings: string | BlockSettings[] | undefined) => {
    if (!settings || settings === 'なし') {
      return <p style={logicTextStyle}>なし</p>;
    }

    if (typeof settings === 'string') {
      return <p style={logicTextStyle}>{settings}</p>;
    }

    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', width: '100%', gap: '1rem' }}>
        {settings && settings.length > 0 && (
          <div>
            <table style={logicTableStyle}>
              <colgroup>
                <col width={settingNameColumnWidth} style={{ width: settingNameColumnWidth, maxWidth: settingNameColumnWidth }} />
                <col width="auto" />
              </colgroup>
              <thead>
                <tr>
                  <th style={{...logicTableHeaderStyle}}>名前</th>
                  <th style={{...logicTableHeaderStyle}}>説明</th>
                </tr>
              </thead>
              <tbody>{renderSettingsRows(settings)}</tbody>
            </table>
          </div>
        )}
      </div>
    );
  };

  return (
    // 1カテゴリ分のセクション全体を囲む
    <section style={sectionStyle}>
      {/* カテゴリ説明がある場合のみ表示 */}
      {category.description && <p>{category.description}</p>}

      {/* ソート操作ボタン */}
      <div style={controlsStyle}>
        <span>並び替え:</span>
        <button
          type="button"
          className={`blocks-table-sort-button${sortKey === 'offset' ? ' active' : ''}`}
          style={sortButtonStyle(sortKey === 'offset')}
          onClick={() => onSortChange('offset')}
        >
          ゲーム内順序
        </button>
        <button
          type="button"
          className={`blocks-table-sort-button${sortKey === 'name' ? ' active' : ''}`}
          style={sortButtonStyle(sortKey === 'name')}
          onClick={() => onSortChange('name')}
        >
          名前
        </button>
        <button
          type="button"
          className={`blocks-table-sort-button${sortKey === 'mass' ? ' active' : ''}`}
          style={sortButtonStyle(sortKey === 'mass')}
          onClick={() => onSortChange('mass')}
        >
          重量
        </button>
        <button
          type="button"
          className={`blocks-table-sort-button${sortKey === 'cost' ? ' active' : ''}`}
          style={sortButtonStyle(sortKey === 'cost')}
          onClick={() => onSortChange('cost')}
        >
          コスト
        </button>
      </div>

      {sortedBlocks.map((block) => (
        <article key={block.name} className="blocks-table-card" style={cardStyle}>
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
            <colgroup>
              <col width={detailLabelWidth} style={{ width: detailLabelWidth, maxWidth: detailLabelWidth }} />
              <col width="auto" />
            </colgroup>
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
              <tr>
                <th style={detailHeaderStyle}>設定項目</th>
                <td style={detailCellStyle}>{renderSettingsSection(block.settings)}</td>
              </tr>
            </tbody>
          </table>
        </article>
      ))}
    </section>
  );
}

// 画像コンポーネント: 画像の読み込みに失敗した場合はフォールバック画像を表示する
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
        // 画像の読み込みに失敗した場合、フォールバック画像へ切り替え
        if (currentSrc !== fallbackSrc) {
          setCurrentSrc(fallbackSrc);
        }
      }}
    />
  );
}
//