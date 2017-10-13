import { MenuItem } from "../components/side-menu/side-menu.component";

export const MENU_LIST: MenuItem[] = [
    {
        link: '/app/account',
        label: 'Account',
        icon: 'perm_identity',
        weight: 1,
        split: true
    },
    {
        link: '/app/portfolio',
        label: 'Portfolio',
        icon: 'pie_chart',
        weight: 10
    },
    {
        link: '/app/coins',
        label: 'Show All',
        icon: 'list',
        weight: 20
    },
    {
        link: '/g/logout',
        label: 'Log Out',
        icon: 'power_settings_new',
        weight: 50
    },
];
