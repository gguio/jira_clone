// import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

import { useEffect, useState } from 'react'

import { generateTaskId } from 'utils/storeUtils.ts'
import { isMember } from 'utils/validationUtils.ts'

import { TextInput } from 'components/MyTextInput.tsx'

import { Formik, Form } from 'formik'
import * as Yup from 'yup'

type InitialValuesType = {
  title: string,
  subtitle: string,
  author: string
}

export default function Admin() {

  const initialValues: InitialValuesType = {
    title: '',
    subtitle: '',
    author: ''
  }

  const validationSchema = Yup.object({
    title: Yup.string()
    .max(30, 'Title can not be more than 30 characters')
    .required('Required'),
    subtitle: Yup.string()
    .max(50, 'Subtitle can not be more than 50 characters')
    .required('Required'),
    author: Yup.string()
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
        <button className='btn btn-primary' type="submit">Submit</button>
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
