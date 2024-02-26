import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

import { useEffect, useState } from 'react'

import { generateTaskId } from 'utils/storeUtils.ts'
import { isMember } from 'utils/validationUtils.ts'

export default function Admin() {
  const [assigneeValid, setAssigneeValid] = useState(false)

  const assigneeValidation = (e: React.ChangeEvent<HTMLInputElement>) => {

  }

  return(
    <div className='container'>
      <Form className='mt-4 mb-5'>
        <Form.Group className="mb-3">
          <Form.Control required type="text" placeholder="Title" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control required type="text" placeholder="Subtitle" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control required type="text" placeholder="Author" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control 
            required 
            type="text" 
            placeholder="Assignee" 
            onChange={(e) => setAssigneeValid(isMember(e.target.value))} 
            isInvalid={assigneeValid}
          />
        </Form.Group>

        <Form.Group className="mb-3" style={{maxWidth: '400px'}}>
          <Form.Label>
            Time to complete the task
          </Form.Label>
          <Row>
            <Col>
              <Form.Control required type="text" placeholder="days" defaultValue={0} />
            </Col>
            <Col>
              <Form.Control required type="text" placeholder="hours" defaultValue={2} />
            </Col>
          </Row>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>
            Task description
          </Form.Label>
          <Form.Control required as="textarea" rows={2} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>
            Task ID
          </Form.Label>
          <Form.Control required type="text" placeholder="XX-1234" defaultValue={generateTaskId()} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>
            Comment
          </Form.Label>
          <Form.Control as="textarea" rows={2} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control type="text" placeholder="Watchers" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>
            Add into current Sprint
          </Form.Label>
          <Form.Check type={'switch'} id={'addIntoSprint'} />
        </Form.Group>

        <Button type="submit">Create Task</Button>
      </Form>
    </div>
  )
}
