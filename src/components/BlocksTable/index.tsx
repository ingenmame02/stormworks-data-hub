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
        return a[sortKey] - b[sortKey];
      }

      return a.name.localeCompare(b.name);
    });
  }, [category.blocks, sortKey]);

  return (
    <section>
      {category.description && <p>{category.description}</p>}
      <table>
        <thead>
          <tr>
            <th>
              <button type="button" onClick={() => onSortChange('offset')}>
                ゲーム内順序
              </button>
              <button type="button" onClick={() => onSortChange('name')}>
                名前
              </button>
            </th>
            <th>画像</th>
            <th>
              <button type="button" onClick={() => onSortChange('mass')}>
                質量
              </button>
            </th>
            <th>
              <button type="button" onClick={() => onSortChange('cost')}>
                コスト
              </button>
            </th>
            <th>説明</th>
          </tr>
        </thead>
        <tbody>
          {sortedBlocks.map((block) => (
            <tr key={block.name}>
              <td>{block.name}</td>
              <td>
                <BlockImage src={block.image} alt={block.name} />
              </td>
              <td>{block.mass}</td>
              <td>{block.cost}</td>
              <td>{block.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
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
      width="64"
      height="64"
      style={{objectFit: 'contain'}}
      onError={() => {
        if (currentSrc !== fallbackSrc) {
          setCurrentSrc(fallbackSrc);
        }
      }}
    />
  );
}
