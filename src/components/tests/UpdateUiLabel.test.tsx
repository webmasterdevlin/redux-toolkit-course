import { render, screen } from "@testing-library/react";
import UpdateUiLabel from "../UpdateUiLabel";

it("Action Labels are visible", () => {
  render(<UpdateUiLabel />);

  const labels = screen.getByText(
    /local-state updates, non-async actions, async actions/i
  );

  expect(labels).toBeInTheDocument();
});
