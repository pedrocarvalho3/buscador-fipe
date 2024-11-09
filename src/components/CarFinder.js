import { useState } from "react";
import { Search as SearchIcon } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  CardActions,
  CardHeader,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Container,
  Typography,
  Box,
} from "@mui/material";

export default function CarFinder() {
  const [resultado, setResultado] = useState(null);
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [ano, setAno] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setResultado("Corolla 2022 D");
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, py: 5 }}>
      <Container maxWidth="md">
        <Card>
          <CardHeader title="Buscar Veículo" />
          <CardContent>
            <form onSubmit={handleSubmit}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="marca-label">Marca</InputLabel>
                <Select
                  labelId="marca-label"
                  id="marca"
                  value={marca}
                  label="Marca"
                  onChange={(e) => setMarca(e.target.value)}
                >
                  <MenuItem value="fiat">Fiat</MenuItem>
                  <MenuItem value="ford">Ford</MenuItem>
                  <MenuItem value="volkswagen">Volkswagen</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth margin="normal">
                <InputLabel id="modelo-label">Modelo</InputLabel>
                <Select
                  labelId="modelo-label"
                  id="modelo"
                  value={modelo}
                  label="Modelo"
                  onChange={(e) => setModelo(e.target.value)}
                >
                  <MenuItem value="modelo1">Modelo 1</MenuItem>
                  <MenuItem value="modelo2">Modelo 2</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth margin="normal">
                <InputLabel id="ano-label">Ano</InputLabel>
                <Select
                  labelId="ano-label"
                  id="ano"
                  value={ano}
                  label="Ano"
                  onChange={(e) => setAno(e.target.value)}
                >
                  <MenuItem value="2023">2023</MenuItem>
                  <MenuItem value="2022">2022</MenuItem>
                </Select>
              </FormControl>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                startIcon={<SearchIcon />}
              >
                Buscar
              </Button>
            </form>
          </CardContent>
          {resultado && (
            <CardActions>
              <Box
                sx={{
                  width: "100%",
                  p: 2,
                  backgroundColor: "#f9f9f9",
                  borderRadius: 1,
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Resultado da Busca
                </Typography>
                <Typography>{resultado}</Typography>
              </Box>
            </CardActions>
          )}
        </Card>
      </Container>
    </Box>
  );
}
