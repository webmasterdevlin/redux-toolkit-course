import { render, screen } from "@testing-library/react";
import UpdateUiLabel from "../UpdateUiLabel";

test("Action Labels are visible", () => {
  render(<UpdateUiLabel />);

  const labels = screen.getByText(
    "local-state updates, non-async actions, async actions"
  );

  expect(labels).toBeInTheDocument();
});
