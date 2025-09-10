# Query Context

Este contexto proporciona acceso centralizado a `queryString` y `labelTimePeriod` en toda la aplicación de dashboard, eliminando la necesidad de pasar estos valores como props.

## Configuración

El `QueryProvider` está configurado en `/dashboard/route.tsx` y envuelve todas las rutas del dashboard, por lo que está disponible automáticamente en todos los componentes hijos.

## Hooks disponibles

### `useQuery()`
Devuelve el objeto completo del contexto:
```tsx
import { useQuery } from '@/contexts/query-context';

function MyComponent() {
  const { queryString, labelTimePeriod, search } = useQuery();
  // ...
}
```

### `useQueryString()`
Devuelve solo el queryString:
```tsx
import { useQueryString } from '@/contexts/query-context';

function MyComponent() {
  const queryString = useQueryString();
  // ...
}
```

### `useLabelTimePeriod()`
Devuelve solo el labelTimePeriod:
```tsx
import { useLabelTimePeriod } from '@/contexts/query-context';

function MyComponent() {
  const labelTimePeriod = useLabelTimePeriod();
  // ...
}
```

### `useSearchParams()`
Devuelve los parámetros de búsqueda procesados:
```tsx
import { useSearchParams } from '@/contexts/query-context';

function MyComponent() {
  const search = useSearchParams();
  // search contiene: { from, to, page, filters, joinOperator }
  // ...
}
```

## Migración desde createQueryString

### Antes:
```tsx
import { createQueryString } from '@/lib/utils';
import { useSearch } from '@tanstack/react-router';

function MyComponent() {
  const search = useSearch({ from: '/dashboard/mi-ruta' });
  const { queryString, labelTimePeriod } = createQueryString({ 
    fromPeriod: search.from, 
    toPeriod: search.to 
  });
  
  return <OtroComponente queryString={queryString} labelTimePeriod={labelTimePeriod} />;
}
```

### Después:
```tsx
import { useQuery } from '@/contexts/query-context';

function MyComponent() {
  const { queryString, labelTimePeriod } = useQuery();
  
  return <OtroComponente queryString={queryString} labelTimePeriod={labelTimePeriod} />;
}
```

## Beneficios

1. **Menos props drilling**: No necesitas pasar queryString y labelTimePeriod como props
2. **Centralizado**: Un solo lugar donde se calculan estos valores
3. **Consistente**: Todos los componentes usan la misma lógica
4. **Simplificado**: Menos código repetitivo en cada componente
5. **Reactivo**: Se actualiza automáticamente cuando cambian los parámetros de búsqueda

## Archivos que necesitan migración

Los siguientes archivos aún usan `createQueryString` y pueden migrar al contexto:

- `/dashboard/bonos.tsx`
- `/dashboard/depositos.tsx`
- `/dashboard/retiros.tsx`
- `/dashboard/metricas.tsx`

Y cualquier componente que reciba `queryString` o `labelTimePeriod` como props puede acceder directamente al contexto en su lugar.
