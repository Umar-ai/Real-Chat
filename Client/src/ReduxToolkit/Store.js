 import {configureStore} from '@reduxjs/toolkit'
import newstore from './authSlice'
 export const store=configureStore({
    reducer:newstore
 })