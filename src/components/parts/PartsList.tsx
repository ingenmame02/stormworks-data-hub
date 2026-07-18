import React from 'react';
import PartCard, { type PartData } from './PartCard';

export type PartsCategory = {
  name: string;
  parts: PartData[];
};

type PartsListProps = {
  categories: PartsCategory[];
};

/**
 * Renders the full parts catalogue from the generated parts_index.json.
 * Kept separate from MDX so locale-aware UI can live in React components.
 */
export default function PartsList({ categories }: PartsListProps) {
  return (
    <>
      {categories.map((category) => (
        <div key={category.name}>
          <h2 id={category.name}>{category.name}</h2>
          {category.parts.map((part) => (
            <PartCard key={part.id} part={part} />
          ))}
        </div>
      ))}
    </>
  );
}
