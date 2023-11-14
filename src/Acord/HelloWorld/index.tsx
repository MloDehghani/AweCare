type HellowWorldProps = {
  theme?: string;
};

const HelloWorld: React.FC<HellowWorldProps> = ({ theme }) => {
  return <h1 className={`${theme}-HelloWorld-container`}>Hello world</h1>;
};

HelloWorld.defaultProps = {
  theme: "Acord",
};

export default HelloWorld;
