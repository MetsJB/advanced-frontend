import AboutIcon from "shared/assets/icons/about-20-20.svg";
import MainIcon from "shared/assets/icons/main-20-20.svg";
import ProfileIcon from "shared/assets/icons/profile-20-20.svg";
import { RoutePath } from "shared/config/routerConfig/routerConfig";

export interface SidebarItemType {
  path: string;
  text: string;
  Icon: React.VFC<React.SVGProps<SVGSVGElement>>;
}


export const SidebarItemsList: SidebarItemType[] = [
    {
        Icon: MainIcon,
        path: RoutePath.main,
        text: 'Главная'
    },
    {
        Icon: AboutIcon,
        path: RoutePath.about,
        text: 'О сайте'
    },
    {
        Icon: ProfileIcon,
        path: RoutePath.profile,
        text: 'Профиль'
    },
]