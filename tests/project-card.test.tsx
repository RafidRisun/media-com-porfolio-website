import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { ProjectCard } from "@/components/project-card";

const project = {
  id: "a-long-project",
  title: "A Very Long Photography Project Title That Must Remain Complete",
  description: "",
  date: "2026-01-01",
  coverImage: { image: "/images/placeholder.svg", alt: "Project cover" },
  images: [],
};

describe("project cover titles", () => {
  it("renders the complete project title on its linked cover", () => {
    render(<ProjectCard project={project} className="aspect-square" />);
    expect(screen.getByText(project.title)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: `View ${project.title}` })).toHaveAttribute("href", "/works/a-long-project");
    expect(screen.getByRole("img", { name: "Project cover" })).toHaveAttribute("src", "/images/placeholder.svg");
  });

  it("keeps the cover keyboard accessible with its full project name", async () => {
    const user = userEvent.setup();
    render(<ProjectCard project={project} className="aspect-square" />);
    await user.tab();
    expect(screen.getByRole("link", { name: `View ${project.title}` })).toHaveFocus();
    expect(screen.getByText(project.title)).toBeInTheDocument();
  });
});
