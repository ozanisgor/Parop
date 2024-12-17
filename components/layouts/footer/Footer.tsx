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
        <div className="px-16 py-28 flex justify-between gap-36 max-w-screen-2xl mx-auto">
          <div className="flex justify-center">
            <Contact />
          </div>
          <div className="flex justify-center">
            <Explore />
          </div>
          <div className="flex justify-center">
            <Connections />
          </div>
        </div>
      </div>
      <div className="w-full bg-[#2d2f3e] text-primary-foreground">
        <div className="max-w-screen-2xl mx-auto flex justify-between h-20 px-16 py-8 items-center">
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
