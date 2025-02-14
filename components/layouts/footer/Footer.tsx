import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { Connections } from "./Connections";
import { Contact } from "./Contact";
import { Explore } from "./Explore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export const Footer = () => {
  return (
    <div className="flex flex-col justify-between w-full">
      <div className="bg-primary text-primary-foreground">
        <div className="md:px-16 px-8 py-20 flex flex-col md:flex-row justify-between md:gap-36 gap-20 max-w-screen-2xl mx-auto">
          <div className="flex md:justify-center justify-start">
            <Contact />
          </div>
          <div className="flex md:justify-center justify-start">
            <Explore />
          </div>
          <div className="flex md:justify-center justify-start">
            <Connections />
          </div>
        </div>
      </div>
      <div className="w-full bg-[#2d2f3e] text-primary-foreground">
        <div className="max-w-screen-2xl mx-auto flex justify-between h-20 md:px-16 px-8 py-8 items-center">
          <p className="flex justify-start gap-2 text-sm font-bold">
            2024 | Ozan İşgör{" "}
            <Link href={"https://github.com/ozanisgor"}>
              <FontAwesomeIcon
                icon={faGithub}
                size="lg"
                className="text-primary-foreground hover:text-secondary-foreground cursor-pointer"
              />
            </Link>
          </p>
          <Link href={"/subscribe"} className="text-sm font-light">
            Üye Ol
          </Link>
        </div>
      </div>
    </div>
  );
};
