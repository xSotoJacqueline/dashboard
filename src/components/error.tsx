// import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
// import RefreshIcon from '@mui/icons-material/Refresh';
// import { Alert, AlertTitle, Box, Button, Typography } from '@mui/material';
// import { useQueryErrorResetBoundary } from '@tanstack/react-query';
// import { type ErrorComponentProps, useRouter } from '@tanstack/react-router';
// import { useEffect } from 'react';

// export function PageError({ error }: ErrorComponentProps) {
//   const router = useRouter();
//   const queryErrorResetBoundary = useQueryErrorResetBoundary();

//   useEffect(() => {
//     queryErrorResetBoundary.reset();
//   }, [queryErrorResetBoundary]);

//   return (
//     <Box
//       alignItems="center"
//       display="flex"
//       flexDirection="column"
//       justifyContent="center"
//       minHeight="50vh"
//       padding={3}
//     >
//       <Box sx={{ padding: 4, maxWidth: 600, width: '100%' }}>
//         <Box mb={3} textAlign="center">
//           <ErrorOutlineIcon color="error" sx={{ fontSize: 60, mb: 2 }} />
//           <Typography color="error" component="h1" gutterBottom variant="h4">
//             ¡Oops! Algo salió mal
//           </Typography>
//           <Typography color="text.secondary" mb={3} variant="subtitle1">
//             Ha ocurrido un error inesperado. Por favor, inténtalo de nuevo.
//           </Typography>
//         </Box>

//         <Alert severity="error" sx={{ mb: 3 }}>
//           <AlertTitle>Detalles del error:</AlertTitle>
//           <Typography
//             component="pre"
//             sx={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}
//             variant="body2"
//           >
//             {error?.message || 'Error desconocido'}
//           </Typography>
//         </Alert>

//         <Box display="flex" gap={2} justifyContent="center">
//           <Button
//             color="primary"
//             onClick={() => {
//               router.invalidate();
//             }}
//             size="large"
//             startIcon={<RefreshIcon />}
//             type="button"
//             variant="contained"
//           >
//             Reintentar
//           </Button>
//         </Box>

//         <Box mt={2} textAlign="center">
//           <Typography color="text.secondary" variant="caption">
//             Si el problema persiste, contacta al soporte técnico
//           </Typography>
//         </Box>
//       </Box>
//     </Box>
//   );
// }