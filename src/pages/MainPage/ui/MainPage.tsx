import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Input } from "shared/ui/Input/Input";
import { ListBox } from "shared/ui/ListBox/ListBox";
import { Page } from "widgets/Page/Page";

const MainPage = () => {
  const { t } = useTranslation("main");
  const [value, setValue] = useState("");

  const onChange = (val: string) => {
    setValue(val);
  };

  return (
    <Page>
      <div>AAAAA</div>
      <div>BBBBBBBB</div>
      <ListBox
        defaultValue="Выберите значение"
        onChange={(value: string) => {}}
        value={undefined}
        items={[
          { value: "1", content: "Zahar" },
          { value: "2", content: "Oleg", disabled: true },
          { value: "3", content: "Egor" },
        ]}
      />
      <div>CCCCCCCCCCC</div>
    </Page>
  );
};

export default MainPage;
