import { fireEvent, screen } from "@testing-library/react";
import { EditableProfileCard } from "./EditableProfileCard";
import { componentRender } from "shared/lib/tests/componentRender/componentRender";
import { Profile } from "entities/Profile";
import { Currency } from "entities/Currency";
import { Country } from "entities/Country";
import { profileReducer } from "../../model/slice/profileSlice";
import userEvent from "@testing-library/user-event";
import { $api } from "shared/api/api";

const profile: Profile = {
  id: "1",
  first: "admin",
  lastname: "admin",
  age: 25,
  currency: Currency.USD,
  country: Country.Russia,
  city: "Ekb",
  username: "kerry",
};

const options = {
  initialState: {
    profile: {
      readonly: true,
      data: profile,
      form: profile,
    },
    user: {
      authData: {
        id: "1",
      },
    },
  },
  asyncReducers: {
    profile: profileReducer,
  },
};

describe("features/EditableProfileCard", () => {
  test("the mode read-only should switch", async () => {
    componentRender(<EditableProfileCard id={"1"} />, options);

    await userEvent.click(
      screen.getByTestId("EditableProfileCardHeader.EditButton")
    );
    expect(
      screen.getByTestId("EditableProfileCardHeader.CancelButton")
    ).toBeInTheDocument();
  });

  test("when canceled, the values ​​are reset to zero", async () => {
    componentRender(<EditableProfileCard id={"1"} />, options);

    await userEvent.click(
      screen.getByTestId("EditableProfileCardHeader.EditButton")
    );

    await userEvent.clear(screen.getByTestId("ProfileCard.firstname"));
    await userEvent.clear(screen.getByTestId("ProfileCard.lastname"));

    await userEvent.type(screen.getByTestId("ProfileCard.firstname"), "user");
    await userEvent.type(screen.getByTestId("ProfileCard.lastname"), "user");

    expect(screen.getByTestId("ProfileCard.firstname")).toHaveValue("user");
    expect(screen.getByTestId("ProfileCard.lastname")).toHaveValue("user");

    await userEvent.click(
      screen.getByTestId("EditableProfileCardHeader.CancelButton")
    );

    expect(screen.getByTestId("ProfileCard.firstname")).toHaveValue("admin");
    expect(screen.getByTestId("ProfileCard.lastname")).toHaveValue("admin");
  });

  test("should will appear error", async () => {
    componentRender(<EditableProfileCard id={"1"} />, options);

    await userEvent.click(
      screen.getByTestId("EditableProfileCardHeader.EditButton")
    );

    await userEvent.clear(screen.getByTestId("ProfileCard.firstname"));

    await userEvent.click(
      screen.getByTestId("EditableProfileCardHeader.SaveButton")
    );


    expect(screen.getByTestId("EditableProfileCard.Error.Paragraph")).toBeInTheDocument()
  });

  test("если нет ошибок, то на сервер должен уйти PUT запрос", async () => {
    
    const mockPutReq = jest.spyOn($api, 'put')
    
    componentRender(<EditableProfileCard id={"1"} />, options);


    await userEvent.click(
      screen.getByTestId("EditableProfileCardHeader.EditButton")
    );

    await userEvent.type(screen.getByTestId("ProfileCard.firstname"), "user");

    await userEvent.click(
      screen.getByTestId("EditableProfileCardHeader.SaveButton")
    );


    expect(mockPutReq).toBeCalled()
  });
});
