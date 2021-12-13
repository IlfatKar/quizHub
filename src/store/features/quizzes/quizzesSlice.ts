import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {asyncStage, IQuiz} from "../../../types";
import {child, get, ref, push, set, update} from "firebase/database";
import {database} from "../../../firebaseConfig";

export interface QuizzesState {
  quizzes: IQuiz[],
  status: asyncStage,
  id: string | null,
  quiz: IQuiz | null
}

const initialState: QuizzesState = {
  quizzes: [],
  status: asyncStage.pending,
  id: null,
  quiz: null
}

export const fetchQuizzes = createAsyncThunk(
  'quizzes/fetchAll',
  async (_, {rejectWithValue}) => {
    try {
      const snapshot: any = (await get(child(ref(database), 'quizzes/'))).val()
      return Object.keys(snapshot).map(key => ({
        id: key,
        ...snapshot[key]
      }))
    } catch (e: any) {
      return rejectWithValue(e.message)
    }

  }
)

export const addQuiz = createAsyncThunk(
  'quizzes/addQuiz',
  async (data: IQuiz, {rejectWithValue}) => {
    try {
      const rf = await push(ref(database, 'quizzes'))
      await set(rf, data);
      return rf.key
    } catch (e: any) {
      return rejectWithValue(e.message)
    }
  }
)

export const fetchQuizById = createAsyncThunk(
  'quizzes/fetchQuizById',
  async (id: string, {rejectWithValue}) => {
    try {
      return (await get(child(ref(database), 'quizzes/' + id))).val()
    } catch (e: any) {
      return rejectWithValue(e.message)
    }
  }
)

export const doRatingUp = createAsyncThunk(
  'quizzes/doRatingUp',
  async ({id, quiz}: any, _) => {
    const data = {...quiz, rating: 1 + quiz.rating}
    update(ref(database, 'quizzes/' + id), data)
  }
)
export const doRatingDown = createAsyncThunk(
  'quizzes/doRatingUp',
  async ({id, quiz}: any, _) => {
    const data = {...quiz, rating: quiz.rating - 1}
    update(ref(database, 'quizzes/' + id), data)
  }
)

export const quizzesSlice = createSlice({
  name: 'quizzes',
  initialState,
  reducers: {
    dropId: (store) => {
      store.id = null
    },
    changeRating: (store,action) => {
      // store.quizzes
    }
  },
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
      state.status = asyncStage.rejected
    })
    builder.addCase(addQuiz.fulfilled, (state, {payload}) => {
      state.id = payload as string
      state.status = asyncStage.fulfilled
    })
    builder.addCase(addQuiz.pending, (state, {}) => {
      state.status = asyncStage.pending
    })
    builder.addCase(fetchQuizById.rejected, (state, {payload}) => {
      console.error(payload)
      state.status = asyncStage.rejected
    })
    builder.addCase(fetchQuizById.fulfilled, (state, {payload}) => {
      state.quiz = payload
      state.status = asyncStage.fulfilled
    })
    builder.addCase(fetchQuizById.pending, (state, {}) => {
      state.quiz = null
      state.status = asyncStage.pending
    })
  }
})

export const {dropId} = quizzesSlice.actions

export default quizzesSlice.reducer