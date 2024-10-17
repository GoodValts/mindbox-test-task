import Home from "@/app/page";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Render", () => {
  it("renders main", () => {
    render(<Home />);
    const main = screen.getByRole("main");
    expect(main).toBeInTheDocument();
  });

  it("renders form elements", () => {
    render(<Home />);
    const input = screen.getByRole("textbox");
    const submitButton = screen.getByRole("button", { name: /add task/i });

    expect(input).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it("renders list elements", () => {
    render(<Home />);
    const header = screen.getByRole("heading", { name: /all/i });

    const allButton = screen.getByRole("button", { name: /all/i });
    const activeButton = screen.getByRole("button", { name: /active/i });
    const completedButton = screen.getByRole("button", { name: /completed/i });

    expect(header).toBeInTheDocument();
    expect(allButton).toBeInTheDocument();
    expect(activeButton).toBeInTheDocument();
    expect(completedButton).toBeInTheDocument();
  });
});

describe("Redux functionality", () => {
  it("add task", async () => {
    render(<Home />);
    const textInput = screen.getByRole("textbox");
    const dateInput = screen.getByTestId("dateInput");
    const timeInput = screen.getByTestId("timeInput");
    const submitButton = screen.getByRole("button", { name: /add task/i });

    await userEvent.type(textInput, "someTask");
    await userEvent.type(dateInput, "2024-01-01");
    await userEvent.type(timeInput, "00:00");
    await userEvent.click(submitButton);

    setTimeout(() => {
      const taskName = screen.getByRole("heading", { name: /someTask/i });
      expect(taskName).toBeInTheDocument();
    }, 1000);
  });

  it("remove task", async () => {
    render(<Home />);
    const input = screen.getByRole("textbox");
    const submitButton = screen.getByRole("button", { name: /add task/i });

    await userEvent.type(input, "someTask");
    await userEvent.click(submitButton);

    const removeButton = screen.getByRole("button", { name: /delete/i });
    await userEvent.click(removeButton);

    const taskName = screen.queryByRole("heading", { name: /someTask/i });

    expect(taskName).toBeNull();
  });

  it("set list queue", async () => {
    render(<Home />);
    const input = screen.getByRole("textbox");
    const submitButton = screen.getByRole("button", { name: /add task/i });

    await userEvent.type(input, "someTask");
    await userEvent.click(submitButton);

    const activeButton = screen.getByRole("button", { name: /active/i });
    await userEvent.click(activeButton);
    const activeHeader = screen.getByRole("heading", { name: /active/i });
    expect(activeHeader).toBeInTheDocument();

    const completedButton = screen.getByRole("button", { name: /completed/i });
    await userEvent.click(completedButton);
    const completedHeader = screen.getByRole("heading", { name: /completed/i });
    expect(completedHeader).toBeInTheDocument();

    const allButton = screen.getByRole("button", { name: /all/i });
    await userEvent.click(allButton);
    const allHeader = screen.getByRole("heading", { name: /all/i });
    expect(allHeader).toBeInTheDocument();
  });

  it("set completed", async () => {
    render(<Home />);
    const input = screen.getByRole("textbox");
    const submitButton = screen.getByRole("button", { name: /add task/i });

    await userEvent.type(input, "someTask");
    await userEvent.click(submitButton);

    const completeButton = screen.getByTestId("buttonComplete");
    await userEvent.click(completeButton);

    const completedButton = screen.getByRole("button", { name: /completed/i });
    await userEvent.click(completedButton);

    setTimeout(() => {
      const taskHeader = screen.getByTestId("someTask");
      expect(taskHeader).toBeInTheDocument();
    }, 1000);
  });

  it("clear list", async () => {
    render(<Home />);
    const input = screen.getByRole("textbox");
    const submitButton = screen.getByRole("button", { name: /add task/i });

    await userEvent.type(input, "someTask");
    await userEvent.click(submitButton);

    const deleteButton = screen.getByTestId("buttonDelete");
    await userEvent.click(deleteButton);

    expect(screen.queryAllByTestId("taskName")).toBeNull();
  });
});
