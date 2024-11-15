import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addHistory } from "../redux/historySlice";
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
  FormHelperText,
} from "@mui/material";

export default function CarFinder() {
  const dispatch = useDispatch();
  const history = useSelector((state) => state.history);
  const [resultado, setResultado] = useState(null);
  const [marcas, setMarcas] = useState([]);
  const [modelos, setModelos] = useState([]);
  const [anos, setAnos] = useState([]);
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [ano, setAno] = useState("");
  const [errors, setErrors] = useState({});

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
    if (!marca) return;

    async function fetchModelos() {
      try {
        const response = await fetch(
          `https://parallelum.com.br/fipe/api/v1/carros/marcas/${marca}/modelos`
        );
        const data = await response.json();
        setModelos(data.modelos);
        setAnos([]);
        setModelo("");
      } catch (error) {
        console.error("Erro ao buscar modelos:", error);
      }
    }

    fetchModelos();
  }, [marca]);

  useEffect(() => {
    if (!modelo) return;

    async function fetchAnos() {
      try {
        const response = await fetch(
          `https://parallelum.com.br/fipe/api/v1/carros/marcas/${marca}/modelos/${modelo}/anos`
        );
        const data = await response.json();
        setAnos(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Erro ao buscar anos:", error);
        setAnos([]);
      }
    }

    fetchAnos();
  }, [marca, modelo]);

  useEffect(() => {
    setModelo("");
    setAnos([]);
  }, [marca]);

  useEffect(() => {
    setAno("");
  }, [modelo]);

  const validate = () => {
    const newErrors = {};
    if (!marca) newErrors.marca = "Por favor, selecione uma marca.";
    if (!modelo) newErrors.modelo = "Por favor, selecione um modelo.";
    if (!ano) newErrors.ano = "Por favor, selecione um ano.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;

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
    if (!resultado) return;

    const newHistory = {
      marca: resultado.Marca,
      modelo: resultado.Modelo,
      anoModelo: resultado.AnoModelo,
      mesReferencia: resultado.MesReferencia,
      combustivel: resultado.Combustivel,
      valor: resultado.Valor,
    };

    const exists = history.some(
      (item) =>
        item.marca === newHistory.marca &&
        item.modelo === newHistory.modelo &&
        item.anoModelo === newHistory.anoModelo
    );

    if (exists) {
      alert("Este carro já foi salvo!");
      return;
    }

    dispatch(addHistory(newHistory));
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, py: 5 }}>
      <Container maxWidth="md">
        <Card>
          <CardHeader title="Buscar Veículo" />
          <CardContent>
            <form onSubmit={handleSubmit}>
              <FormControl fullWidth margin="normal" error={!!errors.marca}>
                <InputLabel id="marca-label">Marca</InputLabel>
                <Select
                  labelId="marca-label"
                  id="marca"
                  value={marca}
                  onChange={(e) => setMarca(e.target.value)}
                >
                  {marcas.map((marca) => (
                    <MenuItem key={marca.codigo} value={marca.codigo}>
                      {marca.nome}
                    </MenuItem>
                  ))}
                </Select>
                {errors.marca && (
                  <FormHelperText>{errors.marca}</FormHelperText>
                )}
              </FormControl>

              <FormControl
                fullWidth
                margin="normal"
                error={!!errors.modelo}
                disabled={!marca}
              >
                <InputLabel id="modelo-label">Modelo</InputLabel>
                <Select
                  labelId="modelo-label"
                  id="modelo"
                  value={modelo}
                  onChange={(e) => setModelo(e.target.value)}
                >
                  {modelos.map((modelo) => (
                    <MenuItem key={modelo.codigo} value={modelo.codigo}>
                      {modelo.nome}
                    </MenuItem>
                  ))}
                </Select>
                {errors.modelo && (
                  <FormHelperText>{errors.modelo}</FormHelperText>
                )}
              </FormControl>

              <FormControl
                fullWidth
                margin="normal"
                error={!!errors.ano}
                disabled={!modelo}
              >
                <InputLabel id="ano-label">Ano</InputLabel>
                <Select
                  labelId="ano-label"
                  id="ano"
                  value={ano}
                  onChange={(e) => setAno(e.target.value)}
                >
                  {Array.isArray(anos) &&
                    anos.map((ano) => (
                      <MenuItem key={ano.codigo} value={ano.codigo}>
                        {ano.nome}
                      </MenuItem>
                    ))}
                </Select>
                {errors.ano && <FormHelperText>{errors.ano}</FormHelperText>}
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
            <CardActions
              sx={{ flexDirection: "column", alignItems: "stretch" }}
            >
              <Box sx={{ width: "100%", p: 2, backgroundColor: "#f9f9f9" }}>
                <Typography variant="h6">Detalhes do Veículo</Typography>
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
