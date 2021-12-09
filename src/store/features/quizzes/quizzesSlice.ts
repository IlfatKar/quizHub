import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {asyncStage, IQuiz} from "../../../types";
import {child, get, ref, push, set} from "firebase/database";
import {database} from "../../../firebaseConfig";

export interface QuizzesState {
  quizzes: IQuiz[],
  status: asyncStage
}

const initialState: QuizzesState = {
  quizzes: [],
  status: asyncStage.pending
}

export const fetchQuizzes = createAsyncThunk(
  'quizzes/fetchAll',
  async (_, {rejectWithValue}) => {
    try {
      const snapshot = await get(child(ref(database), 'quizzes/'))
      return Object.values(snapshot.val())
    } catch (e: any) {
      return rejectWithValue(e.message)
    }

  }
)

export const addQuiz = createAsyncThunk(
  'quizzes/addQuiz',
  async (data: IQuiz, {rejectWithValue}) => {
    try {
      await set(push(ref(database, 'quizzes')), data);
    } catch (e: any) {
      return rejectWithValue(e.message)
    }
  }
)

export const quizzesSlice = createSlice({
  name: 'quizzes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchQuizzes.pending, (state) => {
      state.status = asyncStage.pending
    })
    builder.addCase(fetchQuizzes.fulfilled, (state, {payload}) => {
      state.status = asyncStage.fulfilled
      state.quizzes = payload as any[] || []
    })
    builder.addCase(fetchQuizzes.rejected, (state, {payload}) => {
      state.status = asyncStage.rejected
      console.error(payload)
    })
    builder.addCase(addQuiz.rejected, (state, {payload}) => {
      console.error(payload)
    })
  }
})

export const {} = quizzesSlice.actions

export default quizzesSlice.reducer