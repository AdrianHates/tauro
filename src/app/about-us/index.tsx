import History from "./history";
import Values from "./values";

interface Props {
  dictionary: AboutUs;
  id: string;
}
const AboutUs = ({ dictionary, id }: Props) => {
  return (
    <section
      className="flex w-full flex-col items-center justify-center"
      id={id}
    >
      <div className="flex items-center justify-center relative w-full h-[423px] sm:h-[806px] 2xl:min-h-[100vh]">
        <p className="text-[36px] leading-[41.14px] sm:text-7xl lg:text-[84px] lg:leading-[90px] font-extrabold w-[13ch] text-center text-white z-10 mt-[240px] sm:mt-[380px]">
          {dictionary?.title?.first}{" "}
          <span className="font-medium">{dictionary?.title?.second}</span>
        </p>
        {/*<img
          className="absolute left-0 top-0 w-full h-full object-cover"
          src="/about-us/bg.png"
        /> */}
        <video
          data-v-bdc99055=""
          className="absolute left-0 top-0 w-full h-full object-cover"
          poster="https://res.cloudinary.com/feraguilar695/image/upload/v1706464164/averliz/background_big1kf.jpg"
          autoPlay={true}
          muted={true}
          loop={true}
          src="https://res.cloudinary.com/feraguilar695/video/upload/v1706937640/averliz/averliz-bg_wyfmef.mp4"
        />
      </div>
      <History dictionary={dictionary?.history} />
      <Values dictionary={dictionary?.values} />
    </section>
  );
};

export default AboutUs;
