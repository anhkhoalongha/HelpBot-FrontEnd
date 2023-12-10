import { useState } from 'react';
import { Formik, Form, Field, FieldInputProps } from 'formik';
import {
  FormControl,
  FormLabel,
  Input,
  Box,
  Text,
  Button
} from '@chakra-ui/react';
import React from 'react';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Project from '@/types/project';
import useProjectStore from '@/store/projectStore';


type Values = {
  title: string;
  color: string;
  fontSize: number;
}

type Props = {
  data: Project
}

const StyleWidget = () => {
  const { selectedProject, setSelectedProject } = useProjectStore()
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const notifyStyleSuccess = () => toast.success("Widget style was changed!");
  const notifyLogoSuccess = () => toast.success("Widget Logo was changed!");
  const notifyFalse = () => toast("Widget style was not changed!");

  const [formData] = useState({
    title: selectedProject?.style_widget?.title ?? 'Your company name',
    color: selectedProject?.style_widget?.color ?? '#fff',
    fontSize: selectedProject?.style_widget?.fontSize ?? 13
  });
  const handleSubmit = async (values: Values) => {
    try {
      await fetch(`/api/change-style/${selectedProject?.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      setSelectedProject({...selectedProject, style_widget: values} as Project)
      notifyStyleSuccess()
    }
    catch {
      notifyFalse()
    }
  };


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedFile(file);

    // Create a FileReader object
    const reader = new FileReader();

    // Set up the FileReader onload event
    reader.onload = () => {
      setPreviewImage(reader.result as string);
    };

    // Read the file as a data URL
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitImage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedFile) {
      const formData = new FormData();
      formData.append('avt_img', selectedFile);
3
      try {
        const response = await fetch(`/api/change-cover-img/${selectedProject?.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: formData,
        });
        if (response.ok) {
          console.log('Image uploaded successfully!');
          notifyLogoSuccess
        } else {
          console.error('Error uploading image:', response.statusText);
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  return (
    <Box ml={'5%'}>
      <Box>
        <Text fontSize='40px' >
          Update your project logo:
        </Text>
        <Box
          w={'100%'}
          mb={'2%'}
        >
          <form onSubmit={handleSubmitImage}>
            <Box
              w={'100%'}
              mb={'1%'}
            >
              <input type="file" onChange={handleFileChange} />
            </Box>
            {previewImage && (
            <img
              src={previewImage}
              alt="Preview"
              style={{
                maxWidth: '100%',
                marginBottom: '1%',
                width: '200px',
                height: '200px',
                borderRadius: '50%',
                objectFit: 'cover',
              }}
            />
          )}
            <Button
              type="submit"
              colorScheme='teal'
              variant='outline'
            >
              Upload Image
            </Button>
          </form>
        </Box >
      </Box>
      <Box mt={'2%'}>
        <Text fontSize='40px' >
          Update your widget style:
        </Text>
        <Formik
          initialValues={formData}
          onSubmit={handleSubmit}
        >

          {() => (
            <Form>
              <Field name='title'>
                {({ field }: { field: FieldInputProps<any> }) => (
                  <FormControl>
                    <FormLabel>Enter chatbot title</FormLabel>
                    <Input {...field}
                      type='text'
                      name='title'
                      placeholder='Title...'
                      w={'70%'}
                      backgroundColor={'white'} />
                  </FormControl>
                )}
              </Field>
              <Field name='color'>
                {({ field }: { field: FieldInputProps<any> }) => (
                  <FormControl>
                    <FormLabel>Choose theme color</FormLabel>
                    <Input {...field} type='color' defaultValue={'white'} name='color' w={'8%'} />
                  </FormControl>
                )}
              </Field>
              <Field name='fontSize'>
                {({ field }: { field: FieldInputProps<any> }) => (
                  <FormControl>
                    <FormLabel>Font size</FormLabel>
                    <Input {...field} type='number' name='fontSize' placeholder='Font size...' w={'70%'} backgroundColor={'white'} />
                  </FormControl>
                )}
              </Field>
              <Button
                mt={4}
                colorScheme='teal'
                type='submit'
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
}

export default StyleWidget;
