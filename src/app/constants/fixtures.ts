import { MenuItem } from "../components/header/header.component";

export const MENU_LIST: MenuItem[] = [
    {
        link: '/current-status',
        label: 'Current',
        icon: 'widgets',
        weight: 10
    },
    {
        link: '/coins',
        label: 'Show All',
        icon: 'list',
        weight: 20
    },
    {
        link: '/logout',
        label: 'Log Out',
        icon: 'power_settings_new',
        weight: 50
    },
];
