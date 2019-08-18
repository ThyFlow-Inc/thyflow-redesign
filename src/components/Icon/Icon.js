import React from 'react';

export default function Icon({
  icon,
  className,
  style,
  colour,
}) {
  return (
    <svg style={{...style}} className={className} viewBox={`${icon.viewBox}`} fill={colour}>
      <use xlinkHref={`#${icon.id}`} />
    </svg>
  );
}
