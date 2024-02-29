import { TextInput } from 'components/MyTextInput.tsx'
import { TextareaInput } from 'components/TextareaInput.tsx'

import { Formik, Form } from 'formik'


import {useState } from 'react'

import { Sprint, startSprint } from 'store'

import * as Yup from 'yup'

import 'styles/Modal.scss'


export const StartSprintModal = ({setIsModalVisible}: {setIsModalVisible: any}) => {
  const [isEndDisabled, setIsEndDisabled] = useState(false)
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(new Date())

  const initialValues: Sprint = {
    isActive: true,
    name: '',
    goal: '',
    duration: '',
    start: new Date(),
    end: new Date()
  }

  const handleSubmit = (values: Sprint) => {
    startSprint(values)
    setIsModalVisible(false)
  }

  const validationSchema = Yup.object({
    name: Yup.string()
    .max(30, 'Sprint name can not be longer than 30 characters')
    .required('Required'),
    goal: Yup.string()
    .max(60, 'Goal shold be less that 60 characters')
    .required('Required'),
    start: Yup.date()
    .required('Required'),
    end: Yup.date()
    .test(
      'justTest',
      'can not change date',
      (value, ctx) => {
        if (!ctx.from) return false
        ctx.parent.end = endDate
        return true
    })
    .test(
      'isDuration',
      'Duration field must be empty',
      (value, ctx) => {
          console.log(ctx)
        if (!ctx.from) return false
        if (ctx.from[0].value.duration && value) {
          return false
        } else return true
      }
    )
    .test(
      'isStart',
      'You have to specify start date',
      (value, ctx) => {
        if (!ctx.from) return false
        if (!ctx.from[0].value.start && value) {
          return false
        } else return true
      }
    )
    .test(
      'isValid',
      'End date must be after the start date',
      (value, ctx) => {
        if (!ctx.from) return false
        if (ctx.from[0].value.start && value) {
          const start = new Date(ctx.from[0].value.start)
          const end = new Date(value)
          return end > start
        } else return true
      }
    )
  })

  return (
  <div className='modal-container'>
      <div className='inner-container'>
      <Formik 
          className='modal'
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
      >
        <Form noValidate>
          <TextInput 
            label='Sprint Name'
            name='name'
            placeholder='New sprint'
            type='text'
          />
          <TextareaInput 
            label='Goal'
            name='goal'
            rows={2}
            placeholder='New sprint'
          />
          <TextInput 
            label='Start Date'
            name='start'
            type='date'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setStartDate(new Date(e.currentTarget.value))
              }}
          />
          <TextInput 
            id='endDate'
            label='End Date'
            name='end'
            type='date'
            disabled={isEndDisabled}
          />
        <button className='btn btn-primary mt-3 mb-5' type="submit">Start new Sprint</button>
        <button className='btn btn-danger ms-3 mt-3 mb-5' onClick={()=>{setIsModalVisible(false)}}>Discard</button>
        </Form>
      </Formik>
      </div>
  </div>
  )
}
