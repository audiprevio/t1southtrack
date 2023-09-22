// @ts-nocheck
import React from 'react';
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { Card, message, Form as AntForm, Input, Button, Divider } from 'antd';
import { useNavigate } from 'react-router-dom';

interface FormValues {
  username: string;
  password: string;
}

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

const LoginForm: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
      <Card style={{ width: '25rem' }}>
        <h2 style={{ marginBottom: '1rem', textAlign: 'center' }}>SouthTrack Login</h2>
        <Divider />
        <Formik
          initialValues={{
            username: '',
            password: '',
          }}
          validationSchema={LoginSchema}
          onSubmit={async (values: FormValues, { setStatus }: FormikHelpers<FormValues>) => {
            try {
              const response = await fetch('https://penguintrackerapi.fly.dev/admin/login', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
              });

              if (response.ok) {
                const data = await response.json();
                console.log(data)
                localStorage.setItem('jwt', data.token);
                message.success('Logged in successfully');
                navigate('/');
              } else {
                setStatus('Wrong password or username');
              }
            } catch (error) {
              setStatus('An error occurred. Please try again.');
            }
          }}
        >
          {({ errors, touched, status }) => (
            <Form style = {{ display: 'flex', flexDirection: 'column', padding: '0'}}>
              <AntForm.Item label="Username" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} help={errors.username && touched.username ? errors.username : null} validateStatus={errors.username && touched.username ? 'error' : ''}>
                <Field as={Input} name="username" />
              </AntForm.Item>
              <AntForm.Item label="Password" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} help={errors.password && touched.password ? errors.password : null} validateStatus={errors.password && touched.password ? 'error' : ''}>
                <Field as={Input.Password} name="password" />
              </AntForm.Item>
              {status && <div>{status}</div>}
              <AntForm.Item>
                <Button type="primary" htmlType="submit" style={{ width: '100%' }}>Submit</Button>
              </AntForm.Item>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
};

export default LoginForm;
