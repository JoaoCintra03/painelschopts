import { useParams, Link } from "react-router-dom";

export const Sobre = () => {
  const { id } = useParams();

  return (
    <div style={{ padding: 20 }}>
      <h1>Sobre</h1>
      <p>Sobre selecionado: {id}</p>

      <Link to="/">Voltar para Home</Link>
    </div>
  );
};
