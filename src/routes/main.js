import Chats from '../components/chats/index'
import Login from '../components/login'

export const routes=[
    {
        component:Chats,
        private:true,
        path:'/chat'
    },
    {
        component:Login,
        private:false,
        path:'/login'
    },
    {
        component:Login,
        private:false,
        path:'/'
    }
]