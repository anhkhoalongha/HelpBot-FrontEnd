import { Box, Button, FormControl, FormLabel, Input, Text } from '@chakra-ui/react';
import { useAuth } from '@clerk/nextjs';
import { Field, FieldInputProps, Form, Formik } from 'formik';
import React, { FormEvent, useRef, useState } from 'react';
// import { toast } from 'react-toastify';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';


interface JsonData {
  [key: string]: string;
}

type TooltipRef = {
  close: () => void;
};


const CreateNewProject = () => {
  const ref = useRef<TooltipRef | undefined>(undefined);
  const [notifyMessage, setNotifyMessage] = useState('');
  const { userId, sessionId } = useAuth();
  console.log('user id:', sessionId)
  // const showToastMessage = () => {
  //   toast.success('Create successful!', {
  //     position: toast.POSITION.TOP_RIGHT
  //   });
  // };
  const closeTooltip = () => {
    if (ref.current) {
      ref.current.close();
    }
  };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);
      const jsonData: JsonData = {};

      formData.forEach((value, key) => {
        jsonData[key] = value as string;
      });

      console.log('form', jsonData);

      const response = await fetch(`/api/create-project/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit the data. Please try again.');
      } else {
        setNotifyMessage('Create successful!');
        closeTooltip();
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Popup
      ref={ref as any}
      trigger={
        <Button
          colorScheme="teal"
          className="button"
        >
          Create new project
        </Button>
      }
      modal
      nested
    > <Box
      borderRadius={'6px'}
      pt={'2%'}
      pb={'2%'}
      // backgroundColor={'red'}
      className='xxx'
    >
        <Formik
          initialValues={{ name: 'Project01' }}
          onSubmit={(values, actions) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              actions.setSubmitting(false);
            }, 1000);
          }}
        >
          {() => (

            <Form
              onSubmit={onSubmit}>
              <Field name='name'>
                {({ field }: { field: FieldInputProps<any> }) => (
                  <FormControl>
                    <FormLabel>Enter your project</FormLabel>
                    <Input {...field} placeholder='name' />
                  </FormControl>
                )}
              </Field>
              <Field name='owner'>
                {({ field }: { field: FieldInputProps<any> }) => (
                  <FormControl>
                    <Input {...field} placeholder='onwer' value={userId || undefined} display={'none'} />
                  </FormControl>
                )}
              </Field>
              <Box>
                <Text>
                  {notifyMessage}
                </Text>
              </Box>
              <Button
                mt={4}
                colorScheme='teal'
                type='submit'
              >
                Submit
              </Button>
              <Button
                className="button"
                onClick={closeTooltip}
                mt={4}
              >
                Close
              </Button>
            </Form>

          )}
        </Formik>
      </Box>
    </Popup>
  );
}

export default CreateNewProject;
