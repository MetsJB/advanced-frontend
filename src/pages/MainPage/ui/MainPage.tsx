import { RatingCard } from "@/entities/Rating";
import { Page } from "@/widgets/Page/Page";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const MainPage = () => {
  const { t } = useTranslation("main");
  const [value, setValue] = useState("");

  const onChange = (val: string) => {
    setValue(val);
  };

  return (
    <Page>
      <div>Main Page</div>
    </Page>
  );
};

export default MainPage;
