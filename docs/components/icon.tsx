import React from 'react';

export function Icon({ name, size }: { name: string; size?: string }) {
  return (
    <span
      className="material-symbols-rounded"
      style={{
        fontSize: size == null ? undefined : Number(size),
      }}
    >
      {name}
    </span>
  );
}
