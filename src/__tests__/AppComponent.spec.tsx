// src/__tests__/AppComponent.spec.tsx
import { render, screen } from "@testing-library/react";
import { TodoApp } from "../App";

describe("title", () => {
  it("should render title", async () => {
    render(<TodoApp />);
    expect(await screen.findByText("シン・学習記録アプリ")).toBeInTheDocument();
  });
});
