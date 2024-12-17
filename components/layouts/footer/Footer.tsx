import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { Connections } from "./Connections";
import { Contact } from "./Contact";
import { Explore } from "./Explore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export const Footer = () => {
  return (
    <div className="flex flex-col justify-between w-full">
      <div className="bg-primary text-primary-foreground px-16 py-28 grid grid-cols-1 md:grid-cols-3 gap-36">
        <Contact />
        <Explore />
        <Connections />
      </div>
      <div className="flex justify-between w-full bg-[#2d2f3e] text-primary-foreground h-20 px-20 py-8 items-center">
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
  );
};
