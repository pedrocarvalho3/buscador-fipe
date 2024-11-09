import {
  Card,
  CardContent,
  CardHeader,
  Container,
  Box,
  Table,
  TableCell,
  TableContainer,
  TableBody,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

function createData(marca, modelo, mesReferencia, combustivel, valor) {
  return { marca, modelo, mesReferencia, combustivel, valor };
}

const rows = [
  createData("Toyota", "Corolla", "Outubro", "Gasolina", 120000),
  createData("Honda", "Civic", "Outubro", "Gasolina", 110000),
  createData("Chevrolet", "Onix", "Outubro", "Flex", 70000),
  createData("Ford", "EcoSport", "Outubro", "Diesel", 85000),
  createData("Hyundai", "HB20", "Outubro", "Flex", 65000),
];

export default function HistoryTable() {
  return (
    <Box>
      <Container maxWidth="md">
        <Card>
          <CardHeader title="Histórico" />
          <CardContent>
            <TableContainer component={Paper}>
              <Table size="medium" aria-label="a car history table">
                <TableHead>
                  <TableRow>
                    <TableCell>Marca</TableCell>
                    <TableCell align="right">Modelo</TableCell>
                    <TableCell align="right">Mês de Referência</TableCell>
                    <TableCell align="right">Combustível</TableCell>
                    <TableCell align="right">Valor em R$</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.modelo}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.marca}
                      </TableCell>
                      <TableCell align="right">{row.modelo}</TableCell>
                      <TableCell align="right">{row.mesReferencia}</TableCell>
                      <TableCell align="right">{row.combustivel}</TableCell>
                      <TableCell align="right">
                        {row.valor.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
