import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Provider} from 'react-redux'
import { store } from './ReduxToolkit/Store.js'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Chat from './components/Chat.jsx'
import Login from './components/Login.jsx'
import Protectionlayer from './components/Protectionlayer.jsx'
import Allid from './components/Allid.jsx'
import Tull from './components/null.jsx'
import Conversation from './components/Conversation.jsx'
import Register from './components/Register.jsx'


const router=createBrowserRouter([
  {
    element:<App/>,
    path:'/',
    children:[
      {
        path:'/',
      element:(
        <Protectionlayer>
          <Tull/>
        </Protectionlayer>
      )
        
      },
      {
        path:'/chat',
        element:(
          <Protectionlayer >
            
            <Chat/>
          </Protectionlayer>
        )
      },
      {
        path:'/login',
        element:<Login/>
      },
      {
        path:'/register',
        element:<Register/>
      },
      {
        path:'/all',
        element:(
          <Protectionlayer >
            
          <Allid/>
          </Protectionlayer>
        )
      },{
        path:'/gupshup/:id',
        element:(
          <Protectionlayer>
            <Conversation/>
          </Protectionlayer>
        )
      }
    ]

  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
