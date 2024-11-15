import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setHistory } from "../redux/historySlice";
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

export default function HistoryTable() {
  const dispatch = useDispatch();
  const rows = useSelector((state) => state.history);

  useEffect(() => {
    const storedRows = localStorage.getItem("carHistory");
    if (storedRows) {
      dispatch(setHistory(JSON.parse(storedRows)));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("carHistory", JSON.stringify(rows));
  }, [rows]);

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
                  {rows.map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.marca}
                      </TableCell>
                      <TableCell align="right">{row.modelo}</TableCell>
                      <TableCell align="right">{row.mesReferencia}</TableCell>
                      <TableCell align="right">{row.combustivel}</TableCell>
                      <TableCell align="right">
                        {parseFloat(
                          row.valor
                            .replace("R$", "")
                            .replace(".", "")
                            .replace(",", ".")
                        ).toLocaleString("pt-BR", {
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
