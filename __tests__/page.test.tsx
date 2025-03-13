import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

jest.mock("../components/home/mainCarousel/MainCarousel", () => {
  return function MockMainCarousel() {
    return <div data-testid="main-carousel">Main Carousel</div>;
  };
});

jest.mock("../components/home/latestPosts/LatestPosts", () => {
  return function MockLatestPosts() {
    return <div data-testid="latest-posts">Latest Posts</div>;
  };
});

jest.mock("../components/home/FeaturedPost", () => ({
  FeaturedPost: function MockFeaturedPost() {
    return <div data-testid="featured-post">Featured Post</div>;
  },
}));

jest.mock("../components/home/EditorsPick/EditorsPick", () => {
  return function MockEditorsPick() {
    return <div data-testid="editors-pick">Editors Pick</div>;
  };
});

describe("Home Page", () => {
  it("renders all main components", () => {
    render(<Home />);

    expect(screen.getByTestId("main-carousel")).toBeInTheDocument();
    expect(screen.getByTestId("latest-posts")).toBeInTheDocument();
    expect(screen.getByTestId("featured-post")).toBeInTheDocument();
    expect(screen.getByTestId("editors-pick")).toBeInTheDocument();
  });

  it("has the correct layout classes", () => {
    render(<Home />);

    const mainElement = screen.getByRole("main");
    expect(mainElement).toHaveClass(
      "flex",
      "w-full",
      "min-h-screen",
      "flex-col",
      "items-center",
      "justify-between",
      "max-w-screen-2xl",
      "mx-auto"
    );
  });
});
