import cx from "@/libs/cx";
import MapView from "./map-view";
import { useState } from "react";

interface Props {
  dictionary: Form;
  id: string;
}
const Form = ({ dictionary, id }: Props) => {
  const [formValues, setFormValues] = useState<{ [key: string]: string }>({
    name: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validateName = (name: string) => {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/; // Letras y espacios
    return regex.test(name.trim());
  };

  const validateFields = () => {
    const newErrors: { [key: string]: string } = {};

    Object.keys(formValues).forEach((key) => {
      const value = formValues[key]?.trim();

      const inputMessages = dictionary.inputs[key];

      if (!value) {
        newErrors[key] = inputMessages?.voidString;
        return;
      }

      // Validación específica por campo
      if (key === "email" && !validateEmail(value)) {
        newErrors[key] = inputMessages?.restrictions;
      }

      if (key === "phone" && !/^\d+$/.test(value)) {
        newErrors[key] = inputMessages?.restrictions;
      }

      if ((key === "name" || key === "lastName") && !validateName(value)) {
        newErrors[key] = inputMessages?.restrictions;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (key: string, value: string) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [key]: value.trimStart(),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateFields()) return;

    setStatus("loading");

    try {
      console.log("Form submitted:", formValues);
      //Aquí tiene que ir la solicitud para el envío de correo

      //Simulando el tiempo de envío
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStatus("success");
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus("error");
    } finally {
      setTimeout(() => setStatus("idle"), 3000);
    }
  };
  return (
    <section className="mt-[-7px] pt-[7px] w-full" id={id}>
      <div className="flex bg-secondary bg-opacity-[36%] pt-[62px] pb-[60px] mt-[53px] justify-center">
        <div className="flex gap-16 sm:gap-5 2xl:gap-16 flex-col lg:flex-row px-[21px] sm:px-[60px] 2xl:max-w-screen-2xl w-full">
          <div className="w-full lg:w-[427px] h-[497px] sm:h-[508px] rounded-2xl overflow-hidden">
            <MapView />
          </div>
          <form
            onSubmit={handleSubmit}
            className="w-full lg:w-[calc(100%-447px)]"
          >
            <h3
              style={{ lineHeight: "0.65" }}
              className="title-style text-center sm:text-start"
            >
              {dictionary?.title}
            </h3>
            <p className="mt-5 text-[16px] sm:text-[23.15px] leading-[19.36px] sm:leading-[28.02px] text-center sm:text-start text-primary font-semibold">
              {dictionary?.question}
            </p>
            <div className="grid sm:grid-cols-2 gap-[17px] mt-10">
              {dictionary?.inputs &&
                Object.values(dictionary.inputs).map((input, i, arr) => {
                  const keys = Object.keys(dictionary.inputs);
                  const key = keys[i];
                  return (
                    <div
                      key={i}
                      className={cx(
                        "flex flex-col gap-[7px] relative",
                        i === arr.length - 1
                          ? "col-span-1 sm:col-span-2 mt-3"
                          : ""
                      )}
                    >
                      <label className="text-base tracking-[-0.41px] font-semibold text-primary">
                        {input?.label}:
                      </label>
                      {i === arr.length - 1 ? (
                        <textarea
                          placeholder={input?.placeholder}
                          value={formValues[key] || ""}
                          onChange={(e) => handleChange(key, e.target.value)}
                          className="rounded-[7.59px] bg-secondary min-h-[125px] px-[23.21px] py-4 placeholder:text-primary placeholder:text-opacity-30 placeholder:font-medium placeholder:text-[16px] placeholder:leading-[26.57px]"
                        />
                      ) : (
                        <input
                          placeholder={input?.placeholder}
                          value={formValues[key] || ""}
                          onChange={(e) => handleChange(key, e.target.value)}
                          className="rounded-[7.59px] bg-secondary h-[58px] px-[19.5px] sm:px-[23.21px] placeholder:text-primary placeholder:text-opacity-30 placeholder:font-medium placeholder:text-[16px] placeholder:leading-[26.57px]"
                        />
                      )}
                      {errors[key] && (
                        <p className="text-red-500 text-xs absolute top-[100%] left-0">
                          {errors[key]}
                        </p>
                      )}
                    </div>
                  );
                })}
            </div>
            <button
              className="mt-[90px] button-form max-w-[171.88px] flex items-center justify-center"
              disabled={status === "loading"}
            >
              {status === "loading"
                ? dictionary?.button?.loading
                : dictionary?.button?.name}
            </button>
            <div className="relative">
              <div className="mt-3 absolute top-[100%] left-0 text-sm">
                {status === "success" && (
                  <p className="text-green-500">
                    {dictionary?.button?.success}
                  </p>
                )}
                {status === "error" && (
                  <p className="text-red-500">{dictionary?.button?.error}</p>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Form;
