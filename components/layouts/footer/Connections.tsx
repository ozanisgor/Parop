import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faSquareXTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

export const Connections = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="text-lg font-bold">Bağlantılar</div>
      <div className="flex items-center gap-4 text-xs font-light">
        <FontAwesomeIcon
          icon={faYoutube}
          size="2xl"
          className="text-primary-foreground hover:text-secondary-foreground cursor-pointer"
        />
        <FontAwesomeIcon
          icon={faSquareXTwitter}
          size="2xl"
          className="text-primary-foreground hover:text-secondary-foreground cursor-pointer"
        />
        <FontAwesomeIcon
          icon={faFacebook}
          size="2xl"
          className="text-primary-foreground hover:text-secondary-foreground cursor-pointer"
        />
      </div>
    </div>
  );
};
