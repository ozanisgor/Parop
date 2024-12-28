import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faSquareXTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

export const BlogFooter = ({ tags }: { tags: string[] }) => {
  return (
    <div className="grid xl:grid-cols-5 xl:gap-14 lg:gap-12 md:px-16 px-4 lg:mb-32 md:mb-28 mb-24 mt-12">
      <div className="w-full xl:col-span-3 xl:col-start-2 col-span-5 col-start-1 mx-auto flex flex-col justify-between">
        <div className="flex flex-wrap gap-2 lg:mb-12 md:mb-10 mb-8">
          {tags &&
            tags.length > 0 &&
            tags.map((tag, index) => (
              <Badge
                key={index}
                variant="outline"
                className="border-secondary rounded-md uppercase text-secondary"
              >
                {tag}
              </Badge>
            ))}
        </div>
        <Separator className="w-full bg-secondary h-[0.5px]" />
        <div className="flex items-center gap-3 lg:mt-12 md:mt-10 mt-8">
          <FontAwesomeIcon
            icon={faYoutube}
            size="xl"
            className="text-secondary hover:text-secondary-foreground cursor-pointer"
          />
          <FontAwesomeIcon
            icon={faSquareXTwitter}
            size="xl"
            className="text-secondary hover:text-secondary-foreground cursor-pointer"
          />
          <FontAwesomeIcon
            icon={faFacebook}
            size="xl"
            className="text-secondary hover:text-secondary-foreground cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};
