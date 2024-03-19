import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { getUnixTime } from 'date-fns'
import { nanoid } from 'nanoid/non-secure'

export interface CalendarData {
  id: string
  title?: string
  amount: number
  category: string
  date: number
}

export interface CalendarInput {
  title?: string
  amount: number
  category: string
}

export interface CalendarState {
  data: CalendarData[]
}

const initialState: CalendarState = { data: [] }

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    addEntry (state: CalendarState, action: PayloadAction<CalendarInput>) {
      state.data = [...state.data, {
        ...action.payload,
        id: nanoid(10),
        date: getUnixTime(new Date())
      }]
    },
    removeEntry (state: CalendarState, action: PayloadAction<string>) {
      const item = state.data.findIndex(v => v.id === action.payload)
      if (item !== -1) {
        state.data = [
          ...state.data.slice(0, item),
          ...state.data.slice(item + 1)
        ]
      }
    }
  }
})

export const { addEntry, removeEntry } = calendarSlice.actions
export default calendarSlice.reducer
