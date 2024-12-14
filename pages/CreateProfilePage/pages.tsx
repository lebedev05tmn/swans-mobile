import CreateProfileContent from "@/components/CreateProfileContent/CreateProfileContent";
import CountinueButton from "@/components/CountinueButton/CountinueButton";
import NameInput from "@/components/NameInput/NameInput";
import PlaceInput from "@/components/PlaceInput/PlaceInput";
import DateInput from "@/components/DateInput/DateInput";
import AboutTextInput from "@/components/AboutTextInput/AboutTextInput";
import ButtonChoice from "@/components/ButtonChoice/ButtonChoice";
import useStore from "./store";

const Component1 = () => {
  const nextPage = useStore((state) => state.nextPage);
  return (
    <CreateProfileContent
        title={"Привет, давай знакомиться"}
        description={"Будь собой при выборе имени, привлекает больше внимания"}
        Input={<NameInput />}
        ContinueButton={<CountinueButton onNext={nextPage}/>}
    />
  );
};

const Component2 = () => {
  const nextPage = useStore((state) => state.nextPage);
  return (
    <CreateProfileContent
        title={"Где живем, там и ищем"}
        description={"Выбери свой город, чтобы найти ближайщих соулмейтов"}
        Input={<PlaceInput />}
        ContinueButton={<CountinueButton onNext={nextPage} />}
    />
  );
};

const Component3 = () => {
  const nextPage = useStore((state) => state.nextPage);
  return (
    <CreateProfileContent
        title={"Выбери дату рождения"}
        description={"Используй настояющую, ее потом поменять нельзя"}
        Input={<DateInput />}
        ContinueButton={<CountinueButton onNext={nextPage} />}
    />
  );
};

const Component4 = () => {
  const nextPage = useStore((state) => state.nextPage);
  return (
    <CreateProfileContent
        title={"Стань солцем среди планет"}
        description={"Сделай свой слоган, который выделит тебя среди всех"}
        Input={<AboutTextInput />}
        ContinueButton={<CountinueButton onNext={nextPage} />}
    />
  );
};

const Component5 = () => {
  return (
    <CreateProfileContent
        title={"Последний этап регистрации"}
        description={"Выберите пол"}
        Input={<ButtonChoice />}
    />
  );
};

const pages = [
    Component1,
    Component2,
    Component3,
    Component4,
    Component5
];

export default pages;