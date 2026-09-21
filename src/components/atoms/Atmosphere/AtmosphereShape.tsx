import type { CSSProperties } from 'react';

import { tokens } from '@/design-system';
import { PARALLAX_ATTR } from '@/hooks/animations';

import { CANVAS_WIDTH, type AtmosphereShape as Shape, type ShapeAnchor } from './shapes';

type AtmosphereShapeProps = {
  shape: Shape;
  /** Desplazamiento vertical extra, en px del lienzo (para repetir patrones). */
  offsetY?: number;
};

/**
 * Una forma difuminada de la atmósfera.
 *
 * Todas son una caja absoluta con `filter: blur()`; lo que cambia es qué hay
 * adentro: un fondo plano (rectángulo), un fondo redondeado (elipse) o un SVG
 * con el path literal de Figma (blob). Mantenerlas como el mismo tipo de capa
 * es lo que hace que el parallax y el apilado se comporten igual para todas.
 *
 * Los valores van inline y no como clases porque son geometría medida (px del
 * lienzo), no tokens de espaciado — no tiene sentido inventar utilidades para
 * `left: calc(50% - 1601px)`.
 */
export function AtmosphereShape({ shape, offsetY = 0 }: AtmosphereShapeProps) {
  const { box, color, blur, blend, anchor = 'center' } = shape;
  const blurPx = tokens.textures.atmosphereBlur[blur];
  const fill = tokens.color.atmosphere[color];

  const style: CSSProperties = {
    ...horizontalPosition(box, anchor),
    top: box.y + offsetY,
    width: box.w,
    height: box.h,
    filter: `blur(${blurPx}px)`,
    mixBlendMode: blend,
    ...(shape.kind === 'blob'
      ? {}
      : { backgroundColor: fill, borderRadius: shape.kind === 'ellipse' ? '50%' : undefined }),
  };

  return (
    <div {...{ [PARALLAX_ATTR]: 'subtle' }} className="absolute will-change-transform" style={style}>
      {shape.kind === 'blob' && <Blob path={shape.path} box={box} blurPx={blurPx} fill={fill} />}
    </div>
  );
}

/** Traduce la `x` del lienzo de Figma a una posición en el viewport. */
function horizontalPosition(box: Shape['box'], anchor: ShapeAnchor): CSSProperties {
  switch (anchor) {
    case 'left':
      return { left: box.x };
    case 'right':
      return { right: CANVAS_WIDTH - box.x - box.w };
    case 'center':
      return { left: `calc(50% + ${box.x - CANVAS_WIDTH / 2}px)` };
  }
}

type BlobProps = {
  path: string;
  box: Shape['box'];
  blurPx: number;
  fill: string;
};

/**
 * El path viene con un margen de `2 × blur` alrededor de la caja (Figma exporta
 * el área que necesita el filtro). Recortar el `viewBox` con ese offset deja el
 * blob exactamente donde está en el diseño; el blur lo aporta el contenedor.
 */
function Blob({ path, box, blurPx, fill }: BlobProps) {
  const pad = blurPx * 2;

  return (
    <svg
      aria-hidden
      className="size-full overflow-visible"
      viewBox={`${pad} ${pad} ${box.w} ${box.h}`}
      preserveAspectRatio="none"
    >
      <path d={path} fill={fill} />
    </svg>
  );
}
