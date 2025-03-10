interface Props {
  onToggle: () => void;
}
const Login = ({ onToggle }: Props) => {
  const backgroundLogin = "/bg-login.png";
  console.log(onToggle);
  return (
    <section
      style={{
        backgroundImage: `url(${backgroundLogin})`,
      }}
      className="h-screen overflow-hidden relative bg-repeat bg-cover bg-center"
    />
  );
};

export default Login;
