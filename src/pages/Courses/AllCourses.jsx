import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link from React Router
import { db } from '../../firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import CourseModal from './CourseModal'; // Adjust the import path accordingly
import { Button, Card, Flex, Modal, Row, Typography } from 'antd';
import { StepForwardOutlined } from '@ant-design/icons';
import Meta from 'antd/es/card/Meta';
import { CardWrapper, OfferContainer } from '../../styles/table';
const { Title, Text } = Typography;

function AllCourses() {
  const [showModal, setShowModal] = useState(false);
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const fetchCourses = async () => {
    const querySnapshot = await getDocs(collection(db, 'Courses'));
    const coursesList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setCourses(coursesList);
  };

  const handleSave = async (data) => {
    try {
      const docRef = await addDoc(collection(db, 'Courses'), {
        courseName: data.courseName,
        subHeading: data.subHeading,
        price: data.price,
        createdAt: new Date(), // Add a timestamp if needed
      });
      handleClose()
      console.log('Document written with ID: ', docRef.id);
      fetchCourses(); // Refresh the list of courses after saving
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  useEffect(() => {
    fetchCourses(); // Fetch the courses when the component mounts
  }, []);

  return (
    <>
      <div className="App p-4">
        <button
          onClick={handleShow}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Create Course
        </button>

        <div className="mt-8">
          <h2 className="text-[20px] font-semibold pb-5">On Going Courses</h2>
          <Flex wrap gap={20}>
            {courses.map((course) => (
              <CardWrapper>
              <Card
                hoverable
                onClick={() => navigate(`/view-courses/${course.id}`)}
                style={{ width: 300, cursor: 'pointer' }}
                cover={
                  <img
                    alt="example"
                    src="https://cdn.prod.website-files.com/5a9ee6416e90d20001b20038/64f5c1c1f5723d7453a3de42_Rectangle%20(94).svg"
                  />
                }
                actions={[
                  <Button block type="default" icon={<StepForwardOutlined />}>
                    Start
                  </Button>,
                ]}
              >
                <Meta
                  title={
                    course.courseName !== '' ? course.courseName : 'Demo'
                  }
                  description={
                    course.subHeading !== ''
                      ? course.subHeading
                      : 'Subheading'
                  }
                />
                <Row justify={'space-between'} style={{ marginTop: '20px' }}>
                  <Title level={5}>
                    ₹{course.price !== '' ? course.price : '100'}
                  </Title>
                  <OfferContainer>
                    <Title level={5}>{`60%off`}</Title>
                    <Text className="text-xs">Limited Time offer</Text>
                  </OfferContainer>
                </Row>
              </Card>
            </CardWrapper>
            ))}
          </Flex>
        </div>
      </div>
      <Modal
        title="Enter Course Details"
        open={showModal}
        footer={null}
        centered
        destroyOnClose
        onCancel={handleClose}
      >
        <CourseModal handleClose={handleClose} handleSave={handleSave} />
      </Modal>
    </>
  );
}

export default AllCourses;
