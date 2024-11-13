import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addEntry } from "./Store";
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
  const dispatch = useDispatch();
  const [resultado, setResultado] = useState(null);
  const [marcas, setMarcas] = useState([]);
  const [modelos, setModelos] = useState([]);
  const [anos, setAnos] = useState([]);
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [ano, setAno] = useState("");

  useEffect(() => {
    async function fetchMarcas() {
      try {
        const response = await fetch(
          "https://parallelum.com.br/fipe/api/v1/carros/marcas"
        );
        const data = await response.json();
        setMarcas(data);
      } catch (error) {
        console.error("Erro ao buscar marcas:", error);
      }
    }
    fetchMarcas();
  }, []);

  useEffect(() => {
    if (marca) {
      async function fetchModelos() {
        try {
          const response = await fetch(
            `https://parallelum.com.br/fipe/api/v1/carros/marcas/${marca}/modelos`
          );
          const data = await response.json();
          setModelos(data.modelos);
        } catch (error) {
          console.error("Erro ao buscar modelos:", error);
        }
      }
      fetchModelos();
    }
  }, [marca]);

  useEffect(() => {
    if (marca && modelo) {
      async function fetchAnos() {
        try {
          const response = await fetch(
            `https://parallelum.com.br/fipe/api/v1/carros/marcas/${marca}/modelos/${modelo}/anos`
          );
          const data = await response.json();
          setAnos(data);
        } catch (error) {
          console.error("Erro ao buscar anos:", error);
        }
      }
      fetchAnos();
    }
  }, [modelo]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `https://parallelum.com.br/fipe/api/v1/carros/marcas/${marca}/modelos/${modelo}/anos/${ano}`
      );
      const data = await response.json();
      setResultado(data);
    } catch (error) {
      console.error("Erro ao buscar veículo:", error);
    }
  };

  const handleSave = () => {
    if (resultado) {
      const newEntry = {
        marca: resultado.Marca,
        modelo: resultado.Modelo,
        mesReferencia: resultado.MesReferencia,
        combustivel: resultado.Combustivel,
        valor: resultado.Valor,
      };
      dispatch(addEntry(newEntry));
    }
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
                  {marcas.map((marca) => (
                    <MenuItem key={marca.codigo} value={marca.codigo}>
                      {marca.nome}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth margin="normal" disabled={!marca}>
                <InputLabel id="modelo-label">Modelo</InputLabel>
                <Select
                  labelId="modelo-label"
                  id="modelo"
                  value={modelo}
                  label="Modelo"
                  onChange={(e) => setModelo(e.target.value)}
                >
                  {modelos.map((modelo) => (
                    <MenuItem key={modelo.codigo} value={modelo.codigo}>
                      {modelo.nome}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth margin="normal" disabled={!modelo}>
                <InputLabel id="ano-label">Ano</InputLabel>
                <Select
                  labelId="ano-label"
                  id="ano"
                  value={ano}
                  label="Ano"
                  onChange={(e) => setAno(e.target.value)}
                >
                  {anos.map((ano) => (
                    <MenuItem key={ano.codigo} value={ano.codigo}>
                      {ano.nome}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                startIcon={<SearchIcon />}
                disabled={!ano}
              >
                Buscar
              </Button>
            </form>
          </CardContent>
          {resultado && (
            <CardActions sx={{ flexDirection: "column", alignItems: "stretch" }}>
              <Box
                sx={{
                  width: "100%",
                  p: 2,
                  backgroundColor: "#f9f9f9",
                  borderRadius: 1,
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Detalhes do Veículo
                </Typography>
                <Typography variant="body1">
                  <strong>Marca:</strong> {resultado.Marca}
                </Typography>
                <Typography variant="body1">
                  <strong>Modelo:</strong> {resultado.Modelo}
                </Typography>
                <Typography variant="body1">
                  <strong>Ano Modelo:</strong> {resultado.AnoModelo}
                </Typography>
                <Typography variant="body1">
                  <strong>Combustível:</strong> {resultado.Combustivel}
                </Typography>
                <Typography variant="body1">
                  <strong>Valor:</strong> {resultado.Valor}
                </Typography>
                <Typography variant="body1">
                  <strong>Código FIPE:</strong> {resultado.CodigoFipe}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Mês de Referência:</strong> {resultado.MesReferencia}
                </Typography>
              </Box>
              <Button
                onClick={handleSave}
                fullWidth
                variant="contained"
                color="secondary"
                sx={{ mt: 2 }}
              >
                Salvar Pesquisa
              </Button>
            </CardActions>
          )}
        </Card>
      </Container>
    </Box>
  );
}