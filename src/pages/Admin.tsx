import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { useState } from 'react'

import { generateTaskId } from 'utils/storeUtils.ts'
import { isMember } from 'utils/validationUtils.ts'
import { getDateByDuration } from 'utils/datesOperations.ts'

import { TextInput } from 'components/MyTextInput.tsx'
import { SelectInput } from 'components/SelectInput.tsx'
import { TextareaInput } from 'components/TextareaInput.tsx'
import { StartSprintModal } from 'components/StartSprintModal.tsx'
import { AddMemberModal } from 'components/AddMemberModal.tsx'

import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import { useSnapshot } from 'valtio'
import { store, addTask, Task } from 'store'


type InitialValuesType = Omit<Task, 'days' | 'hours'> & { days?: number | string, hours?: number | string }

export default function Admin() {
  const [showStartSprintModal, setShowStartSprintModal] = useState(false)
  const [showAddMemberModal, setShowAddMemberModal] = useState(false)

  const members = useSnapshot(store.members)
  const tasks = useSnapshot(store.tasks)
  const sprint = useSnapshot(store.sprint)

  const initialValues: InitialValuesType = {
    title: '',
    subtitle: '',
    author: '',
    assignee: '',
    days: '',
    hours: '',
    stage: 'todo',
    description: '',
    comment: '',
    watchers: '',
    id: generateTaskId(),
    inSprint: false
  }

  const handleSubmit = (values: InitialValuesType, actions: object) => {
    addTask(values as Task)
    alert('task created')
  }

  const validationSchema = Yup.object({
    title: Yup.string()
    .max(30, 'Title can not be more than 30 characters')
    .required('Required'),
    subtitle: Yup.string()
    .max(50, 'Subtitle can not be more than 50 characters')
    .required('Required'),
    author: Yup.string()
    .required('Required'),
    assignee: Yup.string()
    .oneOf(
      Array.from(members, (member)=>member.name),
      'Must choose assignee'
    ).
    required('Required'),
    days: Yup.number()
    .min(0, 'Must be more than 0')
    .integer('Must be integer')
    .round('floor')
    .required('Required'),
    hours: Yup.number()
    .min(0, 'Must be more than 0')
    .integer('Must be integer')
    .max(8, `If task requires more that 8 hours, add 1 to number of days.\nExample: 10h -> 1d 2h`)
    .round('floor')
    .required('Required'),
    description: Yup.string()
    .min(40, 'Description must be more than 40 characters')
    .required('Required'),
    id: Yup.string()
    .matches(/^[A-Z]+-\d\d\d\d$/, 'ID must match pattern: XX-1234')
    .notOneOf(Array.from(tasks, (task)=>task.id), 'This ID is taken')
    .required('Required'),
    comment: Yup.string()
    .min(40, 'Comment must be more than 40 characters or none'),
    watchers: Yup.string(),
    inSprint: Yup.boolean()
    .test(
      'isSprintActive',
      'There is no active sprint',
      (value) => {
        if (value) {
          return sprint.isActive
        } else return true
      } 
    )
    .test(
      'checkIfDurationSpecified',
      'Number of days to complete the task is required',
      (value, ctx) => {
        if (!ctx.from) return false
        if (value) return ctx.from[0].value.days ? true : false
        return true
      }    
    )
    .test(
      'doesMatchTime',
      'Task is too time consuming. It can not be done during current Sprint',
      (value, ctx) => {
        if (!ctx.from) return false
        if (value && sprint.isActive && ctx.from[0].value.days && sprint.end) {
          const end = getDateByDuration(ctx.from[0].value.days)
          if (end > sprint.end) return false
        } else return true
      } 
    )
    .required('Required')
  })


  return (
  <div className='container'>
      <button className='btn btn-primary mt-3' onClick={()=>{
        setShowStartSprintModal(true)
        console.log('modal opened')
      }}>Start Sprint</button>
      <button className='btn btn-primary mt-3 ms-3' onClick={()=>{
        setShowAddMemberModal(true)
        console.log('modal opened')
      }}>Add new member</button>
      {showStartSprintModal ? (
      <StartSprintModal setIsModalVisible={(show: boolean)=>{setShowStartSprintModal(show)}}  />
      ) : null}
      {showAddMemberModal ? (
      <AddMemberModal setIsModalVisible={(show: boolean)=>{setShowAddMemberModal(show)}}  />
      ) : null}
      <Formik 
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form noValidate>
          <TextInput 
            name='title'
            placeholder='Title'
            type='text'
          />
          <TextInput 
            name='subtitle'
            placeholder='Subtitle'
            type='text'
          />
          <TextInput 
            name='author'
            placeholder='Author'
            type='text'
          />
          <SelectInput name='assignee' >
            <option value="">Select assignee</option>
            {members.map((member, index) => {
              return (
              <option key={index} value={member.name}>{member.name}</option>
              )
            })}
          </SelectInput>
          <Row className='mt-3'>
            <label>Time to complete the task</label>
            <Col style={{maxWidth: '200px'}}>
              <TextInput
                name='days'
                placeholder='Days'
                type='text'
              />
            </Col>
            <Col style={{maxWidth: '200px'}}>
              <TextInput
                name='hours'
                placeholder='Hours'
                type='text'
              />
            </Col>
          </Row>
          <TextareaInput 
            name='description'
            rows={2}
            label='Description'
          />
          <TextInput 
            name='id'
            placeholder='XX-1234'
            type='text'
          />
          <TextareaInput 
            name='comment'
            rows={2}
            label='Comment (optional)'
          />
          <TextInput 
            name='watchers'
            placeholder='Watchers (optional)'
            type='text'
          />
          <TextInput 
            label='Add in current Sprint'
            name='inSprint'
            className='form-check-input ms-2'
            type='checkbox'
          />
        <button className='btn btn-primary mt-3 mb-5' type="submit">Create task</button>
        </Form>
      </Formik>
  </div>
  )
}
