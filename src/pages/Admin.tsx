// import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

import { useEffect, useState } from 'react'

import { generateTaskId } from 'utils/storeUtils.ts'
import { isMember } from 'utils/validationUtils.ts'
import { getDateByDuration } from 'utils/datesOperations.ts'

import { TextInput } from 'components/MyTextInput.tsx'
import { SelectInput } from 'components/SelectInput.tsx'
import { TextareaInput } from 'components/TextareaInput.tsx'

import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import { useSnapshot } from 'valtio'
import { store } from 'store'

type InitialValuesType = {
  title: string,
  subtitle: string,
  author: string,
  assignee?: string,
  days?: number,
  hours?: number,
  description?: string,
  id: string,
  comment?: string,
  watchers?: string,
  addInSprint?: boolean
}

export default function Admin() {
  const members = useSnapshot(store.members)
  const tasks = useSnapshot(store.tasks)
  const sprint = useSnapshot(store.sprint)

  const initialValues: InitialValuesType = {
    title: '',
    subtitle: '',
    author: '',
    id: generateTaskId(),
    addInSprint: true
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
    addInSprint: Yup.boolean()
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
          const today = new Date()
          const end = getDateByDuration(ctx.from[0].value.days)
          if (end > sprint.end) return false
        } else return true
      } 
    )
    .required('Required')
  })

  const handleSubmit = (values: InitialValuesType, actions: object) => {
    alert(JSON.stringify(values, null, 2))
  }

  return (
  <div className='container'>
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
            name='addInSprint'
            className='switch inline-block ml-3'
            type='checkbox'
          />
        <button className='btn btn-primary mt-3 mb-5' type="submit">Submit</button>
        </Form>
      </Formik>
  </div>
  )

  // return(
  //   <div className='container'>
  //     <Form className='mt-4 mb-5'>
  //       <Form.Group className="mb-3">
  //         <Form.Control required type="text" placeholder="Title" />
  //       </Form.Group>
  //
  //       <Form.Group className="mb-3">
  //         <Form.Control required type="text" placeholder="Subtitle" />
  //       </Form.Group>
  //
  //       <Form.Group className="mb-3">
  //         <Form.Control required type="text" placeholder="Author" />
  //       </Form.Group>
  //
  //       <Form.Group className="mb-3">
  //         <Form.Control 
  //           required 
  //           type="text" 
  //           placeholder="Assignee" 
  //           onChange={(e) => setAssigneeValid(isMember(e.target.value))} 
  //           isInvalid={assigneeValid}
  //         />
  //       </Form.Group>
  //
  //       <Form.Group className="mb-3" style={{maxWidth: '400px'}}>
  //         <Form.Label>
  //           Time to complete the task
  //         </Form.Label>
  //         <Row>
  //           <Col>
  //             <Form.Control required type="text" placeholder="days" defaultValue={0} />
  //           </Col>
  //           <Col>
  //             <Form.Control required type="text" placeholder="hours" defaultValue={2} />
  //           </Col>
  //         </Row>
  //       </Form.Group>
  //
  //       <Form.Group className="mb-3">
  //         <Form.Label>
  //           Task description
  //         </Form.Label>
  //         <Form.Control required as="textarea" rows={2} />
  //       </Form.Group>
  //
  //       <Form.Group className="mb-3">
  //         <Form.Label>
  //           Task ID
  //         </Form.Label>
  //         <Form.Control required type="text" placeholder="XX-1234" defaultValue={generateTaskId()} />
  //       </Form.Group>
  //
  //       <Form.Group className="mb-3">
  //         <Form.Label>
  //           Comment
  //         </Form.Label>
  //         <Form.Control as="textarea" rows={2} />
  //       </Form.Group>
  //
  //       <Form.Group className="mb-3">
  //         <Form.Control type="text" placeholder="Watchers" />
  //       </Form.Group>
  //
  //       <Form.Group className="mb-3">
  //         <Form.Label>
  //           Add into current Sprint
  //         </Form.Label>
  //         <Form.Check type={'switch'} id={'addIntoSprint'} />
  //       </Form.Group>
  //
  //       <Button type="submit">Create Task</Button>
  //     </Form>
  //   </div>
  // )
}
