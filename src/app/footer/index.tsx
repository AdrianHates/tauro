import Facebook from "@/assets/icons/facebook";
import Instagram from "@/assets/icons/instagram";
import Logo from "@/assets/icons/logo";
import Tiktok from "@/assets/icons/tiktok";
import Whatsapp from "@/assets/icons/whatsapp";

interface Props {
  dictionary: Footer;
}
const Footer = ({ dictionary }: Props) => {
  return (
    <div className="w-full sm:h-[309px] bg-primary flex flex-col">
      <Logo className="w-[159px] h-[57px] text-secondary mt-8 self-center" />
      <div className="flex flex-col mt-[43px] sm:mt-[38px] text-secondary self-center">
        <div className="flex text-center sm:flex-row flex-col text-[14px] leading-[21px] uppercase font-normal gap-4 sm:gap-10">
          {dictionary?.options?.map((opt, i) => (
            <div key={i}>{opt}</div>
          ))}
        </div>
        <div className="text-[13.5px] text-center leading-[24px] font-roboto mt-[51px] sm:mt-5 mb-[30px] sm:mb-0 font-normal">
          <p className="px-5 sm:px-0">{dictionary?.address}</p>
          <p>{dictionary?.phone?.name}</p>
        </div>
      </div>
      <div className="flex mt-auto items-center justify-between flex-no-wrap">
        <div className="bg-[#001B2C] mt-auto h-[36px] sm:h-[52px] w-full max-w-full rounded-tr-[100px]" />
        <div className="flex items-center gap-[15px] justify-center mx-[67px] w-full mt-1">
          <Facebook className="w-6 h-6 text-secondary hover:scale-110 duration-300 cursor-pointer" />
          <Instagram className="w-6 h-6 text-secondary hover:scale-110 duration-300 cursor-pointer" />
          <Tiktok className="w-[15.64px] h-[18px] text-secondary hover:scale-110 duration-300 cursor-pointer" />
          <Whatsapp className="w-6 h-[18px] text-secondary hover:scale-110 duration-300 cursor-pointer" />
        </div>
        <div className="bg-[#001B2C] mt-auto h-[36px] sm:h-[52px] w-full max-w-full rounded-tl-[100px]" />
      </div>
    </div>
  );
};

export default Footer;
