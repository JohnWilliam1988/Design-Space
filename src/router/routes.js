import Home from '@/view/Home'
import Login from '@/view/Login'
export default [
  {
    path: "/Home",
    component: Home,
 
  },
  {
    path: "/Login",
    component: Login,
  },
  {
    path: "/",
    redirect: "/Login",
  },
];
