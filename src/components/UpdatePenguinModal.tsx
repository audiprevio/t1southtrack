import React from 'react';
import { Modal, Button, Input, message } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface UpdatePenguinModalProps {
  visible: boolean;
  onCancel: () => void;
  onUpdate: (newPosition: number[]) => void;
  id: string; // Added this line
  currentPosition?: number[];
}

const UpdatePenguinModal: React.FC<UpdatePenguinModalProps> = ({
  visible,
  onCancel,
  currentPosition,
  id, // Added this line
}) => {
  const handleUpdatePosition = async (id: string, newPosition: number[]) => {
    try {
      const requestBody = {
        id: id, // Make sure 'id' is a string
        lastPosition: newPosition.map(Number), // Make sure 'lastPosition' is an array of numbers
      };
  
      const response = await fetch(`https://penguintrackerapi.fly.dev/admin/penguins/edit/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        },
        body: JSON.stringify(requestBody)
      });
  
      if (response.ok) {
        message.success('Penguin position updated successfully. Refreshing the page...');
        setTimeout(() => {
          window.location.reload();
        }, 2000);
        // You may want to refresh the data here or update the local data with the new position.
      } else {
        message.error('Failed to update penguin position due to a server error.');
      }
    } catch (error) {
      message.error('An error occurred while updating penguin position. Please try again.');
    }
  };
  

  const formik = useFormik({
    initialValues: {
      lastPosition: currentPosition || [],
    },
    validationSchema: Yup.object().shape({
      lastPosition: Yup.array()
        .of(Yup.number().required('Position is required'))
        .required('At least one position is required'),
    }),
    onSubmit: (values) => {
      if (values.lastPosition.length !== 2) {
        message.error('Please provide valid coordinates.');
      } else {
        handleUpdatePosition(id, values.lastPosition); // Updated this line
        onCancel();
      }
    },
  });

  return (
    <Modal
      title="Update Penguin Movement"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button
          key="update"
          type="primary"
          onClick={formik.handleSubmit}
          disabled={formik.isSubmitting}
        >
          Update Now
        </Button>,
      ]}
    >
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label>Last Position (Latitude, Longitude)</label>
          <Input
            type="number"
            name="lastPosition[0]"
            placeholder="Latitude"
            onChange={formik.handleChange}
            value={formik.values.lastPosition[0]}
          />
          <Input
            type="number"
            name="lastPosition[1]"
            placeholder="Longitude"
            onChange={formik.handleChange}
            value={formik.values.lastPosition[1]}
          />
          {formik.errors.lastPosition && formik.touched.lastPosition && (
            <div className="error">{formik.errors.lastPosition}</div>
          )}
        </div>
      </form>
    </Modal>
  );
};

export default UpdatePenguinModal;
