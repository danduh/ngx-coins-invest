import { MenuItem } from "../components/side-menu/side-menu.component";

export const MENU_LIST: MenuItem[] = [
    {
        link: '/account',
        label: 'Account',
        icon: 'perm_identity',
        weight: 1,
        split: true
    },
    {
        link: '/portfolio',
        label: 'Portfolio',
        icon: 'pie_chart',
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
