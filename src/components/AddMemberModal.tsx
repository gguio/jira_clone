import { TextInput } from 'components/MyTextInput.tsx'
import { TextareaInput } from 'components/TextareaInput.tsx'
import { SelectInput } from 'components/SelectInput.tsx'

import { Formik, Form } from 'formik'

import Button from 'react-bootstrap/Button';

import {useState } from 'react'

import { store, TeamMember, addMember } from 'store'
import { useSnapshot } from 'valtio'

import { getDateByDuration, formatDateForInputDate } from 'utils/datesOperations.ts'

import * as Yup from 'yup'

import 'styles/Modal.scss'


export const AddMemberModal = ({setIsModalVisible}: {setIsModalVisible: any}) => {
  const members = useSnapshot(store.members)

  const initialValues: TeamMember = {
    name: '',
    post: '',
    department: ''
  }

  const handleSubmit = (values: TeamMember) => {
    addMember(values)
    setIsModalVisible(false)
  }

  const validationSchema = Yup.object({
    name: Yup.string()
    .max(30, 'Name must be less than 30 characters')
    .test(
      'isMemberUnique',
      'Member with this name already exists. Try another one',
      (value) => {
        for (let i=0; i<members.length; i+=1) {
          if (value === members[i].name) return false
        }
        return true
      }
    )
    .required('Required'),
    post: Yup.string()
    .max(30, 'Post must be less than 30 characters')
    .required('Required'),
    department: Yup.string()
    .max(30, 'Department must be less than 30 characters')
    .required('Required')
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
            label='Team member name'
            name='name'
            placeholder='Alex'
            type='text'
          />
          <TextInput 
            label='Post'
            name='post'
            placeholder='Developer'
            type='text'
          />
          <TextInput 
            label='Department'
            name='department'
            placeholder='Tech support'
            type='text'
          />
        <button className='btn btn-primary mt-3 mb-5' type="submit">Add member</button>
        <button className='btn btn-danger ms-3 mt-3 mb-5' onClick={()=>{setIsModalVisible(false)}}>Discard</button>
        </Form>
      </Formik>
      </div>
  </div>
  )
}
