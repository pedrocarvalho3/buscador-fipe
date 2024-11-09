import { Container, Typography, Box } from "@mui/material";
import HistoryTable from "./HistoryTable";
import CarFinder from "./CarFinder";

export default function BuscadorFIPE() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        maxWidth: "100vw",
        backgroundColor: "#f0f0f0",
        display: "flex",
        flexDirection: "column",
        overflowX: "hidden",
      }}
    >
      <Box component="header" sx={{ backgroundColor: "white", boxShadow: 1 }}>
        <Container maxWidth="md" sx={{ py: 3 }}>
          <Typography variant="h3" component="h1" color="textPrimary">
            Buscador Tabela FIPE
          </Typography>
        </Container>
      </Box>

      <CarFinder />

      <HistoryTable />

      <Box
        component="footer"
        sx={{ backgroundColor: "white", boxShadow: 1, mt: 8 }}
      >
        <Container maxWidth="md" sx={{ py: 2 }}>
          <Typography variant="body2" color="textSecondary" align="center">
            © 2023 Buscador Tabela FIPE. Todos os direitos reservados.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}
