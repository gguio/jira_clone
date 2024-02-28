import { TextInput } from 'components/MyTextInput.tsx'
import { TextareaInput } from 'components/TextareaInput.tsx'
import { SelectInput } from 'components/SelectInput.tsx'

import { Formik, Form } from 'formik'

import Button from 'react-bootstrap/Button';

import {useState } from 'react'

import { store, Sprint } from 'store'
import { useSnapshot } from 'valtio'

import { getDateByDuration, formatDateForInputDate } from 'utils/datesOperations.ts'

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
    alert(JSON.stringify(values))
  }

  const validationSchema = Yup.object({
    name: Yup.string()
    .max(30, 'Sprint name can not be longer than 30 characters')
    .required('Required'),
    goal: Yup.string()
    .max(60, 'Goal shold be less that 60 characters')
    .required('Required'),
    duration: Yup.string()
    .test(
      'disableEnd',
      'You have to specify start',
      (value, ctx) => {
        if (!ctx.from) return false
        if (value == 'null') {
          setIsEndDisabled(prev => false)
          setEndDate(prev => null)
          return true
        }
        if (!startDate) {
          return false
        } else {
          const end = getDateByDuration(Number(value)*7, startDate)
          setEndDate(prev => end)
          setIsEndDisabled(prev => true)
          return true
        } 
      }
    ),
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
            <SelectInput name='duration'>
              <option value='null'>Duration</option>
              {[...Array(4).keys()].map(i => `${i+1} weeks`).map((text, index) => {
                return(
                  <option key={index} value={index+1}>{text}</option>
                )
              })}
            </SelectInput>
          <TextInput 
            label='Start Date'
            name='start'
            type='date'
            onChange={(e) => {
                setStartDate(e.currentTarget.value)
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
        <button className='btn btn-primary mt-3 mb-5' onClick={()=>{setIsModalVisible(false)}}>Discard</button>
        </Form>
      </Formik>
      </div>
  </div>
  )
}
