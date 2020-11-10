import React, { lazy } from 'react'
const Dashboard = lazy(() => import('../components/dashboard/Dashboard'))
const Dashboard3D = lazy(() => import('../components/dashboard/Dashboard3D'))

const routes = [
    {
        path: '/Dashboard',
        component: Dashboard,
        isMenu: true,
        icon: 'DesktopOutlined',
        title: 'title.main.2d',
    },
    {
        path: '/Dashboard/:id',
        component: Dashboard,
        isMenu: false,
        icon: 'DesktopOutlined',
        title: 'title.main.2d',
    },
    {
        path: '/Dashboard3D',
        component: Dashboard3D,
        isMenu: true,
        icon: 'DesktopOutlined',
        title: 'title.main.3d',
    },
]

export default routes
