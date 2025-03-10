import Carousel3D from "./carousel-3-d";

interface Props {
  dictionary: Values;
}
const Values = ({ dictionary }: Props) => {
  return (
    <div className="pt-[50px] sm:pt-[54px] pb-[100px] sm:pb-[250px] xl:pb-[310px] flex flex-col">
      <h3 className="text-center title-style">{dictionary?.title}</h3>
      <div className="relative flex h-full justify-center">
        <Carousel3D items={dictionary?.options} />
      </div>
    </div>
  );
};

export default Values;
